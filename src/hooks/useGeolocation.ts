"use client";

import { useState, useEffect, useCallback } from "react";

const JAKARTA_CENTER: [number, number] = [-6.2088, 106.8456];
const CACHE_KEY = "map-explora:user-pos:v1";

/**
 * One single fix per page load (nearest-place sorting needs it) plus the
 * last fix cached on the device in localStorage (one ~60-byte value, never
 * sent anywhere) so returning visits render instantly. No live tracking
 * while browsing. The locate button takes one fresh fix. The only continuous
 * watch runs while in-app navigation is active, where position updates drive
 * the steps, and it pauses while the tab is hidden (web.dev: watchers cost
 * battery, clearWatch when done).
 */
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

export function useGeolocation(watching: boolean) {
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
      const h = pos.coords.heading;
      setHeading(typeof h === "number" && !Number.isNaN(h) ? h : null);
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

    if (watching) {
      // In-app navigation: the route steps and arrival detection need the
      // live position, so only here does a watch run.
      const watchId = navigator.geolocation.watchPosition(applyFix, applyError, {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 15000,
      });
      return () => {
        mounted = false;
        navigator.geolocation.clearWatch(watchId);
      };
    }

    // Browsing: one fix per visit. Cached value above renders instantly.
    navigator.geolocation.getCurrentPosition(applyFix, applyError, {
      enableHighAccuracy: false,
      maximumAge: 60000,
      timeout: 15000,
    });
    return () => {
      mounted = false;
    };
  }, [watching]);

  const requestRecenter = useCallback(() => setRecenterTick((t) => t + 1), []);

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
    heading,
    hasActualLocation,
    isLocating,
    error,
    recenterTick,
    requestRecenter,
    refresh,
  };
}
