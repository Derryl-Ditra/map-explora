"use client";

import { useState } from "react";
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
  Flag,
} from "lucide-react";

interface StationDetailsProps {
  station: ChargingStation;
  route: RouteData | null;
  isRouting: boolean;
  routingError?: string | null;
  onBack: () => void;
  onOpenShare: () => void;
  onStartInAppNavigation?: () => void;
}

const REPORTS_KEY = "map-explora-station-reports";

export default function StationDetails({
  station,
  route,
  isRouting,
  routingError,
  onBack,
  onOpenShare,
  onStartInAppNavigation,
}: StationDetailsProps) {
  const [reportOpen, setReportOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportSaved, setReportSaved] = useState(false);

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const saveReport = () => {
    if (!reportText.trim()) return;
    try {
      const existing = JSON.parse(localStorage.getItem(REPORTS_KEY) ?? "[]");
      existing.push({ stationId: station.id, note: reportText.trim(), at: new Date().toISOString() });
      localStorage.setItem(REPORTS_KEY, JSON.stringify(existing));
      setReportSaved(true);
      setReportText("");
    } catch {
      setReportSaved(false);
    }
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
          className="flex items-center gap-1 text-zinc-400 hover:text-white py-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-[11px] font-medium">All Stations</span>
        </button>

        <button
          type="button"
          onClick={onOpenShare}
          className="flex items-center gap-1 px-2.5 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-[11px] transition-colors"
        >
          <Share2 className="w-3 h-3 text-zinc-400" />
          <span>Threads Card</span>
        </button>
      </div>

      {/* Main Title & Power Badge */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
            {station.brand} SPKLU
          </span>
          <h2 className="text-base font-bold text-white leading-snug">{station.name}</h2>
          <span className="text-[11px] text-zinc-400 mt-0.5">{station.address}</span>
        </div>

        <div className="flex flex-col items-end shrink-0 pl-2">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 text-zinc-100 border border-zinc-700">
            {station.kw} kW
          </span>
          <span className="text-[10px] text-zinc-500 mt-0.5">DC Fast</span>
        </div>
      </div>

      {/* Large-EV Compatibility (reported, unverified) */}
      <div className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {station.denza_approved ? (
              <ShieldCheck className="w-4 h-4 text-zinc-300" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-zinc-400" />
            )}
            <span className="font-bold text-xs text-zinc-100">
              {station.denza_approved
                ? "Denza D9 & large EV: reported fit"
                : "Denza D9: caution, tight bay (reported)"}
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase font-bold text-zinc-400">
            {station.parking_type}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-zinc-800">
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
        <span className="text-[10px] text-zinc-500">Fit and bay data reported, not independently verified.</span>
      </div>

      {/* Telemetry Metrics */}
      <div className="grid grid-cols-3 gap-2 text-center py-1">
        <div className="bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/60">
          <span className="text-[10px] text-zinc-500 block">
            {route ? "Route distance" : "Straight-line"}
          </span>
          <span className="font-mono font-bold text-zinc-200 text-xs">
            {isRouting ? "..." : distanceDisplay}
          </span>
        </div>
        <div className="bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/60">
          <span className="text-[10px] text-zinc-500 block">
            {route ? "Drive ETA" : "ETA (straight-line)"}
          </span>
          <span className="font-mono font-bold text-cyan-300 text-xs">
            {isRouting ? "..." : etaDisplay}
          </span>
        </div>
        <div className="bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/60">
          <span className="text-[10px] text-zinc-500 block">Listed tariff</span>
          <span className="font-mono font-bold text-zinc-200 text-xs">
            Rp {station.fee_per_kwh.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {route && (
        <p className="text-[10px] text-zinc-500">
          Route computed by the OSRM demo server, which receives your position and the station coordinates to calculate it. No position history is stored or shared.
        </p>
      )}

      {routingError && (
        <p className="text-[11px] text-zinc-400 border border-zinc-800 rounded-lg px-2.5 py-2 bg-zinc-900/60">
          Routing is unavailable right now ({routingError}). Distance and ETA above are straight-line estimates.
        </p>
      )}

      {/* Connectors & Hours */}
      <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-800">
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
      <div className="pt-2 flex flex-col gap-2">
        <button
          type="button"
          onClick={onStartInAppNavigation}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs tracking-tight transition-colors"
        >
          <Navigation className="w-4 h-4 text-zinc-950 fill-zinc-950" />
          <span>Navigate In-App</span>
        </button>

        <button
          type="button"
          onClick={openGoogleMaps}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white text-[11px] font-medium transition-colors"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3 text-zinc-500" />
        </button>
      </div>

      {/* Report a problem (stored on this device only) */}
      <div className="pt-1 border-t border-zinc-800">
        <button
          type="button"
          onClick={() => { setReportOpen((v) => !v); setReportSaved(false); }}
          className="flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-zinc-300 py-2 transition-colors"
        >
          <Flag className="w-3 h-3" />
          <span>Report a problem with this station</span>
        </button>
        {reportOpen && (
          <div className="flex flex-col gap-2 pb-2">
            {reportSaved ? (
              <p className="text-[11px] text-zinc-400">Saved on this device for your next data pass. Nothing was sent.</p>
            ) : (
              <>
                <textarea
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="e.g. charger offline, bay blocked, wrong hours"
                  rows={2}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                />
                <button
                  type="button"
                  onClick={saveReport}
                  className="self-start px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-[11px] font-medium text-zinc-200 transition-colors"
                >
                  Save note on this device
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
