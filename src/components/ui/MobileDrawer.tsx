"use client";

import { useLayoutEffect, useRef, useCallback, useSyncExternalStore } from "react";
import { Venue, VenueFilterState } from "@/types/venue";
import { buildMapsLink } from "@/utils/mapsLink";
import {matchingAgeRanges, type AgeBandId} from '@/utils/ageBands';
import { cardAgeSummary, cardRatingSummary } from "@/utils/venueSummary";
import { useSheetGesture } from "@/hooks/useSheetGesture";
import FilterBar from "./FilterBar";
import VenueDetails from "./VenueDetails";
import { Search, MapPin, HelpCircle, ShieldCheck, Navigation, ArrowLeft, Share2, ExternalLink, X } from "lucide-react";

interface MobileDrawerProps {
  desktopCollapsed: boolean;
  onHideSidebar: () => void;
  confirmed: Venue[];
  unconfirmed: Venue[];
  activeVenue: Venue | null;
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
  onSelectFromList: (venue: Venue) => void;
  ageOpenTick?: number;
  onDismissToMap: () => void;
  onLocate: () => void;
  isLocating: boolean;
  hasActualLocation: boolean;
  locationNotice: string | null;
  onDismissLocationNotice: () => void;
}

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

function FitPill({ fit }: { fit: "confirmed" | "unconfirmed" | null }) {
  if (fit === "confirmed") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e3f2e8] text-[#14532d] text-[0.875rem] font-bold shrink-0">
        <ShieldCheck className="w-3.5 h-3.5" />
        Age overlap
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
  onSelect, ageBand,
}: {
  venue: Venue;
  ageBand?: AgeBandId | null;
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
          <h2 className="text-[1.0625rem] font-bold text-[#221d18] leading-snug">
            {venue.chain && venue.chain !== venue.branchName ? `${venue.chain} ` : ""}
            {venue.branchName}
          </h2>
          <span className="text-[1rem] text-[#6d675f] mt-0.5">{venue.area}</span>
        </div>
        <FitPill fit={fit} />
      </div>

      {ageBand && fit==='confirmed' && <span className="text-sm text-[#14532d]">Verified ages: {matchingAgeRanges(venue,ageBand).join('; ')}</span>}
      {!(ageBand && fit === 'confirmed') && (
        <span className="text-[0.875rem] text-[#4a443c]">{cardAgeSummary(venue)}</span>
      )}
      <span className="text-[0.875rem] text-[#4a443c]">{cardRatingSummary(venue)}</span>
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

// Mobile has two explicit modes. The detail action returns directly to the map.
export default function MobileDrawer({
  desktopCollapsed, onHideSidebar,
  confirmed,
  unconfirmed,
  activeVenue,
  filters,
  onUpdateFilter,
  onResetFilters,
  categories,
  areas,
  onOpenShare,
  mobileView,
  onSetMobileView,
  showDetails,
  onSelectFromList,
  ageOpenTick,
  onDismissToMap, onLocate, isLocating, hasActualLocation, locationNotice, onDismissLocationNotice,
}: MobileDrawerProps) {
  const total = confirmed.length;
  const ageActive = filters.ageBand !== null;
  const hasAny = confirmed.length + unconfirmed.length > 0;

  const isDesktop = useIsDesktop();
  const mobileHidden = mobileView === "map" && !showDetails;
  const { sheet, handle, content: detailsScrollRef } = useSheetGesture(!isDesktop && !mobileHidden, onDismissToMap);
  const listScrollRef = useRef(0);
  const wasDetails = useRef(false);
  useLayoutEffect(() => {
    const el = detailsScrollRef.current;
    if (!el) return;
    if (showDetails) {
      el.scrollTo({ top: 0 });
    } else if (wasDetails.current) {
      el.scrollTo({ top: listScrollRef.current });
    }
    wasDetails.current = showDetails;
  }, [activeVenue?.id, showDetails, detailsScrollRef]);
  useLayoutEffect(() => {
    if (ageOpenTick) detailsScrollRef.current?.scrollTo({ top: 0 });
  }, [ageOpenTick, detailsScrollRef]);
  const handleFilter = useCallback(
    <K extends keyof VenueFilterState>(key: K, value: VenueFilterState[K]) => onUpdateFilter(key, value),
    [onUpdateFilter]
  );

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
      id="places-sidebar"
      ref={sheet}
      aria-label="Under-5 class places and filters"
      style={isDesktop ? undefined : { height: "97dvh" }}
      className={`
        fixed z-[1000] flex-col transition-transform duration-200 motion-reduce:transition-none
        bottom-0 left-0 right-0 rounded-t-3xl
        bg-[#f6f2ec] border-t border-x border-[#e7e0d4]
        shadow-[0_-6px_24px_rgba(34,29,24,0.14)]
        md:top-6 md:left-6 md:right-auto md:bottom-auto md:w-[26rem] md:h-[calc(100dvh-48px)]
        md:border md:rounded-3xl md:shadow-[0_4px_24px_rgba(34,29,24,0.10)]
        
        ${mobileHidden ? "hidden" : "flex"} ${desktopCollapsed ? "md:hidden" : "md:flex"}
      `}
    >
      {<button ref={handle} type="button" aria-label={showDetails ? "Close place and return to map" : "Close list and return to map"} onClick={onDismissToMap} className="md:hidden h-8 shrink-0 flex items-center justify-center touch-none cursor-grab active:cursor-grabbing"><span className="w-10 h-1 rounded-full bg-[#aaa297]" /></button>}
      <div className="hidden md:flex justify-end px-4 pt-2 shrink-0"><button type="button" aria-controls="places-sidebar" aria-expanded={true} onClick={onHideSidebar} className="min-h-10 px-3 rounded-full text-[#14532d] font-semibold hover:bg-white">Hide sidebar</button></div>
      {header}



      {/* Content */}
      <div ref={detailsScrollRef} className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pt-1 pb-3 flex flex-col gap-3">
        {activeVenue && showDetails ? (
          <VenueDetails
            venue={activeVenue}
          />
        ) : (
          <>
            <button type="button" onClick={onLocate} disabled={isLocating} className="md:hidden shrink-0 min-h-12 rounded-xl bg-[#1a7a4a] text-white font-semibold py-2 px-3 disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a7a4a]"><span className="block">{isLocating ? "Finding your location..." : hasActualLocation ? "Center on my location" : "Use my location"}</span><span className="block text-xs font-normal">{hasActualLocation ? "Location available" : "Find classes near you"}</span></button>
            {locationNotice && <div role="status" className="flex items-center gap-2 rounded-2xl border border-[#e7e0d4] bg-white p-3 text-sm text-[#4a443c]">
              <span className="flex-1">{locationNotice}</span>
              <button type="button" aria-label="Dismiss location notice" onClick={onDismissLocationNotice} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"><X className="h-4 w-4" /></button>
            </div>}
            {/* Search Input */}
            <div className="relative w-full shrink-0">
              <Search className="w-4.5 h-4.5 text-[#6d675f] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                aria-label="Search class, brand, area, or street"
                placeholder="Search class, brand, area, or street"
                value={filters.searchQuery}
                
                onChange={(e) => handleFilter("searchQuery", e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#e7e0d4] rounded-2xl text-[1rem] text-[#221d18] placeholder-[#6d675f] focus:outline-none focus:border-[#1a7a4a] focus:ring-2 focus:ring-[#1a7a4a]/20"
              />
            </div>

            {/* Filters */}
            <FilterBar
              key={ageOpenTick ?? 0}
              filters={filters}
              onUpdateFilter={handleFilter}
              onResetFilters={onResetFilters}
              categories={categories}
              areas={areas}
              openAgeTick={ageOpenTick}
            />

            {/* Venue List */}
            <div className="flex flex-col gap-2.5 pt-1 pb-4">
              {!hasAny ? (
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
                      {confirmed.length === 0
                        ? "No confirmed age overlap yet"
                        : `Places with confirmed age overlap: ${confirmed.length}`}
                    </span>
                  )}
                  {confirmed.map((venue) => (
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      ageBand={filters.ageBand}
                      fit={ageActive ? "confirmed" : null}
                      onSelect={() => { listScrollRef.current = detailsScrollRef.current?.scrollTop ?? 0; onSelectFromList(venue); }}
                    />
                  ))}
                  {ageActive && unconfirmed.length > 0 && (
                    <span className="text-[1rem] font-semibold text-[#92400e] flex items-center gap-1.5 pt-2">
                      <HelpCircle className="w-4 h-4" />
                      <span>{confirmed.length === 0 ? "Ask these branches directly" : "Age not confirmed, check with the branch"}: {unconfirmed.length}</span>
                    </span>
                  )}
                  {ageActive &&
                    unconfirmed.map((venue) => (
                      <VenueCard
                        key={venue.id}
                        venue={venue}
                        fit="unconfirmed"
                        onSelect={() => { listScrollRef.current = detailsScrollRef.current?.scrollTop ?? 0; onSelectFromList(venue); }}
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
      {!showDetails && (
        <nav aria-label="Browse views" className="md:hidden shrink-0 border-t border-[#e7e0d4] bg-[#f6f2ec] px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
          <button type="button" onClick={() => onSetMobileView("map")} className="w-full min-h-12 rounded-full bg-[#1a7a4a] text-white font-bold">Map</button>
        </nav>
      )}
      {activeVenue && showDetails && (
        <nav aria-label="Place actions" className=" shrink-0 border-t border-[#e7e0d4] bg-[#f6f2ec] px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2">
          <button type="button" onClick={onDismissToMap} aria-label="Back to map" className="min-h-12 min-w-12 px-2 flex flex-col items-center justify-center gap-0.5 rounded-xl text-[#1a7a4a] hover:bg-[#e3f2e8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a7a4a] font-semibold text-xs leading-tight">
            <ArrowLeft aria-hidden="true" className="w-4 h-4" /><span>Map</span>
          </button>
          <a href={buildMapsLink(activeVenue)} target="_blank" rel="noopener noreferrer" className="min-h-12 min-w-0 flex items-center justify-center gap-1.5 px-2 rounded-full bg-[#1a7a4a] text-white hover:bg-[#145c38] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a7a4a] font-bold text-[1rem]" aria-label={activeVenue.coordinateSource === "area-approximate" || activeVenue.caution ? "Search in Google Maps" : "Directions in Google Maps"}>
            <Navigation className="w-4 h-4" />{activeVenue.coordinateSource === "area-approximate" || activeVenue.caution ? "Search Maps" : "Directions"}<ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button type="button" onClick={onOpenShare} className="min-h-12 min-w-12 px-2 flex flex-col items-center justify-center gap-0.5 rounded-xl border border-[#1a7a4a] bg-white text-[#1a7a4a] hover:bg-[#e3f2e8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a7a4a] font-semibold text-xs leading-tight"><Share2 aria-hidden="true" className="w-4 h-4" /><span>Share</span></button>
        </nav>
      )}
    </aside>
  );
}
// Trailing sentinel: absorbs the web editor last-line indent artifact.
