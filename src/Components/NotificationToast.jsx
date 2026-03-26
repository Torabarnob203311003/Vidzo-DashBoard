import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Bell } from "lucide-react";
import {
  dismissNotification,
  selectNotifications,
  setSelectedConversation,
} from "@/redux/features/message/messageSlice";
import { GOLD } from "../lib/constants";

/**
 * Renders a toast stack for incoming support_notification events.
 * Toasts auto-dismiss after 5 s. Clicking one navigates to the conversation.
 *
 * Props:
 *   conversations: Array — full conversation list (to look up the object by ID)
 */
const NotificationToast = ({ conversations = [] }) => {
  const dispatch      = useDispatch();
  const notifications = useSelector(selectNotifications);

  // Auto-dismiss after 5 s
  useEffect(() => {
    if (!notifications.length) return;
    const timer = setTimeout(() => {
      dispatch(dismissNotification(notifications[notifications.length - 1].id));
    }, 5000);
    return () => clearTimeout(timer);
  }, [notifications, dispatch]);

  if (!notifications.length) return null;

  // Show at most 3 stacked toasts
  const visible = notifications.slice(0, 3);

  const handleClick = (note) => {
    const conv = conversations.find((c) => c._id === note.conversationId);
    if (conv) dispatch(setSelectedConversation(conv));
    dispatch(dismissNotification(note.id));
  };

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {visible.map((note) => (
        <div
          key={note.id}
          className="pointer-events-auto flex items-start gap-3 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 w-72 animate-slide-in"
          style={{ borderLeft: `3px solid ${GOLD}` }}
        >
          {/* Icon */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: `${GOLD}22` }}
          >
            <Bell size={14} style={{ color: GOLD }} />
          </div>

          {/* Text */}
          <button
            className="flex-1 text-left"
            onClick={() => handleClick(note)}
          >
            <div className="text-xs font-bold text-gray-800 mb-0.5">
              {note.type === "admin_reply" ? "Admin replied" : "New message"}
            </div>
            <div className="text-xs text-gray-500 truncate">{note.message}</div>
          </button>

          {/* Dismiss */}
          <button
            onClick={() => dispatch(dismissNotification(note.id))}
            className="p-1 hover:bg-gray-100 rounded-full flex-shrink-0"
          >
            <X size={12} className="text-gray-400" />
          </button>
        </div>
      ))}

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(110%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.25s ease-out; }
      `}</style>
    </div>
  );
};

export default NotificationToast;