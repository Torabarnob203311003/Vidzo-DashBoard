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
      className={`w-full flex items-center gap-3 px-4 py-3.5 transition-all text-left relative ${
        isSelected ? "bg-yellow-50" : "hover:bg-gray-50"
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
        <div className="flex justify-between items-center">
          <span className={`text-sm font-bold truncate ${isSelected ? "text-yellow-700" : "text-gray-900"}`}>
            {conv.user?.name || "Unknown"}
          </span>
          <span className="text-[10px] text-gray-400 ml-2 flex-shrink-0">
            {formatLastMessageTime(conv.lastMessageAt)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-xs text-gray-400 truncate">{conv.lastMessage || "No messages yet"}</p>
          {totalUnread > 0 && (
            <span
              className="ml-2 w-4 h-4 text-[10px] font-black text-white rounded-full flex items-center justify-center flex-shrink-0"
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
    <div className="w-72 bg-white flex flex-col border-r border-gray-100 shadow-sm flex-shrink-0">
      {/* Header */}
      <div className="px-5 pt-6 pb-3">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-black text-gray-900 tracking-tight">Messages</h1>
          {totalUnread > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: GOLD }}>
              {totalUnread > 99 ? "99+" : totalUnread}
            </span>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Search..."
            className="w-full bg-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-300 transition"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-gray-400">No conversations found</div>
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