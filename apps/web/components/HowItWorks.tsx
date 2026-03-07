"use client";
import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    num: "01",
    title: "Grant location",
    desc: "One tap. Circl reads your neighbourhood never your exact address. You're an area, not a coordinate.",
    visual: (
      <div
        className="mt-8 rounded-xl p-5 border"
        style={{
          background: "rgba(255,255,255,0.025)",
          borderColor: "rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: "rgba(108,99,255,0.12)",
              border: "1px solid rgba(108,99,255,0.22)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6C63FF"
              strokeWidth="1.5"
              className="w-4 h-4"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <div>
            <div
              className="text-[12px]"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Circl wants to use your location
            </div>
            <div
              className="text-[10px] mt-0.5"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              Only while using the app
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div
            className="flex-1 rounded-lg py-2 text-center text-[11px] font-medium"
            style={{ background: "#6C63FF", color: "#ffffff" }}
          >
            Allow
          </div>
          <div
            className="flex-1 rounded-lg py-2 text-center text-[11px]"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Don&apos;t allow
          </div>
        </div>
      </div>
    ),
  },
  {
    num: "02",
    title: "Browse rooms",
    desc: "See live conversations within 5 km. Filter by mood, topic, or what's happening right now on your street.",
    visual: (
      <div className="mt-8 space-y-2">
        {[
          { name: "Late night talks", count: "12 people", dot: "#9B8EC4" },
          { name: "Lost tabby cat 🐱", count: "6 people", dot: "#C4936E" },
          { name: "Anyone at MG Road?", count: "4 people", dot: "#6E9DC4" },
        ].map((r, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl px-4 py-3 border"
            style={{
              background: "rgba(255,255,255,0.025)",
              borderColor: "rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: r.dot }}
              />
              <span
                className="text-[12px]"
                style={{ color: "rgba(255,255,255,0.62)" }}
              >
                {r.name}
              </span>
            </div>
            <span
              className="text-[11px]"
              style={{ color: "rgba(255,255,255,0.26)" }}
            >
              {r.count}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "03",
    title: "Jump in",
    desc: "Pick a generated handle. Only your chosen name shows to others never your real identity.",
    visual: (
      <div
        className="mt-8 rounded-xl p-5 border"
        style={{
          background: "rgba(255,255,255,0.025)",
          borderColor: "rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="text-[11px] mb-3"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          Your handle for this session
        </div>
        <div
          className="flex items-center gap-3 p-3 rounded-lg border"
          style={{
            background: "rgba(108,99,255,0.06)",
            borderColor: "rgba(108,99,255,0.22)",
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-medium shrink-0"
            style={{ background: "#6C63FF" }}
          >
            Q
          </div>
          <span
            className="text-[13px]"
            style={{ color: "rgba(255,255,255,0.78)" }}
          >
            QuietMaple_77
          </span>
        </div>
        <p
          className="text-[10px] mt-3"
          style={{ color: "rgba(255,255,255,0.20)" }}
        >
          This name resets when you leave. No one knows who you are.
        </p>
      </div>
    ),
  },
  {
    num: "04",
    title: "Start your own",
    desc: "Lost cat? Sunrise hike? Strong opinion about the new cafe? Open a room. Your neighbours will find it.",
    visual: (
      <div
        className="mt-8 rounded-xl p-5 border"
        style={{
          background: "rgba(255,255,255,0.025)",
          borderColor: "rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="text-[11px] mb-3"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          Room name
        </div>
        <div
          className="rounded-lg p-3 border mb-3 text-[13px]"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.52)",
          }}
        >
          Anyone else smell rain coming?
        </div>
        <div
          className="flex items-center justify-between text-[11px] mb-4"
          style={{ color: "rgba(255,255,255,0.26)" }}
        >
          <span>Expires in 2 hours</span>
          <span>Visible within 5 km</span>
        </div>
        <div
          className="rounded-lg py-2.5 text-center text-[12px] font-medium"
          style={{ background: "#6C63FF", color: "#ffffff" }}
        >
          Create room
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const { ref, visible } = useReveal();
  return (
    <section
      id="how"
      className="relative px-10 md:px-16 py-28"
      style={{
        background: "#0A0A0C",
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
            How it works
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
          <span style={{ color: "rgba(255,255,255,0.28)" }}>Simple </span>
          <span style={{ color: "#ffffff" }}>by</span>
          <br />
          <span style={{ color: "#ffffff" }}>design</span>
        </h2>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{
          border: "1px dashed rgba(255,255,255,0.07)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {steps.map((s, i) => (
          <StepCard key={i} s={s} index={i} total={steps.length} />
        ))}
      </div>
    </section>
  );
}

function StepCard({
  s,
  index,
  total,
}: {
  s: (typeof steps)[0];
  index: number;
  total: number;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        background: "#0C0C0E",
        padding: "32px 32px 36px",
        transitionDelay: `${index * 0.08}s`,
        borderRight:
          index < total - 1 ? "1px dashed rgba(255,255,255,0.07)" : "none",
      }}
    >
      <div
        className="inline-flex items-center justify-center rounded-md mb-5 text-[10px] tracking-widest"
        style={{
          background: "rgba(255,255,255,0.04)",
          color: "rgba(255,255,255,0.28)",
          padding: "4px 10px",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {s.num}
      </div>
      <div
        className="tracking-[-0.02em] mb-2.5 font-medium"
        style={{
          fontSize: "16px",
          color: "rgba(255,255,255,0.85)",
          fontFamily: "var(--font-display)",
        }}
      >
        {s.title}
      </div>
      <div
        className="text-[13px] leading-[1.75]"
        style={{ color: "rgba(255,255,255,0.28)" }}
      >
        {s.desc}
      </div>
      {s.visual}
    </div>
  );
}
