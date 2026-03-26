import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeft, ChevronRight, Download, RotateCw, X, ZoomIn, ZoomOut,
} from "lucide-react";
import { closeLightbox, selectLightbox, setLightboxIndex } from "@/redux/features/message/messageSlice";
import { getMessageMediaUrl, guessFilename } from "../lib/utils";
import { GOLD } from "../lib/constants";

const Lightbox = () => {
  const dispatch = useDispatch();
  const { open, images, index } = useSelector(selectLightbox);
  const [zoom, setZoom]         = useState(1);
  const [rotation, setRotation] = useState(0);

  const total = images.length;

  const goPrev = () => dispatch(setLightboxIndex((index - 1 + total) % total));
  const goNext = () => dispatch(setLightboxIndex((index + 1) % total));
  const goTo   = (i) => dispatch(setLightboxIndex(i));

  // Reset zoom/rotation when image changes
  useEffect(() => { setZoom(1); setRotation(0); }, [index]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape")      dispatch(closeLightbox());
      if (e.key === "ArrowLeft")   goPrev();
      if (e.key === "ArrowRight")  goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, total]);

  if (!open || !images.length) return null;

  const img = images[index];
  const url = getMessageMediaUrl(img);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95" onClick={() => dispatch(closeLightbox())}>

      {/* Top toolbar */}
      <div
        className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-white/70 text-sm font-medium">
          {guessFilename(url)}
          <span className="text-white/40 ml-2">{index + 1} / {total}</span>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
            <ZoomOut size={15} />
          </button>
          <span className="text-white/60 text-xs w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((z) => Math.min(4, z + 0.25))} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
            <ZoomIn size={15} />
          </button>
          <button onClick={() => setRotation((r) => r + 90)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
            <RotateCw size={15} />
          </button>
          {url && (
            <a href={url} download onClick={(e) => e.stopPropagation()} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
              <Download size={15} />
            </a>
          )}
          <button onClick={() => dispatch(closeLightbox())} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition ml-2">
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Image viewer */}
      <div className="flex-1 flex items-center justify-center overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
        {total > 1 && (
          <>
            <button onClick={goPrev} className="absolute left-4 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition z-10">
              <ChevronLeft size={20} />
            </button>
            <button onClick={goNext} className="absolute right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition z-10">
              <ChevronRight size={20} />
            </button>
          </>
        )}
        <img
          src={url}
          alt=""
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            transition: "transform 0.2s",
            maxHeight: "70vh",
            maxWidth: "80vw",
            objectFit: "contain",
            borderRadius: 8,
          }}
        />
      </div>

      {/* Filmstrip thumbnails */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-2 py-4 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          {images.map((im, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition ${
                i === index ? "scale-110" : "opacity-40 hover:opacity-70"
              }`}
              style={{ borderColor: i === index ? GOLD : "transparent" }}
            >
              <img src={getMessageMediaUrl(im)} className="w-full h-full object-cover" alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lightbox;
