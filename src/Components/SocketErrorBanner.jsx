import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertCircle, X } from "lucide-react";
import { clearSocketError, selectSocketError } from "@/redux/features/message/messageSlice";

/**
 * Displays a dismissible error banner at the top of the chat area
 * whenever a support_error event is received from the backend socket.
 */
const SocketErrorBanner = () => {
  const dispatch     = useDispatch();
  const socketError  = useSelector(selectSocketError);

  if (!socketError) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border-b border-red-100 text-sm text-red-700 flex-shrink-0">
      <AlertCircle size={14} className="flex-shrink-0 text-red-500" />
      <span className="flex-1 truncate">
        <span className="font-semibold">Error: </span>
        {socketError.message || "Something went wrong"}
        {socketError.error && (
          <span className="ml-1 text-red-400 text-xs">({socketError.error})</span>
        )}
      </span>
      <button onClick={() => dispatch(clearSocketError())} className="p-1 hover:bg-red-100 rounded-full transition flex-shrink-0">
        <X size={12} className="text-red-400" />
      </button>
    </div>
  );
};

export default SocketErrorBanner;