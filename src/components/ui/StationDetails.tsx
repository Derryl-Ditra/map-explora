"use client";

import { ChargingStation } from "@/types/station";
import { RouteData } from "@/types/route";
import {
  Navigation,
  ExternalLink,
  Share2,
  Zap,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

interface StationDetailsProps {
  station: ChargingStation;
  route: RouteData | null;
  isRouting: boolean;
  onBack: () => void;
  onOpenShare: () => void;
}

export default function StationDetails({
  station,
  route,
  isRouting,
  onBack,
  onOpenShare,
}: StationDetailsProps) {
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const distanceDisplay = route
    ? `${route.distance_km} km`
    : station.distance
    ? `${station.distance} km`
    : "Nearby";

  const etaDisplay = route
    ? `${route.duration_min} min`
    : station.eta
    ? `${station.eta} min`
    : "15 min";

  return (
    <div className="flex flex-col gap-3 text-white text-xs">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-zinc-400 hover:text-white py-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-[11px] font-medium">All Stations</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenShare}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/40 text-[11px] transition-all"
          >
            <Share2 className="w-3 h-3 text-cyan-400" />
            <span>Threads Card</span>
          </button>
        </div>
      </div>

      {/* Main Title & Power Badge */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
            {station.brand} SPKLU
          </span>
          <h2 className="text-base font-bold text-white leading-snug">
            {station.name}
          </h2>
          <span className="text-[11px] text-zinc-400 mt-0.5">{station.address}</span>
        </div>

        <div className="flex flex-col items-end shrink-0 pl-2">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            {station.kw} kW
          </span>
          <span className="text-[10px] text-zinc-500 mt-0.5">DC Fast</span>
        </div>
      </div>

      {/* Denza D9 & Large EV Compatibility Rating */}
      <div
        className={`p-2.5 rounded-xl border flex flex-col gap-1.5 ${
          station.denza_approved
            ? "bg-cyan-950/30 border-cyan-500/30 text-cyan-100"
            : "bg-amber-950/30 border-amber-500/30 text-amber-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {station.denza_approved ? (
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            )}
            <span className="font-bold text-xs">
              {station.denza_approved
                ? "Denza D9 & Large EV: Certified Fit"
                : "Denza D9: Caution / Tight Bay"}
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase font-bold text-zinc-400">
            {station.parking_type}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-white/10">
          <div>
            <span className="text-zinc-400">Ceiling Clearance: </span>
            <span className="font-semibold text-white">
              {station.height_clearance_m > 50 ? "Open Surface" : `${station.height_clearance_m}m`}
            </span>
          </div>
          <div>
            <span className="text-zinc-400">Bay Length: </span>
            <span className="font-semibold text-white">{station.bay_length_m} meters</span>
          </div>
        </div>
      </div>

      {/* Telemetry Metrics */}
      <div className="grid grid-cols-3 gap-2 text-center py-1">
        <div className="bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/40">
          <span className="text-[10px] text-zinc-500 block">Distance</span>
          <span className="font-mono font-bold text-zinc-200 text-xs">
            {isRouting ? "..." : distanceDisplay}
          </span>
        </div>
        <div className="bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/40">
          <span className="text-[10px] text-zinc-500 block">Drive ETA</span>
          <span className="font-mono font-bold text-cyan-300 text-xs">
            {isRouting ? "..." : etaDisplay}
          </span>
        </div>
        <div className="bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/40">
          <span className="text-[10px] text-zinc-500 block">Tariff</span>
          <span className="font-mono font-bold text-zinc-200 text-xs">
            Rp 2.466
          </span>
        </div>
      </div>

      {/* Connectors & Hours */}
      <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-800/60">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-zinc-500" />
          <span>Connectors:</span>
          <span className="font-semibold text-zinc-200 font-mono">
            {station.connectors.join(", ")}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-zinc-500" />
          <span>{station.operating_hours}</span>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-2">
        <button
          type="button"
          onClick={openGoogleMaps}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs tracking-tight transition-all shadow-lg"
        >
          <Navigation className="w-4 h-4 text-zinc-950 fill-zinc-950" />
          <span>Drive with Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500 ml-1" />
        </button>
      </div>
    </div>
  );
}
