"use client";

import { useState } from "react";
import { ChargingStation, StationFilterState } from "@/types/station";
import { RouteData } from "@/types/route";
import FilterBar from "./FilterBar";
import StationDetails from "./StationDetails";
import { Search, ChevronUp, ChevronDown, Zap, Sparkles, MapPin } from "lucide-react";

interface MobileDrawerProps {
  stations: ChargingStation[];
  activeStation: ChargingStation | null;
  onSelectStation: (station: ChargingStation) => void;
  onClearActiveStation: () => void;
  filters: StationFilterState;
  onUpdateFilter: <K extends keyof StationFilterState>(
    key: K,
    value: StationFilterState[K]
  ) => void;
  route: RouteData | null;
  isRouting: boolean;
  onOpenShare: () => void;
  onStartNavigation?: () => void;
}

export default function MobileDrawer({
  stations,
  activeStation,
  onSelectStation,
  onClearActiveStation,
  filters,
  onUpdateFilter,
  route,
  isRouting,
  onOpenShare,
  onStartNavigation,
}: MobileDrawerProps) {
  // Mobile snap state: 'collapsed' (approx 130px), 'half' (48vh), 'full' (85vh)
  const [drawerSnap, setDrawerSnap] = useState<"collapsed" | "half" | "full">("half");

  const toggleSnap = () => {
    setDrawerSnap((prev) => (prev === "collapsed" ? "half" : prev === "half" ? "full" : "collapsed"));
  };

  const handleStartInAppNav = () => {
    setDrawerSnap("collapsed");
    if (onStartNavigation) {
      onStartNavigation();
    }
  };

  return (
    <aside
      aria-label="Charging stations and filters"
      className={`
        fixed bottom-0 left-0 right-0 z-[1000]
        md:fixed md:top-6 md:left-6 md:right-auto md:w-96 md:h-[calc(100vh-48px)] md:bottom-auto
        bg-zinc-950/95 backdrop-blur-xl border-t md:border border-zinc-800/80
        rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-out
        ${
          drawerSnap === "collapsed"
            ? "h-28 md:h-[calc(100vh-48px)]"
            : drawerSnap === "half"
            ? "h-[50vh] md:h-[calc(100vh-48px)]"
            : "h-[85vh] md:h-[calc(100vh-48px)]"
        }
      `}
    >
      {/* Mobile Drag Handle */}
      <div
        onClick={toggleSnap}
        className="w-full pt-3 pb-2 flex flex-col items-center justify-center cursor-pointer md:hidden select-none"
      >
        <div className="w-12 h-1.5 rounded-full bg-zinc-700/80" />
        <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
          <span>{drawerSnap === "collapsed" ? "Tap to Expand" : "Tap to Toggle"}</span>
          {drawerSnap === "full" ? (
            <ChevronDown className="w-3 h-3 text-zinc-500" />
          ) : (
            <ChevronUp className="w-3 h-3 text-zinc-500" />
          )}
        </div>
      </div>

      {/* Brand Header */}
      <div className="px-5 pt-2 pb-3 border-b border-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-950/50">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div>
            <span className="text-xs font-bold text-white tracking-tight uppercase flex items-center gap-1">
              <span>Map Explora</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono">
                Executive
              </span>
            </span>
            <span className="text-[10px] text-zinc-500 block leading-none mt-0.5">
              Denza D9 & Luxury EV SPKLU
            </span>
          </div>
        </div>

        {activeStation && (
          <button
            type="button"
            onClick={onOpenShare}
            className="text-[11px] px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 hover:bg-cyan-900 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Threads Card</span>
          </button>
        )}
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {activeStation ? (
          /* Active Station Details View */
          <StationDetails
            station={activeStation}
            route={route}
            isRouting={isRouting}
            onBack={onClearActiveStation}
            onOpenShare={onOpenShare}
            onStartInAppNavigation={handleStartInAppNav}
          />
        ) : (
          /* Station Explorer List View */
          <>
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search SPKLU, mall, or street..."
                value={filters.searchQuery}
                onChange={(e) => onUpdateFilter("searchQuery", e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30"
              />
            </div>

            {/* Filter Bar */}
            <FilterBar
              filters={filters}
              onUpdateFilter={onUpdateFilter}
              stationCount={stations.length}
            />

            {/* Station List */}
            <div className="flex flex-col gap-2 pt-1 pb-4">
              {stations.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-500 flex flex-col items-center gap-2">
                  <MapPin className="w-6 h-6 text-zinc-700" />
                  <span>No open-data SPKLU matches your active filters.</span>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateFilter("denzaOnly", false);
                      onUpdateFilter("surfaceOnly", false);
                      onUpdateFilter("minKw", 0);
                    }}
                    className="text-cyan-400 underline text-[11px] mt-1"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                stations.map((station) => (
                  <div
                    key={station.id}
                    onClick={() => {
                      onSelectStation(station);
                      if (drawerSnap === "collapsed") setDrawerSnap("half");
                    }}
                    className="p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700 transition-all cursor-pointer flex flex-col gap-1.5 active:scale-[0.99]"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                          {station.brand}
                        </span>
                        <h4 className="text-xs font-bold text-white leading-tight">
                          {station.name}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200">
                          {station.kw} kW
                        </span>
                        {station.denza_approved && (
                          <span className="text-[9px] font-mono font-bold px-1 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                            D9
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-800/40">
                      <span className="truncate max-w-[190px]">
                        {station.parking_type} • {station.bay_length_m}m bay
                      </span>
                      <span className="font-mono text-cyan-400 font-bold shrink-0">
                        {station.distance ? `${station.distance} km` : "Nearby"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
