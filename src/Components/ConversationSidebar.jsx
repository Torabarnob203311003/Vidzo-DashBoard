import React from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsUserOnline,
  selectSearch,
  selectSelectedConversation,
  selectSocketMessages,
  setSearch,
  setSelectedConversation,
} from "@/redux/features/message/messageSlice";
import { formatLastMessageTime } from "../lib/utils";
import { GOLD } from "../lib/constants";

// ── Per-conversation list item ────────────────────────────────
const ConversationItem = ({ conv, isSelected }) => {
  const dispatch = useDispatch();

  // Live online presence for this conversation's user
  const isOnline = useSelector(selectIsUserOnline(conv.user?._id));

  // Count unread socket messages for this conversation
  const socketMsgMap = useSelector(selectSocketMessages);
  const socketUnread = (socketMsgMap[conv._id] || []).filter(
    (m) => m.senderRole !== "admin" && !m.isRead
  ).length;

  const totalUnread = (conv.unreadCountAdmin || 0) + socketUnread;

  return (
    <button
      onClick={() => dispatch(setSelectedConversation(conv))}
      className={`w-full flex items-center gap-3 px-4 py-4 transition-all text-left relative rounded-[1.5rem] border bg-white ${
        isSelected ? "border-amber-300 bg-amber-50 shadow-[0_8px_30px_-18px_rgba(251,191,36,0.9)]" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      {/* Active indicator bar */}
      {isSelected && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
          style={{ background: GOLD }}
        />
      )}

      {/* Avatar + online dot */}
      <div className="relative flex-shrink-0">
        {conv.user?.image
          ? <img src={conv.user.image} className="w-11 h-11 rounded-full object-cover" alt="" />
          : <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">
              {conv.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
        }
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center gap-3">
          <span className={`text-sm font-semibold truncate ${isSelected ? "text-slate-950" : "text-slate-900"}`}>
            {conv.user?.name || "Unknown"}
          </span>
          <span className="text-[10px] text-slate-400 flex-shrink-0">
            {formatLastMessageTime(conv.lastMessageAt)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 mt-1">
          <p className="text-xs text-slate-500 truncate">{conv.lastMessage || "No messages yet"}</p>
          {totalUnread > 0 && (
            <span
              className="ml-2 w-5 h-5 text-[10px] font-black text-white rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: GOLD }}
            >
              {totalUnread > 9 ? "9+" : totalUnread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

// ── Sidebar ───────────────────────────────────────────────────
const ConversationSidebar = ({ conversations }) => {
  const dispatch             = useDispatch();
  const search               = useSelector(selectSearch);
  const selectedConversation = useSelector(selectSelectedConversation);
  const socketMsgMap         = useSelector(selectSocketMessages);

  const filtered = conversations.filter((c) =>
    c.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Total unread = API + socket
  const totalUnread = conversations.reduce((acc, c) => {
    const apiUnread    = c.unreadCountAdmin || 0;
    const socketUnread = (socketMsgMap[c._id] || []).filter(
      (m) => m.senderRole !== "admin" && !m.isRead
    ).length;
    return acc + apiUnread + socketUnread;
  }, 0);

  return (
    <div className="w-full h-full flex flex-col min-h-0 bg-white">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-200">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">Support inbox</p>
            <h1 className="mt-2 text-2xl font-black text-slate-950 leading-tight">Conversations</h1>
          </div>
          {totalUnread > 0 && (
            <span className="mt-1 inline-flex items-center justify-center rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              {totalUnread > 99 ? "99+" : totalUnread}
            </span>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Search by name or email"
            className="w-full border border-slate-200 bg-slate-50 rounded-3xl pl-12 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-hidden min-h-0">
        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-slate-400">No conversations found</div>
        ) : (
          filtered.map((conv) => (
            <ConversationItem
              key={conv._id}
              conv={conv}
              isSelected={conv._id === selectedConversation?._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationSidebar;