"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LocationGate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      router.replace("/rooms/nearme?error=no_geo");
      return;
    }

    setLoading(true);

    const tryGetLocation = (
      highAccuracy: boolean,
      timeout: number,
      maxAge: number,
    ) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          try {
            sessionStorage.setItem(
              "circl_coords",
              JSON.stringify({ lat, lng }),
            );
          } catch {}
          router.replace(`/rooms/nearme?lat=${lat}&lng=${lng}`);
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            setLoading(false);
            router.replace("/rooms/nearme?error=denied");
          } else if (highAccuracy) {
            // Retry with low accuracy on timeout/unavailable
            tryGetLocation(false, 15000, 300_000);
          } else {
            setLoading(false);
            router.replace("/rooms/nearme?error=unavailable");
          }
        },
        { enableHighAccuracy: highAccuracy, timeout, maximumAge: maxAge },
      );
    };

    tryGetLocation(false, 10000, 60_000);
  };

  return (
    <button
      onClick={requestLocation}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#2E3B2F] text-white font-dm text-[14px] disabled:opacity-60 hover:bg-[#3d4d3e] transition-colors"
    >
      {loading ? (
        <>
          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          Finding your location…
        </>
      ) : (
        <>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="w-4 h-4"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
          Allow location
        </>
      )}
    </button>
  );
}
