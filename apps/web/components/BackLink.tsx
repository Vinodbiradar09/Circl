"use client";
import Link from "next/link";

export default function BackLink() {
  return (
    <Link
      href="/"
      className="text-[13px] no-underline flex items-center gap-1.5 transition-colors duration-200"
      style={{ color: "rgba(255,255,255,0.38)", letterSpacing: "-0.01em" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.color =
          "rgba(255,255,255,0.72)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.color =
          "rgba(255,255,255,0.38)")
      }
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        width="14"
        height="14"
      >
        <path d="M19 12H5M12 5l-7 7 7 7" />
      </svg>
      Back
    </Link>
  );
}
