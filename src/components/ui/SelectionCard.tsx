"use client";

import { Venue } from "@/types/venue";
import { Navigation, ExternalLink, X, ChevronRight } from "lucide-react";

interface SelectionCardProps {
  venue: Venue;
  routable: boolean;
  canNavigate: boolean;
  onNavigate: () => void;
  onDetails: () => void;
  onClose: () => void;
}

/**
 * Mobile map view: the selected place as a bottom card, so the map stays
 * visible. Full verification detail stays one tap away under Details.
 */
export default function SelectionCard({
  venue,
  routable,
  canNavigate,
  onNavigate,
  onDetails,
  onClose,
}: SelectionCardProps) {
  const name = `${venue.chain && venue.chain !== venue.branchName ? `${venue.chain} ` : ""}${venue.branchName}`;
  const openGoogleMaps = () => {
    const q = routable
      ? `${venue.lat},${venue.lng}`
      : encodeURIComponent(`${venue.chain ?? ""} ${venue.branchName} ${venue.area}`.trim());
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${q}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[1000] md:hidden bg-white border border-[#e7e0d4] rounded-3xl shadow-xl p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-[1.0625rem] font-bold text-[#221d18] leading-snug">{name}</h2>
          <p className="text-[0.9375rem] text-[#6d675f]">
            {venue.area}
            {venue.categories.length > 0 ? ` • ${venue.categories.join(", ")}` : ""}
          </p>
          {venue.distance ? (
            <p className="text-[0.9375rem] font-semibold text-[#1a7a4a]">{venue.distance} km straight-line</p>
          ) : null}
          {!routable && (
            <p className="text-[0.875rem] text-[#92400e] mt-1">
              {venue.caution ? "Branch identity unresolved. Open Details." : "Approximate area pin, not a street address."}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close place card"
          className="w-10 h-10 shrink-0 rounded-full bg-[#f6f2ec] border border-[#e7e0d4] flex items-center justify-center"
        >
          <X className="w-4 h-4 text-[#4a443c]" />
        </button>
      </div>
      <div className="flex gap-2">
        {routable && canNavigate && (
          <button
            type="button"
            onClick={onNavigate}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#1a7a4a] text-white font-bold text-[1rem]"
          >
            <Navigation className="w-4.5 h-4.5 fill-white" />
            Navigate
          </button>
        )}
        <button
          type="button"
          onClick={onDetails}
          className="flex-1 flex items-center justify-center gap-1 py-3 rounded-full bg-white border border-[#e7e0d4] text-[#221d18] font-semibold text-[1rem]"
        >
          Details
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      {(!routable || !canNavigate) && (
        <button
          type="button"
          onClick={openGoogleMaps}
          className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-white border border-[#e7e0d4] text-[#221d18] text-[0.9375rem] font-semibold"
        >
          {routable ? "Open in Google Maps" : "Search in Google Maps"}
          <ExternalLink className="w-4 h-4 text-[#6d675f]" />
        </button>
      )}
    </div>
  );
}
