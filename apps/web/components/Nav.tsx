"use client";
import Link from "next/link";

export default function Nav() {
  return (
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

      <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
        {[
          ["Features", "#features"],
          ["How it works", "#how"],
          ["Stories", "#stories"],
          ["Contact", "mailto:hello@circl.app"],
        ].map(([label, href]) => (
          <li key={label}>
            <Link
              href={href!}
              className="text-[13px] font-normal tracking-[-0.01em] no-underline transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.40)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color =
                  "rgba(255,255,255,0.85)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color =
                  "rgba(255,255,255,0.40)")
              }
            >
              {label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/login"
            className="text-[13px] font-medium tracking-[-0.01em] no-underline rounded-full transition-all duration-200 hover:-translate-y-px"
            style={{
              color: "#ffffff",
              background: "#6C63FF",
              padding: "9px 22px",
              boxShadow: "0 0 20px rgba(108,99,255,0.24)",
            }}
          >
            Open Circl
          </Link>
        </li>
      </ul>
    </nav>
  );
}
