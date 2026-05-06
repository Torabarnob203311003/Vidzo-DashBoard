import React, { useEffect, useRef, useState } from "react";
import {  useSelector } from "react-redux";
import { ChevronDown, MessageCircle } from "lucide-react";
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
import { formatDate, getMessageMediaUrl, guessFilename } from "../lib/utils";
import { GOLD } from "../lib/constants";

const getMessageFileName = (msg) => {
  const mediaUrl = getMessageMediaUrl(msg);
  return msg?.file?.name || msg?.file?.originalName || guessFilename(mediaUrl || "");
};

const isSameFileMessage = (confirmedMsg, optimisticMsg) => {
  const confirmedName = getMessageFileName(confirmedMsg);
  const optimisticName = getMessageFileName(optimisticMsg);
  const confirmedSize = confirmedMsg?.file?.size;
  const optimisticSize = optimisticMsg?.file?.size;
  const confirmedMime = confirmedMsg?.file?.mimeType;
  const optimisticMime = optimisticMsg?.file?.mimeType;

  if (confirmedName && optimisticName && confirmedName === optimisticName) return true;
  if (confirmedSize && optimisticSize && confirmedSize === optimisticSize) return true;
  if (confirmedMime && optimisticMime && confirmedMime === optimisticMime) return true;

  const confirmedTime = new Date(confirmedMsg?.createdAt || 0).getTime();
  const optimisticTime = new Date(optimisticMsg?.createdAt || 0).getTime();
  return Math.abs(confirmedTime - optimisticTime) < 2 * 60 * 1000;
};

// ── Typing bubble ─────────────────────────────────────────────
const TypingIndicator = ({ name }) => (
  <div className="flex items-end gap-2 mb-2">
    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold flex-shrink-0 shadow-sm">
      {name?.[0]?.toUpperCase() || "U"}
    </div>
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
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

  const {
    currentData: messagesData,
    isFetching,
  } = useGetAllMessagesOfConversationQuery(
    selectedConversation?._id,
    {
      skip: !selectedConversation?._id,
      refetchOnMountOrArgChange: true,
    }
  );

  const [makeReadAllMessage] = useMakeReadAllMassageMutation();

  // ── Merge API + socket + optimistic, deduplicate by _id ───
  const apiMessages    = messagesData?.data || [];
  const socketMessages = socketMessageMap[selectedConversation?._id] || [];
  const confirmedMessages = [...apiMessages, ...socketMessages];
  const isConfirmedOptimistic = (optimisticMsg) =>
    confirmedMessages.some((msg) => {
      if (msg.conversationId !== optimisticMsg.conversationId) return false;
      if (msg.senderRole !== optimisticMsg.senderRole) return false;
      if (msg.type !== optimisticMsg.type) return false;
      if ((msg.message || "") !== (optimisticMsg.message || "")) return false;

      if (["file", "image"].includes(msg.type)) {
        return isSameFileMessage(msg, optimisticMsg);
      }

      return true;
    });

  const optimisticMessages = optimisticMsgs.filter(
    (msg) => msg.conversationId === selectedConversation?._id
      && !isConfirmedOptimistic(msg)
  );

  const seen = new Set();
  const currentMessages = [...confirmedMessages, ...optimisticMessages]
    .filter((m) => {
      if (seen.has(m._id)) return false;
      seen.add(m._id);
      return true;
    })
    .sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));

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
    <div className="flex-1 relative overflow-hidden min-h-0">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto px-4 py-5 sm:px-6 scrollbar-hidden min-h-0"
        style={{
          background:
            "linear-gradient(180deg, #F8FAFC 0%, #F7F7F4 45%, #F9FAFB 100%)",
        }}
      >
        {isFetching && currentMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="flex-1 flex min-h-0 w-full flex-col rounded-[2rem] bg-white/90 shadow-sm ring-1 ring-black/5 p-4">
            {currentMessages.length > 0 && (
              <div className="sticky top-2 z-10 flex justify-center mb-5">
                <span className="text-[11px] text-slate-500 bg-slate-50/95 backdrop-blur px-3 py-1 rounded-full font-semibold border border-slate-200 shadow-sm">
                  {formatDate(currentMessages[0]?.createdAt)}
                </span>
              </div>
            )}

            {currentMessages.length === 0 ? (
              <div className="flex flex-1 items-center justify-center px-4 py-10">
                <div className="text-center rounded-3xl bg-slate-50 border border-slate-200 p-8 shadow-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-white border border-slate-200 shadow-sm">
                    <MessageCircle size={22} className="text-gray-400" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800">No messages yet</h3>
                  <p className="mt-1 text-xs text-gray-400">
                    Start the conversation from the box below.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 pb-3">
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
            )}

            <div ref={messagesEndRef} />
          </div>
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
