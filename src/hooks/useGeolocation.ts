"use client";

import { useState, useCallback, useEffect } from "react";

const JAKARTA_CENTER: [number, number] = [-6.2088, 106.8456];

export function useGeolocation() {
  const [userPos, setUserPos] = useState<[number, number] | null>(JAKARTA_CENTER);
  const [isLocating, setIsLocating] = useState(false);
  const [hasActualLocation, setHasActualLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const locateUser = useCallback(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPos([position.coords.latitude, position.coords.longitude]);
        setHasActualLocation(true);
        setIsLocating(false);
      },
      (err) => {
        setError(err.message);
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  }, []);

  // Locate user after mount asynchronously
  useEffect(() => {
    const timer = setTimeout(() => {
      locateUser();
    }, 100);

    return () => clearTimeout(timer);
  }, [locateUser]);

  return {
    userPos,
    isLocating,
    hasActualLocation,
    error,
    locateUser,
  };
}
