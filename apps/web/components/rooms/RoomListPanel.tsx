"use client";

import Image from "next/image";
import { NearbyRoom } from "@/app/rooms/nearme/types";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

interface Props {
  rooms: NearbyRoom[];
  activeRoomId: string | null;
  joiningId: string | null;
  refreshing: boolean;
  joinedRoomIds: Set<string>;
  unreadMap: Record<string, number>;
  onJoin: (room: NearbyRoom) => void;
  onRefresh: () => void;
  onCreateRoom: () => void;
  onBack: () => void;
}

export default function RoomListPanel({
  rooms,
  activeRoomId,
  joiningId,
  refreshing,
  joinedRoomIds,
  unreadMap,
  onJoin,
  onRefresh,
  onCreateRoom,
  onBack,
}: Props) {
  const veryClose = rooms.filter((r) => r.distance_km < 0.5);
  const nearby = rooms.filter(
    (r) => r.distance_km >= 0.5 && r.distance_km <= 2,
  );
  const further = rooms.filter((r) => r.distance_km > 2);

  return (
    <div className="relative flex flex-col h-full bg-[#F5F0E8]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-[#D4C5B0]/40 bg-[#F5F0E8]/95 backdrop-blur-sm">
        {/* Back to dashboard */}
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full hover:bg-[#2E3B2F]/8 flex items-center justify-center transition-colors flex-shrink-0"
          title="Back to dashboard"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4 text-[#6b7d6c]"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="flex-1 min-w-0">
          <h2 className="font-cormorant text-[19px] font-semibold text-[#2E3B2F] leading-tight">
            Nearby
          </h2>
          <p className="font-dm text-[11px] text-[#8a9a8b]">
            {rooms.length} room{rooms.length !== 1 ? "s" : ""} in your radius
          </p>
        </div>

        {/* Refresh */}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="w-8 h-8 rounded-full hover:bg-[#2E3B2F]/8 flex items-center justify-center transition-colors disabled:opacity-40"
          title="Refresh rooms"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={`w-4 h-4 text-[#2E3B2F] ${refreshing ? "animate-spin" : ""}`}
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        </button>
      </div>

      {/* Room list */}
      <div className="flex-1 overflow-y-auto">
        {rooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#E8DDD0] flex items-center justify-center mb-5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="w-7 h-7 text-[#8a9a8b]"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <p className="font-cormorant text-[20px] text-[#2E3B2F] mb-2">
              Quiet around here
            </p>
            <p className="font-dm text-[12px] text-[#8a9a8b] leading-relaxed max-w-[200px]">
              No rooms within your radius. Create one to start a conversation.
            </p>
          </div>
        ) : (
          <>
            {veryClose.length > 0 && (
              <Group
                label="Right beside you"
                rooms={veryClose}
                activeRoomId={activeRoomId}
                joiningId={joiningId}
                joinedRoomIds={joinedRoomIds}
                unreadMap={unreadMap}
                onJoin={onJoin}
              />
            )}
            {nearby.length > 0 && (
              <Group
                label="Nearby"
                rooms={nearby}
                activeRoomId={activeRoomId}
                joiningId={joiningId}
                joinedRoomIds={joinedRoomIds}
                unreadMap={unreadMap}
                onJoin={onJoin}
              />
            )}
            {further.length > 0 && (
              <Group
                label="A little further"
                rooms={further}
                activeRoomId={activeRoomId}
                joiningId={joiningId}
                joinedRoomIds={joinedRoomIds}
                unreadMap={unreadMap}
                onJoin={onJoin}
              />
            )}
          </>
        )}
        <div className="h-24" />
      </div>

      {/* FAB */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center px-4">
        <button
          onClick={onCreateRoom}
          className="flex items-center gap-2.5 bg-[#2E3B2F] text-white font-dm text-[13px] pl-5 pr-6 py-3.5 rounded-full shadow-[0_8px_32px_rgba(46,59,47,0.4)] hover:shadow-[0_12px_48px_rgba(46,59,47,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className="w-4 h-4"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Create room
        </button>
      </div>
    </div>
  );
}

function Group({
  label,
  rooms,
  activeRoomId,
  joiningId,
  joinedRoomIds,
  unreadMap,
  onJoin,
}: {
  label: string;
  rooms: NearbyRoom[];
  activeRoomId: string | null;
  joiningId: string | null;
  joinedRoomIds: Set<string>;
  unreadMap: Record<string, number>;
  onJoin: (r: NearbyRoom) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 px-4 pt-5 pb-2">
        <span className="font-dm text-[10px] tracking-[0.15em] uppercase text-[#8a9a8b]">
          {label}
        </span>
        <div className="flex-1 h-px bg-[#D4C5B0]/50" />
      </div>
      {rooms.map((r) => (
        <RoomItem
          key={r.id}
          room={r}
          isActive={activeRoomId === r.id}
          isJoining={joiningId === r.id}
          isJoined={joinedRoomIds.has(r.id)}
          unread={unreadMap[r.id] ?? 0}
          onJoin={onJoin}
        />
      ))}
    </div>
  );
}

function RoomItem({
  room,
  isActive,
  isJoining,
  isJoined,
  unread,
  onJoin,
}: {
  room: NearbyRoom;
  isActive: boolean;
  isJoining: boolean;
  isJoined: boolean;
  unread: number;
  onJoin: (r: NearbyRoom) => void;
}) {
  return (
    <div
      onClick={() => !isJoining && onJoin(room)}
      className={`relative flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200
        ${
          isActive
            ? "bg-[#2E3B2F]/8 border-l-2 border-l-[#2E3B2F]"
            : "border-l-2 border-l-transparent hover:bg-[#E8DDD0]/60"
        }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-11 h-11 rounded-[12px] overflow-hidden bg-gradient-to-br from-[#E8DDD0] to-[#D4C5B0]/60 flex items-center justify-center">
          {room.img ? (
            <Image
              src={room.img}
              alt={room.name}
              width={44}
              height={44}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="font-cormorant text-[17px] font-semibold text-[#2E3B2F]/40">
              {initials(room.name)}
            </span>
          )}
        </div>
        {room.isLive && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-[1.5px] border-[#F5F0E8]">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className={`font-dm text-[13px] font-medium truncate mb-0.5 ${isActive ? "text-[#2E3B2F]" : "text-[#3d4d3e]"}`}
        >
          {room.name}
        </p>
        <div className="flex items-center gap-1.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-2.5 h-2.5 text-[#8a9a8b] flex-shrink-0"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="font-dm text-[11px] text-[#8a9a8b]">
            {room.memberCount}/{room.maxMembers}
          </span>
          {room.topic && (
            <>
              <span className="text-[#C4B8A8] text-[10px]">·</span>
              <span className="font-dm text-[11px] text-[#8a9a8b] truncate">
                {room.topic}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right side — unread badge OR join/active indicator */}
      <div className="flex-shrink-0">
        {unread > 0 && !isActive ? (
          <span className="min-w-[20px] h-5 px-1.5 bg-[#2E3B2F] text-white font-dm text-[10px] font-bold rounded-full flex items-center justify-center">
            {unread > 99 ? "99+" : unread}
          </span>
        ) : isActive ? (
          <div className="w-2 h-2 rounded-full bg-[#2E3B2F]" />
        ) : isJoined ? (
          // Already joined but not active — show subtle indicator
          <span className="font-dm text-[10px] text-[#2E3B2F]/50 border border-[#2E3B2F]/20 px-2 py-0.5 rounded-full">
            Joined
          </span>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onJoin(room);
            }}
            disabled={isJoining}
            className="w-14 h-7 flex items-center justify-center rounded-full bg-[#2E3B2F]/8 hover:bg-[#2E3B2F] hover:text-white text-[#2E3B2F] font-dm text-[11px] border border-[#2E3B2F]/15 hover:border-[#2E3B2F] transition-all duration-200 disabled:opacity-50"
          >
            {isJoining ? (
              <div className="w-3 h-3 rounded-full border border-current border-t-transparent animate-spin" />
            ) : (
              "Join"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
