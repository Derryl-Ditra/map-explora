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
    <div
      onClick={onClick}
      className={`
        cursor-pointer p-4 border-b border-zinc-800 transition-colors
        ${active ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'}
      `}
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-medium text-white truncate max-w-[200px]">
          {station.name}
        </h3>
        <div className="flex flex-col items-end">
          <span className="text-xs text-blue-500 font-medium">
            {distance.toFixed(1)}km
          </span>
          <span className="text-[9px] text-zinc-500 font-medium uppercase">
            {eta} min
          </span>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <span className="text-[10px] text-zinc-400 uppercase font-bold">{station.power}</span>
        <span className="text-[10px] text-zinc-500 uppercase">{station.brand}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[10px] uppercase tracking-tight text-zinc-500">
        <div className="flex items-center gap-1">
          <span>{calcChargeTime(station.kw)}</span>
        </div>
        <div className="flex items-center gap-1 justify-end">
          <span>{station.fee > 0 ? `Rp${station.fee}` : 'Free'}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(StationCard);
