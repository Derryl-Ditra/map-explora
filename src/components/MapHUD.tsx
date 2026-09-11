"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useStationFilters } from "@/hooks/useStationFilters";
import { useRouting } from "@/hooks/useRouting";
import { ChargingStation } from "@/types/station";
import MobileDrawer from "./ui/MobileDrawer";
import ShareCard from "./ui/ShareCard";
import { Crosshair, Loader2, Moon, Sun } from "lucide-react";

// Dynamic import for Leaflet map (client-only)
const LeafletMap = dynamic(() => import("./map/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-zinc-950 flex flex-col items-center justify-center gap-3 text-zinc-500">
      <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      <span className="text-xs font-mono tracking-wider uppercase">Loading Map...</span>
    </div>
  ),
});

export default function MapHUD() {
  const { userPos, isLocating, locateUser } = useGeolocation();
  const { filters, updateFilter, filteredStations } = useStationFilters(userPos);
  const [activeStation, setActiveStation] = useState<ChargingStation | null>(null);
  const [showShareCard, setShowShareCard] = useState(false);
  const [mapStyle, setMapStyle] = useState<"dark" | "bright">("dark");

  const [locateTrigger, setLocateTrigger] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleLocate = useCallback(() => {
    locateUser();
    setLocateTrigger((prev) => prev + 1);
  }, [locateUser]);

  const { route, isLoading: isRouting } = useRouting({
    origin: userPos,
    destination: activeStation ? [activeStation.lat, activeStation.lng] : null,
  });

  const handleSelectStation = useCallback((station: ChargingStation) => {
    setActiveStation(station);
  }, []);

  const handleClearActiveStation = useCallback(() => {
    setActiveStation(null);
    setIsNavigating(false);
  }, []);

  const handleStartNavigation = useCallback(() => {
    setIsNavigating(true);
  }, []);

  const handleExitNavigation = useCallback(() => {
    setIsNavigating(false);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-zinc-950 overflow-hidden flex flex-col font-sans select-none">
      <h1 className="sr-only">Map Explora — Jakarta Executive EV Charging Station Navigator</h1>

      {/* Active Navigation HUD Banner (Top of Screen) */}
      {isNavigating && activeStation && (
        <div className="absolute top-4 left-4 right-16 md:left-24 md:right-auto md:w-[380px] z-[1001] animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="bg-zinc-950/95 border border-cyan-500/60 rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  In-App Navigation Active
                </span>
              </div>
              <button
                type="button"
                onClick={handleExitNavigation}
                className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 px-2 py-0.5 rounded-lg border border-zinc-800 transition-colors"
              >
                Exit
              </button>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-xs font-bold text-white leading-tight truncate max-w-[200px]">
                  {activeStation.name}
                </h3>
                <p className="text-[10px] text-zinc-400 truncate max-w-[200px]">
                  {activeStation.parking_type} • {activeStation.kw}kW
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-mono font-bold text-cyan-300">
                  {route ? `${route.distance_km} km` : `${activeStation.distance || 0} km`}
                </div>
                <div className="text-[9px] font-mono text-zinc-400">
                  {route ? `~${route.duration_min} min` : `${activeStation.eta || 15} min`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaflet Map Canvas */}
      <div className="absolute inset-0 z-0">
        <LeafletMap
          stations={filteredStations}
          activeStationId={activeStation?.id || null}
          onSelectStation={handleSelectStation}
          userPos={userPos}
          route={route}
          mapStyle={mapStyle}
          locateTrigger={locateTrigger}
          isNavigating={isNavigating}
        />
      </div>

      {/* Floating Map Controls (Top-Right / Bottom-Right) */}
      <div className="absolute top-4 right-4 z-[500] flex flex-col gap-2">
        {/* Locate User Button */}
        <button
          type="button"
          onClick={handleLocate}
          title="Locate My Position"
          className="w-10 h-10 rounded-xl bg-zinc-950/90 border border-zinc-800 text-zinc-300 hover:text-cyan-400 flex items-center justify-center shadow-2xl backdrop-blur-md active:scale-95 transition-all"
        >
          {isLocating ? (
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
          ) : (
            <Crosshair className="w-4 h-4" />
          )}
        </button>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={() => setMapStyle((prev) => (prev === "dark" ? "bright" : "dark"))}
          title="Toggle Map Style"
          className="w-10 h-10 rounded-xl bg-zinc-950/90 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center shadow-2xl backdrop-blur-md active:scale-95 transition-all"
        >
          {mapStyle === "dark" ? (
            <Sun className="w-4 h-4 text-zinc-400" />
          ) : (
            <Moon className="w-4 h-4 text-cyan-400" />
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
