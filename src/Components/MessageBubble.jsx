import React from "react";
import { Reply, Check, CheckCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { openLightbox, selectSelectedConversation, setReplyingTo } from "@/redux/features/message/messageSlice";
import FileBubble   from "./FileBubble";
import ImageBubble  from "./ImageBubble";
import { formatTime, getMessageMediaUrl, guessFilename, isAdminMessage } from "../lib/utils";
import { GOLD, GOLD_DARK } from "../lib/constants";

const MessageBubble = ({ msg, messageRef, scrollToMessage, chatImages }) => {
  const dispatch             = useDispatch();
  const selectedConversation = useSelector(selectSelectedConversation);

  const isMe         = isAdminMessage(msg);
  const isOptimistic = !!msg._isOptimistic;
  const replyTarget  = msg.replyTo || null;

  const isImageMsg = msg.type === "image";
  const isFileMsg  = msg.type === "file";
  const isTextMsg  = !isImageMsg && !isFileMsg;

  const handlePreviewImage = () => {
    const idx = chatImages.findIndex((m) => m._id === msg._id);
    dispatch(openLightbox({ images: chatImages, index: Math.max(0, idx) }));
  };

  const handleReply = () => {
    dispatch(setReplyingTo(msg));
  };

  return (
    <div
      ref={messageRef}
      className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-2 group px-1 py-1`}
      style={{ transition: "background 0.3s" }}
    >
      {/* Other-user avatar */}
      {!isMe && (
        <div className="w-8 h-8 rounded-full flex-shrink-0 mb-5 overflow-hidden bg-white border border-gray-200 shadow-sm">
          {msg.sender?.image
            ? <img src={msg.sender.image} className="w-full h-full object-cover" alt="" />
            : <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs font-bold">
                {msg.sender?.name?.[0]?.toUpperCase() || selectedConversation?.user?.name?.[0]?.toUpperCase() || "U"}
              </div>
          }
        </div>
      )}

      <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[82%] sm:max-w-md lg:max-w-lg`}>

        {/* Reply preview */}
        {replyTarget && (
          <button
            onClick={() => scrollToMessage(replyTarget._id)}
            className="mb-2 px-3 py-2 rounded-[1.5rem] border border-slate-200 bg-slate-50 text-left max-w-full hover:bg-slate-100 transition"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              {isAdminMessage(replyTarget) ? "Your reply" : selectedConversation?.user?.name}
            </div>
            <div className="mt-1 text-xs text-slate-600 truncate">
              {replyTarget.type === "image"
                ? "📷 Image"
                : replyTarget.type === "file"
                  ? `📎 ${guessFilename(getMessageMediaUrl(replyTarget))}`
                  : replyTarget.message}
            </div>
          </button>
        )}

        <div className="relative">
          {/* Text bubble */}
          {isTextMsg && msg.message && (
            <div
              className={`px-5 py-3 text-sm leading-relaxed break-words rounded-[28px] shadow-sm ${
                isMe
                  ? "text-white rounded-tr-[28px] rounded-bl-[28px]"
                  : "bg-white text-slate-900 rounded-tl-[28px] rounded-br-[28px] border border-slate-200"
              } ${isOptimistic ? "opacity-75" : ""}`}
              style={isMe ? { background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DARK} 100%)` } : { boxShadow: "0 10px 24px -18px rgba(15,23,42,0.24)" }}
            >
              {msg.message}
            </div>
          )}

          {/* Image bubble */}
          {isImageMsg && getMessageMediaUrl(msg) && (
            <div
              className={`rounded-[26px] overflow-hidden ${
                isMe ? "rounded-tr-[26px] rounded-bl-[26px]" : "rounded-tl-[26px] rounded-br-[26px] shadow-sm"
              } ${isOptimistic ? "opacity-75" : ""}`}
              style={isMe ? { outline: `3px solid ${GOLD}`, outlineOffset: 1 } : { boxShadow: "0 10px 24px -18px rgba(15,23,42,0.20)" }}
            >
              <ImageBubble msg={msg} onPreview={handlePreviewImage} />
            </div>
          )}

          {/* File bubble */}
          {isFileMsg && (
            <div
              className={`rounded-[26px] overflow-hidden ${
                isMe ? "rounded-tr-[26px] rounded-bl-[26px]" : "rounded-tl-[26px] rounded-br-[26px] shadow-sm border border-slate-200"
              } ${isOptimistic ? "opacity-75" : ""}`}
              style={isMe ? { background: GOLD } : { background: "#FBFBFC" }}
            >
              <FileBubble msg={msg} isMe={isMe} />
            </div>
          )}

          {/* Hover reply button */}
          {!isOptimistic && (
            <div
              className={`absolute top-1/2 -translate-y-1/2 ${
                isMe ? "-left-16" : "-right-16"
              } opacity-0 group-hover:opacity-100 transition-opacity flex gap-1`}
            >
              <button
                onClick={handleReply}
                className="p-1.5 bg-white hover:bg-gray-50 rounded-full shadow-sm border border-gray-100 transition"
                aria-label="Reply to message"
              >
                <Reply size={13} className="text-gray-500" />
              </button>
            </div>
          )}
        </div>

        {/* Timestamp + read receipt */}
        <div className="flex items-center gap-2 mt-2 px-1 text-[11px] text-slate-500">
          <span>{isOptimistic ? "Sending…" : formatTime(msg.createdAt)}</span>
          {isMe && !isOptimistic && (
            msg.isRead
              ? <CheckCheck size={14} className="text-amber-500" />
              : <Check size={14} className="text-slate-400" />
          )}
          {isMe && isOptimistic && (
            <div className="w-3 h-3 rounded-full border border-slate-400 border-t-transparent animate-spin" />
          )}
        </div>
      </div>

      {/* Admin avatar */}
      {isMe && (
        <div className="w-8 h-8 rounded-full flex-shrink-0 mb-5 overflow-hidden border border-yellow-200 shadow-sm" style={{ background: "#FFF7D6" }}>
          <div className="w-full h-full flex items-center justify-center text-xs font-black" style={{ color: GOLD_DARK }}>A</div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
