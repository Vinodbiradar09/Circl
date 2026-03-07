"use client";
import { useReveal } from "@/hooks/useReveal";
import Link from "next/link";

export default function CTA() {
  const { ref, visible } = useReveal();
  return (
    <section
      id="join"
      className="relative px-10 md:px-16 py-32 text-center overflow-hidden"
      style={{
        background: "#0A0A0C",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        ref={ref}
        className={`relative z-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-9 border"
          style={{
            background: "rgba(255,255,255,0.04)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-pulse" />
          <span
            className="text-[10px] uppercase tracking-[0.16em]"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Early access open
          </span>
        </div>

        <h2
          className="mx-auto mb-6 leading-[1.06]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(42px,5.5vw,72px)",
            letterSpacing: "-0.03em",
            maxWidth: "640px",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.28)" }}>Your radius </span>
          <span style={{ color: "#ffffff" }}>is</span>
          <br />
          <span style={{ color: "#ffffff" }}>waiting</span>
        </h2>

        <p
          className="text-[15px] leading-[1.8] mx-auto mb-12"
          style={{ color: "rgba(255,255,255,0.30)", maxWidth: "400px" }}
        >
          Be among the first to try a quieter, more human kind of social. No
          algorithm. No noise. Just the people outside your window.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-full text-[14px] font-medium tracking-[-0.01em] no-underline transition-all duration-300 hover:-translate-y-px"
            style={{
              background: "#6C63FF",
              color: "#ffffff",
              padding: "14px 40px",
              boxShadow: "0 0 36px rgba(108,99,255,0.28)",
            }}
          >
            Enter your radius
          </Link>
          <Link
            href="#features"
            className="rounded-full text-[14px] no-underline transition-all duration-300"
            style={{
              color: "rgba(255,255,255,0.38)",
              border: "1px solid rgba(255,255,255,0.09)",
              padding: "13px 32px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.18)";
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.62)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.09)";
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.38)";
            }}
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}
