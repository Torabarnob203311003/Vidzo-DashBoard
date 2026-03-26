import React from "react";
import { Paperclip } from "lucide-react";
import { GOLD, GOLD_DARK } from "../lib/constants";

const DropOverlay = ({ active }) => (
  <div
    className={`absolute inset-0 z-30 flex items-center justify-center transition-all pointer-events-none rounded-lg ${
      active ? "opacity-100" : "opacity-0"
    }`}
    style={{
      background: "rgba(255,193,45,0.1)",
      backdropFilter: "blur(2px)",
      border: "2px dashed #FFC12D",
    }}
  >
    <div className="text-center">
      <Paperclip size={36} style={{ color: GOLD }} className="mx-auto mb-2" />
      <div className="text-base font-bold" style={{ color: GOLD_DARK }}>Drop files to send</div>
      <div className="text-xs text-gray-500 mt-1">Images, documents, videos & more</div>
    </div>
  </div>
);

export default DropOverlay;
