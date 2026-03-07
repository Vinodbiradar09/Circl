import type { Metadata } from "next";
import Link from "next/link";
import BackLink from "@/components/BackLink";

export const metadata: Metadata = {
  title: "Privacy Circl",
  description: "How Circl handles your data. No legalese, just the truth.",
};

const sections = [
  {
    id: "identity",
    title: "Your identity is hidden by default",
    body: 'When you join Circl, you get a randomly generated name something like "QuietMaple_77". This name has no connection to your real name, email, or any personal information. Your email is never visible to other users. Other members in a room only see your generated name and nothing else. You can regenerate your name at any time from settings.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        width="18"
        height="18"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    color: "#6C63FF",
  },
  {
    id: "location",
    title: "Your exact location is never shared",
    body: "Circl uses your approximate location to determine which rooms are within your 5 km radius. We only store a generalised cell reference never your exact GPS coordinates. Other users are never told where you are precisely. Location data is used solely for room discovery and is never sold or shared with any third party.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        width="18"
        height="18"
      >
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z" />
      </svg>
    ),
    color: "#6E9DC4",
  },
  {
    id: "chats",
    title: "Chats are not stored on our servers",
    body: "Messages sent inside a Circl room exist only for the duration of that room. When a room expires or is deleted, all messages are permanently purged from our systems. We do not log, archive, or analyse the content of your conversations. There is no message history and no way to retrieve a deleted conversation by design.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        width="18"
        height="18"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="13" y2="13" />
      </svg>
    ),
    color: "#9B8EC4",
  },
  {
    id: "rooms",
    title: "Room deletion clears everything",
    body: "When a room is deleted by the creator, by expiry, or by moderation action all associated data is removed: member lists, messages, room metadata, and any cached content. This is irreversible. We do not keep soft-deleted copies or backups of room content.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        width="18"
        height="18"
      >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    ),
    color: "#C4936E",
  },
  {
    id: "reporting",
    title: "Reports are reviewed and acted on",
    body: "If you encounter a user or room that violates our community guidelines harassment, hate speech, spam, or harmful content you can report them directly from within the app. Every report is reviewed by our moderation team. Verified violations result in immediate action: room removal, user suspension, or permanent ban. Your report is anonymous.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        width="18"
        height="18"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    color: "#C46E8E",
  },
  {
    id: "data",
    title: "What data we do keep",
    body: "To operate Circl, we store: your account email (for authentication only), your generated display name, your profile image if provided via OAuth, and basic session tokens. We do not sell any of this data. We do not run advertising. We do not build behavioural profiles.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        width="18"
        height="18"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    color: "#6C63FF",
  },
  // {
  //   id: "sharing",
  //   title: "We will never share your identity",
  //   body: "Your personal information is never shared with other users, advertisers, data brokers, or any third party, except where required by law. Circl's business model is built on community, not surveillance.",
  //   icon: (
  //     <svg
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="1.4"
  //       width="18"
  //       height="18"
  //     >
  //       <circle cx="18" cy="5" r="3" />
  //       <circle cx="6" cy="12" r="3" />
  //       <circle cx="18" cy="19" r="3" />
  //       <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
  //       <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  //     </svg>
  //   ),
  //   color: "#C4936E",
  // },
];

const pills = [
  { label: "Identity hidden by default", color: "#6C63FF" },
  { label: "Location never shared precisely", color: "#6E9DC4" },
  { label: "Chats not stored on server", color: "#9B8EC4" },
  { label: "Room deletion wipes everything", color: "#C4936E" },
  { label: "Reports acted on immediately", color: "#C46E8E" },
  { label: "Your data never sold", color: "#6C63FF" },
];

export default function PrivacyPage() {
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
        className="relative pt-40 pb-16 px-10 md:px-16 overflow-hidden"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="relative z-10 max-w-3xl">
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
              Privacy Policy
            </span>
          </div>
          <h1
            className="mb-6 leading-[1.04]"
            style={{
              fontSize: "clamp(44px,6vw,72px)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              fontFamily: "var(--font-display)",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.28)" }}>
              Your privacy{" "}
            </span>
            <span style={{ color: "#ffffff" }}>is our</span>
            <br />
            <span style={{ color: "#ffffff" }}>promise</span>
          </h1>
          <p
            className="text-[16px] leading-[1.8] max-w-125"
            style={{ color: "rgba(255,255,255,0.34)", fontWeight: 400 }}
          >
            Circl is built on trust. Here is everything we do and don&apos;t do
            with your information. No legalese. Just the truth.
          </p>
          <p
            className="text-[11px] mt-5 uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            Last updated: March 2026
          </p>
        </div>
      </div>

      <div
        className="px-10 md:px-16 py-5"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "#0A0A0C",
        }}
      >
        <div className="flex flex-wrap gap-2">
          {pills.map((p) => (
            <div
              key={p.label}
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 border"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: p.color }}
              />
              <span
                className="text-[12px]"
                style={{
                  color: "rgba(255,255,255,0.42)",
                  letterSpacing: "-0.01em",
                }}
              >
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 mx-auto"
        style={{
          maxWidth: "900px",
          border: "1px dashed rgba(255,255,255,0.07)",
          borderRadius: "12px",
          overflow: "hidden",
          margin: "48px auto",
        }}
      >
        {sections.map((s, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const totalRows = Math.ceil(sections.length / 2);
          return (
            <div
              key={s.id}
              style={{
                background: "#0C0C0E",
                padding: "36px",
                borderRight:
                  col === 0 ? "1px dashed rgba(255,255,255,0.07)" : "none",
                borderBottom:
                  row < totalRows - 1
                    ? "1px dashed rgba(255,255,255,0.07)"
                    : "none",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: `${s.color}14`,
                  border: `1px solid ${s.color}28`,
                  color: s.color,
                }}
              >
                {s.icon}
              </div>
              <h2
                className="text-white font-semibold mb-3 leading-tight"
                style={{ fontSize: "15px", letterSpacing: "-0.02em" }}
              >
                {s.title}
              </h2>
              <p
                className="leading-[1.8] text-[13px]"
                style={{ color: "rgba(255,255,255,0.32)", fontWeight: 400 }}
              >
                {s.body}
              </p>
            </div>
          );
        })}
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
          className="mx-auto mb-5 leading-[1.06]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(32px,4vw,48px)",
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.28)" }}>
            Questions about{" "}
          </span>
          <span style={{ color: "#ffffff" }}>your</span>
          <br />
          <span style={{ color: "#ffffff" }}>privacy?</span>
        </h2>
        <p
          className="text-[15px] mx-auto mb-10"
          style={{
            color: "rgba(255,255,255,0.30)",
            fontWeight: 400,
            maxWidth: "360px",
          }}
        >
          Reach out and we&apos;ll respond within 48 hours.
        </p>
        <Link
          href="mailto:hello@circl.app"
          className="inline-flex items-center rounded-full text-[14px] font-medium tracking-[-0.01em] no-underline transition-all duration-300 hover:-translate-y-px"
          style={{
            background: "#6C63FF",
            color: "#ffffff",
            padding: "14px 40px",
            boxShadow: "0 0 36px rgba(108,99,255,0.28)",
          }}
        >
          Contact us →
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
