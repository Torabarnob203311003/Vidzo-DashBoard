import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // ── Conversation ──────────────────────────────────────────
  selectedConversation: null,

  // ── Messages ──────────────────────────────────────────────
  // Real-time messages received via socket (keyed by conversationId)
  // Shape: { [conversationId]: Message[] }
  socketMessages: {},

  // Optimistic messages added before server confirms
  optimisticMsgs: [],

  // ── Compose ───────────────────────────────────────────────
  replyingTo: null,       // full message object being replied to
  pendingFiles: [],       // files staged for upload (serializable – no rawFile blob)
  isSending: false,

  // ── Typing indicators ─────────────────────────────────────
  // Shape: { [conversationId]: { senderId, senderRole, timestamp } | null }
  typingIndicators: {},

  // ── Online presence ───────────────────────────────────────
  // Set of userIds currently online (strings only – serializable)
  onlineUsers: [],

  // ── Read receipts ─────────────────────────────────────────
  // Shape: { [conversationId]: { readBy, timestamp } | null }
  readReceipts: {},

  // ── Conversation status (live override from socket) ───────
  // Shape: { [conversationId]: string }
  conversationStatuses: {},

  // ── Toast notifications ───────────────────────────────────
  // Array of { id, type, conversationId, message, timestamp }
  notifications: [],

  // ── Socket error banner ───────────────────────────────────
  socketError: null,   // { message, error } | null

  // ── Lightbox ──────────────────────────────────────────────
  lightbox: {
    open: false,
    images: [],
    index: 0,
  },

  // ── Sidebar search ────────────────────────────────────────
  search: "",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {

    // ═══════════════════════════════════════════════════════
    // CONVERSATION
    // ═══════════════════════════════════════════════════════

    setSelectedConversation(state, { payload }) {
      state.selectedConversation = payload;
      // Clear per-conversation compose state on switch
      state.replyingTo = null;
      state.pendingFiles = [];
      state.optimisticMsgs = [];
      state.socketError = null;
    },

    // Update the status of the currently-selected conversation
    // (driven by socket support_status_changed)
    updateConversationStatus(state, { payload: { conversationId, status } }) {
      state.conversationStatuses[conversationId] = status;
      // Also patch the selectedConversation object if it matches
      if (state.selectedConversation?._id === conversationId) {
        state.selectedConversation = { ...state.selectedConversation, status };
      }
    },

    // ═══════════════════════════════════════════════════════
    // REAL-TIME MESSAGES  (support_new_message)
    // ═══════════════════════════════════════════════════════

    addSocketMessage(state, { payload: msg }) {
      const cid = msg.conversationId;
      if (!cid) return;
      if (!state.socketMessages[cid]) state.socketMessages[cid] = [];

      // Deduplicate by _id
      const exists = state.socketMessages[cid].some((m) => m._id === msg._id);
      if (!exists) state.socketMessages[cid].push(msg);
    },

    clearSocketMessages(state, { payload: conversationId }) {
      delete state.socketMessages[conversationId];
    },

    // ═══════════════════════════════════════════════════════
    // OPTIMISTIC MESSAGES
    // ═══════════════════════════════════════════════════════

    addOptimisticMsgs(state, { payload }) {
      state.optimisticMsgs = [...state.optimisticMsgs, ...payload];
    },
    clearOptimisticMsgs(state) {
      state.optimisticMsgs = [];
    },

    // ═══════════════════════════════════════════════════════
    // COMPOSE
    // ═══════════════════════════════════════════════════════

    setSearch(state, { payload }) { state.search = payload; },

    setReplyingTo(state, { payload }) { state.replyingTo = payload; },
    clearReplyingTo(state) { state.replyingTo = null; },

    addPendingFiles(state, { payload }) {
      state.pendingFiles = [...state.pendingFiles, ...payload];
    },
    removePendingFile(state, { payload: index }) {
      state.pendingFiles = state.pendingFiles.filter((_, i) => i !== index);
    },
    clearPendingFiles(state) { state.pendingFiles = []; },

    setIsSending(state, { payload }) { state.isSending = payload; },

    // ═══════════════════════════════════════════════════════
    // TYPING INDICATORS  (support_user_typing / support_user_stop_typing)
    // ═══════════════════════════════════════════════════════

    setTyping(state, { payload: { conversationId, senderId, senderRole } }) {
      state.typingIndicators[conversationId] = { senderId, senderRole, timestamp: Date.now() };
    },
    clearTyping(state, { payload: conversationId }) {
      delete state.typingIndicators[conversationId];
    },

    // ═══════════════════════════════════════════════════════
    // ONLINE PRESENCE  (support_user_online / support_user_offline)
    // ═══════════════════════════════════════════════════════

    setUserOnline(state, { payload: userId }) {
      if (!state.onlineUsers.includes(userId)) state.onlineUsers.push(userId);
    },
    setUserOffline(state, { payload: userId }) {
      state.onlineUsers = state.onlineUsers.filter((id) => id !== userId);
    },

    // ═══════════════════════════════════════════════════════
    // READ RECEIPTS  (support_messages_read)
    // ═══════════════════════════════════════════════════════

    setReadReceipt(state, { payload: { conversationId, readBy, timestamp } }) {
      state.readReceipts[conversationId] = { readBy, timestamp };
      // Mark all socket messages in this conversation as read if admin is the reader
      if (readBy === "admin" && state.socketMessages[conversationId]) {
        state.socketMessages[conversationId] = state.socketMessages[conversationId].map(
          (m) => (m.senderRole !== "admin" ? { ...m, isRead: true } : m)
        );
      }
    },

    // ═══════════════════════════════════════════════════════
    // NOTIFICATIONS  (support_notification)
    // ═══════════════════════════════════════════════════════

    addNotification(state, { payload }) {
      const note = { ...payload, id: `notif-${Date.now()}-${Math.random()}` };
      // Keep a max of 20 notifications in state
      state.notifications = [note, ...state.notifications].slice(0, 20);
    },
    dismissNotification(state, { payload: id }) {
      state.notifications = state.notifications.filter((n) => n.id !== id);
    },
    clearAllNotifications(state) {
      state.notifications = [];
    },

    // ═══════════════════════════════════════════════════════
    // SOCKET ERROR  (support_error)
    // ═══════════════════════════════════════════════════════

    setSocketError(state, { payload }) { state.socketError = payload; },
    clearSocketError(state) { state.socketError = null; },

    // ═══════════════════════════════════════════════════════
    // LIGHTBOX
    // ═══════════════════════════════════════════════════════

    openLightbox(state, { payload: { images, index } }) {
      state.lightbox = { open: true, images, index };
    },
    closeLightbox(state) {
      state.lightbox = { ...state.lightbox, open: false };
    },
    setLightboxIndex(state, { payload }) {
      state.lightbox.index = payload;
    },
  },
});

