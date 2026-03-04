"use client";

import { useRef, useState, useCallback } from "react";

export function useVoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorder.current = mr;
      chunks.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };
      mr.start(100);
      setRecording(true);
      setDuration(0);
      timer.current = setInterval(() => setDuration((d) => d + 1), 1000);
    } catch {
      console.error("Microphone access denied");
    }
  }, []);

  const stop = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!mediaRecorder.current) return resolve(null);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        mediaRecorder.current?.stream.getTracks().forEach((t) => t.stop());
        resolve(blob);
      };
      mediaRecorder.current.stop();
      setRecording(false);
      if (timer.current) clearInterval(timer.current);
    });
  }, []);

  const cancel = useCallback(() => {
    if (!mediaRecorder.current) return;
    mediaRecorder.current.stream.getTracks().forEach((t) => t.stop());
    mediaRecorder.current = null;
    setRecording(false);
    setDuration(0);
    if (timer.current) clearInterval(timer.current);
  }, []);

  const fmt = (s: number) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return {
    recording,
    duration,
    formattedDuration: fmt(duration),
    start,
    stop,
    cancel,
  };
}
