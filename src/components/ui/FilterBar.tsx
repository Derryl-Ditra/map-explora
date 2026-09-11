"use client";

import { StationFilterState } from "@/types/station";
import { Zap, Warehouse, Sparkles } from "lucide-react";

interface FilterBarProps {
  filters: StationFilterState;
  onUpdateFilter: <K extends keyof StationFilterState>(
    key: K,
    value: StationFilterState[K]
  ) => void;
  stationCount: number;
}

export default function FilterBar({
  filters,
  onUpdateFilter,
  stationCount,
}: FilterBarProps) {
  return (
    <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
      {/* Denza D9 Approved Toggle */}
      <button
        type="button"
        onClick={() => onUpdateFilter("denzaOnly", !filters.denzaOnly)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all border font-medium ${
          filters.denzaOnly
            ? "bg-cyan-950/80 text-cyan-300 border-cyan-500/60 shadow-lg shadow-cyan-950/50"
            : "bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-white"
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>Denza D9 Ready</span>
      </button>

      {/* Surface Only / Anti-Basement Toggle */}
      <button
        type="button"
        onClick={() => onUpdateFilter("surfaceOnly", !filters.surfaceOnly)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all border font-medium ${
          filters.surfaceOnly
            ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/60 shadow-lg shadow-emerald-950/50"
            : "bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-white"
        }`}
      >
        <Warehouse className="w-3.5 h-3.5 text-emerald-400" />
        <span>Surface (Anti-Basement)</span>
      </button>

      {/* >= 100 kW Fast DC Toggle */}
      <button
        type="button"
        onClick={() => onUpdateFilter("minKw", filters.minKw === 100 ? 0 : 100)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all border font-medium ${
          filters.minKw >= 100
            ? "bg-blue-950/80 text-blue-300 border-blue-500/60 shadow-lg shadow-blue-950/50"
            : "bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-white"
        }`}
      >
        <Zap className="w-3.5 h-3.5 text-blue-400" />
        <span>≥ 100 kW DC Fast</span>
      </button>

      {/* CCS2 Connector */}
      <button
        type="button"
        onClick={() =>
          onUpdateFilter("connector", filters.connector === "CCS2" ? "ALL" : "CCS2")
        }
        className={`flex items-center gap-1 px-3 py-1.5 rounded-full whitespace-nowrap transition-all border font-mono ${
          filters.connector === "CCS2"
            ? "bg-zinc-100 text-zinc-950 border-white font-bold"
            : "bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-white"
        }`}
      >
        <span>CCS2</span>
      </button>

      {/* Results Count Badge */}
      <div className="ml-auto text-[11px] text-zinc-500 font-mono tracking-tight whitespace-nowrap px-2">
        {stationCount} stations
      </div>
    </div>
  );
}
