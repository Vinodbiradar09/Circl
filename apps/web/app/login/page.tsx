"use client";

import { signIn } from "@repo/auth/client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className="shrink-0">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="16"
      height="16"
      className="shrink-0"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function Spinner() {
  return (
    <div
      className="w-4 h-4 rounded-full border-2 animate-spin shrink-0"
      style={{
        borderColor: "rgba(255,255,255,0.18)",
        borderTopColor: "rgba(255,255,255,0.85)",
      }}
    />
  );
}

export default function Login() {
  const [isLoading, setIsLoading] = useState<"google" | "github" | null>(null);

  const handleSignIn = async (provider: "google" | "github") => {
    setIsLoading(provider);
    try {
      await signIn.social({ provider, callbackURL: "/rooms" });
    } catch (error) {
      console.error(`Error in ${provider} signin`, error);
    } finally {
      setIsLoading(null);
    }
  };

  const busy = isLoading !== null;

  return (
    <div
      className="min-h-screen relative flex items-center justify-center"
      style={{ background: "#080808", fontFamily: "var(--font-sans)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-10 md:px-16 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
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
        <Link
          href="/"
          className="flex items-center gap-1.5 no-underline transition-colors duration-200"
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "-0.01em",
          }}
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
          Back to home
        </Link>
      </div>

      <motion.div
        {...fadeUp(0)}
        className="relative z-10 w-full mx-4"
        style={{ maxWidth: "400px" }}
      >
        <div
          style={{
            background: "#0C0C0E",
            border: "1px dashed rgba(255,255,255,0.08)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <div
            className="px-9 pt-9 pb-8"
            style={{ borderBottom: "1px dashed rgba(255,255,255,0.07)" }}
          >
            <div
              className="mb-6 flex items-center justify-center"
              style={{
                width: "44px",
                height: "44px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "12px",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="1.5"
                width="20"
                height="20"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <h1
              className="text-white mb-1.5"
              style={{
                fontSize: "24px",
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              Welcome back
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.32)" }}>
              Sign in to find your radius
            </p>
          </div>

          <div className="px-9 py-8 space-y-3">
            <button
              className="w-full flex items-center justify-center gap-3 rounded-xl transition-all duration-200 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                height: "48px",
                fontSize: "13px",
                fontWeight: 500,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                color: "rgba(255,255,255,0.78)",
                letterSpacing: "-0.01em",
                cursor: busy ? "not-allowed" : "pointer",
              }}
              onClick={() => handleSignIn("google")}
              disabled={busy}
            >
              {isLoading === "google" ? <Spinner /> : <GoogleIcon />}
              {isLoading === "google" ? "Signing in…" : "Continue with Google"}
            </button>

            <button
              className="w-full flex items-center justify-center gap-3 rounded-xl transition-all duration-200 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                height: "48px",
                fontSize: "13px",
                fontWeight: 500,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                color: "rgba(255,255,255,0.78)",
                letterSpacing: "-0.01em",
                cursor: busy ? "not-allowed" : "pointer",
              }}
              onClick={() => handleSignIn("github")}
              disabled={busy}
            >
              {isLoading === "github" ? <Spinner /> : <GitHubIcon />}
              {isLoading === "github" ? "Signing in…" : "Continue with GitHub"}
            </button>

            <div className="flex items-center gap-3 py-1">
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(255,255,255,0.06)",
                }}
              />
              <span
                className="uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.22)",
                }}
              >
                or
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(255,255,255,0.06)",
                }}
              />
            </div>

            <p
              className="text-center"
              style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)" }}
            >
              Your identity stays hidden by default.{" "}
              <Link
                href="/privacy"
                className="no-underline transition-colors duration-200"
                style={{
                  color: "#6C63FF",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                See our privacy promise →
              </Link>
            </p>
          </div>
        </div>

        <motion.p
          {...fadeUp(0.15)}
          className="text-center mt-6"
          style={{ fontSize: "12px", color: "rgba(255,255,255,0.22)" }}
        >
          No follower counts. No algorithmic noise. Just your radius.
        </motion.p>
      </motion.div>
    </div>
  );
}
