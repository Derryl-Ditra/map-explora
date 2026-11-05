"use client";

import { useState, useCallback, useEffect, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useVenueFilters } from "@/hooks/useVenueFilters";
import { Venue, VenueFilterState } from "@/types/venue";
import MobileDrawer from "./ui/MobileDrawer";
import ShareCard from "./ui/ShareCard";
import SelectionCard from "./ui/SelectionCard";
import { Crosshair, Loader2, Moon, Sun, MapPin, X } from "lucide-react";

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
  const [activeVenue, setActiveVenue] = useState<Venue | null>(null);
  const [showShareCard, setShowShareCard] = useState(false);
  const [mapStyle, setMapStyle] = useState<"dark" | "light">("dark");
  // Mobile is map-first: the map is the default view. The list, search and
  // filters open from the "places" bar or the List toggle.
  const [mobileView, setMobileView] = useState<"list" | "map">("map");
  // Full detail page open on mobile. A pin tap shows a bottom card instead,
  // so the map stays visible.
  const [detailOpen, setDetailOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const showDetails = !!activeVenue && (detailOpen || isDesktop);
  // Location notice: dismissible, auto-hides, never covers sheet controls.
  const [locationNoticeGone, setLocationNoticeGone] = useState(false);
  // Bumped when the area or activity filter changes so the map frames all matches.
  const [fitTick, setFitTick] = useState(0);
  const handleSelectVenue = useCallback(
    (venue: Venue, openDetails = false) => {
      setActiveVenue(venue);
      setDetailOpen(openDetails);
    },
    []
  );

  const handleSelectFromList = useCallback(
    (venue: Venue) => handleSelectVenue(venue, true),
    [handleSelectVenue]
  );

  const handleClearActiveVenue = useCallback(() => {
    setActiveVenue(null);
    setDetailOpen(false);
  }, []);

  // Back from Details on a phone map returns to the map card; elsewhere it
  // returns to the full list.
  const handleBackFromDetails = useCallback(() => {
    if (!isDesktop && mobileView === "map") setDetailOpen(false);
    else handleClearActiveVenue();
  }, [isDesktop, mobileView, handleClearActiveVenue]);

  const handleSetView = useCallback((view: "list" | "map") => {
    setMobileView(view);
    setDetailOpen(false);
  }, []);

  // Reset the dismissal when the location state changes; auto-hide after 8s.
  useEffect(() => {
    setLocationNoticeGone(false);
    if (!locationError) return;
    const t = setTimeout(() => setLocationNoticeGone(true), 8000);
    return () => clearTimeout(t);
  }, [locationError]);

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
      {locationError && !locationNoticeGone && (
        <div className="absolute bottom-[266px] md:bottom-auto md:top-4 left-1/2 -translate-x-1/2 z-[1001] w-[min(92vw,340px)]">
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
          onSelectVenue={handleSelectVenue}
          userPos={userPos}
          showUserMarker={hasActualLocation}
          userAccuracy={accuracy}
          mapStyle={mapStyle}
          recenterTick={recenterTick}
          fitTick={fitTick}
        />
      </div>

      {/* Floating Map Controls (Top-Right) */}
      <div className="absolute top-4 right-4 z-[500] flex flex-col gap-2">
        <button
          type="button"
          onClick={refresh}
          title="Locate My Position"
          className="w-12 h-12 rounded-full bg-white border border-[#e7e0d4] shadow-md text-[#4a443c] hover:text-[#221d18] flex items-center justify-center active:scale-95 transition-all"
        >
          {isLocating ? (
            <Loader2 className="w-5 h-5 animate-spin text-[#1a7a4a]" />
          ) : (
            <Crosshair className="w-5 h-5" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setMapStyle((prev) => (prev === "dark" ? "light" : "dark"))}
          title="Toggle Map Style"
          className="w-12 h-12 rounded-full bg-white border border-[#e7e0d4] shadow-md text-[#4a443c] hover:text-[#221d18] flex items-center justify-center active:scale-95 transition-all"
        >
          {mapStyle === "dark" ? (
            <Sun className="w-5 h-5 text-[#4a443c]" />
          ) : (
            <Moon className="w-5 h-5 text-[#4a443c]" />
          )}
        </button>
      </div>

      {/* Mobile-Native Bottom Sheet / Desktop Floating HUD */}
      <MobileDrawer
        confirmed={confirmed}
        unconfirmed={unconfirmed}
        activeVenue={activeVenue}
        onSelectFromList={handleSelectFromList}
        showDetails={showDetails}
        backLabel={!isDesktop && mobileView === "map" ? "Back to map" : "All places"}
        onClearActiveVenue={handleBackFromDetails}
        filters={filters}
        onUpdateFilter={handleUpdateFilter}
        onResetFilters={handleResetFilters}
        categories={categories}
        areas={areas}
        onOpenShare={() => setShowShareCard(true)}
        mobileView={mobileView}
        onSetMobileView={handleSetView}
      />

      {/* Mobile map view: selected place as a bottom card */}
      {activeVenue && mobileView === "map" && !detailOpen && (
        <SelectionCard
          venue={activeVenue}
          onDetails={() => setDetailOpen(true)}
          onClose={handleClearActiveVenue}
        />
      )}

      {/* Meta Threads Share Card Modal */}
      {showShareCard && activeVenue && (
        <ShareCard
          venue={activeVenue}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
  );
}
// Trailing sentinel: absorbs the web editor last-line indent artifact.
