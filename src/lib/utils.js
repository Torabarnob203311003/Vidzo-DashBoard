import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import { ImageIcon, Film, Music, FileText, Archive, File } from "lucide-react";

// ─── Date / Time Formatters ──────────────────────────────────
export const formatTime = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

export const formatLastMessageTime = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === today.toDateString())
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

// ─── File Helpers ─────────────────────────────────────────────
export const formatFileSize = (bytes) => {
  if (!bytes) return "—";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

export const getFileIcon = (type = "") => {
  if (type.startsWith("image/")) return { icon: ImageIcon, color: "#3B82F6", bg: "#EFF6FF" };
  if (type.startsWith("video/")) return { icon: Film,      color: "#8B5CF6", bg: "#F5F3FF" };
  if (type.startsWith("audio/")) return { icon: Music,     color: "#EC4899", bg: "#FDF2F8" };
  if (type.includes("pdf"))       return { icon: FileText,  color: "#EF4444", bg: "#FEF2F2" };
  if (type.includes("zip") || type.includes("rar") || type.includes("tar"))
    return { icon: Archive, color: "#F59E0B", bg: "#FFFBEB" };
  return { icon: File, color: "#6B7280", bg: "#F3F4F6" };
};

export const getMessageMediaUrl = (msg) => msg?.mediaUrl || msg?.file?.url || null;

export const guessFilename = (url = "") => {
  try {
    const parts = new URL(url).pathname.split("/");
    const raw = parts[parts.length - 1] || "file";
    return raw.replace(/^[a-f0-9-]+-\d+-/, "") || raw;
  } catch {
    return url.split("/").pop() || "file";
  }
};

export const guessMimeFromUrl = (url = "") => {
  const ext = url.split(".").pop()?.toLowerCase();
  const map = {
    png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg",
    gif: "image/gif", webp: "image/webp", svg: "image/svg+xml",
    pdf: "application/pdf", zip: "application/zip",
    mp4: "video/mp4", mp3: "audio/mpeg", mov: "video/quicktime",
  };
  return map[ext] || "application/octet-stream";
};

export const isAdminMessage = (msg) => msg?.senderRole === "admin";

export const processRawFiles = (files) =>
  Array.from(files).map((file) => ({
    name: file.name,
    size: file.size,
    mimeType: file.type || "application/octet-stream",
    url: file.type?.startsWith("image/") ? URL.createObjectURL(file) : null,
    rawFile: file,
  }));

