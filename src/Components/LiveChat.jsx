import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const LiveChat = ({ streamId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("accessToken"); // adjust if needed
  const adminId = localStorage.getItem("userId"); // adjust

  // 🔽 Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ─────────────────────────────────────────────
  // 🟡 Load chat history (REST)
  // ─────────────────────────────────────────────
  const loadHistory = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/stream/${streamId}/chat?page=1&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setMessages(data.data);
        setTimeout(scrollToBottom, 100);
      }
    } catch (err) {
      console.error("Chat history error:", err);
    }
  };

  // ─────────────────────────────────────────────
  // 🔵 Socket setup
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!streamId) return;

    // connect socket
    const socket = io(import.meta.env.VITE_API_URL, {
      auth: { token },
    });

    socketRef.current = socket;

    // join stream
    socket.emit("stream:join", {
      streamId,
      userId: adminId,
    });

    // listen new messages
    socket.on("stream:message", (message) => {
      setMessages((prev) => [...prev, message]);
      setTimeout(scrollToBottom, 50);
    });

    // optional events
    socket.on("stream:ended", () => {
      console.log("Stream ended");
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });

    loadHistory();

    return () => {
      socket.emit("stream:leave", {
        streamId,
        userId: adminId,
      });
      socket.disconnect();
    };
  }, [streamId]);

  // ─────────────────────────────────────────────
  // 🟢 Send message (if needed later)
  // ─────────────────────────────────────────────
  const handleSend = () => {
    if (!input.trim()) return;

    // NOTE: backend didn’t define send event clearly
    socketRef.current.emit("stream:send-message", {
      streamId,
      content: input,
      type: "text",
    });

    setInput("");
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full">

      {/* Header */}
      <div className="px-4 py-3 border-b font-bold text-sm">
        Live Chat
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg._id} className="flex gap-2">
            <img
              src={msg.sender?.image || "https://i.pravatar.cc/40"}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="text-xs font-semibold">
                {msg.sender?.name}
                <span className="ml-2 text-gray-400 text-[10px]">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <div className="text-sm text-gray-700">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
          className="flex-1 border rounded-xl px-3 py-2 text-sm"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-[#FFC12D] text-white rounded-xl text-sm font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveChat;