import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CornerDownRight, Mic, Paperclip, Send, Smile, X } from "lucide-react";
import {
  addPendingFiles,
  clearPendingFiles,
  clearReplyingTo,
  removePendingFile,
  selectIsSending,
  selectPendingFiles,
  selectReplyingTo,
  selectSelectedConversation,
} from "@/redux/features/message/messageSlice";
import {
  formatFileSize,
  getFileIcon,
  getMessageMediaUrl,
  guessFilename,
  isAdminMessage,
  processRawFiles,
} from "../lib/utils";
import { GOLD, GOLD_DARK, GOLD_LIGHT } from "../lib/constants";

/**
 * Props:
 *   onSend(args)          — triggers useSendMessage.handleSend
 *   emitTyping(cid, uid)  — socket emitter from useAdminSocket
 *   emitStopTyping(cid, uid) — socket emitter from useAdminSocket
 *   adminUserId           — to pass as senderId to typing events
 */
const InputArea = ({ onSend, emitTyping, emitStopTyping, adminUserId }) => {
  const dispatch             = useDispatch();
  const replyingTo           = useSelector(selectReplyingTo);
  const pendingFiles         = useSelector(selectPendingFiles);
  const isSending            = useSelector(selectIsSending);
  const selectedConversation = useSelector(selectSelectedConversation);

  const [newMessage, setNewMessage] = useState("");
  const inputRef     = useRef(null);
  const fileInputRef = useRef(null);
  // Track rawFiles locally (Blobs must not go into Redux)
  const rawFilesRef  = useRef([]);
  const typingTimerRef = useRef(null);
  const isTypingRef    = useRef(false);

  const canSend = (!!newMessage.trim() || pendingFiles.length > 0) && !isSending;

  // ── Typing indicators ─────────────────────────────────────
  const handleStartTyping = () => {
    const cid = selectedConversation?._id;
    if (!cid) return;
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      emitTyping?.(cid, adminUserId);
    }
    // Reset debounce timer
    clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      isTypingRef.current = false;
      emitStopTyping?.(cid, adminUserId);
    }, 2000);
  };

  const handleStopTyping = () => {
    const cid = selectedConversation?._id;
    clearTimeout(typingTimerRef.current);
    if (isTypingRef.current) {
      isTypingRef.current = false;
      emitStopTyping?.(cid, adminUserId);
    }
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
    if (e.target.value) handleStartTyping();
    else handleStopTyping();
  };

  // ── File handling ─────────────────────────────────────────
  const handleFileChange = (e) => {
    if (!e.target.files?.length) return;
    const processed = processRawFiles(e.target.files);
    // Keep rawFile references in a ref (not Redux)
    processed.forEach((f) => { rawFilesRef.current.push(f.rawFile); });
    dispatch(addPendingFiles(processed.map(({ rawFile, ...rest }) => (void rawFile, rest))));
    e.target.value = "";
  };

  // ── Send ──────────────────────────────────────────────────
  const handleSend = () => {
    if (!canSend) return;
    handleStopTyping();

    // Re-attach rawFiles to pendingFiles before sending
    const filesWithRaw = pendingFiles.map((f, i) => ({
      ...f,
      rawFile: rawFilesRef.current[i] || null,
    }));

    onSend({ newMessage, setNewMessage, pendingFilesWithRaw: filesWithRaw });

    // Clear raw file refs after send
    rawFilesRef.current = [];
  };

  return (
    <div className="bg-white border-t border-gray-100 px-4 py-3 flex-shrink-0">

      {/* Reply banner */}
      {replyingTo && (
        <div className="mb-2 flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: GOLD_LIGHT }}>
          <CornerDownRight size={14} style={{ color: GOLD_DARK }} className="flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold" style={{ color: GOLD_DARK }}>
              Replying to{" "}
              {isAdminMessage(replyingTo) ? "yourself" : selectedConversation?.user?.name}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {replyingTo.type === "image"
                ? "📷 Image"
                : replyingTo.type === "file"
                  ? `📎 ${guessFilename(getMessageMediaUrl(replyingTo))}`
                  : replyingTo.message}
            </div>
          </div>
          <button onClick={() => dispatch(clearReplyingTo())} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={13} className="text-gray-500" />
          </button>
        </div>
      )}

      {/* Pending files preview */}
      {pendingFiles.length > 0 && (
        <div className="mb-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500">
              {pendingFiles.length} file{pendingFiles.length > 1 ? "s" : ""} to send
            </span>
            <button
              onClick={() => { dispatch(clearPendingFiles()); rawFilesRef.current = []; }}
              className="text-xs text-red-400 hover:text-red-600 transition"
            >
              Clear all
            </button>
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
                    <span className="text-[9px] text-gray-400 truncate w-12 text-center px-1">
                      {f.name.split(".").pop()?.toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover/pf:bg-black/10 rounded-xl transition" />
                <button
                  onClick={() => {
                    dispatch(removePendingFile(i));
                    rawFilesRef.current = rawFilesRef.current.filter((_, j) => j !== i);
                  }}
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

      {/* Input row */}
      <div className="flex items-center gap-2">
        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition flex-shrink-0"
        >
          <Paperclip size={18} />
        </button>

        <div className="flex-1 relative">
          <input
            ref={inputRef}
            value={newMessage}
            onChange={handleChange}
            onBlur={handleStopTyping}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={
              pendingFiles.length > 0 ? "Add a caption…" : replyingTo ? "Type your reply…" : "Type a message…"
            }
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
  );
};

export default InputArea;
