import { memo } from "react";
import { ChargingStation } from "@/constants/stations";

interface StationCardProps {
  station: ChargingStation;
  distance: number;
  eta: number;
  active: boolean;
  onClick: () => void;
}

function StationCard({
  station,
  distance,
  eta,
  active,
  onClick,
}: StationCardProps) {
  const calcChargeTime = (kw: number) => {
    if (kw >= 150) return "15-20 min";
    if (kw >= 50) return "40-50 min";
    if (kw >= 22) return "2-3 hrs";
    return "6+ hrs";
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`${station.name}, ${station.brand}, ${station.power}, ${distance.toFixed(1)} kilometers away, ETA ${eta} minutes`}
      className={`
        w-full text-left cursor-pointer p-4 border-b border-zinc-800 transition-colors
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset
        ${active ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'}
      `}
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-medium text-white truncate max-w-[200px]">
          {station.name}
        </h3>
        <div className="flex flex-col items-end">
          <span className="text-xs text-blue-400 font-medium">
            {distance.toFixed(1)}km
          </span>
          <span className="text-[9px] text-zinc-400 font-medium uppercase">
            {eta} min
          </span>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <span className="text-[10px] text-zinc-300 uppercase font-bold">{station.power}</span>
        <span className="text-[10px] text-zinc-400 uppercase">{station.brand}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[10px] uppercase tracking-tight text-zinc-400">
        <div className="flex items-center gap-1">
          <span>{calcChargeTime(station.kw)}</span>
        </div>
        <div className="flex items-center gap-1 justify-end">
          <span>{station.fee > 0 ? `Rp${station.fee}` : 'Free'}</span>
        </div>
      </div>
    </button>
  );
}

export default memo(StationCard);
