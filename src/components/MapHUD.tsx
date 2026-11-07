"use client";

import { useState, useCallback, useEffect, useSyncExternalStore, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useVenueFilters } from "@/hooks/useVenueFilters";
import { VenueFilterState } from "@/types/venue";
import MobileDrawer from "./ui/MobileDrawer";
import ShareCard from "./ui/ShareCard";
import {ageBandLabel} from '@/utils/ageBands';
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { HelpCircle, Baby, Crosshair, Loader2, MapPin, X } from "lucide-react";

// Dynamic import for the map (client-only)
const VectorMap = dynamic(() => import("./map/VectorMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#f6f2ec] flex flex-col items-center justify-center gap-3 text-[#6d675f]">
      <Loader2 className="w-8 h-8 text-[#1a7a4a] animate-spin" />
      <span className="text-sm font-semibold">Loading the map...</span>
    </div>
  ),
});


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

export default function MapHUD() {
  const {
    userPos,
    accuracy,
    hasActualLocation,
    isLocating,
    error: locationError,
    recenterTick,
    refresh,
  } = useGeolocation();
  // Distances are only computed from a real fix. Without location
  // permission we must not imply proximity to the default map center.
  const { filters, updateFilter, resetFilters, categories, areas, confirmed, unconfirmed } =
    useVenueFilters(hasActualLocation ? userPos : null);
  const { activeVenue, showShareCard, mobileView, setMode: handleSetView, select: handleSelectVenue, close: handleClearActiveVenue, openShare, dismissToMap } = useAppNavigation();
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const showSidebarButton = useRef<HTMLButtonElement>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const helpMenu = useRef<HTMLDivElement>(null);
  const helpButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!helpOpen) return;
    const close = (event: PointerEvent) => { if (!helpMenu.current?.contains(event.target as Node)) setHelpOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [helpOpen]);
  // Mobile is map-first: the map is the default view. The list, search and
  // filters open from the "places" bar or the List toggle.

  const isDesktop = useIsDesktop();
  const showDetails = !!activeVenue;
  // Location notice: dismissible, auto-hides, never covers sheet controls.
  const [locationNoticeGone, setLocationNoticeGone] = useState(false);
  const [locationAttempt, setLocationAttempt] = useState(0);
  const handleLocate = useCallback(() => {
    setLocationNoticeGone(false);
    setLocationAttempt(n => n + 1);
    refresh();
  }, [refresh]);
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented && activeVenue && !showShareCard) {
        event.preventDefault();
        handleClearActiveVenue();
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [activeVenue, showShareCard, handleClearActiveVenue]);
  // Bumped when the area or activity filter changes so the map frames all matches.
  const [fitTick, setFitTick] = useState(0);
  // Bumped by the map Age pill: opens the list with the age panel ready.
  const [ageOpenTick, setAgeOpenTick] = useState(0);
  const listTouch = useRef<{ x: number; y: number } | null>(null);
  // Pin and list selections open the same detail page, without a preview state.
  const handleSelectFromList = (venue: Parameters<typeof handleSelectVenue>[0]) => {
    setDesktopCollapsed(false);
    handleSelectVenue(venue);
  };
  // Each explicit locate attempt gets a fresh five-second notice window.
  useEffect(() => {

    if (!locationError) return;
    const t = setTimeout(() => setLocationNoticeGone(true), 5000);
    return () => clearTimeout(t);
  }, [locationError, locationAttempt]);

  // Choosing an area or activity moves the map to show every matching place.
  const handleUpdateFilter = useCallback(
    <K extends keyof VenueFilterState>(key: K, value: VenueFilterState[K]) => {
      updateFilter(key, value);
      if (key === "area" || key === "category") setFitTick((t) => t + 1);
    },
    [updateFilter]
  );
  const handleResetFilters = useCallback(() => {
    resetFilters();
    setFitTick((t) => t + 1);
  }, [resetFilters]);

  return (
    <div className="relative h-dvh w-screen bg-[#f6f2ec] overflow-hidden flex flex-col font-sans select-none">
      <h1 className="sr-only">Map Explora - Under-5 baby, toddler and preschool classes in Jakarta and Jabodetabek</h1>

      {/* Location permission notice: above the sheet on phones (never over
          Back/venue names), top-center on desktop. Dismissible, auto-hides. */}
      {locationError && !locationNoticeGone && !activeVenue && mobileView === "map" && (!isDesktop || desktopCollapsed) && (
        <div className="absolute bottom-[90px] md:bottom-auto md:top-4 left-1/2 -translate-x-1/2 z-[1001] w-[min(92vw,340px)]">
          <div className="bg-white border border-[#e7e0d4] rounded-2xl pl-3.5 pr-2 py-2.5 text-[0.9375rem] text-[#4a443c] shadow-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#92400e] shrink-0" />
            <span>{locationError}</span>
            <button
              type="button"
              onClick={() => setLocationNoticeGone(true)}
              aria-label="Dismiss location notice"
              className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[#6d675f] hover:text-[#221d18]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Map Canvas */}
      <div className="absolute inset-0 z-0">
        <VectorMap
          venues={[...confirmed, ...unconfirmed]}
          activeVenueId={activeVenue?.id || null}
          onSelectVenue={handleSelectFromList}
          userPos={userPos}
          showUserMarker={hasActualLocation}
          userAccuracy={accuracy}
          recenterTick={recenterTick}
          fitTick={fitTick}
        />
      </div>

      {/* Floating Map Controls (Top-Right) */}
      <div className="absolute top-4 right-4 z-[500] flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={handleLocate}
          aria-label={isDesktop ? "Use my location" : "Locate My Position"} title="Use my location"
          className="w-12 h-12 rounded-full bg-white border border-[#e7e0d4] shadow-md text-[#4a443c] hover:text-[#221d18] flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          {isLocating ? (
            <Loader2 className="w-5 h-5 animate-spin text-[#1a7a4a]" />
          ) : (
            <Crosshair className="w-5 h-5" />
          )}
        </button>

        <div ref={helpMenu} className="relative" onKeyDown={(event) => { if(event.key === "Escape") { event.stopPropagation(); setHelpOpen(false); helpButton.current?.focus(); } }}>
          <button ref={helpButton} type="button" aria-label="Guides and information" aria-expanded={helpOpen} aria-controls="map-help-menu" onClick={() => setHelpOpen(open => !open)} className="w-12 h-12 rounded-full bg-white border border-[#e7e0d4] shadow-md text-[#4a443c] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#1a7a4a]">
            <HelpCircle className="w-5 h-5" />
          </button>
          {helpOpen && <nav id="map-help-menu" aria-label="Additional information" className="absolute right-0 top-14 w-56 rounded-2xl border border-[#e7e0d4] bg-[#f6f2ec] p-2 shadow-lg text-[#14532d] text-sm font-semibold">
            <Link href="/activities/" className="flex min-h-12 items-center rounded-xl px-3 hover:bg-white focus-visible:outline-2">Class guides</Link>
            <Link href="/venues.json" className="flex min-h-12 items-center rounded-xl px-3 hover:bg-white focus-visible:outline-2">Sources and public data</Link>
            <Link href="/contact/" className="flex min-h-12 items-center rounded-xl px-3 hover:bg-white focus-visible:outline-2">Contact</Link>
            <a href="mailto:derrylditramaneti@gmail.com" className="flex min-h-12 items-center rounded-xl px-3 hover:bg-white focus-visible:outline-2">Email</a>
          </nav>}
        </div>
      </div>

      {desktopCollapsed && <button ref={showSidebarButton} type="button" aria-controls="places-sidebar" aria-expanded={false} onClick={() => setDesktopCollapsed(false)} className="hidden md:flex absolute top-16 left-6 z-[500] min-h-12 px-4 items-center rounded-full bg-[#f6f2ec] border border-[#e7e0d4] shadow-md text-[#14532d] font-bold">Show sidebar</button>}

      {/* Phone: one Age pill on the map, so a child's age is one tap away. */}
      {((!activeVenue && mobileView === "map") || (isDesktop && desktopCollapsed)) && (
        <button
          type="button"
          onClick={() => { if (isDesktop) setDesktopCollapsed(false); handleSetView("list"); setAgeOpenTick((t) => t + 1); }}
          aria-label="Set your child's age"
          className={`${desktopCollapsed ? "md:flex md:top-32 md:left-6" : "md:hidden"} absolute top-4 left-4 z-[500] min-h-12 px-4 rounded-full bg-white border border-[#e7e0d4] shadow-md text-[#14532d] text-[1rem] font-bold flex items-center gap-2 active:scale-95`}
        >
          <Baby className="w-4 h-4 text-[#1a7a4a]" />
          {filters.ageBand === null ? "Age" : ageBandLabel(filters.ageBand)}
        </button>
      )}

      {/* Mobile-Native Bottom Sheet / Desktop Floating HUD */}
      <MobileDrawer
        desktopCollapsed={desktopCollapsed}
        onHideSidebar={() => { setDesktopCollapsed(true); requestAnimationFrame(() => showSidebarButton.current?.focus()); }}
        confirmed={confirmed}
        unconfirmed={unconfirmed}
        activeVenue={activeVenue}
        onSelectFromList={handleSelectFromList}
        showDetails={showDetails}
        backLabel={!isDesktop && mobileView === "map" ? "Back to map" : "Back to list"}
        ageOpenTick={ageOpenTick}
        onClearActiveVenue={handleClearActiveVenue}
        filters={filters}
        onUpdateFilter={handleUpdateFilter}
        onResetFilters={handleResetFilters}
        categories={categories}
        areas={areas}
        onOpenShare={openShare}
        onDismissToMap={dismissToMap}
        onLocate={handleLocate}
        locationNotice={locationError && !locationNoticeGone ? locationError : null}
        onDismissLocationNotice={() => setLocationNoticeGone(true)}
        isLocating={isLocating}
        mobileView={mobileView}
        onSetMobileView={handleSetView}
      />

      {!activeVenue && mobileView === "map" && (
        <button type="button" onClick={() => handleSetView("list")} onTouchStart={(event) => {
            const touch = event.touches.length === 1 ? event.touches[0] : null;
            listTouch.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
          }} onTouchCancel={() => { listTouch.current = null; }} onTouchEnd={(event) => {
            const start = listTouch.current, end = event.changedTouches[0];
            listTouch.current = null;
            // A completed sheet swipe can suppress the browser's next synthetic
            // click. Activate a real tap directly; never activate a drag.
            if (start && end && Math.hypot(end.clientX - start.x, end.clientY - start.y) < 10) {
              event.preventDefault(); handleSetView("list");
            }
          }} className="touch-manipulation md:hidden absolute bottom-[max(20px,env(safe-area-inset-bottom))] left-4 right-4 z-[500] min-h-14 rounded-2xl bg-[#f6f2ec] border border-[#e7e0d4] shadow-md text-[#1a7a4a] font-bold">
          List · {confirmed.length} {confirmed.length === 1 ? "place" : "places"}
        </button>
      )}

      {/* Meta Threads Share Card Modal */}
      {showShareCard && activeVenue && (
        <ShareCard
          venue={activeVenue}
          onClose={handleClearActiveVenue}
        />
      )}
    </div>
  );
}
// Trailing sentinel: absorbs the web editor last-line indent artifact.
