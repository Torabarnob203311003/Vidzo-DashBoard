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
    <div className="bg-white border-b border-slate-200 px-6 py-5 flex flex-col gap-4 flex-shrink-0 z-10 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            {selectedConversation.user?.image
              ? <img src={selectedConversation.user.image} className="w-14 h-14 rounded-3xl object-cover shadow-sm" alt="" />
              : <div className="w-14 h-14 rounded-3xl bg-slate-200 flex items-center justify-center text-slate-600 font-black text-lg">
                  {selectedConversation.user?.name?.[0]?.toUpperCase() || "U"}
                </div>
            }
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold">Active conversation</p>
            <h2 className="mt-2 text-lg font-bold text-slate-950">{selectedConversation.user?.name || "User"}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-slate-500">
              <span>{isOnline ? "Online now" : "Last seen recently"}</span>
              {statusMeta && (
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">
                  <span className="w-2 h-2 rounded-full" style={{ background: statusMeta.dot }} />
                  {statusMeta.label}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
            <Phone size={18} />
          </button>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
            <Video size={18} />
          </button>
          <div className="relative group">
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
              <MoreVertical size={18} />
            </button>
            <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-3xl shadow-2xl border border-slate-200 py-1 z-20 hidden group-hover:block">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => onUpdateStatus(s)}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-50 capitalize transition flex items-center gap-3 ${
                  liveStatus === s ? "font-semibold text-slate-900" : "text-slate-600"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: STATUS_COLORS[s]?.dot || "#6B7280" }}
                />
                {s.replace("-", " ")}
                {liveStatus === s && <span className="ml-auto text-[11px] text-slate-400">Active</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ChatHeader;