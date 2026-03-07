import type { Metadata } from "next";
import Link from "next/link";
import BackLink from "@/components/BackLink";

export const metadata: Metadata = {
  title: "About Circl",
  description: "We built Circl because streets felt empty. Learn our story.",
};

const sections = [
  {
    label: "The problem",
    heading: "Social media took us away from our streets",
    body: "Global platforms optimise for engagement, not for connection. They reward outrage, performance, and follower counts none of which exist in real neighbourhoods. We wanted a platform that worked like a good corner cafe, warm, local, unpretentious, and real.",
  },
  {
    label: "Our answer",
    heading: "A 5 km radius that moves with you",
    body: "Circl is radically local. Every room, every message, every person you meet is within 5 km of where you are right now. Move to a new city? Your world moves with you. The conversations are grounded in shared space and that changes everything.",
  },
  {
    label: "Our values",
    heading: "Privacy, calm, and no follower counts",
    body: "We deliberately removed the things that make social media toxic. No follower counts. No algorithmic feeds. No ads. No real names. Just people, nearby, talking about things that matter in the moment.",
  },
];

export default function AboutPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "#080808",
        color: "rgba(255,255,255,0.88)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 md:px-16 py-4"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(8,8,8,0.82)",
        }}
      >
        <Link href="/" className="no-underline flex items-center gap-1.5 group">
          <span
            className="text-white font-semibold tracking-[-0.03em] text-[20px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Circl
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] mb-0.5 group-hover:scale-125 transition-transform duration-200" />
        </Link>
        <BackLink />
      </nav>

      <div
        className="relative pt-40 pb-24 px-10 md:px-16 overflow-hidden"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="relative z-10 max-w-4xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-8 border"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <span
              className="text-[10px] uppercase tracking-[0.16em]"
              style={{ color: "rgba(255,255,255,0.30)" }}
            >
              Our story
            </span>
          </div>
          <h1
            className="mb-8 leading-[1.04]"
            style={{
              fontSize: "clamp(52px,7vw,88px)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              fontFamily: "var(--font-display)",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.28)" }}>
              We built Circl{" "}
            </span>
            <span style={{ color: "#ffffff" }}>because</span>
            <br />
            <span style={{ color: "#ffffff" }}>streets </span>
            <span style={{ color: "rgba(255,255,255,0.28)" }}>felt </span>
            <span style={{ color: "#ffffff" }}>empty</span>
          </h1>
          <p
            className="text-[16px] leading-[1.85] max-w-135"
            style={{ color: "rgba(255,255,255,0.34)", fontWeight: 400 }}
          >
            We live in a world more connected than ever and somehow lonelier.
            You can talk to someone in Tokyo instantly, but not know the name of
            the person in the flat above you. Circl exists to fix that.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-10 md:px-16 py-8">
        {sections.map((s, i) => (
          <div key={s.label}>
            <div className="grid md:grid-cols-[160px_1fr] gap-10 items-start py-14">
              <p
                className="text-[10px] uppercase pt-1"
                style={{
                  color: "rgba(255,255,255,0.22)",
                  letterSpacing: "0.14em",
                  fontWeight: 500,
                }}
              >
                {s.label}
              </p>
              <div>
                <h2
                  className="text-white font-semibold leading-[1.18] mb-5"
                  style={{
                    fontSize: "clamp(20px,2.5vw,26px)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {s.heading}
                </h2>
                <p
                  className="leading-[1.8] text-[15px]"
                  style={{ color: "rgba(255,255,255,0.34)", fontWeight: 400 }}
                >
                  {s.body}
                </p>
              </div>
            </div>
            {i < sections.length - 1 && (
              <div
                style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
              />
            )}
          </div>
        ))}
      </div>

      <div
        className="px-10 md:px-16 py-24 text-center"
        style={{
          background: "#0A0A0C",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <h2
          className="mx-auto mb-6 leading-[1.06]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(36px,4.5vw,58px)",
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.28)" }}>
            Ready to find{" "}
          </span>
          <span style={{ color: "#ffffff" }}>your</span>
          <br />
          <span style={{ color: "#ffffff" }}>radius?</span>
        </h2>
        <p
          className="text-[15px] mb-10 mx-auto"
          style={{
            color: "rgba(255,255,255,0.30)",
            fontWeight: 400,
            maxWidth: "360px",
          }}
        >
          Join thousands of people discovering the world around them.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center rounded-full text-[14px] font-medium tracking-[-0.01em] no-underline transition-all duration-300 hover:-translate-y-px"
          style={{
            background: "#6C63FF",
            color: "#ffffff",
            padding: "14px 40px",
            boxShadow: "0 0 36px rgba(108,99,255,0.28)",
          }}
        >
          Get started →
        </Link>
      </div>

      <div
        className="flex items-center justify-between px-10 md:px-16 py-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <Link href="/" className="no-underline flex items-center gap-1">
          <span
            className="text-white font-semibold tracking-[-0.03em] text-[18px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Circl
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] ml-0.5 mb-0.5" />
        </Link>
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.18)" }}>
          © 2026 Circl.
        </p>
      </div>
    </div>
  );
}
