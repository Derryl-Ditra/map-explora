"use client";

import { useState, useMemo, useCallback, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { STATIONS } from "@/constants/stations";
import StationCard from "./StationCard";
import MagneticSelector from "./MagneticSelector";
import { Search, Navigation, Zap, Loader2, Moon, Sun, Layers } from "lucide-react";
import { calculateDistance, calculateETA } from "@/utils/geo";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-zinc-950 flex flex-col items-center justify-center gap-2">
      <Loader2 className="w-6 h-6 text-zinc-700 animate-spin" />
    </div>
  ),
});

export default function MapHUD() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [isLocating, setIsLocating] = useState(false);
  const [userPos, setUserPos] = useState<[number, number] | null>([-6.2300, 106.8200]);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{ distance: number; duration: number } | null>(null);
  const [mapMode, setMapMode] = useState<'dark' | 'light' | 'streets'>('dark');

  const filteredStations = useMemo(() => {
    const base = filter === "all" 
      ? STATIONS 
      : STATIONS.filter(s => s.connectors.includes(filter));

    return base.map(s => {
      const directDist = userPos ? calculateDistance(userPos[0], userPos[1], s.lat, s.lng) : 2.5;
      const isActive = s.id === activeId;
      
      // Use actual route distance if active, otherwise use direct distance
      const distance = (isActive && routeInfo) ? routeInfo.distance : directDist;
      const eta = calculateETA(distance, 25);

      return { ...s, distance, eta };
    }).sort((a, b) => a.distance - b.distance);
  }, [filter, userPos, activeId, routeInfo]);

  const handleStationSelect = useCallback((id: string) => {
    setActiveId(id);
    setRouteInfo(null); // Reset route info when selecting new station
    if (typeof window !== 'undefined' && window.innerWidth < 768) setIsPanelExpanded(false);
  }, []);

  const handleLocate = () => {
    if (isLocating) return;
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPos([pos.coords.latitude, pos.coords.longitude]);
          setIsLocating(false);
        },
        () => setIsLocating(false),
        { enableHighAccuracy: true }
      );
    }
  };

  // Removed full-screen mounted check to prevent UI jump during hydration

  return (
    <div className="relative h-screen w-screen bg-zinc-950 overflow-hidden flex flex-col md:flex-row font-sans">
      <h1 className="sr-only">Jakarta EV Charging Stations Map and Tracker</h1>

      {/* Branding Overlay */}
      <header className="absolute top-6 left-6 z-[1001] md:left-[340px]">
        <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
          <Zap className="w-4 h-4 text-blue-500" aria-hidden="true" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Jakarta Map</span>
            <span className="text-[8px] text-zinc-400 font-medium uppercase tracking-widest">Active</span>
          </div>
        </div>
      </header>

      {/* Map Mode Selector (Top Right) */}
      <div className="absolute top-6 right-6 z-[1001] flex flex-col gap-2">
        <div 
          role="group" 
          aria-label="Map style selector" 
          className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 p-1 rounded-xl flex flex-col gap-1 shadow-2xl"
        >
          {([
            { id: 'dark', label: 'Dark', icon: Moon },
            { id: 'light', label: 'Light', icon: Sun },
            { id: 'streets', label: 'Streets', icon: Layers },
          ] as const).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={mapMode === id}
              onClick={() => setMapMode(id)}
              className={`flex items-center gap-1.5 px-3 py-2 md:py-1.5 text-[10px] uppercase font-bold rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                mapMode === id 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main UI Sidebar */}
      <aside 
        aria-label="Charging Stations Directory"
        className={`
          absolute z-[1000] transition-all duration-300
          md:left-0 md:top-0 md:bottom-0 md:w-[320px] md:h-full md:bg-zinc-900 md:border-r md:border-zinc-800
          left-0 right-0 bottom-0 bg-zinc-900 border-t border-zinc-800 rounded-t-3xl md:rounded-none
          flex flex-col
          ${isPanelExpanded ? 'h-[80vh]' : 'h-[120px] md:h-full'}
        `}
        style={{ willChange: "height, transform" }}
      >
        {/* Mobile Handle - Accessible Button */}
        <button 
          type="button"
          onClick={() => setIsPanelExpanded(!isPanelExpanded)}
          aria-expanded={isPanelExpanded}
          aria-label={isPanelExpanded ? "Collapse station list" : "Expand station list"}
          className="w-full h-12 flex items-center justify-center cursor-pointer md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <span className="w-12 h-1.5 bg-zinc-700 rounded-full" aria-hidden="true" />
        </button>

        <div className="flex flex-col h-full overflow-hidden">
          <div className="px-4 py-4">
            <MagneticSelector onFilterChange={setFilter} />
          </div>

          <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
            <div className="space-y-1 pb-10" role="list" aria-label="Charging stations list">
              {filteredStations.map((s) => (
                <StationCard 
                  key={s.id}
                  station={s}
                  distance={s.distance}
                  eta={s.eta}
                  active={activeId === s.id}
                  onClick={() => handleStationSelect(s.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Map Control FABs - Accessible Controls */}
      <div 
        className={`
          absolute right-4 z-[1000] flex flex-col gap-2 transition-all duration-300
          ${isPanelExpanded ? 'bottom-[82vh]' : 'bottom-36 md:bottom-6'}
        `}
        style={{ willChange: "bottom, transform" }}
      >
        <button 
          type="button"
          onClick={handleLocate}
          aria-label={isLocating ? "Locating your position..." : "Locate my current position"}
          className={`w-12 h-12 md:w-10 md:h-10 rounded-lg flex items-center justify-center border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            isLocating 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
          }`}
        >
          <Navigation className={`w-5 h-5 md:w-4 md:h-4 ${isLocating ? 'animate-pulse' : ''}`} aria-hidden="true" />
        </button>
        <button 
          type="button"
          aria-label="Search charging stations"
          className="w-12 h-12 md:w-10 md:h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center border border-blue-500 shadow-lg hover:bg-blue-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <Search className="w-5 h-5 md:w-4 md:h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Map Content */}
      <div className="flex-1 h-full w-full">
        {mounted ? (
          <LeafletMap 
            center={[-6.2088, 106.8456]}
            stations={filteredStations}
            activeId={activeId}
            userPos={userPos}
            mapMode={mapMode}
            onStationSelect={handleStationSelect}
            onRouteFound={(dist, dur) => setRouteInfo({ distance: dist, duration: dur })}
          />
        ) : (
          <div className="h-full w-full bg-[#0d0d0d] flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-zinc-700 animate-spin" aria-label="Loading map..." />
          </div>
        )}
      </div>
    </div>
  );
}
