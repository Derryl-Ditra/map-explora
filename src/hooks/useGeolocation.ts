"use client";

import { useState, useEffect, useCallback } from "react";

const JAKARTA_CENTER: [number, number] = [-6.2088, 106.8456];
const CACHE_KEY = "map-explora:user-pos:v1";

// One location fix per visit; the locate button requests another. No live tracking.
type CachedPos = { lat: number; lng: number; accuracy: number | null };

function readCache(): CachedPos | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (typeof p?.lat !== "number" || typeof p?.lng !== "number") return null;
    return { lat: p.lat, lng: p.lng, accuracy: typeof p.accuracy === "number" ? p.accuracy : null };
  } catch {
    return null;
  }
}

function writeCache(lat: number, lng: number, accuracy: number | null) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ lat, lng, accuracy, at: Date.now() }));
  } catch {
    // Storage full or blocked: the app still works, the next visit just refixes.
  }
}

export function useGeolocation() {
  const [userPos, setUserPos] = useState<[number, number] | null>(JAKARTA_CENTER);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [hasActualLocation, setHasActualLocation] = useState(false);
  const [isLocating, setIsLocating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recenterTick, setRecenterTick] = useState(0);

  useEffect(() => {
    const init = requestAnimationFrame(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setError("Geolocation is not supported by this browser.");
      setIsLocating(false);
      return;
    }


    const cached = readCache();
    if (cached) {
      setUserPos([cached.lat, cached.lng]);
      setAccuracy(cached.accuracy);
      setHasActualLocation(true);
    }

    const applyFix = (pos: GeolocationPosition) => {
      if (!mounted) return;
      const acc = typeof pos.coords.accuracy === "number" ? pos.coords.accuracy : null;
      setUserPos([pos.coords.latitude, pos.coords.longitude]);
      setAccuracy(acc);
      setHasActualLocation(true);
      setIsLocating(false);
      setError(null);
      writeCache(pos.coords.latitude, pos.coords.longitude, acc);
    };

    const applyError = (err: GeolocationPositionError) => {
      if (!mounted) return;
      // A cached fix stays usable silently; only a device with no fix at all
      // sees the banner.
      if (!readCache()) {
        setError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission denied. Map is centered on Jakarta."
            : `Location unavailable: ${err.message}`
        );
      }
      setIsLocating(false);
    };

    // Browsing: one fix per visit. Cached value above renders instantly.
    navigator.geolocation.getCurrentPosition(applyFix, applyError, {
      enableHighAccuracy: false,
      maximumAge: 60000,
      timeout: 15000,
    });
    });
    let mounted = true;
    return () => { mounted = false; cancelAnimationFrame(init); };
  }, []);

  // Locate button: take one fresh fix, then recenter on it.
  const refresh = useCallback(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
        const acc = typeof pos.coords.accuracy === "number" ? pos.coords.accuracy : null;
        setAccuracy(acc);
        setHasActualLocation(true);
        setIsLocating(false);
        setError(null);
        writeCache(pos.coords.latitude, pos.coords.longitude, acc);
        setRecenterTick((t) => t + 1);
      },
      () => {
        setIsLocating(false);
        setRecenterTick((t) => t + 1);
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );
  }, []);

  return {
    userPos,
    accuracy,
    hasActualLocation,
    isLocating,
    error,
    recenterTick,
    refresh,
  };
}
