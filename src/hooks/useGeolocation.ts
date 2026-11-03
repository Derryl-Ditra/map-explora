"use client";

import { useState, useEffect, useCallback } from "react";

const JAKARTA_CENTER: [number, number] = [-6.2088, 106.8456];

/**
 * Live position via watchPosition while the app is open.
 * Position stays in the browser: nothing is stored or sent anywhere.
 * Mobile browsers do not reliably deliver updates while the screen is
 * locked or the tab is backgrounded; the UI copy reflects that.
 */
export function useGeolocation() {
  const [userPos, setUserPos] = useState<[number, number] | null>(JAKARTA_CENTER);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [hasActualLocation, setHasActualLocation] = useState(false);
  const [isLocating, setIsLocating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recenterTick, setRecenterTick] = useState(0);

  useEffect(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setError("Geolocation is not supported by this browser.");
      setIsLocating(false);
      return;
    }

    let mounted = true;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        if (!mounted) return;
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
        setAccuracy(typeof pos.coords.accuracy === "number" ? pos.coords.accuracy : null);
        const h = pos.coords.heading;
        setHeading(typeof h === "number" && !Number.isNaN(h) ? h : null);
        setHasActualLocation(true);
        setIsLocating(false);
        setError(null);
      },
      (err) => {
        if (!mounted) return;
        setError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied. Map is centered on Jakarta."
            : `Location unavailable: ${err.message}`
        );
        setIsLocating(false);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );

    return () => {
      mounted = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const requestRecenter = useCallback(() => setRecenterTick((t) => t + 1), []);

  return {
    userPos,
    accuracy,
    heading,
    hasActualLocation,
    isLocating,
    error,
    recenterTick,
    requestRecenter,
  };
}
