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
  }, []);

  return (
    <div className="relative h-screen w-screen bg-zinc-950 overflow-hidden flex flex-col font-sans select-none">
      <h1 className="sr-only">Map Explora — Jakarta Executive EV Charging Station Navigator</h1>

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
