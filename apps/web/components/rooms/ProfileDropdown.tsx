"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { signOut } from "@repo/auth/client";
import { useRouter } from "next/navigation";
import { generateName } from "@/app/rooms/nearme/actions";

interface Props {
  userName: string;
  userEmail: string;
  cookieHeader: string;
}

export default function ProfileDropdown({
  userName,
  userEmail,
  cookieHeader,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [currentName, setCurrentName] = useState(userName);
  const [justGenerated, setJustGenerated] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
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
  }, [open]);

  const handleGenerateName = useCallback(async () => {
    if (generating) return;
    setGenerating(true);
    setJustGenerated(false);
    try {
      const data = await generateName(cookieHeader);

      const newName = data.name ?? data.user?.name;
      if (newName) {
        setCurrentName(newName);
        setJustGenerated(true);
        // Reset the "just generated" indicator after 3s
        setTimeout(() => setJustGenerated(false), 3000);
      }
    } catch (e) {
      console.error("Name generation failed", e);
    } finally {
      setGenerating(false);
    }
  }, [generating, cookieHeader]);

  const handleLogout = useCallback(async () => {
    setLoggingOut(true);
    try {
      await signOut({
        fetchOptions: { onSuccess: () => router.push("/login") },
      });
    } catch {
      router.push("/login");
    }
  }, [router]);

  // Initials from current name
  const initials = currentName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div ref={ref} className="relative">
      {/* Avatar trigger */}
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2.5 group"
        aria-label="Profile menu"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-moss to-sage flex items-center justify-center shadow-[0_2px_8px_rgba(46,59,47,0.2)] group-hover:shadow-[0_4px_16px_rgba(46,59,47,0.3)] transition-shadow">
          <span className="font-dm text-[11px] font-semibold text-cream">
            {initials}
          </span>
        </div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`w-3.5 h-3.5 text-sage/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.06)] border border-sand/20 overflow-hidden z-50">
          {/* User info header */}
          <div className="px-5 py-4 bg-warm/40 border-b border-sand/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-moss to-sage flex items-center justify-center flex-shrink-0">
                <span className="font-dm text-[13px] font-semibold text-cream">
                  {initials}
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-dm text-[13px] font-medium text-ink truncate">
                    {currentName}
                  </p>
                  {justGenerated && (
                    <span className="font-dm text-[9px] tracking-[0.1em] uppercase bg-moss/10 text-moss px-1.5 py-0.5 rounded-full flex-shrink-0">
                      New
                    </span>
                  )}
                </div>
                <p className="font-dm text-[11px] text-sand truncate">
                  {userEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Generate name section */}
          <div className="px-5 py-4 border-b border-sand/10">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-dm text-[12px] font-medium text-ink">
                  Anonymous identity
                </p>
                <p className="font-dm text-[11px] text-sage/60 mt-0.5 leading-relaxed">
                  Generate a new name to stay anonymous. Others only see this.
                </p>
              </div>
            </div>
            <button
              onClick={handleGenerateName}
              disabled={generating}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-moss/8 hover:bg-moss hover:text-cream text-moss font-dm text-[12px] rounded-xl border border-moss/15 hover:border-moss transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
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
                  </svg>
                  Generate new name
                </>
              )}
            </button>
          </div>

          {/* Menu items */}
          <div className="py-1.5">
            <NavItem
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="w-4 h-4"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              }
              label="Nearby rooms"
              onClick={() => {
                router.push("/rooms/nearme");
                setOpen(false);
              }}
            />
            <NavItem
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="w-4 h-4"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              }
              label="Privacy"
              onClick={() => {
                router.push("/privacy");
                setOpen(false);
              }}
            />
            <div className="mx-5 my-1.5 h-px bg-sand/10" />
            <NavItem
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="w-4 h-4"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
              }
              label={loggingOut ? "Signing out…" : "Sign out"}
              onClick={handleLogout}
              muted
            />
          </div>
        </div>
      )}
    </div>
  );
}

function NavItem({
  icon,
  label,
  onClick,
  muted,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  muted?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-2.5 font-dm text-[13px] hover:bg-warm/40 transition-colors text-left
        ${muted ? "text-sage/60 hover:text-sage" : "text-ink"}`}
    >
      <span
        className={`flex-shrink-0 ${muted ? "text-sand/50" : "text-sage/60"}`}
      >
        {icon}
      </span>
      {label}
    </button>
  );
}
