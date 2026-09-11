"use client";

import { useState } from "react";
import { ChargingStation } from "@/types/station";
import { RouteData } from "@/types/route";
import { X, Copy, Check, Sparkles, MapPin } from "lucide-react";

interface ShareCardProps {
  station: ChargingStation;
  route: RouteData | null;
  onClose: () => void;
}

export default function ShareCard({ station, route, onClose }: ShareCardProps) {
  const [copied, setCopied] = useState(false);

  const distanceText = route ? `${route.distance_km} km` : station.distance ? `${station.distance} km` : "Nearby";
  const etaText = route ? `${route.duration_min} mins` : station.eta ? `${station.eta} mins` : "15 mins";

  const threadsText = `Denza D9 & Big EV Safe SPKLU Spot in Jakarta ⚡

📍 ${station.name} (${station.brand})
⚡ Power: ${station.power} (${station.connectors.join(", ")})
🚗 Parking: ${station.parking_type} (${station.height_clearance_m > 50 ? "Open Sky / No Low Ceiling" : `${station.height_clearance_m}m clearance`})
📐 Bay Length: ${station.bay_length_m}m (${station.denza_approved ? "Safe for 5.2m+ Luxury MPV" : "Tight Bay Warning"})
⏱️ Est. Drive: ${distanceText} • ${etaText}

Filtered via Map Explora (Executive EV Navigator)
#DenzaD9 #JakartaEV #SPKLU #BYDIndonesia #EVIndonesia #SilverbirdVibes`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(threadsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-white relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Card Header */}
        <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Meta Threads Share Card</span>
        </div>

        {/* Screenshot Target Canvas */}
        <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800/80 rounded-xl p-4 flex flex-col gap-3 shadow-inner">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-bold">
                Jakarta Executive EV Scout
              </span>
              <h3 className="text-base font-bold text-white leading-tight mt-0.5">
                {station.name}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              {station.kw} kW
            </span>
          </div>

          <p className="text-xs text-zinc-400 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
            <span className="truncate">{station.address}</span>
          </p>

          {/* Telemetry Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/60 text-xs">
            <div className="flex flex-col bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/40">
              <span className="text-[10px] text-zinc-500 uppercase">Parking Type</span>
              <span className="font-semibold text-zinc-200">{station.parking_type}</span>
              <span className="text-[10px] text-emerald-400 mt-0.5">
                {station.height_clearance_m > 50 ? "Open Air (Safe)" : `${station.height_clearance_m}m Ceiling`}
              </span>
            </div>

            <div className="flex flex-col bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/40">
              <span className="text-[10px] text-zinc-500 uppercase">Denza D9 Bay</span>
              <span className="font-semibold text-zinc-200">{station.bay_length_m}m Bay</span>
              <span className="text-[10px] text-cyan-400 mt-0.5">
                {station.denza_approved ? "✓ Certified Fit" : "⚠ Tight Margin"}
              </span>
            </div>
          </div>

          {/* Route distance & ETA */}
          <div className="flex items-center justify-between bg-zinc-950 p-2 rounded-lg border border-zinc-800/50 text-xs">
            <span className="text-zinc-400 text-[11px]">Drive Telemetry:</span>
            <span className="font-mono text-zinc-200 font-bold">
              {distanceText} • {etaText}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-cyan-950/40"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-zinc-950" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-950" />
                <span>Copy Meta Threads Text</span>
              </>
            )}
          </button>
          <span className="text-[10px] text-center text-zinc-500">
            Take a screenshot of the card above and paste the text into Threads.
          </span>
        </div>
      </div>
    </div>
  );
}
