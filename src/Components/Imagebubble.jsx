import React from "react";
import { Eye } from "lucide-react";
import { getMessageMediaUrl, guessFilename } from "../lib/utils";

const ImageBubble = ({ msg, onPreview }) => {
  const url  = getMessageMediaUrl(msg);
  const name = msg?.file?.name || msg?.file?.originalName || guessFilename(url);

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group/img"
      style={{ maxWidth: 240 }}
      onClick={onPreview}
    >
      <img src={url} alt={name} className="w-full object-cover" style={{ maxHeight: 200 }} />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/25 transition-all flex items-center justify-center">
        <div className="opacity-0 group-hover/img:opacity-100 transition bg-black/50 p-2 rounded-full">
          <Eye size={16} className="text-white" />
        </div>
      </div>

      {/* Filename badge */}
      <div className="absolute bottom-2 left-2 text-[10px] text-white bg-black/40 px-2 py-0.5 rounded-full truncate max-w-[90%]">
        {name}
      </div>
    </div>
  );
};

export default ImageBubble;