import { useCallback, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotification,
  addSocketMessage,
  clearTyping,
  selectSelectedConversation,
  setReadReceipt,
  setSocketError,
  setTyping,
  setUserOffline,
  setUserOnline,
  updateConversationStatus,
} from "../redux/features/message/messageSlice";
import { baseApi } from "../redux/services/API";
import { SOCKET_URL } from "../lib/constants";

/**
 * Manages the full Socket.IO lifecycle for the admin chat panel.
 *
 * Listens to ALL backend events:
 *   support_new_message        → addSocketMessage
 *   support_user_typing        → setTyping
 *   support_user_stop_typing   → clearTyping
 *   support_messages_read      → setReadReceipt
 *   support_status_changed     → updateConversationStatus
 *   support_notification       → addNotification
 *   support_user_online        → setUserOnline
 *   support_user_offline       → setUserOffline
 *   support_user_joined        → (logged)
 *   support_error              → setSocketError
 *
 * Exposes helper emitters via the returned object:
 *   emitJoinConversation(conversationId)
 *   emitTyping(conversationId, senderId)
 *   emitStopTyping(conversationId, senderId)
 *   emitMarkRead(conversationId)
 *   emitUpdateStatus(conversationId, status, adminId)
 */
export const useAdminSocket = (adminUserId, conversationIds = [], onMessage) => {
  const dispatch             = useDispatch();
  const socketRef            = useRef(null);
  const conversationIdsRef   = useRef([]);
  const onMessageRef         = useRef(onMessage);
  const joinedConversationIdsRef = useRef(new Set());
  const selectedConversationRef = useRef(null);
  const selectedConversation = useSelector(selectSelectedConversation);

  useEffect(() => {
    conversationIdsRef.current = conversationIds;
  }, [conversationIds]);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  // ── Emitter helpers (stable refs) ──────────────────────────
  const emitJoinConversation = useCallback((conversationId) => {
    if (socketRef.current?.connected && conversationId) {
      if (joinedConversationIdsRef.current.has(conversationId)) return;
      socketRef.current.emit("support_join_conversation", conversationId);
      joinedConversationIdsRef.current.add(conversationId);
    }
  }, []);

  const emitJoinConversations = useCallback((ids = []) => {
    ids.forEach((conversationId) => {
      emitJoinConversation(conversationId);
    });
  }, [emitJoinConversation]);

  const emitTyping = useCallback((conversationId, senderId) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("support_typing", {
        conversationId,
        senderId,
        senderRole: "admin",
      });
    }
  }, []);

  const emitStopTyping = useCallback((conversationId, senderId) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("support_stop_typing", {
        conversationId,
        senderId,
      });
    }
  }, []);

  const emitMarkRead = useCallback((conversationId) => {
    if (socketRef.current?.connected && conversationId) {
      socketRef.current.emit("support_mark_read", {
        conversationId,
        userRole: "admin",
      });
    }
  }, []);

  const emitUpdateStatus = useCallback((conversationId, status, adminId) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("support_update_status", {
        conversationId,
        status,
        adminId,
      });
    }
  }, []);

  // ── Create / destroy socket when adminUserId changes ───────
  useEffect(() => {
    if (!adminUserId) return;

    const joinedConversationIds = joinedConversationIdsRef.current;
    const socket = io(SOCKET_URL, { reconnection: true, reconnectionDelay: 1000 });
    socketRef.current = socket;

    // ── connect ──────────────────────────────────────────────
    socket.on("connect", () => {
      console.log("[socket] connected:", socket.id);
      joinedConversationIds.clear();

      // Identify as admin
      socket.emit("support_user_join", { userId: adminUserId, role: "admin" });

      // The backend only emits support_new_message to conversation_${id}.
      // Join every loaded support room so user messages arrive instantly.
      emitJoinConversations(conversationIdsRef.current);

      // Fallback for a selected conversation that is not in the loaded list yet.
      if (selectedConversationRef.current?._id) {
        emitJoinConversation(selectedConversationRef.current._id);
      }
    });

    // ── support_new_message ───────────────────────────────────
    // Backend: io.to(`conversation_${conversationId}`).emit('support_new_message', {...})
    const handleIncomingMessage = (msg) => {
      dispatch(addSocketMessage(msg));
      dispatch(baseApi.util.invalidateTags(["getMessages", "getConversations"]));
      onMessageRef.current?.(msg);
    };

    socket.on("new_message", handleIncomingMessage);
    socket.on("support_new_message", handleIncomingMessage);

    // ── support_user_typing ───────────────────────────────────
    socket.on("support_user_typing", ({ conversationId, senderId, senderRole }) => {
      // Ignore our own typing echo
      if (senderId === adminUserId) return;
      dispatch(setTyping({ conversationId, senderId, senderRole }));
    });

    // ── support_user_stop_typing ──────────────────────────────
    socket.on("support_user_stop_typing", ({ conversationId, senderId }) => {
      if (senderId === adminUserId) return;
      dispatch(clearTyping(conversationId));
    });

    // ── support_messages_read ─────────────────────────────────
    socket.on("support_messages_read", ({ conversationId, readBy, timestamp }) => {
      dispatch(setReadReceipt({ conversationId, readBy, timestamp }));
    });

    // ── support_status_changed ────────────────────────────────
    socket.on("support_status_changed", ({ conversationId, status }) => {
      dispatch(updateConversationStatus({ conversationId, status }));
    });

    // ── support_notification ──────────────────────────────────
    socket.on("support_notification", (payload) => {
      dispatch(addNotification(payload));
      dispatch(baseApi.util.invalidateTags(["getMessages", "getConversations"]));
      onMessageRef.current?.(payload);
    });

    // ── support_user_online ───────────────────────────────────
    socket.on("support_user_online", ({ userId }) => {
      dispatch(setUserOnline(userId));
    });

    // ── support_user_offline ──────────────────────────────────
    socket.on("support_user_offline", ({ userId }) => {
      dispatch(setUserOffline(userId));
    });

    // ── support_user_joined ───────────────────────────────────
    socket.on("support_user_joined", ({ conversationId, socketId }) => {
      console.log(`[socket] peer joined conversation ${conversationId} (${socketId})`);
    });

    // ── support_error ─────────────────────────────────────────
    socket.on("support_error", ({ message, error }) => {
      console.error("[socket] support_error:", message, error);
      dispatch(setSocketError({ message, error }));
    });

    // ── disconnect ────────────────────────────────────────────
    socket.on("disconnect", (reason) => {
      console.warn("[socket] disconnected:", reason);
      joinedConversationIds.clear();
    });

    return () => {
      joinedConversationIds.clear();
      socket.disconnect();
      socketRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminUserId]);

  // ── Re-join room whenever selected conversation changes ────
  useEffect(() => {
    emitJoinConversation(selectedConversation?._id);
  }, [selectedConversation?._id, emitJoinConversation]);

  useEffect(() => {
    emitJoinConversations(conversationIds);
  }, [conversationIds, emitJoinConversations]);

  return {
    socketRef,
    emitJoinConversation,
    emitJoinConversations,
    emitTyping,
    emitStopTyping,
    emitMarkRead,
    emitUpdateStatus,
  };
};
