"use client";

import { useState } from "react";
import { Venue } from "@/types/venue";
import { RouteData } from "@/types/route";
import { X, Copy, Check, Share2 } from "lucide-react";
import { buildClassLines, buildShareText } from "@/utils/shareText";

interface ShareCardProps {
  venue: Venue;
  route: RouteData | null;
  onClose: () => void;
}

export default function ShareCard({ venue, route, onClose }: ShareCardProps) {
  const [copied, setCopied] = useState(false);

  const classLines = buildClassLines(venue);
  const shareText = buildShareText(venue, route);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard unavailable; user can still screenshot
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#f6f2ec] border border-[#e7e0d4] rounded-3xl p-5 shadow-2xl flex flex-col gap-4 text-[#221d18] relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white border border-[#e7e0d4] text-[#6d675f] hover:text-[#221d18]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-[#6d675f] text-[0.9375rem] font-semibold">
          <Share2 className="w-4 h-4 text-[#1a7a4a]" />
          <span>Share this place</span>
        </div>

        <div className="bg-white border border-[#e7e0d4] rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-[0.8125rem] text-[#1a7a4a] font-bold">
              Under-5 Class Spot
            </span>
            <span className="text-[1.0625rem] font-bold text-[#221d18] leading-snug mt-0.5">
              {venue.chain ? `${venue.chain} - ` : ""}
              {venue.branchName}
            </span>
            <span className="text-[0.9375rem] text-[#6d675f]">
              {venue.area}, {venue.city}
            </span>
          </div>

          {classLines && (
            <div className="bg-[#f6f2ec] p-3 rounded-xl border border-[#e7e0d4] text-[0.9375rem] text-[#4a443c]">
              {classLines}
            </div>
          )}

          {venue.reviews && venue.reviews.rating !== null && (
            <div className="flex items-center justify-between bg-[#f6f2ec] p-3 rounded-xl border border-[#e7e0d4] text-[0.9375rem]">
              <span className="text-[#6d675f] text-[0.9375rem]">Parent reviews:</span>
              <span className="text-[#221d18] font-bold">
                {venue.reviews.rating.toFixed(1)} ({venue.reviews.source})
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#1a7a4a] hover:bg-[#14532d] text-white font-bold text-[1rem] transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4.5 h-4.5 text-white" />
                <span>Copied to clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4.5 h-4.5 text-white" />
                <span>Copy Share Text</span>
              </>
            )}
          </button>
          <span className="text-[0.875rem] text-center text-[#6d675f]">
            Take a screenshot of the card above and paste the text anywhere.
          </span>
        </div>
      </div>
    </div>
  );
}
// Trailing sentinel: absorbs the web editor last-line indent artifact.
