"use client";

import { useState, useRef, useCallback } from "react";
import {
  uploadToCloudinary,
  fileToMessageType,
} from "@/hooks/rooms/cloudinary";
import { useVoiceRecorder } from "@/hooks/rooms/useVoiceRecorder";

interface Props {
  onSend: (content: string, type: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO") => void;
  disabled?: boolean;
}

interface PendingMedia {
  file: File | Blob;
  type: "IMAGE" | "VIDEO" | "AUDIO";
  preview: string; // object URL for preview
  label: string; // "photo.jpg" etc
}

export default function MessageInput({ onSend, disabled }: Props) {
  const [text, setText] = useState("");
  const [pendingMedia, setPendingMedia] = useState<PendingMedia | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showAttach, setShowAttach] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { recording, formattedDuration, start, stop, cancel } =
    useVoiceRecorder();

  // File selected — just preview it, don't upload yet
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setShowAttach(false);
    const type = fileToMessageType(file);
    setPendingMedia({
      file,
      type,
      preview: URL.createObjectURL(file),
      label: file.name,
    });
    if (fileRef.current) fileRef.current.value = "";
  };

  // Voice recorded — preview as pending media
  const handleVoiceEnd = useCallback(async () => {
    const blob = await stop();
    if (!blob) return;
    setPendingMedia({
      file: blob,
      type: "AUDIO",
      preview: URL.createObjectURL(blob),
      label: `Voice note · ${formattedDuration}`,
    });
  }, [stop, formattedDuration]);

  // Send — upload media now (only on explicit send), then callback
  const handleSend = useCallback(async () => {
    if (disabled || uploading) return;

    if (pendingMedia) {
      setUploading(true);
      setUploadProgress(0);
      try {
        const result = await uploadToCloudinary(
          pendingMedia.file,
          pendingMedia.type,
          setUploadProgress,
        );
        onSend(result.secure_url, pendingMedia.type);
        setPendingMedia(null);
      } catch (err) {
        console.error("Upload failed", err);
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
      return;
    }

    const t = text.trim();
    if (!t) return;
    onSend(t, "TEXT");
    setText("");
  }, [disabled, uploading, pendingMedia, text, onSend]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = !disabled && !uploading && (!!pendingMedia || !!text.trim());

  return (
    <div className="px-4 py-3 bg-[#F5F0E8]/95 backdrop-blur-sm border-t border-[#D4C5B0]/40">
      {/* Upload progress */}
      {uploading && (
        <div className="mb-3 px-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-dm text-[11px] text-[#6b7d6c]">
              Uploading…
            </span>
            <span className="font-dm text-[11px] font-medium text-[#2E3B2F]">
              {uploadProgress}%
            </span>
          </div>
          <div className="h-1 bg-[#D4C5B0]/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2E3B2F] rounded-full transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Voice recording indicator */}
      {recording && (
        <div className="flex items-center gap-3 mb-3 px-4 py-2.5 bg-white rounded-2xl border border-[#D4C5B0]/40">
          <div className="w-2 h-2 rounded-full bg-[#C4785A] animate-pulse" />
          <span className="font-dm text-[13px] text-[#3d4d3e] flex-1">
            Recording {formattedDuration}
          </span>
          <button
            onClick={cancel}
            className="font-dm text-[11px] text-[#8a9a8b] hover:text-[#C4785A] transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Pending media preview */}
      {pendingMedia && !uploading && (
        <div className="flex items-center gap-3 mb-3 px-4 py-2.5 bg-white rounded-2xl border border-[#D4C5B0]/40">
          {/* Thumbnail */}
          {pendingMedia.type === "IMAGE" && (
            <img
              src={pendingMedia.preview}
              alt="preview"
              className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
            />
          )}
          {pendingMedia.type === "VIDEO" && (
            <div className="w-10 h-10 rounded-xl bg-[#E8DDD0] flex items-center justify-center flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="w-5 h-5 text-[#6b7d6c]"
              >
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>
          )}
          {pendingMedia.type === "AUDIO" && (
            <div className="w-10 h-10 rounded-xl bg-[#E8DDD0] flex items-center justify-center flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="w-5 h-5 text-[#6b7d6c]"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
              </svg>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="font-dm text-[12px] text-[#3d4d3e] truncate">
              {pendingMedia.label}
            </p>
            <p className="font-dm text-[10px] text-[#8a9a8b] mt-0.5">
              Ready to send · tap send to upload
            </p>
          </div>

          <button
            onClick={() => setPendingMedia(null)}
            className="w-6 h-6 rounded-full bg-[#E8DDD0] hover:bg-[#D4C5B0] flex items-center justify-center transition-colors flex-shrink-0"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3 h-3 text-[#6b7d6c]"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Attach options popup */}
      {showAttach && (
        <div className="flex items-center gap-2 mb-3">
          {[
            {
              label: "Photo",
              accept: "image/*",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="w-4 h-4"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              ),
            },
            {
              label: "Video",
              accept: "video/*",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="w-4 h-4"
                >
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              ),
            },
          ].map(({ label, accept, icon }) => (
            <button
              key={label}
              onClick={() => {
                if (fileRef.current) {
                  fileRef.current.accept = accept;
                  fileRef.current.click();
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D4C5B0]/60 rounded-full font-dm text-[12px] text-[#3d4d3e] hover:bg-[#2E3B2F] hover:text-white hover:border-[#2E3B2F] transition-all duration-200"
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="flex items-end gap-2.5">
        {/* Attach button */}
        {!pendingMedia && !recording && (
          <button
            onClick={() => setShowAttach(!showAttach)}
            disabled={disabled || uploading}
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-40
              ${showAttach ? "bg-[#2E3B2F] text-white" : "bg-white border border-[#D4C5B0]/60 text-[#6b7d6c] hover:text-[#2E3B2F] hover:border-[#2E3B2F]/30"}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="w-4.5 h-4.5"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>
        )}

        {/* Text input */}
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder={
              recording
                ? "Recording…"
                : pendingMedia
                  ? "Add a caption…"
                  : "Say something…"
            }
            disabled={disabled || uploading || recording}
            rows={1}
            className="w-full bg-white border border-[#D4C5B0]/60 rounded-2xl px-4 py-2.5 font-dm text-[14px] text-[#2E3B2F] placeholder:text-[#C4B8A8] focus:outline-none focus:border-[#2E3B2F]/40 focus:ring-2 focus:ring-[#2E3B2F]/6 resize-none transition-all max-h-32 disabled:opacity-50"
            style={{ minHeight: "42px" }}
            onInput={(e) => {
              const t = e.currentTarget;
              t.style.height = "auto";
              t.style.height = Math.min(t.scrollHeight, 128) + "px";
            }}
          />
        </div>

        {/* Send / Voice */}
        {canSend || pendingMedia ? (
          <button
            onClick={handleSend}
            disabled={!canSend}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2E3B2F] flex items-center justify-center shadow-[0_4px_16px_rgba(46,59,47,0.3)] hover:shadow-[0_6px_24px_rgba(46,59,47,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        ) : (
          <button
            onMouseDown={start}
            onMouseUp={handleVoiceEnd}
            onTouchStart={start}
            onTouchEnd={handleVoiceEnd}
            disabled={disabled || uploading}
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50 select-none
              ${
                recording
                  ? "bg-[#C4785A] shadow-[0_4px_16px_rgba(196,120,90,0.4)] scale-110"
                  : "bg-white border border-[#D4C5B0]/60 hover:border-[#2E3B2F]/30 text-[#6b7d6c]"
              }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke={recording ? "white" : "currentColor"}
              strokeWidth="1.8"
              className="w-4 h-4"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
            </svg>
          </button>
        )}

        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
}
