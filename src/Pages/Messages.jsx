/**
 * ═════════════════════════════════════════════════════════════════════════════════
 * MESSAGING SYSTEM ARCHITECTURE
 * ═════════════════════════════════════════════════════════════════════════════════
 *
 * This component manages the complete admin messaging system with three data flows:
 *
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ 1. ADMIN SENDS MESSAGE (Optimistic + Socket.IO)                             │
 * ├─────────────────────────────────────────────────────────────────────────────┤
 * │  • Admin types & clicks send                                                 │
 * │  • Message added to Redux immediately: addOptimisticMsgs()                  │
 * │  • UI shows message instantly (no waiting for server)                        │
 * │  • Simultaneously emits via Socket.IO: support_send_message                 │
 * │  • Backend: saves to DB → broadcasts echo: support_new_message             │
 * │  • Socket listener receives echo → replaces optimistic with real message     │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ 2. RECEIVE MESSAGES FROM OTHER SIDE (Socket.IO Queue, One-by-One)          │
 * ├─────────────────────────────────────────────────────────────────────────────┤
 * │  • Other user sends message                                                  │
 * │  • Backend broadcasts: support_new_message                                  │
 * │  • Socket listener receives it: addSocketMessage()                          │
 * │  • Message added to Redux socketMessages[conversationId] array              │
 * │  • UI automatically updates with the new message                            │
 * │  • Queue system: messages arrive one-by-one in order                        │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ 3. PAGE RELOAD (API Fetch - Historical Messages)                            │
 * ├─────────────────────────────────────────────────────────────────────────────┤
 * │  • Admin reloads page                                                        │
 * │  • Redux cleared → all optimistic/socket messages wiped                      │
 * │  • MessageList triggers: useGetAllMessagesOfConversationQuery()              │
 * │  • API endpoint: GET /admin/support/{conversationId}/messages                │
 * │  • Backend returns ALL historical messages                                   │
 * │  • MessageList merges: API messages + new socket messages + optimistic      │
 * │  • Deduplication by _id prevents duplicates                                 │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ MESSAGE DEDUPLICATION & MERGING (MessageList Component)                     │
 * ├─────────────────────────────────────────────────────────────────────────────┤
 * │  The final message list combines three sources:                              │
 * │   1. apiMessages (from REST API on load)                                    │
 * │   2. socketMessages (real-time via Socket.IO)                               │
 * │   3. optimisticMsgs (local unconfirmed messages)                            │
 * │                                                                              │
 * │  Deduplication by _id ensures no duplicate display:                         │
 * │   seen = new Set()                                                          │
 * │   for each message: if (_id already in seen) skip else add                  │
 * │                                                                              │
 * │  Result: single clean message list for UI                                   │
 * └─────────────────────────────────────────────────────────────────────────────┘
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Send } from "lucide-react";

// ── Store ────────────────────────────────────────────────────
import {
  addPendingFiles,
  selectSelectedConversation,
  setSelectedConversation,
} from "@/redux/features/message/messageSlice";

// ── API ──────────────────────────────────────────────────────
import {
  useGetAllConversationsQuery,
} from "@/redux/features/message/messageApi";

// ── Hooks ────────────────────────────────────────────────────
import { useAdminSocket } from "../lib/useAdminSocket";
import { useSendMessage  } from "../lib/useSendMessage";

// ── Components ───────────────────────────────────────────────
import ConversationSidebar  from "../Components/ConversationSidebar";
import ChatHeader           from "../Components/ChatHeader";
import MessageList          from "../Components/MessageList";
import InputArea            from "../Components/InputArea";
import DropOverlay          from "../Components/DropOverlay";
import Lightbox             from "../Components/Lightbox";
import NotificationToast    from "../Components/NotificationToast";
import SocketErrorBanner    from "../Components/SocketErrorBanner";

// ── Utils ────────────────────────────────────────────────────
import { processRawFiles } from "../lib/utils";

const Messages = () => {
  const dispatch             = useDispatch();
  const adminUser            = useSelector((state) => state.auth?.user);
  const selectedConversation = useSelector(selectSelectedConversation);

  const chatAreaRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  // ── API queries ──────────────────────────────────────────────
  const {
    data: conversationsData,
    isLoading: isLoadingConversations,
    refetch: refetchConversations,
  } = useGetAllConversationsQuery();

  const conversations = conversationsData?.data || [];

  // ── Socket — full event integration ──────────────────────────
  const {
    socketRef,
    emitTyping,
    emitStopTyping,
    emitMarkRead,
    emitUpdateStatus,
  } = useAdminSocket(adminUser?.id);

  // ── Send message ─────────────────────────────────────────────
  const { handleSend } = useSendMessage();

  // Auto-select first conversation on initial load
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      dispatch(setSelectedConversation(conversations[0]));
    }
  }, [conversations, selectedConversation, dispatch]);

  // ── Drag-and-drop ────────────────────────────────────────────
  const handleDragOver = useCallback((e) => { e.preventDefault(); setDragOver(true); }, []);
  const handleDragLeave = useCallback((e) => {
    if (!chatAreaRef.current?.contains(e.relatedTarget)) setDragOver(false);
  }, []);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) {
      dispatch(addPendingFiles(processRawFiles(e.dataTransfer.files)));
    }
  }, [dispatch]);

  // ── Status change — emit via socket ──────────────────────────
  // Backend: socket.on('support_update_status', ...) → updates DB + broadcasts support_status_changed
  const handleUpdateStatus = (status) => {
    if (!selectedConversation?._id) return;
    emitUpdateStatus(selectedConversation._id, status, adminUser?.id);
    // Also refetch so sidebar shows fresh state
    refetchConversations();
  };

  // ── Bind send with all socket emitters ───────────────────────
  // No REST API call — message is sent entirely via socket.
  // The server echoes support_new_message back, which updates the message list.
  const onSend = ({ newMessage, setNewMessage, pendingFilesWithRaw }) =>
    handleSend({
      newMessage,
      setNewMessage,
      pendingFilesWithRaw,   // includes rawFile blobs for base64 conversion
      socketRef,
      adminUser,
      emitMarkRead,
      refetchConversations,  // only needed to refresh sidebar preview
    });

  // ── Loading ───────────────────────────────────────────────────
  if (isLoadingConversations) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
        <div className="w-8 h-8 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }} className="flex h-[calc(100vh-5rem)] bg-gray-50 overflow-hidden">

      {/* Sidebar */}
      <div className={`${selectedConversation ? "hidden md:block" : "block"}`}>
        <ConversationSidebar conversations={conversations} />
      </div>

      {/* Chat Area */}
      {!selectedConversation ? (
        <div className="hidden md:flex flex-1">
          <EmptyState />
        </div>
      ) : (
        <div
          ref={chatAreaRef}
          className="flex-1 flex flex-col min-w-0 relative"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <DropOverlay active={dragOver} />

          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => dispatch(setSelectedConversation(null))}
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl hover:bg-gray-50 text-gray-700"
              aria-label="Back to conversations"
            >
              <ArrowLeft size={18} />
            </button>
            <span className="text-sm font-bold text-gray-800">Conversations</span>
          </div>

          {/* Header — shows live online/status from socket */}
          <ChatHeader onUpdateStatus={handleUpdateStatus} />

          {/* Error banner — shown on support_error */}
          <SocketErrorBanner />

          {/* Messages — merges API + socket + optimistic; shows typing */}
          <MessageList emitMarkRead={emitMarkRead} />

          {/* Input — emits support_typing / support_stop_typing */}
          <InputArea
            onSend={onSend}
            emitTyping={emitTyping}
            emitStopTyping={emitStopTyping}
            adminUserId={adminUser?.id}
          />
        </div>
      )}

      {/* Lightbox — full-screen image viewer */}
      <Lightbox />

      {/* Toast notifications — support_notification events */}
      <NotificationToast conversations={conversations} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');
        ::-webkit-scrollbar { width: 0; }
      `}</style>
    </div>
  );
};

const EmptyState = () => (
  <div className="flex-1 flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
        <Send size={24} style={{ color: "#FFC12D" }} />
      </div>
      <p className="text-gray-500 text-sm font-medium">Select a conversation to start chatting</p>
    </div>
  </div>
);

export default Messages;
