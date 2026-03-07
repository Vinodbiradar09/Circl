"use client";

import { useReveal } from "@/hooks/useReveal";

const features = [
  {
    num: "01",
    title: "Local Rooms",
    desc: "Every room you see is within 5 km. Not curated by an algorithm just the conversations happening around you, right now.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        width="18"
        height="18"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    iconBg: "rgba(108,99,255,0.10)",
    iconColor: "#9B8EC4",
    iconBorder: "rgba(108,99,255,0.18)",
    hoverGlow: "rgba(108,99,255,0.06)",
  },
  {
    num: "02",
    title: "Instant Proximity",
    desc: "Move through the city and your world moves with you. Circl updates in real-time your radius is always yours.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        width="18"
        height="18"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
    iconBg: "rgba(196,147,110,0.10)",
    iconColor: "#C4936E",
    iconBorder: "rgba(196,147,110,0.18)",
    hoverGlow: "rgba(196,147,110,0.06)",
  },
  {
    num: "03",
    title: "No Footprint",
    desc: "Rooms expire in 2 hours. Messages vanish in 24. Your exact location is never stored. Use it, and it disappears.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        width="18"
        height="18"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    iconBg: "rgba(110,157,196,0.10)",
    iconColor: "#6E9DC4",
    iconBorder: "rgba(110,157,196,0.18)",
    hoverGlow: "rgba(110,157,196,0.06)",
  },
  {
    num: "04",
    title: "Anonymous Identity",
    desc: "You get a generated handle like QuietMaple_77. Only that name is ever visible to others. No email, no real identity.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        width="18"
        height="18"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    iconBg: "rgba(196,110,142,0.10)",
    iconColor: "#C46E8E",
    iconBorder: "rgba(196,110,142,0.18)",
    hoverGlow: "rgba(196,110,142,0.06)",
  },
  {
    num: "05",
    title: "Live Moments",
    desc: "Flash rooms spark around local events, weather shifts, breaking news. Born in the moment, gone by morning.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        width="18"
        height="18"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    iconBg: "rgba(155,142,196,0.10)",
    iconColor: "#9B8EC4",
    iconBorder: "rgba(155,142,196,0.18)",
    hoverGlow: "rgba(155,142,196,0.06)",
  },
  {
    num: "06",
    title: "Safe by Design",
    desc: "Block. Report. Move on. Community first safety tools built in from day one not bolted on as an afterthought.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        width="18"
        height="18"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    iconBg: "rgba(108,99,255,0.08)",
    iconColor: "#7C73E6",
    iconBorder: "rgba(108,99,255,0.14)",
    hoverGlow: "rgba(108,99,255,0.05)",
  },
];

export default function Features() {
  const { ref, visible } = useReveal();

  return (
    <section
      id="features"
      className="relative px-10 md:px-16 py-28"
      style={{
        background: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        fontFamily: "var(--font-display)",
      }}
    >
      <div
        ref={ref}
        className={`transition-all duration-700 mb-16 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-7 border"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.08)",
            fontFamily: "var(--font-display)",
          }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.16em]"
            style={{
              color: "rgba(255,255,255,0.30)",
              fontFamily: "var(--font-display)",
            }}
          >
            Why Circl
          </span>
        </div>

        <h2
          className="leading-[1.06]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px,4.5vw,58px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.28)" }}>Closeness is </span>
          <span style={{ color: "#ffffff" }}>the</span>
          <br />
          <span style={{ color: "rgba(255,255,255,0.28)" }}>new </span>
          <span style={{ color: "#ffffff" }}>connection</span>
        </h2>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{
          border: "1px dashed rgba(255,255,255,0.07)",
          borderRadius: "12px",
          overflow: "hidden",
          fontFamily: "var(--font-display)",
        }}
      >
        {features.map((f, i) => (
          <FeatureCard key={i} f={f} index={i} total={features.length} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({
  f,
  index,
  total,
}: {
  f: (typeof features)[0];
  index: number;
  total: number;
}) {
  const { ref, visible } = useReveal();
  const col = index % 3;
  const row = Math.floor(index / 3);
  const totalRows = Math.ceil(total / 3);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden group cursor-default transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        background: "#0C0C0E",
        padding: "36px",
        transitionDelay: `${(index % 3) * 0.07}s`,
        borderRight: col < 2 ? "1px dashed rgba(255,255,255,0.07)" : "none",
        borderBottom:
          row < totalRows - 1 ? "1px dashed rgba(255,255,255,0.07)" : "none",
        fontFamily: "var(--font-display)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 0% 0%,${f.hoverGlow} 0%,transparent 60%)`,
        }}
      />

      <div
        className="inline-flex items-center justify-center rounded-md mb-5 text-[10px] tracking-widest font-normal"
        style={{
          background: "rgba(255,255,255,0.04)",
          color: "rgba(255,255,255,0.25)",
          padding: "4px 10px",
          border: "1px solid rgba(255,255,255,0.07)",
          fontFamily: "var(--font-display)",
        }}
      >
        {f.num}
      </div>

      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
        style={{
          background: f.iconBg,
          border: `1px solid ${f.iconBorder}`,
          color: f.iconColor,
        }}
      >
        {f.icon}
      </div>

      <div
        className="mb-2.5 font-medium tracking-[-0.02em] transition-colors duration-300 group-hover:text-white"
        style={{
          fontSize: "16px",
          color: "rgba(255,255,255,0.82)",
          fontFamily: "var(--font-display)",
        }}
      >
        {f.title}
      </div>

      <div
        className="leading-[1.75] transition-colors duration-300"
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.26)",
          fontFamily: "var(--font-display)",
        }}
      >
        {f.desc}
      </div>
    </div>
  );
}
