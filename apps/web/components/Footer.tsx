"use client";
import Link from "next/link";

const productLinks = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how" },
  { label: "Rooms near me", href: "/rooms/nearme" },
  { label: "Privacy", href: "/privacy" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "mailto:hello@circl.app" },
];

export default function Footer() {
  return (
    <>
      <footer
        className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 items-start px-10 md:px-16 py-16"
        style={{
          background: "#060608",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div>
          <div className="flex items-center gap-1 mb-4">
            <span
              className="text-white font-semibold tracking-[-0.03em] text-[20px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Circl
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] ml-0.5 mb-0.5" />
          </div>
          <p
            className="text-[13px] leading-[1.7] max-w-65"
            style={{ color: "rgba(255,255,255,0.22)" }}
          >
            Connecting people within 5 km. A quieter, more present way to exist
            in your city.
          </p>
        </div>

        <div className="flex gap-14">
          <div>
            <h4
              className="text-[10px] tracking-[0.14em] uppercase mb-5"
              style={{
                color: "rgba(255,255,255,0.18)",
                fontFamily: "var(--font-display)",
              }}
            >
              Product
            </h4>
            {productLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="block no-underline text-[13px] mb-2.5 transition-colors duration-200"
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "var(--font-display)",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "rgba(255,255,255,0.62)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "rgba(255,255,255,0.35)")
                }
              >
                {label}
              </Link>
            ))}
          </div>
          <div>
            <h4
              className="text-[10px] tracking-[0.14em] uppercase mb-5"
              style={{
                color: "rgba(255,255,255,0.18)",
                fontFamily: "var(--font-display)",
              }}
            >
              Company
            </h4>
            {companyLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="block no-underline text-[13px] mb-2.5 transition-colors duration-200"
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "var(--font-display)",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "rgba(255,255,255,0.62)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "rgba(255,255,255,0.35)")
                }
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <div
        className="px-10 md:px-16 py-5 flex flex-col md:flex-row items-center justify-between gap-2"
        style={{
          background: "#060608",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.18)" }}>
          © 2026 Circl. Made with care, for people near you.
        </p>
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.18)" }}>
          Built for communities everywhere.
        </p>
      </div>
    </>
  );
}
