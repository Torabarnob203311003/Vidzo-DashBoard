import React, { useEffect, useRef, useState } from "react";
import {  useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";
import MessageBubble from "./MessageBubble";
import {
  selectOptimisticMsgs,
  selectSelectedConversation,
  selectSocketMessages,
  selectTypingForConversation,
} from "@/redux/features/message/messageSlice";
import {
  useGetAllMessagesOfConversationQuery,
  useMakeReadAllMassageMutation,
} from "@/redux/features/message/messageApi";
import { formatDate, getMessageMediaUrl } from "../lib/utils";
import { GOLD } from "../lib/constants";

// ── Typing bubble ─────────────────────────────────────────────
const TypingIndicator = ({ name }) => (
  <div className="flex items-end gap-2 mb-1">
    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold flex-shrink-0">
      {name?.[0]?.toUpperCase() || "U"}
    </div>
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="w-2 h-2 rounded-full bg-gray-400"
          style={{ animation: `bounce 1s ${delay}ms infinite` }}
        />
      ))}
    </div>
  </div>
);

const MessageList = ({ emitMarkRead }) => {
  const selectedConversation = useSelector(selectSelectedConversation);
  const optimisticMsgs       = useSelector(selectOptimisticMsgs);
  const socketMessageMap     = useSelector(selectSocketMessages);
  const typing               = useSelector(
    selectTypingForConversation(selectedConversation?._id)
  );

  const containerRef   = useRef(null);
  const messagesEndRef = useRef(null);
  const messageRefs    = useRef({});
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const { data: messagesData, isLoading } = useGetAllMessagesOfConversationQuery(
    selectedConversation?._id,
    { skip: !selectedConversation?._id }
  );

  const [makeReadAllMessage] = useMakeReadAllMassageMutation();

  // ── Merge API + socket + optimistic, deduplicate by _id ───
  const apiMessages    = messagesData?.data || [];
  const socketMessages = socketMessageMap[selectedConversation?._id] || [];

  const seen = new Set();
  const currentMessages = [...apiMessages, ...socketMessages, ...optimisticMsgs].filter((m) => {
    if (seen.has(m._id)) return false;
    seen.add(m._id);
    return true;
  });

  const chatImages = currentMessages.filter(
    (m) => m?.type === "image" && !!getMessageMediaUrl(m)
  );

  // ── Mark read via REST + socket when conversation opens ───
  useEffect(() => {
    if (!selectedConversation?._id || currentMessages.length === 0) return;
    // REST mark-read (existing API)
    makeReadAllMessage({ conversationId: selectedConversation._id });
    // Socket mark-read → backend updates DB + notifies user
    emitMarkRead?.(selectedConversation._id);
  // Only re-run when conversation changes or new messages arrive
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation?._id, currentMessages.length]);

  // ── Scroll helpers ────────────────────────────────────────
  const scrollToBottom = (smooth = true) =>
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });

  useEffect(() => { scrollToBottom(false); }, [selectedConversation?._id]);
  useEffect(() => { scrollToBottom(); }, [currentMessages.length]);
  // Auto-scroll when typing indicator appears
  useEffect(() => { if (typing) scrollToBottom(); }, [typing]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 100);
  };

  const scrollToMessage = (id) => {
    const el = messageRefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.style.transition = "background 0.3s";
    el.style.background = "#FFF3CD";
    setTimeout(() => { el.style.background = ""; }, 1500);
  };

  return (
    <div className="flex-1 relative overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto px-5 py-4"
        style={{ background: "#FAFAFA" }}
      >
        {isLoading ? (
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
              {currentMessages.map((msg) => (
                <MessageBubble
                  key={msg._id}
                  msg={msg}
                  messageRef={(el) => (messageRefs.current[msg._id] = el)}
                  scrollToMessage={scrollToMessage}
                  chatImages={chatImages}
                />
              ))}

              {/* Typing indicator */}
              {typing && (
                <TypingIndicator name={selectedConversation?.user?.name} />
              )}
            </div>

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Scroll-to-bottom fab */}
      {showScrollBtn && (
        <div className="absolute bottom-4 right-6 z-20">
          <button
            onClick={() => scrollToBottom()}
            className="p-2.5 rounded-full text-white shadow-lg transition hover:scale-105"
            style={{ background: GOLD }}
          >
            <ChevronDown size={18} />
          </button>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default MessageList;