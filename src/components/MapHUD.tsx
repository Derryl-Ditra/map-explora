"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useVenueFilters } from "@/hooks/useVenueFilters";
import { useRouting } from "@/hooks/useRouting";
import { Venue } from "@/types/venue";
import { calculateDistance } from "@/utils/geo";
import MobileDrawer from "./ui/MobileDrawer";
import ShareCard from "./ui/ShareCard";
import { Crosshair, Loader2, Moon, Sun, MapPin } from "lucide-react";

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

const ARRIVAL_RADIUS_KM = 0.15;

export default function MapHUD() {
  const {
    userPos,
    accuracy,
    heading,
    hasActualLocation,
    isLocating,
    error: locationError,
    recenterTick,
    requestRecenter,
  } = useGeolocation();
  // Distances are only computed from a real fix. Without location
  // permission we must not imply proximity to the default map center.
  const { filters, updateFilter, resetFilters, categories, areas, confirmed, unconfirmed } =
    useVenueFilters(hasActualLocation ? userPos : null);
  const [activeVenue, setActiveVenue] = useState<Venue | null>(null);
  const [showShareCard, setShowShareCard] = useState(false);
  const [mapStyle, setMapStyle] = useState<"dark" | "light">("light");
  // Mobile is discovery-first: list is the default view; the map takes the
  // full viewport only when the parent chooses Map or taps Navigate.
  const [mobileView, setMobileView] = useState<"list" | "map">("list");

  const [isNavigating, setIsNavigating] = useState(false);
  const [followUser, setFollowUser] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Route origin is frozen when a venue is picked. Live GPS keeps
  // updating the position marker, but we never re-route continuously:
  // one route request per venue pick, inside the OSRM demo limits.
  const [routeOrigin, setRouteOrigin] = useState<[number, number] | null>(null);

  // Never route to pins we cannot stand behind: approximate area centroids
  // and venues with an unresolved identity conflict are not routable.
  const activeVenueRoutable =
    !!activeVenue &&
    activeVenue.coordinateSource !== "area-approximate" &&
    !activeVenue.caution;

  const { route, isLoading: isRouting, error: routingError } = useRouting({
    origin: activeVenueRoutable ? routeOrigin : null,
    destination: activeVenueRoutable && activeVenue ? [activeVenue.lat, activeVenue.lng] : null,
  });

  const handleSelectVenue = useCallback(
    (venue: Venue) => {
      setActiveVenue(venue);
      // No route request on selection: routing only starts when the user
      // taps Navigate, so we never send position to the OSRM demo server
      // before they ask for directions. Straight-line distance still shows.
      setRouteOrigin(null);
      setArrived(false);
      setStepIndex(0);
    },
    []
  );

  const handleClearActiveVenue = useCallback(() => {
    setActiveVenue(null);
    setIsNavigating(false);
    setFollowUser(false);
    setArrived(false);
    setStepIndex(0);
  }, []);

  const handleStartNavigation = useCallback(() => {
    setRouteOrigin(userPos);
    setMobileView("map");
    setIsNavigating(true);
    setFollowUser(true);
    setArrived(false);
    setStepIndex(0);
  }, [userPos]);

  const handleExitNavigation = useCallback(() => {
    setIsNavigating(false);
    setFollowUser(false);
    setArrived(false);
  }, []);

  const handleLocate = useCallback(() => {
    requestRecenter();
    if (isNavigating) setFollowUser(true);
  }, [requestRecenter, isNavigating]);

  // Arrival detection: within ~150 m of the venue while navigating.
  useEffect(() => {
    if (!isNavigating || !activeVenue || !hasActualLocation || !userPos || arrived) return;
    const d = calculateDistance(userPos[0], userPos[1], activeVenue.lat, activeVenue.lng);
    if (d <= ARRIVAL_RADIUS_KM) setArrived(true);
  }, [isNavigating, activeVenue, hasActualLocation, userPos, arrived]);

  // Advance the turn instruction as the user reaches each maneuver point (~30 m).
  useEffect(() => {
    if (!isNavigating || !route?.steps || !hasActualLocation || !userPos || arrived) return;
    const steps = route.steps;
    if (stepIndex >= steps.length - 1) return;
    const [mLng, mLat] = steps[stepIndex].location;
    if (!mLng && !mLat) return;
    const d = calculateDistance(userPos[0], userPos[1], mLat, mLng);
    if (d <= 0.03) setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }, [isNavigating, route, hasActualLocation, userPos, stepIndex, arrived]);

  const firstStep = route?.steps && route.steps.length > 0 ? route.steps[stepIndex].instruction : null;

  return (
    <div className="relative h-dvh w-screen bg-[#f6f2ec] overflow-hidden flex flex-col font-sans select-none">
      <h1 className="sr-only">Map Explora - Under-4 baby and toddler classes in Jakarta and Jabodetabek</h1>

      {/* Location permission notice */}
      {locationError && (
        <div className="absolute top-[76px] md:top-4 left-1/2 -translate-x-1/2 z-[1001] max-w-[90vw]">
          <div className="bg-white border border-[#e7e0d4] rounded-2xl px-3.5 py-2.5 text-[0.9375rem] text-[#4a443c] shadow-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#92400e] shrink-0" />
            <span>{locationError}</span>
          </div>
        </div>
      )}

      {/* Active Navigation HUD Banner (Top of Screen) */}
      {isNavigating && activeVenue && (
        <div className="absolute top-4 left-4 right-16 md:left-24 md:right-auto md:w-[380px] z-[1001]">
          <div className="bg-white border border-[#e7e0d4] rounded-2xl p-4 shadow-lg flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className={`inline-flex rounded-full h-2 w-2 ${arrived ? "bg-emerald-500" : "bg-[#1a7a4a]"}`} />
                <span className="text-[0.875rem] text-[#6d675f] font-bold">
                  {arrived ? "Arrived" : "Navigation active"}
                </span>
              </div>
              <button
                type="button"
                onClick={handleExitNavigation}
                className="text-[0.875rem] font-semibold text-[#6d675f] hover:text-[#221d18] bg-[#f6f2ec] hover:bg-[#f0ece4] px-2.5 py-1.5 rounded-full border border-[#e7e0d4] transition-colors"
              >
                Exit
              </button>
            </div>

            {arrived ? (
              <div className="flex flex-col gap-1">
                <h3 className="text-[1rem] font-bold text-[#221d18] leading-tight">
                  {activeVenue.chain && activeVenue.chain !== activeVenue.branchName ? `${activeVenue.chain} - ` : ""}{activeVenue.branchName}
                </h3>
                <p className="text-[0.9375rem] text-[#4a443c]">
                  {activeVenue.area} • {activeVenue.categories.join(", ")}
                </p>
              </div>
            ) : (
              <div className="flex justify-between items-end gap-2">
                <div className="min-w-0">
                  <h3 className="text-[1rem] font-bold text-[#221d18] leading-tight truncate">
                    {activeVenue.chain && activeVenue.chain !== activeVenue.branchName ? `${activeVenue.chain} ` : ""}{activeVenue.branchName}
                  </h3>
                  <p className="text-[0.875rem] text-[#6d675f] truncate">
                    {isRouting
                      ? "Calculating route..."
                      : routingError
                      ? "Routing unavailable, distance below is straight-line"
                      : firstStep ?? activeVenue.area}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[1.0625rem] font-bold text-[#1a7a4a]">
                    {route ? `${route.distance_km} km` : `${activeVenue.distance || 0} km`}
                  </div>
                  <div className="text-[0.8125rem] text-[#6d675f]">
                    {route ? `~${route.duration_min} min drive` : `~${activeVenue.eta || 15} min straight-line`}
                  </div>
                </div>
              </div>
            )}
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
          userHeading={heading}
          route={route}
          mapStyle={mapStyle}
          recenterTick={recenterTick}
          isNavigating={isNavigating}
          followUser={followUser}
          onUserPan={() => setFollowUser(false)}
        />
      </div>

      {/* Floating Map Controls (Top-Right) */}
      <div className="absolute top-4 right-4 z-[500] flex flex-col gap-2">
        <button
          type="button"
          onClick={handleLocate}
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
        onSelectVenue={handleSelectVenue}
        onClearActiveVenue={handleClearActiveVenue}
        filters={filters}
        onUpdateFilter={updateFilter}
        onResetFilters={resetFilters}
        categories={categories}
        areas={areas}
        route={route}
        isRouting={isRouting}
        routingError={routingError}
        onOpenShare={() => setShowShareCard(true)}
        onStartNavigation={handleStartNavigation}
        mobileView={mobileView}
        onSetMobileView={setMobileView}
        isNavigating={isNavigating}
        canNavigate={hasActualLocation}
      />

      {/* Meta Threads Share Card Modal */}
      {showShareCard && activeVenue && (
        <ShareCard
          venue={activeVenue}
          route={route}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
  );
}
