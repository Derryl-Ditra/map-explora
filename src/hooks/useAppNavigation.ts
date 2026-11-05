"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { VENUES } from "@/data/venues";
import { isShownToUsers } from "@/utils/visibility";
import type { Venue } from "@/types/venue";

type View = { mode: "map" | "list"; venueId: string | null; share: boolean };
const MAP: View = { mode: "map", venueId: null, share: false };
const visible = VENUES.filter(isShownToUsers);

// One browser history entry per surface, not per filter change or drag frame.
export function useAppNavigation() {
  const [view, setView] = useState<View>(MAP);
  const current = useRef(view);
  const apply = useCallback((next: View) => { current.current = next; setView(next); }, []);
  const write = useCallback((next: View, replace = false) => {
    const url = new URL(window.location.href);
    if (next.venueId) url.searchParams.set("venue", next.venueId);
    else url.searchParams.delete("venue");
    window.history[replace ? "replaceState" : "pushState"]({ mapExplora: next }, "", url);
    apply(next);
  }, [apply]);

  useEffect(() => {
    const hydrate = requestAnimationFrame(() => {
      const id = new URL(window.location.href).searchParams.get("venue");
      const saved = window.history.state?.mapExplora as View | undefined;
      const venueId = visible.some(v => v.id === id) ? id : null;
      if (saved && saved.venueId === venueId) apply(saved);
      else {
        write(MAP, true);
        if (venueId) write({ ...MAP, venueId });
      }
    });
    const pop = (event: PopStateEvent) => apply(event.state?.mapExplora ?? MAP);
    window.addEventListener("popstate", pop);
    return () => { cancelAnimationFrame(hydrate); window.removeEventListener("popstate", pop); };
  }, [apply, write]);

  const setMode = useCallback((mode: View["mode"]) => {
    if (mode === "map") {
      // Collapse detail and list entries in one operation when choosing Map.
      const steps = (current.current.venueId ? 1 : 0) + (current.current.mode === "list" ? 1 : 0) + (current.current.share ? 1 : 0);
      if (steps) window.history.go(-steps);
      else apply(MAP);
    } else if (current.current.mode !== "list") write({ mode, venueId: null, share: false });
  }, [apply, write]);
  const select = useCallback((venue: Venue) => write({ ...current.current, venueId: venue.id, share: false }, Boolean(current.current.venueId)), [write]);
  const close = useCallback(() => window.history.back(), []);
  const openShare = useCallback(() => { if (!current.current.share) write({ ...current.current, share: true }); }, [write]);
  return {
    mobileView: view.mode,
    activeVenue: visible.find(v => v.id === view.venueId) ?? null,
    showShareCard: view.share,
    setMode, select, close, openShare,
    dismissToMap: () => setMode("map"),
  };
}
