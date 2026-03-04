"use client";

export default function EmptyChat() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#F5F0E8] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#E8DDD0]/40 to-transparent" />
      </div>

      {/* Radar */}
      <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full border border-[#2E3B2F]/8 animate-ping"
          style={{ animationDuration: "2.5s" }}
        />
        <div
          className="absolute inset-5 rounded-full border border-[#2E3B2F]/6 animate-ping"
          style={{ animationDuration: "2.5s", animationDelay: "0.6s" }}
        />
        <div
          className="absolute inset-10 rounded-full border border-[#2E3B2F]/5 animate-ping"
          style={{ animationDuration: "2.5s", animationDelay: "1.2s" }}
        />
        <div className="w-14 h-14 rounded-full bg-[#2E3B2F] flex items-center justify-center shadow-[0_0_0_12px_rgba(46,59,47,0.05),0_8px_32px_rgba(46,59,47,0.25)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            className="w-6 h-6 opacity-80"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      </div>

      <h3 className="font-cormorant text-[28px] font-light text-[#2E3B2F] mb-2">
        Select a room
      </h3>
      <p className="font-dm text-[13px] text-[#8a9a8b] text-center max-w-[220px] leading-relaxed">
        Join a room from the list to start connecting with people nearby.
      </p>
    </div>
  );
}
