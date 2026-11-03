"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import { Venue, VenueFilterState } from "@/types/venue";
import { RouteData } from "@/types/route";
import FilterBar from "./FilterBar";
import VenueDetails from "./VenueDetails";
import { Search, Baby, MapPin, HelpCircle, ShieldCheck } from "lucide-react";

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
  route: RouteData | null;
  isRouting: boolean;
  routingError?: string | null;
  onOpenShare: () => void;
  onStartNavigation?: () => void;
  mobileView: "list" | "map";
  onSetMobileView: (view: "list" | "map") => void;
  isNavigating: boolean;
  canNavigate: boolean;
  showDetails: boolean;
  backLabel: string;
  onSelectFromList: (venue: Venue) => void;
  onShowListFromMap: () => void;
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
  route,
  isRouting,
  routingError,
  onOpenShare,
  onStartNavigation,
  mobileView,
  onSetMobileView,
  isNavigating,
  canNavigate,
  showDetails,
  backLabel,
  onSelectFromList,
}: MobileDrawerProps) {
  const total = confirmed.length + unconfirmed.length;
  const ageActive = filters.ageMonths !== null;
  const filtersActive =
    ageActive || filters.area !== "ALL" || filters.category !== "ALL" || filters.searchQuery.trim() !== "";

  const isDesktop = useIsDesktop();
  const winH = useWindowHeight();
  const stops: Record<Snap, number> = {
    peek: 156,
    half: Math.round(winH * 0.52),
    full: winH - 12,
  };

  const [snap, setSnap] = useState<Snap>("peek");
  const [dragH, setDragH] = useState<number | null>(null);
  const dragRef = useRef<{ startY: number; startH: number } | null>(null);
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

  // Dragging the handle: track, then snap to the nearest stop on release.
  const onHandleDown = useCallback(
    (e: React.PointerEvent) => {
      if (isDesktop) return;
      e.preventDefault();
      const startH = dragH ?? stops[snap];
      dragRef.current = { startY: e.clientY, startH };
      const move = (ev: PointerEvent) => {
        const d = dragRef.current;
        if (!d) return;
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

  // Hidden only while navigating or while a bottom selection card owns the
  // space. Desktop always shows the sidebar.
  const mobileHidden = isNavigating || (!!activeVenue && !showDetails);

  const sheetH = dragH ?? stops[snap];

  const header = (
    <div className="px-4 pt-1 pb-2 shrink-0">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#1a7a4a] flex items-center justify-center shrink-0">
            <Baby className="w-4.5 h-4.5 text-white" />
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
        className="md:hidden shrink-0 pt-2.5 pb-1.5 cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={onHandleDown}
        role="separator"
        aria-orientation="horizontal"
        aria-label="Drag to resize the place list"
      >
        <div className="w-10 h-1.5 rounded-full bg-[#d8d0c2] mx-auto" />
      </div>

      {header}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-1 pb-3 flex flex-col gap-3">
        {activeVenue && showDetails ? (
          <VenueDetails
            venue={activeVenue}
            route={route}
            isRouting={isRouting}
            routingError={routingError}
            onBack={onClearActiveVenue}
            backLabel={backLabel}
            onOpenShare={onOpenShare}
            onStartInAppNavigation={onStartNavigation}
            canNavigate={canNavigate}
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
              categories={categories}
              areas={areas}
            />

            {filtersActive && (
              <div className="flex justify-end -mt-1">
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="text-[0.9375rem] font-semibold text-[#1a7a4a] underline underline-offset-2"
                >
                  Reset filters
                </button>
              </div>
            )}

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
    </aside>
  );
}
// Trailing sentinel: absorbs the web editor last-line indent artifact.
