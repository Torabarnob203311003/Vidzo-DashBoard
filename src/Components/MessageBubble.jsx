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
      className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-2 group`}
      style={{ marginBottom: 2, borderRadius: 8, transition: "background 0.3s" }}
    >
      {/* Other-user avatar */}
      {!isMe && (
        <div className="w-7 h-7 rounded-full flex-shrink-0 mb-5 overflow-hidden bg-gray-200">
          {msg.sender?.image
            ? <img src={msg.sender.image} className="w-full h-full object-cover" alt="" />
            : <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs font-bold">
                {msg.sender?.name?.[0]?.toUpperCase() || selectedConversation?.user?.name?.[0]?.toUpperCase() || "U"}
              </div>
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
              {isAdminMessage(replyTarget) ? "You" : selectedConversation?.user?.name}
            </div>
            <div className="text-xs text-gray-600 truncate">
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
              className={`px-4 py-2.5 text-sm leading-relaxed break-words rounded-2xl ${
                isMe
                  ? "text-white rounded-br-sm"
                  : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
              } ${isOptimistic ? "opacity-60" : ""}`}
              style={isMe ? { background: GOLD } : {}}
            >
              {msg.message}
            </div>
          )}

          {/* Image bubble */}
          {isImageMsg && getMessageMediaUrl(msg) && (
            <div
              className={`rounded-2xl overflow-hidden ${
                isMe ? "rounded-br-sm" : "rounded-bl-sm shadow-sm"
              } ${isOptimistic ? "opacity-60" : ""}`}
              style={isMe ? { outline: `3px solid ${GOLD}`, outlineOffset: 1 } : {}}
            >
              <ImageBubble msg={msg} onPreview={handlePreviewImage} />
            </div>
          )}

          {/* File bubble */}
          {isFileMsg && (
            <div
              className={`rounded-2xl overflow-hidden ${
                isMe ? "rounded-br-sm" : "rounded-bl-sm shadow-sm border border-gray-100"
              } ${isOptimistic ? "opacity-60" : ""}`}
              style={isMe ? { background: GOLD } : {}}
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
              >
                <Reply size={13} className="text-gray-500" />
              </button>
            </div>
          )}
        </div>

        {/* Timestamp + read receipt */}
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
          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-600">A</div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
