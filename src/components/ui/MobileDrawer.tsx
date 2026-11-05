"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import { Venue, VenueFilterState } from "@/types/venue";
import { buildMapsLink } from "@/utils/mapsLink";
import FilterBar from "./FilterBar";
import VenueDetails from "./VenueDetails";
import { Search, MapPin, HelpCircle, ShieldCheck, Navigation, ArrowLeft, ExternalLink } from "lucide-react";

interface MobileDrawerProps {
  confirmed: Venue[];
  unconfirmed: Venue[];
  activeVenue: Venue | null;
  onClearActiveVenue: () => void;
  filters: VenueFilterState;
  onUpdateFilter: <K extends keyof VenueFilterState>(
    key: K,
    value: VenueFilterState[K]
  ) => void;
  onResetFilters: () => void;
  categories: string[];
  areas: string[];
  onOpenShare: () => void;
  mobileView: "list" | "map";
  onSetMobileView: (view: "list" | "map") => void;
  showDetails: boolean;
  backLabel: string;
  onSelectFromList: (venue: Venue) => void;
}

type Snap = "peek" | "half" | "full";

function useIsDesktop(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(min-width: 768px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => false
  );
}

function useWindowHeight(): number {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => window.innerHeight,
    () => 800
  );
}

function FitPill({ fit }: { fit: "confirmed" | "unconfirmed" | null }) {
  if (fit === "confirmed") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e3f2e8] text-[#14532d] text-[0.875rem] font-bold shrink-0">
        <ShieldCheck className="w-3.5 h-3.5" />
        Age confirmed
      </span>
    );
  }
  if (fit === "unconfirmed") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fef3c7] text-[#92400e] text-[0.875rem] font-bold shrink-0">
        <HelpCircle className="w-3.5 h-3.5" />
        Check age
      </span>
    );
  }
  return null;
}