export const {
  // Conversation
  setSelectedConversation,
  updateConversationStatus,
  // Messages
  addSocketMessage,
  clearSocketMessages,
  addOptimisticMsgs,
  clearOptimisticMsgs,
  // Compose
  setSearch,
  setReplyingTo,
  clearReplyingTo,
  addPendingFiles,
  removePendingFile,
  clearPendingFiles,
  setIsSending,
  // Typing
  setTyping,
  clearTyping,
  // Presence
  setUserOnline,
  setUserOffline,
  // Read receipts
  setReadReceipt,
  // Notifications
  addNotification,
  dismissNotification,
  clearAllNotifications,
  // Errors
  setSocketError,
  clearSocketError,
  // Lightbox
  openLightbox,
  closeLightbox,
  setLightboxIndex,
} = messageSlice.actions;

export default messageSlice.reducer;

// ── Selectors ──────────────────────────────────────────────────
export const selectSelectedConversation  = (s) => s.message.selectedConversation;
export const selectSocketMessages        = (s) => s.message.socketMessages;
export const selectOptimisticMsgs        = (s) => s.message.optimisticMsgs;
export const selectReplyingTo            = (s) => s.message.replyingTo;
export const selectPendingFiles          = (s) => s.message.pendingFiles;
export const selectIsSending             = (s) => s.message.isSending;
export const selectTypingIndicators      = (s) => s.message.typingIndicators;
export const selectOnlineUsers           = (s) => s.message.onlineUsers;
export const selectReadReceipts          = (s) => s.message.readReceipts;
export const selectConversationStatuses  = (s) => s.message.conversationStatuses;
export const selectNotifications         = (s) => s.message.notifications;
export const selectSocketError           = (s) => s.message.socketError;
export const selectLightbox              = (s) => s.message.lightbox;
export const selectSearch                = (s) => s.message.search;

// Derived: typing indicator for a specific conversation
export const selectTypingForConversation = (conversationId) => (s) =>
  s.message.typingIndicators[conversationId] ?? null;

// Derived: is a specific user online?
export const selectIsUserOnline = (userId) => (s) =>
  s.message.onlineUsers.includes(userId);

// Derived: live status for a conversation (socket overrides API value)
export const selectConversationStatus = (conversationId) => (s) =>
  s.message.conversationStatuses[conversationId] ?? null;