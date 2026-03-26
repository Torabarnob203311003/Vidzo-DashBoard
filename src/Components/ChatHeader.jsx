import React from "react";
import { Phone, Video, MoreVertical } from "lucide-react";
import { useSelector } from "react-redux";
import {
  selectConversationStatus,
  selectIsUserOnline,
  selectSelectedConversation,
} from "@/redux/features/message/messageSlice";

const STATUSES = ["open", "in-progress", "resolved", "closed"];

const STATUS_COLORS = {
  "open":        { dot: "#22C55E", label: "Open" },
  "in-progress": { dot: "#F59E0B", label: "In Progress" },
  "resolved":    { dot: "#3B82F6", label: "Resolved" },
  "closed":      { dot: "#6B7280", label: "Closed" },
};

const ChatHeader = ({ onUpdateStatus }) => {
  const selectedConversation = useSelector(selectSelectedConversation);

  // Live status — socket override takes precedence over the API value
  const socketStatus = useSelector(selectConversationStatus(selectedConversation?._id));
  const liveStatus   = socketStatus || selectedConversation?.status;
  const statusMeta   = STATUS_COLORS[liveStatus] || null;

  // Online presence — driven by support_user_online / support_user_offline
  const isOnline = useSelector(selectIsUserOnline(selectedConversation?.user?._id));

  if (!selectedConversation) return null;

  return (
    <div className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between flex-shrink-0 z-10">
      <div className="flex items-center gap-3">
        {/* Avatar + online dot */}
        <div className="relative">
          {selectedConversation.user?.image
            ? <img src={selectedConversation.user.image} className="w-10 h-10 rounded-full object-cover" alt="" />
            : <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                {selectedConversation.user?.name?.[0]?.toUpperCase() || "U"}
              </div>
          }
          {/* Online indicator dot */}
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
          )}
        </div>

        <div>
          <h2 className="font-bold text-gray-900 text-sm">{selectedConversation.user?.name || "User"}</h2>
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-400">
              {isOnline ? "Online" : "Last seen recently"}
            </p>
            {/* Live status badge */}
            {statusMeta && (
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusMeta.dot }} />
                <span style={{ color: statusMeta.dot }}>{statusMeta.label}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition">
          <Phone size={16} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition">
          <Video size={16} />
        </button>

        {/* Status dropdown — emits support_update_status via parent */}
        <div className="relative group">
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition">
            <MoreVertical size={16} />
          </button>
          <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 hidden group-hover:block">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => onUpdateStatus(s)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 capitalize transition flex items-center gap-2 ${
                  liveStatus === s ? "font-semibold text-gray-900" : "text-gray-600"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: STATUS_COLORS[s]?.dot || "#6B7280" }}
                />
                {s.replace("-", " ")}
                {liveStatus === s && <span className="ml-auto text-[10px] text-gray-400">Current</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;