function VenueCard({
  venue,
  fit,
  onSelect,
}: {
  venue: Venue;
  fit: "confirmed" | "unconfirmed" | null;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full text-left p-3.5 rounded-2xl bg-white hover:bg-[#fbf9f5] border border-[#e7e0d4] hover:border-[#1a7a4a]/50 transition-all cursor-pointer flex flex-col gap-1.5 active:scale-[0.99]"
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col min-w-0">
          <h4 className="text-[1.0625rem] font-bold text-[#221d18] leading-snug">
            {venue.chain && venue.chain !== venue.branchName ? `${venue.chain} ` : ""}
            {venue.branchName}
          </h4>
          <span className="text-[1rem] text-[#6d675f] mt-0.5">{venue.area}</span>
        </div>
        <FitPill fit={fit} />
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-[1rem] text-[#6d675f] truncate">
          {venue.categories.join(", ")}
        </span>
        <span className="text-[1rem] font-bold text-[#1a7a4a] shrink-0">
          {venue.distance ? `${venue.distance} km` : ""}
        </span>
      </div>
    </button>
  );
}

// Mobile: a real bottom sheet with peek/half/full stops so the map is always
// part of the experience (never a fullscreen panel that hides it). Desktop:
// the floating sidebar beside the always-visible map, unchanged in shape.
export default function MobileDrawer({
  confirmed,
  unconfirmed,
  activeVenue,
  onClearActiveVenue,
  filters,
  onUpdateFilter,
  onResetFilters,
  categories,
  areas,
  onOpenShare,
  mobileView,
  onSetMobileView,
  showDetails,
  backLabel,
  onSelectFromList,
}: MobileDrawerProps) {
  const total = confirmed.length + unconfirmed.length;
  const ageActive = filters.ageMonths !== null;

  const isDesktop = useIsDesktop();
  const winH = useWindowHeight();
  const stops: Record<Snap, number> = {
    // Tall enough for BOTH summary pill rows (44px chips + gap + padding) -
    // anything shorter clips pills mid-row and makes them look broken.
    peek: 246,
    half: Math.round(winH * 0.52),
    full: winH - 12,
  };

  const [snap, setSnap] = useState<Snap>("peek");
  const [dragH, setDragH] = useState<number | null>(null);
  const dragRef = useRef<{ startY: number; startH: number } | null>(null);
  const movedRef = useRef(false);
  // Last view we pushed up, so prop echoes don't fight the user's drag.
  const lastEmittedView = useRef<"list" | "map">("map");

  // External view requests land on the sheet: list = full, map = peek.
  useEffect(() => {
    if (mobileView === lastEmittedView.current) return;
    lastEmittedView.current = mobileView;
    setSnap(mobileView === "list" ? "full" : "peek");
  }, [mobileView]);

  // Details always take the full sheet.
  useEffect(() => {
    if (showDetails) setSnap("full");
  }, [showDetails]);

  const emitView = useCallback(
    (s: Snap) => {
      const view = s === "full" ? "list" : "map";
      if (view !== lastEmittedView.current) {
        lastEmittedView.current = view;
        onSetMobileView(view);
      }
    },
    [onSetMobileView]
  );

  const snapTo = useCallback(
    (s: Snap) => {
      setSnap(s);
      emitView(s);
    },
    [emitView]
  );

  // Tap or Enter/Space on the handle cycles peek -> half -> full so the
  // sheet is reachable without a drag gesture (touch, keyboard, switch).
  const toggleSnap = useCallback(() => {
    const ordered: Snap[] = ["peek", "half", "full"];
    snapTo(ordered[(ordered.indexOf(snap) + 1) % ordered.length]);
  }, [snap, snapTo]);

  // Dragging the handle: track, then snap to the nearest stop on release.
  const onHandleDown = useCallback(
    (e: React.PointerEvent) => {
      if (isDesktop) return;
      e.preventDefault();
      const startH = dragH ?? stops[snap];
      dragRef.current = { startY: e.clientY, startH };
      movedRef.current = false;
      const move = (ev: PointerEvent) => {
        const d = dragRef.current;
        if (!d) return;
        if (Math.abs(d.startY - ev.clientY) > 6) movedRef.current = true;
        const next = d.startH + (d.startY - ev.clientY);
        setDragH(Math.max(stops.peek - 24, Math.min(stops.full, next)));
      };
      const up = (ev: PointerEvent) => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        const d = dragRef.current;
        dragRef.current = null;
        if (!d) return;
        const finalH = Math.max(stops.peek - 24, Math.min(stops.full, d.startH + (d.startY - ev.clientY)));
        setDragH(null);
        const ordered: Snap[] = ["peek", "half", "full"];
        const nearest = ordered.reduce((best, s) =>
          Math.abs(stops[s] - finalH) < Math.abs(stops[best] - finalH) ? s : best
        );
        snapTo(nearest);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [isDesktop, dragH, snap, stops.peek, stops.half, stops.full, snapTo]
  );

  // Picking an area or activity collapses the sheet to peek so the map's
  // glide to the matches is visible — the map answers the filter.
  const handleFilter = useCallback(
    <K extends keyof VenueFilterState>(key: K, value: VenueFilterState[K]) => {
      onUpdateFilter(key, value);
      if (!isDesktop && (key === "area" || key === "category")) snapTo("peek");
    },
    [onUpdateFilter, isDesktop, snapTo]
  );

  // Hidden while a bottom selection card owns the
  // space. Desktop always shows the sidebar.
  const mobileHidden = !!activeVenue && !showDetails;

  const sheetH = dragH ?? stops[snap];

  const header = (
    <div className="px-4 pt-1 pb-2 shrink-0">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#1a7a4a] flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4.5 h-4.5 text-white"
              aria-hidden="true"
            >
              <path d="M3.5 17.5c5.667 4.667 11.333 4.667 17 0" />
              <path d="M19 18.5l-2 -8.5l1 -2l2 1l1.5 -1.5l-2.5 -4.5c-5.052 .218 -5.99 3.133 -7 6h-6a3 3 0 0 0 -3 3" />
              <path d="M5 18.5l2 -9.5" />
              <path d="M8 20l2 -5h4l2 5" />
            </svg>
          </div>
          <span className="flex text-[1rem] font-bold text-[#221d18] tracking-tight items-center gap-1.5">
            <span className="whitespace-nowrap">Map Explora</span>
            <span className="text-[0.8125rem] px-2 py-0.5 rounded-full bg-[#e3f2e8] text-[#14532d] font-bold whitespace-nowrap">
              Under 5
            </span>
          </span>
        </div>
        <span className="text-[0.9375rem] font-semibold text-[#6d675f] whitespace-nowrap">
          {total} {total === 1 ? "place" : "places"}
        </span>
      </div>
    </div>
  );

  return (
    <aside
      aria-label="Under-5 class places and filters"
      style={isDesktop ? undefined : { height: mobileHidden ? 0 : sheetH }}
      className={`
        fixed z-[1000] flex-col
        bottom-0 left-0 right-0 rounded-t-3xl
        bg-[#f6f2ec] border-t border-x border-[#e7e0d4]
        shadow-[0_-6px_24px_rgba(34,29,24,0.14)]
        md:top-6 md:left-6 md:right-auto md:bottom-auto md:w-[26rem] md:h-[calc(100dvh-48px)]
        md:border md:rounded-3xl md:shadow-[0_4px_24px_rgba(34,29,24,0.10)]
        ${dragH !== null ? "" : "transition-[height] duration-200 ease-out"}
        ${mobileHidden ? "hidden md:flex" : "flex"}
      `}
    >
      {/* Drag handle (mobile only) */}
      <div
        className="md:hidden shrink-0 h-11 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={onHandleDown}
        onClick={() => { if (!movedRef.current) toggleSnap(); }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleSnap(); }
        }}
        role="button"
        tabIndex={0}
        aria-label="Place list size. Tap or press Enter to cycle peek, half and full, or drag."
      >
        <div className="w-10 h-1.5 rounded-full bg-[#d8d0c2]" />
      </div>

      {header}

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 pt-1 pb-3 flex flex-col gap-3">
        {activeVenue && showDetails ? (
          <VenueDetails
            venue={activeVenue}
            onBack={onClearActiveVenue}
            backLabel={backLabel}
            onOpenShare={onOpenShare}
          />
        ) : (
          <>
            {/* Search Input */}
            <div className="relative w-full shrink-0">
              <Search className="w-4.5 h-4.5 text-[#6d675f] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search class, brand, area, or street"
                value={filters.searchQuery}
                onFocus={() => { if (!isDesktop && snap === "peek") snapTo("half"); }}
                onChange={(e) => handleFilter("searchQuery", e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#e7e0d4] rounded-2xl text-[1rem] text-[#221d18] placeholder-[#6d675f] focus:outline-none focus:border-[#1a7a4a] focus:ring-2 focus:ring-[#1a7a4a]/20"
              />
            </div>

            {/* Filters */}
            <FilterBar
              filters={filters}
              onUpdateFilter={handleFilter}
              onResetFilters={onResetFilters}
              categories={categories}
              areas={areas}
              onOpenPanel={() => { if (!isDesktop && snap === "peek") snapTo("half"); }}
            />

            {/* Venue List */}
            <div className="flex flex-col gap-2.5 pt-1 pb-4">
              {total === 0 ? (
                <div className="py-8 text-center text-[1rem] text-[#6d675f] flex flex-col items-center gap-2">
                  <MapPin className="w-7 h-7 text-[#d8d0c2]" />
                  {categories.length === 0 ? (
                    <span>The class dataset is being verified and will appear here soon.</span>
                  ) : (
                    <span>No places match your active filters.</span>
                  )}
                  <button
                    type="button"
                    onClick={onResetFilters}
                    className="text-[#1a7a4a] font-semibold underline text-[1rem] mt-1"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <>
                  {ageActive && (
                    <span className="text-[1rem] font-semibold text-[#14532d]">
                      Confirmed for this age: {confirmed.length}
                    </span>
                  )}
                  {confirmed.map((venue) => (
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      fit={ageActive ? "confirmed" : null}
                      onSelect={() => onSelectFromList(venue)}
                    />
                  ))}
                  {ageActive && unconfirmed.length > 0 && (
                    <span className="text-[1rem] font-semibold text-[#92400e] flex items-center gap-1.5 pt-2">
                      <HelpCircle className="w-4 h-4" />
                      <span>Age not confirmed, check with the branch: {unconfirmed.length}</span>
                    </span>
                  )}
                  {ageActive &&
                    unconfirmed.map((venue) => (
                      <VenueCard
                        key={venue.id}
                        venue={venue}
                        fit="unconfirmed"
                        onSelect={() => onSelectFromList(venue)}
                      />
                    ))}
                </>
              )}

              {/* Coverage honesty + attribution live in the scroll flow. */}
              <div className="pb-2 pt-1 text-center flex flex-col gap-1">
                <span className="text-[0.75rem] text-[#6d675f]">
                  Baby and toddler classes in Jabodetabek. Strongest coverage for ages 0-3; classes for 4-year-olds are being added.
                </span>
                <span className="text-[0.6875rem] text-[#6d675f] md:hidden">
                  Map: OpenFreeMap, © OpenMapTiles, data © OpenStreetMap contributors
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      {activeVenue && showDetails && (
        <nav aria-label="Place actions" className="md:hidden shrink-0 border-t border-[#e7e0d4] bg-[#f6f2ec] px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] flex items-center gap-3">
          <button type="button" onClick={() => onSetMobileView("map")} className="min-h-12 px-2 flex items-center gap-1 text-[#1a7a4a] font-semibold text-[0.9375rem]">
            <ArrowLeft className="w-4 h-4" /> Back to map
          </button>
          <a href={buildMapsLink(activeVenue)} target="_blank" rel="noopener noreferrer" className="min-h-12 flex-1 flex items-center justify-center gap-2 px-4 rounded-full bg-[#1a7a4a] text-white font-bold text-[1rem]" aria-label={activeVenue.coordinateSource === "area-approximate" || activeVenue.caution ? "Search in Google Maps" : "Directions in Google Maps"}>
            <Navigation className="w-4 h-4" />{activeVenue.coordinateSource === "area-approximate" || activeVenue.caution ? "Search Maps" : "Directions"}<ExternalLink className="w-3.5 h-3.5" />
          </a>
        </nav>
      )}
    </aside>
  );
}
// Trailing sentinel: absorbs the web editor last-line indent artifact.
