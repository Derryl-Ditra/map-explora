"use client";

import { Venue, VenueFilterState } from "@/types/venue";
import { RouteData } from "@/types/route";
import FilterBar from "./FilterBar";
import VenueDetails from "./VenueDetails";
import { Search, Baby, MapPin, HelpCircle, ShieldCheck, List, Map as MapIcon } from "lucide-react";

interface MobileDrawerProps {
  confirmed: Venue[];
  unconfirmed: Venue[];
  activeVenue: Venue | null;
  onSelectVenue: (venue: Venue) => void;
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

function ViewToggle({
  value,
  onChange,
}: {
  value: "list" | "map";
  onChange: (view: "list" | "map") => void;
}) {
  return (
    <div className="flex items-center bg-white border border-[#e7e0d4] rounded-full p-1 shrink-0 shadow-sm">
      <button
        type="button"
        onClick={() => onChange("list")}
        aria-pressed={value === "list"}
        className={`flex items-center gap-1.5 px-2.5 min-[360px]:px-3.5 py-2 rounded-full text-[0.9375rem] font-bold transition-colors ${
          value === "list" ? "bg-[#1a7a4a] text-white" : "text-[#6d675f] hover:text-[#221d18]"
        }`}
      >
        <List className="w-4 h-4" />
        <span>List</span>
      </button>
      <button
        type="button"
        onClick={() => onChange("map")}
        aria-pressed={value === "map"}
        className={`flex items-center gap-1.5 px-2.5 min-[360px]:px-3.5 py-2 rounded-full text-[0.9375rem] font-bold transition-colors ${
          value === "map" ? "bg-[#1a7a4a] text-white" : "text-[#6d675f] hover:text-[#221d18]"
        }`}
      >
        <MapIcon className="w-4 h-4" />
        <span>Map</span>
      </button>
    </div>
  );
}

export default function MobileDrawer({
  confirmed,
  unconfirmed,
  activeVenue,
  onSelectVenue,
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
}: MobileDrawerProps) {
  const total = confirmed.length + unconfirmed.length;
  const ageActive = filters.ageMonths !== null;

  // On mobile the panel is a full-screen surface over the map, not a half
  // sheet: parents scan classes first, and open the map on demand. Desktop
  // keeps the floating sidebar beside the always-visible map.
  const mobilePanelHidden = isNavigating || (mobileView === "map" && !activeVenue);

  return (
    <>
      {/* Floating toggle when the map owns the mobile viewport */}
      {mobilePanelHidden && (
        <div className="fixed top-4 left-4 z-[1000] md:hidden">
          <ViewToggle value={mobileView} onChange={onSetMobileView} />
        </div>
      )}

      <aside
        aria-label="Under-4 class places and filters"
        className={`
          fixed inset-0 z-[1000]
          md:top-6 md:left-6 md:right-auto md:bottom-auto md:w-[26rem] md:h-[calc(100dvh-48px)]
          bg-[#f6f2ec] md:border md:border-[#e7e0d4] md:rounded-3xl flex-col
          md:shadow-[0_4px_24px_rgba(34,29,24,0.10)]
          ${mobilePanelHidden ? "hidden md:flex" : "flex"}
        `}
      >
        {/* Brand Header */}
        <div className="px-4 pt-4 pb-2 shrink-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-2xl bg-[#1a7a4a] flex items-center justify-center shrink-0">
                <Baby className="w-5 h-5 text-white" />
              </div>
              <span className="hidden min-[360px]:flex text-[1rem] font-bold text-[#221d18] tracking-tight items-center gap-1.5 flex-wrap">
                <span className="whitespace-nowrap">Map Explora</span>
                <span className="hidden min-[360px]:inline text-[0.8125rem] px-2 py-0.5 rounded-full bg-[#e3f2e8] text-[#14532d] font-bold">
                  Under 4
                </span>
              </span>
            </div>
            <div className="md:hidden">
              <ViewToggle value={mobileView} onChange={onSetMobileView} />
            </div>
          </div>
          <span className="hidden min-[360px]:block text-[0.9375rem] text-[#6d675f] leading-tight mt-1.5">
            Baby and toddler classes in Jabodetabek
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
          {activeVenue ? (
            <VenueDetails
              venue={activeVenue}
              route={route}
              isRouting={isRouting}
              routingError={routingError}
              onBack={onClearActiveVenue}
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
                  onChange={(e) => onUpdateFilter("searchQuery", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#e7e0d4] rounded-2xl text-[1rem] text-[#221d18] placeholder-[#6d675f] focus:outline-none focus:border-[#1a7a4a] focus:ring-2 focus:ring-[#1a7a4a]/20"
                />
              </div>

              {/* Filters */}
              <FilterBar
                filters={filters}
                onUpdateFilter={onUpdateFilter}
                categories={categories}
                areas={areas}
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
                        onSelect={() => onSelectVenue(venue)}
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
                          onSelect={() => onSelectVenue(venue)}
                        />
                      ))}
                  </>
                )}

                {/* Map data attribution lives in the scroll flow: it never
                    occupies a fixed slice of the viewport. The map's own
                    control covers Map mode and desktop. */}
                <div className="pb-2 text-center md:hidden">
                  <span className="text-[0.6875rem] text-[#6d675f]">
                    Map: OpenFreeMap, © OpenMapTiles, data © OpenStreetMap contributors
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
