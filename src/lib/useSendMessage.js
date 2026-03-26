import { useDispatch, useSelector } from "react-redux";
import {
  addOptimisticMsgs,
  clearOptimisticMsgs,
  clearPendingFiles,
  clearReplyingTo,
  selectIsSending,
  selectPendingFiles,
  selectReplyingTo,
  selectSelectedConversation,
  setIsSending,
  setSocketError,
} from "@/redux/features/message/messageSlice";

// ── Helpers ───────────────────────────────────────────────────

/**
 * Read a File/Blob as a base64 data-URL string.
 * Returns { base64, mimeType, name, size }.
 */
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result); // "data:<mime>;base64,<data>"
    reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
    reader.readAsDataURL(file);
  });

/**
 * Determine the message type from a list of pending files.
 * If every file is an image → "image", otherwise → "file".
 */
const resolveType = (files, fallback = "text") => {
  if (!files?.length) return fallback;
  return files.every((f) => f.mimeType?.startsWith("image/")) ? "image" : "file";
};

// ── Hook ──────────────────────────────────────────────────────

/**
 * Send a message entirely via Socket.IO — no REST API call.
 *
 * Flow:
 *   1. Show optimistic message(s) in UI immediately.
 *   2. Convert any pending files to base64.
 *   3. Emit  support_send_message  with the full payload.
 *      The backend saves to DB, then broadcasts  support_new_message
 *      back to all room members (including this admin tab).
 *   4. On the  support_new_message  echo the optimistic messages are
 *      replaced by the real server-saved messages.
 *   5. On  support_error  the optimistic messages stay visible so the
 *      admin can see the failure.
 *
 * Socket payload shape (matches backend support_send_message handler):
 * {
 *   conversationId : string
 *   senderId       : string
 *   senderRole     : "admin"
 *   message        : string          (caption or text body)
 *   type           : "text" | "image" | "file"
 *   mediaUrl       : string | null   (base64 data-URL for files/images)
 *   replyToId      : string | null
 *   // For multi-file sends we emit one event per file
 *   file           : { name, mimeType, size } | null
 * }
 */
export const useSendMessage = () => {
  const dispatch             = useDispatch();
  const isSending            = useSelector(selectIsSending);
  const pendingFiles         = useSelector(selectPendingFiles);
  const replyingTo           = useSelector(selectReplyingTo);
  const selectedConversation = useSelector(selectSelectedConversation);

  const handleSend = async ({
    newMessage,
    setNewMessage,
    pendingFilesWithRaw,   // array from InputArea that includes rawFile blobs
    socketRef,
    adminUser,
    emitMarkRead,
    refetchMessages,
    refetchConversations,
  }) => {
    if (!selectedConversation?._id) return;
    if (!newMessage.trim() && !pendingFilesWithRaw?.length && pendingFiles.length === 0) return;
    if (isSending) return;

    const socket = socketRef?.current;
    if (!socket?.connected) {
      dispatch(setSocketError({ message: "Socket not connected. Please refresh.", error: "disconnected" }));
      return;
    }

    dispatch(setIsSending(true));

    const conversationId = selectedConversation._id;
    const senderId       = adminUser?.id;
    const now            = new Date().toISOString();

    // Use the files array that includes rawFile blobs (kept outside Redux)
    const files = pendingFilesWithRaw?.length ? pendingFilesWithRaw : [];

    try {
      // ── 1. Optimistic messages ──────────────────────────
      if (files.length > 0) {
        const optimistic = files.map((f) => ({
          _id        : `optimistic-${Date.now()}-${Math.random()}`,
          _isOptimistic: true,
          conversationId,
          senderRole : "admin",
          message    : newMessage.trim() || (f.mimeType.startsWith("image/") ? "Sent an image" : "Sent a file"),
          replyTo    : replyingTo || null,
          type       : f.mimeType.startsWith("image/") ? "image" : "file",
          mediaUrl   : f.url || null,   // object URL — only valid this session
          file       : { name: f.name, mimeType: f.mimeType, size: f.size },
          createdAt  : now,
          isRead     : true,
        }));
        dispatch(addOptimisticMsgs(optimistic));
      } else {
        dispatch(addOptimisticMsgs([{
          _id        : `optimistic-${Date.now()}`,
          _isOptimistic: true,
          conversationId,
          senderRole : "admin",
          message    : newMessage.trim(),
          replyTo    : replyingTo || null,
          type       : "text",
          mediaUrl   : null,
          createdAt  : now,
          isRead     : true,
        }]));
      }

      // ── 2. Emit via socket ──────────────────────────────
      if (files.length > 0) {
        // ── File / image messages ──
        // Emit one  support_send_message  per file (mirrors how REST API
        // handled multi-file: each file becomes its own message record).
        // Caption text is only attached to the first file.
        for (let i = 0; i < files.length; i++) {
          const f          = files[i];
          const isImage    = f.mimeType.startsWith("image/");
          const type       = isImage ? "image" : "file";
          const caption    = i === 0 ? newMessage.trim() : "";

          // Convert Blob → base64 data-URL so the backend can upload to S3/storage
          let mediaUrl = null;
          if (f.rawFile) {
            mediaUrl = await fileToBase64(f.rawFile);
          }

          socket.emit("support_send_message", {
            conversationId,
            senderId,
            senderRole : "admin",
            message    : caption || (isImage ? "Sent an image" : "Sent a file"),
            type,
            mediaUrl,                          // base64 data-URL
            replyToId  : i === 0 ? (replyingTo?._id || null) : null,
            // Extra metadata so backend can reconstruct the filename/mime
            file: {
              name     : f.name,
              mimeType : f.mimeType,
              size     : f.size,
            },
          });
        }
      } else {
        // ── Plain text message ──
        socket.emit("support_send_message", {
          conversationId,
          senderId,
          senderRole : "admin",
          message    : newMessage.trim(),
          type       : "text",
          mediaUrl   : null,
          replyToId  : replyingTo?._id || null,
        });
      }

      // ── 3. Mark all user messages as read ──────────────
      // Backend: support_mark_read → DB update + notifies user
      emitMarkRead?.(conversationId);

      // ── 4. Reset compose state ──────────────────────────
      setNewMessage?.("");
      dispatch(clearReplyingTo());
      dispatch(clearPendingFiles());

      // The optimistic messages will be replaced when the server echoes
      // back  support_new_message  (handled in useAdminSocket → addSocketMessage).
      // We clear them here so there's no duplicate once the echo arrives.
      dispatch(clearOptimisticMsgs());

      // Refresh sidebar last-message preview + unread counts
      refetchConversations?.();

    } catch (err) {
      console.error("[send] error:", err);
      dispatch(setSocketError({ message: "Failed to send message.", error: err.message }));
      // Optimistic messages intentionally left in place so admin sees failure
    } finally {
      dispatch(setIsSending(false));
    }
  };

  return { handleSend };
};