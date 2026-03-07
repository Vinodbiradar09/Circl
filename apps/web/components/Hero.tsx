"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const NODES = [
  {
    id: "a",
    orbit: 150,
    speed: 22,
    startDeg: 40,
    dir: 1,
    size: 44,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.5"
        width="18"
        height="18"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "b",
    orbit: 150,
    speed: 22,
    startDeg: 210,
    dir: 1,
    size: 44,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.5"
        width="18"
        height="18"
      >
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z" />
      </svg>
    ),
  },
  {
    id: "c",
    orbit: 100,
    speed: 30,
    startDeg: 110,
    dir: -1,
    size: 38,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.5"
        width="16"
        height="16"
      >
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    id: "d",
    orbit: 100,
    speed: 30,
    startDeg: 290,
    dir: -1,
    size: 38,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.5"
        width="16"
        height="16"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
] as const;

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const angles = useRef<number[]>(
    NODES.map((n) => (n.startDeg * Math.PI) / 180),
  );
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef<number>(0);

  useEffect(() => {
    let prev = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      const wrap = wrapRef.current;
      if (wrap) {
        const cx = wrap.offsetWidth / 2;
        const cy = wrap.offsetHeight / 2;
        NODES.forEach((n, i) => {
          angles.current[i]! += ((2 * Math.PI) / n.speed) * dt * n.dir;
          const el = dotRefs.current[i];
          if (!el) return;
          const x = cx + n.orbit * Math.cos(angles.current[i]!);
          const y = cy + n.orbit * Math.sin(angles.current[i]!);
          el.style.left = `${x}px`;
          el.style.top = `${y}px`;
          el.style.transform = "translate(-50%,-50%)";
        });
      }
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: "#080808", fontFamily: "var(--font-sans)" }}
    >
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 items-center px-10 md:px-16 pt-32 pb-24 gap-16">
        <div className="max-w-140">
          <motion.div {...fadeUp(0.1)}>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-10 border"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-pulse" />
              <span
                className="text-[11px] tracking-[0.12em] uppercase"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                5 km radius · Live now
              </span>
            </div>
          </motion.div>

          <motion.h1
            {...fadeUp(0.18)}
            className="mb-7 leading-[1.05]"
            style={{
              fontSize: "clamp(52px,6.5vw,88px)",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              fontFamily: "var(--font-display)",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.28)" }}>The </span>
            <span style={{ color: "#ffffff" }}>people</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.28)" }}>outside </span>
            <span style={{ color: "#ffffff" }}>your</span>
            <br />
            <span style={{ color: "#ffffff" }}>window.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="text-[15px] leading-[1.8] mb-11 max-w-100"
            style={{ color: "rgba(255,255,255,0.32)", fontWeight: 400 }}
          >
            Circl surfaces real conversations from people within 5 km. no
            profiles, no followers, no history. Just your neighbourhood live.
          </motion.p>

          <motion.div {...fadeUp(0.44)} className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-full text-[14px] font-medium no-underline transition-all duration-250 hover:-translate-y-px"
              style={{
                background: "#6C63FF",
                color: "#ffffff",
                padding: "13px 34px",
                letterSpacing: "-0.01em",
                boxShadow: "0 0 36px rgba(108,99,255,0.32)",
              }}
            >
              Enter your radius
            </Link>
            <Link
              href="#how"
              className="flex items-center gap-1.5 text-[13px] no-underline transition-all duration-250 group"
              style={{
                color: "rgba(255,255,255,0.32)",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.70)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.32)")
              }
            >
              See how it works
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.5 }}
          className="hidden md:flex justify-center items-center"
        >
          <div ref={wrapRef} className="relative w-100 h-100">
            {[150, 100].map((r) => (
              <div
                key={r}
                className="absolute rounded-full pointer-events-none"
                style={{
                  border: "1px dashed rgba(255,255,255,0.07)",
                  width: r * 2,
                  height: r * 2,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              />
            ))}
            {NODES.map((n, i) => (
              <div
                key={n.id}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                className="absolute will-change-transform pointer-events-none"
                style={{ top: 0, left: 0 }}
              >
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: n.size,
                    height: n.size,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
                  }}
                >
                  {n.icon}
                </div>
              </div>
            ))}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
              style={{
                width: 68,
                height: 68,
                background: "#6C63FF",
                boxShadow:
                  "0 0 0 12px rgba(108,99,255,0.10), 0 0 0 26px rgba(108,99,255,0.05), 0 0 56px rgba(108,99,255,0.30)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                width="22"
                height="22"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
