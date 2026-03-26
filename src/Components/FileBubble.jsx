import React from "react";
import { Download } from "lucide-react";
import { formatFileSize, getFileIcon, getMessageMediaUrl, guessFilename } from "../lib/utils";

const FileBubble = ({ msg, isMe }) => {
  const url      = getMessageMediaUrl(msg);
  const mimeType = msg?.file?.mimeType || "";
  const name     = msg?.file?.name || msg?.file?.originalName || guessFilename(url);
  const size     = msg?.file?.size;

  const { icon: Icon, color, bg } = getFileIcon(mimeType);

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-2xl"
      style={{ background: isMe ? "rgba(255,255,255,0.15)" : bg, minWidth: 200, maxWidth: 260 }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: isMe ? "rgba(255,255,255,0.25)" : "#fff",
          border: `1px solid ${isMe ? "rgba(255,255,255,0.3)" : color + "33"}`,
        }}
      >
        <Icon size={20} color={isMe ? "white" : color} />
      </div>

      <div className="flex-1 min-w-0">
        <div className={`text-sm font-semibold truncate ${isMe ? "text-white" : "text-gray-800"}`}>
          {name}
        </div>
        <div className={`text-xs mt-0.5 ${isMe ? "text-white/70" : "text-gray-400"}`}>
          {formatFileSize(size)}
        </div>
      </div>

      {url && (
        <a
          href={url}
          download={name}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-shrink-0 p-1.5 rounded-lg transition hover:scale-110"
          style={{ background: isMe ? "rgba(255,255,255,0.2)" : color + "22" }}
        >
          <Download size={14} color={isMe ? "white" : color} />
        </a>
      )}
    </div>
  );
};

export default FileBubble;
