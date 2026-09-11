"use client";

import { useState, useEffect, useRef } from "react";
import { RouteData } from "@/types/route";

interface RoutingProps {
  origin: [number, number] | null;      // [lat, lng]
  destination: [number, number] | null; // [lat, lng]
}

export function useRouting({ origin, destination }: RoutingProps) {
  const [route, setRoute] = useState<RouteData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Cancel any ongoing fetch
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!origin || !destination) {
      const resetTimer = setTimeout(() => {
        setRoute(null);
        setIsLoading(false);
      }, 0);
      return () => clearTimeout(resetTimer);
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchRoute = async () => {
      setIsLoading(true);
      setError(null);

      // OSRM expects coordinates in lng,lat format
      const start = `${origin[1]},${origin[0]}`;
      const end = `${destination[1]},${destination[0]}`;
      const url = `https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson&steps=true`;

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Routing service returned status ${response.status}`);
        }

        const data = await response.json();
        if (!data.routes || data.routes.length === 0) {
          throw new Error("No route found between coordinates.");
        }

        const primaryRoute = data.routes[0];
        const coordinates: [number, number][] = primaryRoute.geometry.coordinates;
        const distanceKm = Number((primaryRoute.distance / 1000).toFixed(1));
        const durationMin = Math.round(primaryRoute.duration / 60);

        setRoute({
          geometry: coordinates,
          distance_km: distanceKm,
          duration_min: durationMin,
        });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          // Request aborted gracefully, ignore
          return;
        }
        setError(err instanceof Error ? err.message : "Route calculation failed");
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchRoute, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [origin, destination]);

  return { route, isLoading, error };
}
