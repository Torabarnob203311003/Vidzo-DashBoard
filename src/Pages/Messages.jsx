import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Search,
  Send,
  Reply,
  X,
  CornerDownRight,
  ChevronDown,
  Phone,
  Video,
  MoreVertical,
  Check,
  CheckCheck,
  Smile,
  Paperclip,
  Mic,
  FileText,
  Image as ImageIcon,
  Film,
  Music,
  Archive,
  Download,
  Eye,
  File,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { io } from "socket.io-client";
import Loader from "@/Components/shared/Loader";
import { useSelector } from "react-redux"; // to get logged-in admin info
import {
  useGetAllConversationsQuery,
  useGetAllMessagesOfConversationQuery,
} from "@/redux/features/message/messageApi";

// ─── Constants ───────────────────────────────────────────────
const GOLD = "#FFC12D";
const GOLD_DARK = "#E6A822";
const GOLD_LIGHT = "#FFF8E1";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

// ─── Helpers ─────────────────────────────────────────────────
const formatTime = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

const formatLastMessageTime = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === today.toDateString())
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

const formatFileSize = (bytes) => {
  if (!bytes) return "—";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

const getFileIcon = (type = "") => {
  if (type.startsWith("image/")) return { icon: ImageIcon, color: "#3B82F6", bg: "#EFF6FF" };
  if (type.startsWith("video/")) return { icon: Film, color: "#8B5CF6", bg: "#F5F3FF" };
  if (type.startsWith("audio/")) return { icon: Music, color: "#EC4899", bg: "#FDF2F8" };
  if (type.includes("pdf")) return { icon: FileText, color: "#EF4444", bg: "#FEF2F2" };
  if (type.includes("zip") || type.includes("rar") || type.includes("tar"))
    return { icon: Archive, color: "#F59E0B", bg: "#FFFBEB" };
  return { icon: File, color: "#6B7280", bg: "#F3F4F6" };
};

const isAdminMessage = (msg) => msg?.senderRole === "admin";

// ─── Sub-components ──────────────────────────────────────────

const FileBubble = ({ file, isMe }) => {
  const { icon: Icon, color, bg } = getFileIcon(file?.mimeType || file?.type || "");
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-2xl"
      style={{ background: isMe ? "rgba(255,255,255,0.15)" : bg, minWidth: 200, maxWidth: 260 }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: isMe ? "rgba(255,255,255,0.25)" : "#fff", border: `1px solid ${isMe ? "rgba(255,255,255,0.3)" : color + "33"}` }}
      >
        <Icon size={20} color={isMe ? "white" : color} />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-semibold truncate ${isMe ? "text-white" : "text-gray-800"}`}>
          {file?.name || file?.originalName || "File"}
        </div>
        <div className={`text-xs mt-0.5 ${isMe ? "text-white/70" : "text-gray-400"}`}>
          {formatFileSize(file?.size)}
        </div>
      </div>
      {file?.url && (
        <a
          href={file.url}
          download
          onClick={(e) => e.stopPropagation()}
          className="flex-shrink-0 p-1.5 rounded-lg transition hover:scale-110"
          style={{ background: isMe ? "rgba(255,255,255,0.2)" : color + "22" }}
        >
          <Download size={14} color={isMe ? "white" : color} />
        </a>
      )}
    </div>
  );
};

const ImageBubble = ({ file, onPreview }) => (
  <div className="relative rounded-2xl overflow-hidden cursor-pointer group/img" style={{ maxWidth: 240 }} onClick={onPreview}>
    <img src={file?.url} alt={file?.name || "image"} className="w-full object-cover" style={{ maxHeight: 200 }} />
    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/25 transition-all flex items-center justify-center">
      <div className="opacity-0 group-hover/img:opacity-100 transition bg-black/50 p-2 rounded-full">
        <Eye size={16} className="text-white" />
      </div>
    </div>
    <div className="absolute bottom-2 left-2 text-[10px] text-white bg-black/40 px-2 py-0.5 rounded-full truncate max-w-[90%]">
      {file?.name || file?.originalName || "image"}
    </div>
  </div>
);

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const img = images[currentIndex];

  useEffect(() => { setZoom(1); setRotation(0); }, [currentIndex]);
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95" onClick={onClose}>
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        <div className="text-white/70 text-sm font-medium">
          {img?.file?.url?.split("/").pop() || "Image"}
          <span className="text-white/40 ml-2">{currentIndex + 1} / {images.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"><ZoomOut size={15} /></button>
          <span className="text-white/60 text-xs w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((z) => Math.min(4, z + 0.25))} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"><ZoomIn size={15} /></button>
          <button onClick={() => setRotation((r) => r + 90)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"><RotateCw size={15} /></button>
          {img?.file?.url && (
            <a href={img.file.url} download onClick={(e) => e.stopPropagation()} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
              <Download size={15} />
            </a>
          )}
          <button onClick={onClose} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition ml-2"><X size={15} /></button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <>
            <button onClick={onPrev} className="absolute left-4 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition z-10"><ChevronLeft size={20} /></button>
            <button onClick={onNext} className="absolute right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition z-10"><ChevronRight size={20} /></button>
          </>
        )}
        <img
          src={img?.file?.url}
          alt=""
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            transition: "transform 0.2s",
            maxHeight: "70vh",
            maxWidth: "80vw",
            objectFit: "contain",
            borderRadius: 8,
          }}
        />
      </div>
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 py-4 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          {images.map((im, i) => (
            <button
              key={i}
              onClick={() => onNext(i)}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition ${i === currentIndex ? "scale-110" : "opacity-40 hover:opacity-70"}`}
              style={{ borderColor: i === currentIndex ? GOLD : "transparent" }}
            >
              <img src={im?.file?.url} className="w-full h-full object-cover" alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const DropOverlay = ({ active }) => (
  <div
    className={`absolute inset-0 z-30 flex items-center justify-center transition-all pointer-events-none rounded-lg ${active ? "opacity-100" : "opacity-0"}`}
    style={{ background: "rgba(255,193,45,0.1)", backdropFilter: "blur(2px)", border: "2px dashed #FFC12D" }}
  >
    <div className="text-center">
      <Paperclip size={36} style={{ color: GOLD }} className="mx-auto mb-2" />
      <div className="text-base font-bold" style={{ color: GOLD_DARK }}>Drop files to send</div>
      <div className="text-xs text-gray-500 mt-1">Images, documents, videos & more</div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────
const Messages = () => {
  // ── Get logged-in admin from Redux auth store ──
  // Adjust selector path to match your auth slice shape
  const adminUser = useSelector((state) => state.auth?.user);

  // ── API Hooks — REST only for loading data; all writes go through socket ──
  const {
    data: conversationsData,
    isLoading: isLoadingConversations,
    refetch: refetchConversations,
  } = useGetAllConversationsQuery();

  // ── Local State ──
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [search, setSearch] = useState("");
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0 });
  const [dragOver, setDragOver] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [liveMessages, setLiveMessages] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);       // array of userIds
  const [typingUsers, setTypingUsers] = useState({});       // { [convId]: { senderId, senderRole } }

  // ── Refs ──
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const messageRefs = useRef({});
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatAreaRef = useRef(null);
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const selectedConvRef = useRef(null); // keep latest conv in socket closures
  useEffect(() => { selectedConvRef.current = selectedConversation; }, [selectedConversation]);

  // ── Fetch messages for selected conversation (initial REST load) ──
  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    refetch: refetchMessages,
  } = useGetAllMessagesOfConversationQuery(selectedConversation?._id, {
    skip: !selectedConversation?._id,
  });

  const conversations = conversationsData?.data || [];
  const apiMessages = messagesData?.data || [];

  // Merge REST + live socket messages, deduplicate by _id
  const currentConvId = selectedConversation?._id;
  const socketMessages = currentConvId ? liveMessages[currentConvId] || [] : [];
  const apiMessageIds = new Set(apiMessages.map((m) => m._id));
  const newSocketMessages = socketMessages.filter((m) => !apiMessageIds.has(m._id));
  const currentMessages = [...apiMessages, ...newSocketMessages];

  const chatImages = currentMessages.filter(
    (m) => m?.file?.url && m?.file?.mimeType?.startsWith("image/")
  );

  const filteredConversations = conversations.filter(
    (c) =>
      c.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.user?.email?.toLowerCase().includes(search.toLowerCase())
  );

  // ─────────────────────────────────────────────────────────────────
  // ── Socket.io — single persistent connection, all events wired ──
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const socket = io(SOCKET_URL, {
      withCredentials: true,
      // auth: { token: localStorage.getItem("token") },
    });
    socketRef.current = socket;

    // ── connect → register admin
    // Backend: "support_user_join" → users/admins Map, join personal room, emit "support_user_online"
    // Payload: { userId, role }
    socket.on("connect", () => {
      console.log("[Socket] Connected:", socket.id);
      if (adminUser?._id) {
        socket.emit("support_user_join", {
          userId: adminUser._id,
          role: "admin",
        });
      }
      // Re-join active conversation room on reconnect
      if (selectedConvRef.current?._id) {
        socket.emit("support_join_conversation", selectedConvRef.current._id);
      }
    });

    socket.on("disconnect", () => console.log("[Socket] Disconnected"));

    // ── support_new_message
    // Backend broadcasts this to `conversation_${conversationId}` after "support_send_message"
    // Payload: { _id, conversationId, sender, senderRole, message, isRead, createdAt }
    socket.on("support_new_message", (message) => {
      const convId = message?.conversationId || message?.conversation;
      if (!convId) return;

      setLiveMessages((prev) => {
        const existing = prev[convId] || [];

        // Replace matching optimistic message if text is same and sender is admin
        if (message.senderRole === "admin") {
          const optimisticIdx = existing.findIndex(
            (m) => m._isOptimistic && m.message === message.message
          );
          if (optimisticIdx !== -1) {
            const updated = [...existing];
            updated[optimisticIdx] = message; // swap optimistic → real
            return { ...prev, [convId]: updated };
          }
        }

        // Skip exact duplicate _id
        if (existing.some((m) => m._id === message._id)) return prev;

        return { ...prev, [convId]: [...existing, message] };
      });

      // Mark incoming user messages as read if this is the active conversation
      if (
        message.senderRole !== "admin" &&
        convId === selectedConvRef.current?._id
      ) {
        socket.emit("support_mark_read", { conversationId: convId, userRole: "admin" });
      }

      refetchConversations();
    });

    // ── support_user_online
    // Backend emits to ALL on "support_user_join"
    // Payload: { userId, role, socketId }
    socket.on("support_user_online", ({ userId }) => {
      setOnlineUsers((prev) => prev.includes(userId) ? prev : [...prev, userId]);
    });

    // ── support_user_offline
    // Backend emits to ALL on "disconnect"
    // Payload: { userId, role, timestamp }
    socket.on("support_user_offline", ({ userId }) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== userId));
    });

    // ── support_user_typing
    // Backend forwards "support_typing" to the conversation room
    // Payload: { conversationId, senderId, senderRole }
    socket.on("support_user_typing", ({ conversationId, senderId, senderRole }) => {
      if (senderRole !== "admin") {
        setTypingUsers((prev) => ({ ...prev, [conversationId]: { senderId, senderRole } }));
      }
    });

    // ── support_user_stop_typing
    // Backend forwards "support_stop_typing" to the conversation room
    // Payload: { conversationId, senderId }
    socket.on("support_user_stop_typing", ({ conversationId }) => {
      setTypingUsers((prev) => {
        const updated = { ...prev };
        delete updated[conversationId];
        return updated;
      });
    });

    // ── support_messages_read
    // Backend emits after "support_mark_read" updates DB
    // Payload: { conversationId, readBy, timestamp }
    socket.on("support_messages_read", ({ conversationId, readBy }) => {
      // User read admin's messages → refresh so double-ticks turn gold
      if (readBy !== "admin" && conversationId === selectedConvRef.current?._id) {
        refetchMessages();
      }
    });

    // ── support_status_changed
    // Backend emits after "support_update_status"
    // Payload: { conversationId, status, changedBy, timestamp }
    socket.on("support_status_changed", ({ conversationId, status }) => {
      // Update local conversation status without full refetch
      refetchConversations();
    });

    // ── support_user_joined
    // Backend emits to room on "support_join_conversation"
    // Payload: { conversationId, socketId, timestamp }
    socket.on("support_user_joined", ({ conversationId }) => {
      console.log("[Socket] Participant joined conversation:", conversationId);
    });

    // ── support_notification
    // Backend emits to admin sockets when a user sends a message
    // Payload: { type, conversationId, message, timestamp }
    socket.on("support_notification", ({ type, conversationId, message: notifMsg }) => {
      if (conversationId !== selectedConvRef.current?._id) {
        toast.info(notifMsg || "New support message", { duration: 3000 });
      }
      refetchConversations();
    });

    // ── support_error
    // Backend emits when socket handler throws
    // Payload: { message, error }
    socket.on("support_error", ({ message: errMsg }) => {
      toast.error(errMsg || "Something went wrong");
      setIsSending(false);
    });

    return () => { socket.disconnect(); };
  }, [adminUser?._id]);

  // ─────────────────────────────────────────────────────────────────
  // ── Join conversation room + mark read when conversation changes ──
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedConversation?._id || !socketRef.current) return;
    const convId = selectedConversation._id;

    // Backend: "support_join_conversation" → socket.join(`conversation_${convId}`)
    socketRef.current.emit("support_join_conversation", convId);

    // Mark messages read via socket only
    // Backend: "support_mark_read" → updates isRead in DB, emits "support_messages_read" to room
    socketRef.current.emit("support_mark_read", {
      conversationId: convId,
      userRole: "admin",
    });
  }, [selectedConversation?._id]);

  // Auto-select first conversation
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0]);
    }
  }, [conversations]);

  // ── Scroll helpers ──
  const scrollToBottom = (smooth = true) =>
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });

  useEffect(() => { scrollToBottom(false); }, [selectedConversation?._id]);
  useEffect(() => { scrollToBottom(); }, [currentMessages.length]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 100);
  };

  // ─────────────────────────────────────────────────────────────────
  // ── handleSend — 100% via Socket.io, no REST API
  //
  // Emits: "support_send_message"
  // Exact payload (matches Postman):
  //   {
  //     conversationId: string,
  //     senderId:       string,   ← adminUser._id
  //     senderRole:     "admin",
  //     message:        string,
  //     type:           "text",
  //     mediaUrl:       null
  //   }
  //
  // Backend response: broadcasts "support_new_message" to the room,
  //   which replaces the optimistic bubble here.
  // ─────────────────────────────────────────────────────────────────
  const handleSend = () => {
    if (!selectedConversation?._id || !socketRef.current) return;
    if (!newMessage.trim()) return;
    if (isSending) return;

    const convId    = selectedConversation._id;
    const msgText   = newMessage.trim();

    // Clear input + stop typing immediately
    setNewMessage("");
    setReplyingTo(null);
    setIsSending(true);
    clearTimeout(typingTimeoutRef.current);
    socketRef.current.emit("support_stop_typing", {
      conversationId: convId,
      senderId: adminUser?._id,
    });

    // Optimistic bubble — shown instantly, replaced when server broadcasts back
    const optimisticMsg = {
      _id: `optimistic_${Date.now()}`,
      conversationId: convId,
      conversation:   convId,
      sender: {
        _id:   adminUser?._id,
        name:  adminUser?.name,
        image: adminUser?.image,
      },
      senderRole:      "admin",
      message:         msgText,
      type:            "text",
      mediaUrl:        null,
      isRead:          false,
      createdAt:       new Date().toISOString(),
      _isOptimistic:   true,
    };

    setLiveMessages((prev) => ({
      ...prev,
      [convId]: [...(prev[convId] || []), optimisticMsg],
    }));

    // ── Emit to backend ──
    // "support_send_message" → saves to DB → broadcasts "support_new_message"
    socketRef.current.emit("support_send_message", {
      conversationId: convId,
      senderId:       adminUser?._id,
      senderRole:     "admin",
      message:        msgText,
      type:           "text",
      mediaUrl:       null,
    });

    setIsSending(false);
  };

  // ── Typing indicator ──
  // Backend "support_typing" → emits "support_user_typing" to room
  // Backend "support_stop_typing" → emits "support_user_stop_typing" to room
  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (!socketRef.current || !selectedConversation?._id) return;

    socketRef.current.emit("support_typing", {
      conversationId: selectedConversation._id,
      senderId: adminUser?._id,
      senderRole: "admin",
    });

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current?.emit("support_stop_typing", {
        conversationId: selectedConversation._id,
        senderId: adminUser?._id,
      });
    }, 1500);
  };

  // ── Update conversation status (admin action) ──
  // Backend "support_update_status" → updates DB, emits "support_status_changed" to room
  const handleUpdateStatus = (status) => {
    if (!selectedConversation?._id || !socketRef.current) return;
    socketRef.current.emit("support_update_status", {
      conversationId: selectedConversation._id,
      status,
      adminId: adminUser?._id,
    });
  };

  // ── Scroll to replied message ──
  const scrollToMessage = (id) => {
    const el = messageRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.style.transition = "background 0.3s";
      el.style.background = "#FFF3CD";
      setTimeout(() => { el.style.background = ""; }, 1500);
    }
  };

  // ── Lightbox ──
  const openLightbox = (msgId) => {
    const idx = chatImages.findIndex((m) => m._id === msgId);
    setLightbox({ open: true, images: chatImages, index: Math.max(0, idx) });
  };

  // ── File handling ──
  const processFiles = (files) => {
    const processed = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      mimeType: file.type || "application/octet-stream",
      url: file.type?.startsWith("image/") ? URL.createObjectURL(file) : null,
      rawFile: file,
    }));
    setPendingFiles((prev) => [...prev, ...processed]);
  };

  const handleDragOver = useCallback((e) => { e.preventDefault(); setDragOver(true); }, []);
  const handleDragLeave = useCallback((e) => {
    if (!chatAreaRef.current?.contains(e.relatedTarget)) setDragOver(false);
  }, []);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files);
  }, []);

  const canSend = (!!newMessage.trim() || pendingFiles.length > 0) && !isSending;
  const isUserTyping = currentConvId ? !!typingUsers[currentConvId] : false;

  if (isLoadingConversations) return <Loader />;

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }} className="flex h-[85vh] bg-gray-50 overflow-hidden">

      {/* ── Sidebar ── */}
      <div className="w-72 bg-white flex flex-col border-r border-gray-100 shadow-sm flex-shrink-0">
        <div className="px-5 pt-6 pb-3">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-xl font-black text-gray-900 tracking-tight">Messages</h1>
            {conversations.reduce((a, c) => a + (c.unreadCountAdmin || 0), 0) > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: GOLD }}>
                {conversations.reduce((a, c) => a + (c.unreadCountAdmin || 0), 0)}
              </span>
            )}
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-300 transition"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-gray-400">No conversations found</div>
          ) : (
            filteredConversations.map((conv) => {
              const isSelected = conv._id === selectedConversation?._id;
              const isOnline = onlineUsers.includes(conv.user?._id);
              return (
                <button
                  key={conv._id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 transition-all text-left relative ${isSelected ? "bg-yellow-50" : "hover:bg-gray-50"}`}
                >
                  {isSelected && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full" style={{ background: GOLD }} />}
                  <div className="relative flex-shrink-0">
                    {conv.user?.image
                      ? <img src={conv.user.image} className="w-11 h-11 rounded-full object-cover" alt="" />
                      : <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">{conv.user?.name?.[0]?.toUpperCase() || "U"}</div>
                    }
                    {isOnline && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-bold truncate ${isSelected ? "text-yellow-700" : "text-gray-900"}`}>
                        {conv.user?.name || "Unknown"}
                      </span>
                      <span className="text-[10px] text-gray-400 ml-2 flex-shrink-0">{formatLastMessageTime(conv.lastMessageAt)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-xs text-gray-400 truncate">{conv.lastMessage || "No messages yet"}</p>
                      {conv.unreadCountAdmin > 0 && (
                        <span className="ml-2 w-4 h-4 text-[10px] font-black text-white rounded-full flex items-center justify-center flex-shrink-0" style={{ background: GOLD }}>
                          {conv.unreadCountAdmin}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ── Chat Area ── */}
      {!selectedConversation ? (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
              <Send size={24} style={{ color: GOLD }} />
            </div>
            <p className="text-gray-500 text-sm font-medium">Select a conversation to start chatting</p>
          </div>
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

          {/* Header */}
          <div className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between flex-shrink-0 z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                {selectedConversation.user?.image
                  ? <img src={selectedConversation.user.image} className="w-10 h-10 rounded-full object-cover" alt="" />
                  : <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">{selectedConversation.user?.name?.[0]?.toUpperCase() || "U"}</div>
                }
                {onlineUsers.includes(selectedConversation.user?._id) && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-sm">{selectedConversation.user?.name || "User"}</h2>
                <p className="text-xs text-gray-400">
                  {onlineUsers.includes(selectedConversation.user?._id) ? "Active now" : "Last seen recently"}
                  {selectedConversation.status === "in-progress" && <span className="ml-2 text-yellow-500 font-semibold">• In Progress</span>}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"><Phone size={16} /></button>
              <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"><Video size={16} /></button>
              {/* Status dropdown */}
              <div className="relative group">
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"><MoreVertical size={16} /></button>
                <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 hidden group-hover:block">
                  {["open", "in-progress", "resolved", "closed"].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleUpdateStatus(s)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 capitalize transition"
                    >
                      {s.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-5 py-4"
            style={{ background: "#FAFAFA" }}
          >
            {isLoadingMessages ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-6 h-6 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin" />
              </div>
            ) : (
              <>
                {currentMessages.length > 0 && (
                  <div className="flex justify-center mb-5">
                    <span className="text-[11px] text-gray-400 bg-gray-200 px-3 py-0.5 rounded-full font-medium">
                      {formatDate(currentMessages[0]?.createdAt)}
                    </span>
                  </div>
                )}

                <div className="space-y-1">
                  {currentMessages.map((msg) => {
                    const isMe = isAdminMessage(msg);
                    const isOptimistic = !!msg._isOptimistic;
                    const replyTarget = msg.replyToId
                      ? currentMessages.find((m) => m._id === msg.replyToId)
                      : null;
                    const hasFile = !!msg.file?.url;
                    const isImageMsg = hasFile && msg.file?.mimeType?.startsWith("image/");
                    const isFileMsg = hasFile && !isImageMsg;

                    return (
                      <div
                        key={msg._id}
                        ref={(el) => (messageRefs.current[msg._id] = el)}
                        className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-2 group`}
                        style={{ marginBottom: 2, borderRadius: 8, transition: "background 0.3s" }}
                      >
                        {/* Other user avatar */}
                        {!isMe && (
                          <div className="w-7 h-7 rounded-full flex-shrink-0 mb-5 overflow-hidden bg-gray-200">
                            {msg.sender?.image
                              ? <img src={msg.sender.image} className="w-full h-full object-cover" alt="" />
                              : <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs font-bold">{msg.sender?.name?.[0]?.toUpperCase() || "U"}</div>
                            }
                          </div>
                        )}

                        <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-xs lg:max-w-sm`}>
                          {/* Reply preview */}
                          {replyTarget && (
                            <button
                              onClick={() => scrollToMessage(replyTarget._id)}
                              className="mb-1 px-3 py-1.5 rounded-xl border-l-[3px] text-left max-w-full hover:opacity-80 transition"
                              style={{ background: "#FFF3CD", borderColor: GOLD }}
                            >
                              <div className="text-[10px] font-bold mb-0.5" style={{ color: GOLD_DARK }}>
                                {isAdminMessage(replyTarget) ? "You" : selectedConversation.user?.name}
                              </div>
                              <div className="text-xs text-gray-600 truncate">
                                {replyTarget.file?.url ? `📎 ${replyTarget.file?.name || "File"}` : replyTarget.message}
                              </div>
                            </button>
                          )}

                          <div className="relative">
                            {/* Text bubble */}
                            {msg.message && (
                              <div
                                className={`px-4 py-2.5 text-sm leading-relaxed break-words rounded-2xl ${isMe ? "text-white rounded-br-sm" : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"} ${isOptimistic ? "opacity-60" : ""}`}
                                style={isMe ? { background: GOLD } : {}}
                              >
                                {msg.message}
                              </div>
                            )}

                            {/* Image bubble */}
                            {isImageMsg && (
                              <div
                                className={`rounded-2xl overflow-hidden ${isMe ? "rounded-br-sm" : "rounded-bl-sm shadow-sm"} ${isOptimistic ? "opacity-60" : ""}`}
                                style={isMe ? { outline: `3px solid ${GOLD}`, outlineOffset: 1 } : {}}
                              >
                                <ImageBubble file={msg.file} onPreview={() => openLightbox(msg._id)} />
                              </div>
                            )}

                            {/* File bubble */}
                            {isFileMsg && (
                              <div
                                className={`rounded-2xl overflow-hidden ${isMe ? "rounded-br-sm" : "rounded-bl-sm shadow-sm border border-gray-100"} ${isOptimistic ? "opacity-60" : ""}`}
                                style={isMe ? { background: GOLD } : {}}
                              >
                                <FileBubble file={msg.file} isMe={isMe} />
                              </div>
                            )}

                            {/* Hover: reply action */}
                            {!isOptimistic && (
                              <div className={`absolute top-1/2 -translate-y-1/2 ${isMe ? "-left-16" : "-right-16"} opacity-0 group-hover:opacity-100 transition-opacity flex gap-1`}>
                                <button
                                  onClick={() => { setReplyingTo(msg._id); inputRef.current?.focus(); }}
                                  className="p-1.5 bg-white hover:bg-gray-50 rounded-full shadow-sm border border-gray-100 transition"
                                >
                                  <Reply size={13} className="text-gray-500" />
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Time + status */}
                          <div className="flex items-center gap-1 mt-1 px-1">
                            <span className="text-[10px] text-gray-400">
                              {isOptimistic ? "Sending…" : formatTime(msg.createdAt)}
                            </span>
                            {isMe && !isOptimistic && (
                              msg.isRead
                                ? <CheckCheck size={12} style={{ color: GOLD }} />
                                : <Check size={12} className="text-gray-400" />
                            )}
                            {isMe && isOptimistic && (
                              <div className="w-2.5 h-2.5 rounded-full border border-gray-400 border-t-transparent animate-spin" />
                            )}
                          </div>
                        </div>

                        {/* Admin avatar */}
                        {isMe && (
                          <div className="w-7 h-7 rounded-full flex-shrink-0 mb-5 overflow-hidden bg-gray-200">
                            {adminUser?.image
                              ? <img src={adminUser.image} className="w-full h-full object-cover" alt="" />
                              : <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-600">A</div>
                            }
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Typing indicator — only when user (non-admin) is typing */}
                  {isUserTyping && (
                    <div className="flex items-end gap-2 mt-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        {selectedConversation.user?.image
                          ? <img src={selectedConversation.user.image} className="w-full h-full object-cover" alt="" />
                          : <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500">{selectedConversation.user?.name?.[0] || "U"}</div>
                        }
                      </div>
                      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                        <div className="flex gap-1 items-center">
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                              style={{ animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Scroll to bottom */}
          {showScrollBtn && (
            <div className="absolute bottom-32 right-6 z-20">
              <button onClick={() => scrollToBottom()} className="p-2.5 rounded-full text-white shadow-lg transition hover:scale-105" style={{ background: GOLD }}>
                <ChevronDown size={18} />
              </button>
            </div>
          )}

          {/* ── Input Area ── */}
          <div className="bg-white border-t border-gray-100 px-4 py-3 flex-shrink-0">
            {/* Reply preview */}
            {replyingTo && (
              <div className="mb-2 flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: GOLD_LIGHT }}>
                <CornerDownRight size={14} style={{ color: GOLD_DARK }} className="flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold" style={{ color: GOLD_DARK }}>
                    Replying to{" "}
                    {isAdminMessage(currentMessages.find((m) => m._id === replyingTo)) ? "yourself" : selectedConversation.user?.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {(() => {
                      const m = currentMessages.find((m) => m._id === replyingTo);
                      return m?.file?.url ? `📎 ${m.file?.name || "File"}` : m?.message;
                    })()}
                  </div>
                </div>
                <button onClick={() => setReplyingTo(null)} className="p-1 hover:bg-gray-100 rounded-full">
                  <X size={13} className="text-gray-500" />
                </button>
              </div>
            )}

            {/* Pending files */}
            {pendingFiles.length > 0 && (
              <div className="mb-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500">
                    {pendingFiles.length} file{pendingFiles.length > 1 ? "s" : ""} to send
                  </span>
                  <button onClick={() => setPendingFiles([])} className="text-xs text-red-400 hover:text-red-600 transition">Clear all</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pendingFiles.map((f, i) => (
                    <div key={i} className="relative group/pf">
                      {f.mimeType.startsWith("image/") ? (
                        <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-yellow-300 shadow-sm">
                          <img src={f.url} className="w-full h-full object-cover" alt="" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-xl border-2 border-gray-200 bg-white flex flex-col items-center justify-center gap-1 shadow-sm">
                          {(() => { const { icon: Icon, color } = getFileIcon(f.mimeType); return <Icon size={18} color={color} />; })()}
                          <span className="text-[9px] text-gray-400 truncate w-12 text-center px-1">{f.name.split(".").pop()?.toUpperCase()}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover/pf:bg-black/10 rounded-xl transition" />
                      <button
                        onClick={() => setPendingFiles((prev) => prev.filter((_, j) => j !== i))}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover/pf:opacity-100 transition shadow-sm"
                      >
                        <X size={9} className="text-white" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 text-center">
                        <span className="text-[8px] text-gray-400">{formatFileSize(f.size)}</span>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 hover:border-yellow-400 flex items-center justify-center text-gray-300 hover:text-yellow-400 transition"
                  >
                    <Paperclip size={16} />
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => { if (e.target.files?.length) processFiles(e.target.files); e.target.value = ""; }} />
              <button onClick={() => fileInputRef.current?.click()} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition flex-shrink-0">
                <Paperclip size={18} />
              </button>

              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  value={newMessage}
                  onChange={handleTyping}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder={pendingFiles.length > 0 ? "Add a caption..." : replyingTo ? "Type your reply..." : "Type a message..."}
                  className="w-full bg-gray-100 rounded-2xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-300 transition pr-10"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                  <Smile size={17} />
                </button>
              </div>

              <button
                onClick={canSend ? handleSend : undefined}
                disabled={!canSend}
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 disabled:cursor-not-allowed"
                style={{ background: canSend ? GOLD : "#E5E7EB" }}
              >
                {isSending
                  ? <div className="w-4 h-4 rounded-full border-2 border-white/50 border-t-white animate-spin" />
                  : canSend
                    ? <Send size={16} className="text-white" />
                    : <Mic size={16} className="text-gray-400" />
                }
              </button>
            </div>

            <p className="text-center text-[10px] text-gray-300 mt-2 select-none">
              Drag & drop files anywhere to attach
            </p>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox.open && (
        <Lightbox
          images={lightbox.images}
          currentIndex={lightbox.index}
          onClose={() => setLightbox((l) => ({ ...l, open: false }))}
          onPrev={() => setLightbox((l) => ({ ...l, index: (l.index - 1 + l.images.length) % l.images.length }))}
          onNext={(i) => setLightbox((l) => ({ ...l, index: typeof i === "number" ? i : (l.index + 1) % l.images.length }))}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        ::-webkit-scrollbar { width: 0; }
      `}</style>
    </div>
  );
};

export default Messages;