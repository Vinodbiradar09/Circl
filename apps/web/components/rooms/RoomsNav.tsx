import { auth } from "@repo/auth";
import { headers } from "next/headers";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";

export default async function RoomsNav() {
  const session = await auth.api.getSession({ headers: await headers() });
  const cookieHeader = (await headers()).get("cookie") ?? "";

  return (
    <nav className="h-14 flex-shrink-0 flex items-center justify-between px-5 bg-cream border-b border-sand/20 z-30">
      {/* Logo */}
      <Link
        href="/"
        className="font-cormorant text-[22px] font-semibold text-moss tracking-[0.04em]"
      >
        Circl
        <span className="inline-block w-1.5 h-1.5 bg-clay rounded-full ml-0.5 align-middle mb-0.5" />
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {session ? (
          <ProfileDropdown
            userName={session.user.name}
            userEmail={session.user.email}
            cookieHeader={cookieHeader}
          />
        ) : (
          <Link
            href="/login"
            className="font-dm text-[13px] text-moss hover:text-ink transition-colors"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
