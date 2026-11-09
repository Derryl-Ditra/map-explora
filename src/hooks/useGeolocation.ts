"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const JAKARTA_CENTER: [number, number] = [-6.2088, 106.8456];

// Start on Jakarta. Only an explicit tap asks for a one-time location fix.
// Do not use a previous visit's saved coordinates as a current location.
export function useGeolocation() {
  const [userPos, setUserPos] = useState<[number, number] | null>(JAKARTA_CENTER);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [hasActualLocation, setHasActualLocation] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recenterTick, setRecenterTick] = useState(0);
  const mounted = useRef(true);
  const pending = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  const refresh = useCallback(() => {
    if (pending.current) return;
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setError("Location is not supported by this browser. You can still browse places.");
      return;
    }
    pending.current = true;
    setIsLocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        pending.current = false;
        if (!mounted.current) return;
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
        setAccuracy(typeof pos.coords.accuracy === "number" ? pos.coords.accuracy : null);
        setHasActualLocation(true);
        setIsLocating(false);
        setError(null);
        setRecenterTick(t => t + 1);
      },
      (err) => {
        pending.current = false;
        if (!mounted.current) return;
        setIsLocating(false);
        setHasActualLocation(false);
        setAccuracy(null);
        setError(err.code === 1
          ? "Location permission denied. You can still browse places or enable location in browser settings."
          : err.code === 3
            ? "Location request timed out. Try again or keep browsing places."
            : "Location unavailable. Try again or keep browsing places.");
      },
      { enableHighAccuracy: false, maximumAge: 5000, timeout: 15000 }
    );
  }, []);

  return { userPos, accuracy, hasActualLocation, isLocating, error, recenterTick, refresh };
}
