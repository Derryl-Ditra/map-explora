"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useStationFilters } from "@/hooks/useStationFilters";
import { useRouting } from "@/hooks/useRouting";
import { ChargingStation } from "@/types/station";
import { calculateDistance } from "@/utils/geo";
import MobileDrawer from "./ui/MobileDrawer";
import ShareCard from "./ui/ShareCard";
import { Crosshair, Loader2, Moon, Sun, MapPin } from "lucide-react";

// Dynamic import for the map (client-only)
const VectorMap = dynamic(() => import("./map/VectorMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-zinc-950 flex flex-col items-center justify-center gap-3 text-zinc-500">
      <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      <span className="text-xs font-mono tracking-wider uppercase">Loading Map...</span>
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
  const { filters, updateFilter, filteredStations } = useStationFilters(userPos);
  const [activeStation, setActiveStation] = useState<ChargingStation | null>(null);
  const [showShareCard, setShowShareCard] = useState(false);
  const [mapStyle, setMapStyle] = useState<"dark" | "light">("dark");

  const [isNavigating, setIsNavigating] = useState(false);
  const [followUser, setFollowUser] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Route origin is frozen when a station is picked. Live GPS keeps
  // updating the position marker, but we never re-route continuously:
  // one route request per station pick, inside the OSRM demo limits.
  const [routeOrigin, setRouteOrigin] = useState<[number, number] | null>(null);

  const { route, isLoading: isRouting, error: routingError } = useRouting({
    origin: routeOrigin,
    destination: activeStation ? [activeStation.lat, activeStation.lng] : null,
  });

  const handleSelectStation = useCallback(
    (station: ChargingStation) => {
      setActiveStation(station);
      setRouteOrigin(userPos);
      setArrived(false);
      setStepIndex(0);
    },
    [userPos]
  );

  const handleClearActiveStation = useCallback(() => {
    setActiveStation(null);
    setIsNavigating(false);
    setFollowUser(false);
    setArrived(false);
    setStepIndex(0);
  }, []);

  const handleStartNavigation = useCallback(() => {
    setIsNavigating(true);
    setFollowUser(true);
    setArrived(false);
    setStepIndex(0);
  }, []);

  const handleExitNavigation = useCallback(() => {
    setIsNavigating(false);
    setFollowUser(false);
    setArrived(false);
  }, []);

  const handleLocate = useCallback(() => {
    requestRecenter();
    if (isNavigating) setFollowUser(true);
  }, [requestRecenter, isNavigating]);

  // Arrival detection: within ~150 m of the station while navigating.
  useEffect(() => {
    if (!isNavigating || !activeStation || !hasActualLocation || !userPos || arrived) return;
    const d = calculateDistance(userPos[0], userPos[1], activeStation.lat, activeStation.lng);
    if (d <= ARRIVAL_RADIUS_KM) setArrived(true);
  }, [isNavigating, activeStation, hasActualLocation, userPos, arrived]);

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
    <div className="relative h-dvh w-screen bg-zinc-950 overflow-hidden flex flex-col font-sans select-none">
      <h1 className="sr-only">Map Explora - Jakarta Executive EV Charging Station Navigator</h1>

      {/* Location permission notice */}
      {locationError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1001] max-w-[90vw]">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-[11px] text-zinc-400 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span>{locationError}</span>
          </div>
        </div>
      )}

      {/* Active Navigation HUD Banner (Top of Screen) */}
      {isNavigating && activeStation && (
        <div className="absolute top-4 left-4 right-16 md:left-24 md:right-auto md:w-[380px] z-[1001]">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-3.5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className={`inline-flex rounded-full h-2 w-2 ${arrived ? "bg-emerald-400" : "bg-cyan-400"}`} />
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  {arrived ? "Arrived" : "Navigation active"}
                </span>
              </div>
              <button
                type="button"
                onClick={handleExitNavigation}
                className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 px-2 py-1 rounded-lg border border-zinc-800 transition-colors"
              >
                Exit
              </button>
            </div>

            {arrived ? (
              <div className="flex flex-col gap-1">
                <h3 className="text-xs font-bold text-white leading-tight">{activeStation.name}</h3>
                <p className="text-[11px] text-zinc-300">
                  {activeStation.parking_type} • Bay {activeStation.bay_length_m} m •{" "}
                  {activeStation.height_clearance_m > 50 ? "Open surface" : `Clearance ${activeStation.height_clearance_m} m`}
                </p>
                <p className="text-[10px] text-zinc-500">Fit data reported, not verified.</p>
              </div>
            ) : (
              <div className="flex justify-between items-end gap-2">
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-white leading-tight truncate">
                    {activeStation.name}
                  </h3>
                  <p className="text-[10px] text-zinc-400 truncate">
                    {isRouting
                      ? "Calculating route..."
                      : routingError
                      ? "Routing unavailable, distance below is straight-line"
                      : firstStep ?? `${activeStation.parking_type} • ${activeStation.kw}kW`}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-mono font-bold text-cyan-300">
                    {route ? `${route.distance_km} km` : `${activeStation.distance || 0} km`}
                  </div>
                  <div className="text-[9px] font-mono text-zinc-400">
                    {route ? `~${route.duration_min} min drive` : `~${activeStation.eta || 15} min straight-line`}
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
          stations={filteredStations}
          activeStationId={activeStation?.id || null}
          onSelectStation={handleSelectStation}
          userPos={userPos}
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
          className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center active:scale-95 transition-all"
        >
          {isLocating ? (
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
          ) : (
            <Crosshair className="w-4 h-4" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setMapStyle((prev) => (prev === "dark" ? "light" : "dark"))}
          title="Toggle Map Style"
          className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center active:scale-95 transition-all"
        >
          {mapStyle === "dark" ? (
            <Sun className="w-4 h-4 text-zinc-400" />
          ) : (
            <Moon className="w-4 h-4 text-zinc-400" />
          )}
        </button>
      </div>

      {/* Mobile-Native Bottom Sheet / Desktop Floating HUD */}
      <MobileDrawer
        stations={filteredStations}
        activeStation={activeStation}
        onSelectStation={handleSelectStation}
        onClearActiveStation={handleClearActiveStation}
        filters={filters}
        onUpdateFilter={updateFilter}
        route={route}
        isRouting={isRouting}
        routingError={routingError}
        onOpenShare={() => setShowShareCard(true)}
        onStartNavigation={handleStartNavigation}
      />

      {/* Meta Threads Share Card Modal */}
      {showShareCard && activeStation && (
        <ShareCard
          station={activeStation}
          route={route}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
  );
}
