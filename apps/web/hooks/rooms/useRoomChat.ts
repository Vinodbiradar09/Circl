"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Message } from "../../app/rooms/nearme/types";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:4000/room";
const RECONNECT_DELAY = 3000;

interface UseRoomChatProps {
  onMessage: (msg: Message) => void;
}

export function useRoomChat({ onMessage }: UseRoomChatProps) {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onMessageRef = useRef(onMessage);
  const mountedRef = useRef(true);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track all WS-joined rooms so we can rejoin on reconnect
  const joinedRoomsRef = useRef<Set<string>>(new Set());

  onMessageRef.current = onMessage;

  const safeSend = useCallback((payload: object): boolean => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
      return true;
    }
    return false;
  }, []);

  const connect = useCallback(() => {
    const state = wsRef.current?.readyState;
    if (state === WebSocket.OPEN || state === WebSocket.CONNECTING) return;

    const socket = new WebSocket(WS_URL);
    wsRef.current = socket;

    socket.onopen = () => {
      if (!mountedRef.current) return;
      setConnected(true);
      setError(null);
      // Rejoin all rooms we were in before disconnect
      for (const roomId of joinedRoomsRef.current) {
        socket.send(JSON.stringify({ event: "JOIN", data: { roomId } }));
      }
    };

    socket.onmessage = (e) => {
      if (!mountedRef.current) return;
      try {
        const data = JSON.parse(e.data);
        if (data.event === "MESSAGE") {
          const msg: Message = {
            roomId: data.roomId,
            senderId: data.senderId,
            senderName: data.senderName ?? data.senderId,
            senderImage: null,
            content: data.content,
            type: data.type ?? "TEXT",
            createdAt: data.createdAt ?? Date.now(),
          };
          onMessageRef.current(msg);
        }
      } catch (err) {
        console.error("WS parse error", err);
      }
    };

    socket.onclose = (e) => {
      if (!mountedRef.current) return;
      setConnected(false);
      if (!e.wasClean) {
        setError("Connection lost. Reconnecting…");
        reconnectTimerRef.current = setTimeout(() => {
          if (mountedRef.current) connect();
        }, RECONNECT_DELAY);
      }
    };

    socket.onerror = () => {
      if (!mountedRef.current) return;
      setError("Connection error. Retrying…");
    };
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    connect();
    return () => {
      mountedRef.current = false;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      wsRef.current?.close(1000, "Component unmounted");
    };
  }, [connect]);

  const wsJoin = useCallback(
    (roomId: string) => {
      joinedRoomsRef.current.add(roomId);
      safeSend({ event: "JOIN", data: { roomId } });
    },
    [safeSend],
  );

  const wsLeave = useCallback(
    (roomId: string) => {
      joinedRoomsRef.current.delete(roomId);
      safeSend({ event: "LEAVE", data: { roomId } });
    },
    [safeSend],
  );

  // sendMessage now takes roomId explicitly for multi-room support
  const sendMessage = useCallback(
    (
      content: string,
      type: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO" = "TEXT",
      roomId: string,
    ): boolean => {
      return safeSend({ event: "BROADCAST", data: { roomId, content, type } });
    },
    [safeSend],
  );

  return { connected, error, sendMessage, wsJoin, wsLeave };
}
