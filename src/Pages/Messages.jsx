import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Send } from "lucide-react";

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
      <div className="flex items-center justify-center h-[85vh]">
        <div className="w-8 h-8 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }} className="flex h-[85vh] bg-gray-50 overflow-hidden">

      {/* Sidebar */}
      <ConversationSidebar conversations={conversations} />

      {/* Chat Area */}
      {!selectedConversation ? (
        <EmptyState />
      ) : (
        <div
          ref={chatAreaRef}
          className="flex-1 flex flex-col min-w-0 relative"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <DropOverlay active={dragOver} />

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