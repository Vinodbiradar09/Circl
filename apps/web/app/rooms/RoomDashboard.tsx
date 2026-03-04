"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@repo/auth/client";
import CreateRoomModal from "@/components/rooms/CreateRoomModal";

interface Props {
  userName: string;
  userEmail: string;
  cookieHeader: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * Robust location getter with fallback chain:
 * 1. Try with cached GPS (fast, works if permission already granted)
 * 2. If that fails with timeout/unavailable (NOT denial), try low-accuracy fresh
 * 3. Only show "denied" error if PERMISSION_DENIED specifically
 */
function getLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({ code: -1, message: "Geolocation not supported" });
      return;
    }

    // First attempt: allow cached, no high accuracy (fast + reliable)
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => {
        // Only hard-fail on explicit denial
        if (err.code === err.PERMISSION_DENIED) {
          reject(err);
          return;
        }
        // Timeout or unavailable — retry with low accuracy + longer timeout
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          (err2) => reject(err2),
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 300_000 },
        );
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 },
    );
  });
}

export default function RoomsDashboard({
  userName,
  userEmail,
  cookieHeader,
}: Props) {
  const router = useRouter();
  const [currentName, setCurrentName] = useState(userName);
  const [generating, setGenerating] = useState(false);
  const [justGenerated, setJustGenerated] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Click-outside to close dropdown (no backdrop overlay — avoids z-index blocking)
  useEffect(() => {
    if (!showProfile) return;
    const handler = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowProfile(false);
      }
    };
    const t = setTimeout(
      () => document.addEventListener("mousedown", handler),
      50,
    );
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", handler);
    };
  }, [showProfile]);

  const handleFindRooms = useCallback(async () => {
    setLocating(true);
    setLocError(null);
    try {
      const { lat, lng } = await getLocation();
      // Cache for refresh fallback
      try {
        sessionStorage.setItem("circl_coords", JSON.stringify({ lat, lng }));
      } catch {}
      router.push(`/rooms/nearme?lat=${lat}&lng=${lng}`);
    } catch (err: any) {
      setLocating(false);
      if (err?.code === 1) {
        // PERMISSION_DENIED
        setLocError(
          "Location access denied. Please enable location in your browser settings and try again.",
        );
      } else {
        // Timeout/unavailable — try cached coords as last resort
        try {
          const cached = sessionStorage.getItem("circl_coords");
          if (cached) {
            const { lat, lng } = JSON.parse(cached);
            router.push(`/rooms/nearme?lat=${lat}&lng=${lng}`);
            return;
          }
        } catch {}
        setLocError(
          "Could not determine your location. Please check your connection and try again.",
        );
      }
    }
  }, [router]);

  const handleGenerateName = useCallback(async () => {
    if (generating) return;
    setGenerating(true);
    setJustGenerated(false);
    try {
      const res = await fetch("/api/v1/users/name", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) {
        console.error("generateName failed:", res.status, await res.text());
        return;
      }
      const data = await res.json();
      const newName = data?.name ?? data?.user?.name ?? data?.data?.name;
      if (newName) {
        setCurrentName(newName);
        setJustGenerated(true);
        setTimeout(() => setJustGenerated(false), 3000);
      }
    } catch (e) {
      console.error("generateName error:", e);
    } finally {
      setGenerating(false);
    }
  }, [generating]);

  const handleLogout = useCallback(async () => {
    setLoggingOut(true);
    try {
      await signOut();
      router.push("/login");
    } catch {
      router.push("/login");
    }
  }, [router]);

  const handleRoomCreated = useCallback(
    (room: any) => {
      setShowCreate(false);
      router.push(`/rooms/nearme?room=${room.id}`);
    },
    [router],
  );

  const inits = initials(currentName);

  return (
    <div className="min-h-screen bg-[#F5F0E8] relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#E8DDD0]/60 via-[#D4C5B0]/30 to-transparent" />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#2E3B2F]/8 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Top Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-10 py-6">
        <div className="flex items-center gap-2">
          <span className="font-cormorant text-[26px] font-semibold text-[#2E3B2F] tracking-[0.03em]">
            Circl
          </span>
          <span className="w-2 h-2 rounded-full bg-[#C4785A] mt-0.5" />
        </div>

        {/* profileRef wraps trigger + dropdown — useEffect handles click-outside */}
        <div ref={profileRef} className="relative z-50">
          <button
            onClick={() => setShowProfile((s) => !s)}
            className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-white/70 border border-[#D4C5B0]/50 hover:border-[#2E3B2F]/20 hover:shadow-[0_4px_20px_rgba(46,59,47,0.1)] transition-all duration-300 backdrop-blur-sm"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2E3B2F] to-[#4a6f51] flex items-center justify-center">
              <span className="font-dm text-[11px] font-bold text-white">
                {inits}
              </span>
            </div>
            <span className="font-dm text-[13px] text-[#2E3B2F] font-medium max-w-[120px] truncate">
              {currentName}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`w-3.5 h-3.5 text-[#8a9a8b] transition-transform duration-200 ${showProfile ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {showProfile && (
            <div className="absolute right-0 top-14 w-80 bg-white/98 backdrop-blur-xl rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.14),0_4px_16px_rgba(0,0,0,0.08)] border border-white/80 overflow-hidden">
              {/* Header */}
              <div className="px-5 py-5 bg-gradient-to-br from-[#2E3B2F] to-[#4a6f51] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 right-4 w-20 h-20 rounded-full border border-white/40" />
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full border border-white/20" />
                </div>
                <div className="relative flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/15 border border-white/20 flex items-center justify-center">
                    <span className="font-cormorant text-[20px] font-semibold text-white">
                      {inits}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-dm text-[14px] font-medium text-white truncate">
                        {currentName}
                      </p>
                      {justGenerated && (
                        <span className="font-dm text-[9px] tracking-[0.1em] uppercase bg-white/20 text-white px-1.5 py-0.5 rounded-full flex-shrink-0">
                          New
                        </span>
                      )}
                    </div>
                    <p className="font-dm text-[11px] text-white/50 truncate">
                      {userEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Generate name */}
              <div className="px-5 py-4 border-b border-[#E8DDD0]/60">
                <p className="font-dm text-[11px] text-[#8a9a8b] mb-3 leading-relaxed">
                  Your anonymous identity — others only see this name, never
                  your real info.
                </p>
                <button
                  onClick={handleGenerateName}
                  disabled={generating}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2E3B2F]/6 hover:bg-[#2E3B2F] hover:text-white text-[#2E3B2F] font-dm text-[12px] border border-[#2E3B2F]/12 hover:border-[#2E3B2F] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />{" "}
                      Generating…
                    </>
                  ) : (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-3.5 h-3.5"
                      >
                        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                      </svg>{" "}
                      Generate new name
                    </>
                  )}
                </button>
              </div>

              {/* Actions */}
              <div className="py-2">
                <button
                  onClick={() => {
                    setShowProfile(false);
                    router.push("/privacy");
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 font-dm text-[13px] text-[#3d4d3e] hover:bg-[#F5F0E8]/80 transition-colors text-left"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="w-4 h-4 text-[#8a9a8b] flex-shrink-0"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Privacy policy
                </button>
                <div className="mx-5 h-px bg-[#E8DDD0]/60 my-1" />
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-full flex items-center gap-3 px-5 py-3 font-dm text-[13px] text-[#8a9a8b] hover:bg-[#F5F0E8]/80 transition-colors disabled:opacity-50 text-left"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="w-4 h-4 flex-shrink-0"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                  {loggingOut ? "Signing out…" : "Sign out"}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6 text-center">
        {/* Radar orb */}
        <div className="relative w-36 h-36 mb-10 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border border-[#2E3B2F]/8 animate-ping"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute inset-4 rounded-full border border-[#2E3B2F]/6 animate-ping"
            style={{ animationDuration: "3s", animationDelay: "0.8s" }}
          />
          <div
            className="absolute inset-8 rounded-full border border-[#2E3B2F]/5 animate-ping"
            style={{ animationDuration: "3s", animationDelay: "1.6s" }}
          />
          <div className="w-20 h-20 rounded-full bg-[#2E3B2F] flex items-center justify-center shadow-[0_0_0_16px_rgba(46,59,47,0.06),0_8px_32px_rgba(46,59,47,0.3)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.6"
              className="w-9 h-9"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
          </div>
        </div>

        <h1 className="font-cormorant text-[clamp(44px,7vw,80px)] font-light text-[#2E3B2F] leading-[1.05] mb-4 tracking-[-0.02em]">
          Your radius,
          <br />
          <em className="not-italic text-[#C4785A]">your rules</em>
        </h1>
        <p className="font-dm text-[16px] text-[#6b7d6c] leading-[1.85] mb-12 max-w-[440px]">
          Anonymous rooms, real conversations. Find people around you or create
          your own space — no follower counts, no algorithmic noise.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm">
          <button
            onClick={handleFindRooms}
            disabled={locating}
            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#2E3B2F] text-white font-dm text-[15px] rounded-2xl shadow-[0_8px_32px_rgba(46,59,47,0.35)] hover:shadow-[0_12px_48px_rgba(46,59,47,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 disabled:transform-none"
          >
            {locating ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />{" "}
                Finding rooms…
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>{" "}
                Explore nearby
              </>
            )}
          </button>
          <button
            onClick={() => setShowCreate(true)}
            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur text-[#2E3B2F] font-dm text-[15px] rounded-2xl border border-[#D4C5B0]/70 hover:border-[#2E3B2F]/30 hover:bg-white hover:shadow-[0_8px_32px_rgba(46,59,47,0.12)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Create a room
          </button>
        </div>

        {locError && (
          <div className="mt-6 flex items-start gap-3 px-5 py-4 bg-[#C4785A]/10 border border-[#C4785A]/20 rounded-2xl max-w-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="w-4 h-4 text-[#C4785A] flex-shrink-0 mt-0.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <div>
              <p className="font-dm text-[12px] text-[#C4785A] text-left leading-relaxed">
                {locError}
              </p>
              <button
                onClick={handleFindRooms}
                className="font-dm text-[11px] text-[#C4785A] underline mt-1 text-left"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-6 mt-16 flex-wrap justify-center">
          {["Fully anonymous", "Location-based", "No data sold"].map(
            (label) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2E3B2F]/30" />
                <span className="font-dm text-[12px] text-[#8a9a8b] tracking-wide">
                  {label}
                </span>
              </div>
            ),
          )}
        </div>
      </main>

      {showCreate && (
        <CreateRoomModal
          onClose={() => setShowCreate(false)}
          onCreated={handleRoomCreated}
          cookieHeader={cookieHeader}
        />
      )}
    </div>
  );
}
