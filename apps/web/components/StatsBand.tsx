"use client";
import { useReveal } from "@/hooks/useReveal";

const stats = [
  { num: "50k+", label: "People connected" },
  { num: "5 km", label: "Your personal radius" },
  { num: "12k+", label: "Active rooms daily" },
];

export default function StatsBand() {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 relative overflow-hidden"
      style={{
        background: "#0A0A0C",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center,rgba(108,99,255,0.05) 0%,transparent 70%)",
        }}
      />
      {stats.map((s, i) => (
        <div
          key={i}
          className={`text-center relative py-12 px-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: `${i * 0.1}s` }}
        >
          {i < stats.length - 1 && (
            <div
              className="hidden md:block absolute right-0 top-[25%] bottom-[25%] w-px"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
          )}
          <div
            className="text-white leading-none mb-2.5 tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "48px",
              fontWeight: 600,
            }}
          >
            {s.num}
          </div>
          <div
            className="text-[10px] uppercase tracking-[0.15em]"
            style={{ color: "rgba(255,255,255,0.26)" }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
