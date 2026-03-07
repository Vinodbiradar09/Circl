"use client";
import { useReveal } from "@/hooks/useReveal";

const testimonials = [
  {
    text: "I met my current best friend in a Circl room about vintage bookshops. She lives three streets away. We'd never spoken before.",
    name: "Shambavi A.",
    loc: "Bengaluru, India",
    initial: "S",
    g1: "#9B8EC4",
    g2: "#6C63FF",
  },
  {
    text: "There's something grounding about knowing the people you're talking to are actually here. Every message feels like it matters.",
    name: "Daniel M.",
    loc: "Nairobi, Kenya",
    initial: "D",
    g1: "#C4936E",
    g2: "#A0704A",
  },
  {
    text: "I moved to a new city and Circl made it feel like home within a week. Found my running group, my coffee spot, and my people.",
    name: "Lea V.",
    loc: "Lyon, France",
    initial: "L",
    g1: "#6E9DC4",
    g2: "#4A7FA8",
  },
];

export default function Testimonials() {
  const { ref, visible } = useReveal();
  return (
    <section
      id="stories"
      className="relative px-10 md:px-16 py-28"
      style={{
        background: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        ref={ref}
        className={`transition-all duration-700 mb-16 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-7 border"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.16em]"
            style={{ color: "rgba(255,255,255,0.30)" }}
          >
            Real stories
          </span>
        </div>
        <h2
          className="leading-[1.06]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px,4.5vw,58px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.28)" }}>Words </span>
          <span style={{ color: "#ffffff" }}>from the</span>
          <br />
          <span style={{ color: "#ffffff" }}>neighbourhood</span>
        </h2>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{
          border: "1px dashed rgba(255,255,255,0.07)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {testimonials.map((t, i) => (
          <TestCard key={i} t={t} index={i} total={testimonials.length} />
        ))}
      </div>
    </section>
  );
}

function TestCard({
  t,
  index,
  total,
}: {
  t: (typeof testimonials)[0];
  index: number;
  total: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`relative p-9 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        background: "#0C0C0E",
        transitionDelay: `${index * 0.1}s`,
        borderRight:
          index < total - 1 ? "1px dashed rgba(255,255,255,0.07)" : "none",
      }}
    >
      <div
        className="mb-5 leading-none select-none"
        style={{
          fontSize: "40px",
          color: "rgba(255,255,255,0.10)",
          fontFamily: "var(--font-display)",
        }}
      >
        &ldquo;
      </div>
      <p
        className="leading-[1.75] mb-8"
        style={{
          fontSize: "14px",
          color: "rgba(255,255,255,0.48)",
          fontFamily: "var(--font-display)",
          fontWeight: 400,
        }}
      >
        {t.text}
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-medium shrink-0"
          style={{ background: `linear-gradient(135deg,${t.g1},${t.g2})` }}
        >
          {t.initial}
        </div>
        <div>
          <div
            className="text-[13px] font-medium"
            style={{ color: "rgba(255,255,255,0.70)" }}
          >
            {t.name}
          </div>
          <div
            className="text-[11px]"
            style={{ color: "rgba(255,255,255,0.26)" }}
          >
            {t.loc}
          </div>
        </div>
      </div>
    </div>
  );
}
