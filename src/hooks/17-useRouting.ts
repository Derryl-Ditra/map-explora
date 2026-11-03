"use client";

import { useState, useEffect, useRef } from "react";
import { RouteData, RouteStep } from "@/types/route";

interface RoutingProps {
  origin: [number, number] | null;      // [lat, lng]
  destination: [number, number] | null; // [lat, lng]
}

/**
 * The public OSRM demo server allows reasonable non-commercial use at
 * at most 1 request per second, with no uptime guarantee
 * (https://github.com/Project-OSRM/osrm-backend/wiki/Demo-server).
 * All route requests in the app go through this one queue, which spaces
 * calls at least 1.1s apart no matter how fast stations are tapped.
 * Routes are fetched once per origin/destination change; there is no
 * continuous re-routing while driving.
 */
let queue: Promise<unknown> = Promise.resolve();

function throttledFetch(url: string, signal: AbortSignal): Promise<Response> {
  const run = queue.then(async () => {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    const res = await fetch(url, { signal });
    // Hold the slot so the next request starts >= 1.1s after this one.
    await new Promise((r) => setTimeout(r, 1100));
    return res;
  });
  queue = run.catch(() => undefined);
  return run;
}

function describeStep(step: any): string {
  const maneuver = step?.maneuver ?? {};
  const type: string = maneuver.type ?? "continue";
  const modifier: string = maneuver.modifier ?? "";
  const road: string = step?.name ? ` onto ${step.name}` : "";
  const verbal: Record<string, string> = {
    "turn": "Turn",
    "new name": "Continue",
    "depart": "Depart",
    "arrive": "Arrive",
    "merge": "Merge",
    "ramp": "Take the ramp",
    "on ramp": "Take the ramp",
    "off ramp": "Take the exit",
    "fork": "Keep",
    "end of road": "At the end of the road, turn",
    "roundabout": "Enter the roundabout",
    "rotary": "Enter the roundabout",
    "roundabout turn": "At the roundabout, turn",
    "exit roundabout": "Exit the roundabout",
    "notification": "Continue",
    "continue": "Continue",
    "uturn": "Make a U-turn",
  };
  const base = verbal[type] ?? "Continue";
  if (type === "arrive") return "Arrive at the station";
  if (type === "depart") return `Head out${road}`;
  const dir = modifier ? ` ${modifier}` : "";
  return `${base}${dir}${road}`.replace(/\s+/g, " ").trim();
}

export function useRouting({ origin, destination }: RoutingProps) {
  const [route, setRoute] = useState<RouteData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  // Depend on primitives so a new array literal with the same coordinates
  // does not restart the request (this was the self-aborting loop).
  const oLat = origin?.[0] ?? null;
  const oLng = origin?.[1] ?? null;
  const dLat = destination?.[0] ?? null;
  const dLng = destination?.[1] ?? null;

  useEffect(() => {
    const requestId = ++requestIdRef.current;

    if (oLat === null || oLng === null || dLat === null || dLng === null) {
      setRoute(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      // OSRM expects lng,lat
      const url = `https://router.project-osrm.org/route/v1/driving/${oLng},${oLat};${dLng},${dLat}?overview=full&geometries=geojson&steps=true`;

      try {
        const response = await throttledFetch(url, controller.signal);
        if (!response.ok) {
          throw new Error(`Routing service returned status ${response.status}`);
        }
        const data = await response.json();
        if (!data.routes || data.routes.length === 0) {
          throw new Error("No driving route found for this station.");
        }

        const primary = data.routes[0];
        const steps: RouteStep[] = (primary.legs?.[0]?.steps ?? [])
          .map((s: any) => ({
            instruction: describeStep(s),
            distance_m: Math.round(s.distance ?? 0),
            duration_s: Math.round(s.duration ?? 0),
            location: [s.maneuver?.location?.[0] ?? 0, s.maneuver?.location?.[1] ?? 0] as [number, number],
          }))
          .filter((s: RouteStep) => s.instruction.length > 0);

        if (requestId !== requestIdRef.current) return; // superseded
        setRoute({
          geometry: primary.geometry.coordinates,
          distance_km: Number((primary.distance / 1000).toFixed(1)),
          duration_min: Math.max(1, Math.round(primary.duration / 60)),
          steps,
        });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        if (requestId !== requestIdRef.current) return;
        setRoute(null);
        setError(err instanceof Error ? err.message : "Route calculation failed");
      } finally {
        if (requestId === requestIdRef.current) setIsLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [oLat, oLng, dLat, dLng]);

  return { route, isLoading, error };
}
