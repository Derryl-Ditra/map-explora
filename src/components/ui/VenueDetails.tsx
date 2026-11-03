"use client";

import { useState } from "react";
import { Venue, AgeClaim } from "@/types/venue";
import { RouteData } from "@/types/route";
import {
  Navigation,
  ExternalLink,
  Share2,
  Clock,
  ShieldCheck,
  HelpCircle,
  ArrowLeft,
  Flag,
  Star,
  MapPin,
  ChevronDown,
} from "lucide-react";

interface VenueDetailsProps {
  venue: Venue;
  route: RouteData | null;
  isRouting: boolean;
  routingError?: string | null;
  onBack: () => void;
  backLabel?: string;
  onOpenShare: () => void;
  onStartInAppNavigation?: () => void;
  canNavigate?: boolean;
}

const REPORTS_KEY = "map-explora-venue-reports";

const FIT_STATUS_LABEL: Record<string, string> = {
  "branch-confirmed-dated-term": "Current-term class schedule verified for this branch",
  "branch-confirmed-live-undated": "Classes for ages 0-3 confirmed on this branch's official page (source undated, no term dates)",
  "branch-category-confirmed-live-undated": "Class category for ages 0-3 confirmed at this branch; exact ages not published per branch",
  "branch-candidate-live-undated": "Location candidate: branch appears in an official address listing; offerings unconfirmed",
  "official-chain-program": "Chain runs classes for ages 0-3; this branch is not confirmed yet",
  "media-claimed": "Reported by media; not confirmed by the provider",
  "official-global-unverified-local": "Chain program confirmed globally; this branch unverified",
  "unvalidated-extraction": "Class list for this branch is pending visual verification",
  "unknown": "No verified age information for this branch",
};

function formatMonths(m: number): string {
  // Parents of under-4s read months; switch to years only past 36.
  if (m <= 36) return `${m} mo`;
  const yrs = m / 12;
  return `${Number.isInteger(yrs) ? yrs : yrs.toFixed(1)} yr`;
}

function formatAgeRange(age: AgeClaim): string {
  if (age.sourceConflict) return "age sources disagree";
  if (age.minMonths === null && age.maxMonths === null) return "ages not stated";
  const lo = age.minMonths === null ? "0 mo" : formatMonths(age.minMonths);
  if (age.maxMonths === null) return `from ${lo}`;
  return `${lo} - ${formatMonths(age.maxMonths)}`;
}

function isAmbiguousBoundary(age: AgeClaim, note?: string): boolean {
  return (
    age.verification === "provider-confirmed" &&
    age.level === "branch" &&
    !!note &&
    /ambigu/i.test(note)
  );
}

function ageBadge(age: AgeClaim, note?: string): string {
  if (age.sourceConflict) return "Confirm age";
  if (
    (age.minMonths === null) !== (age.maxMonths === null) &&
    age.verification === "provider-confirmed" &&
    age.level === "branch"
  )
    return "End age unstated";
  if (isAmbiguousBoundary(age, note)) return "Boundary unclear";
  if (age.verification === "provider-confirmed" && age.level === "branch")
    return "Verified";
  if (age.verification === "provider-confirmed")
    return "Ages from official brand catalog";
  if (age.verification === "listed-unconfirmed") return "Listed, unconfirmed";
  return "Ages unknown";
}

function badgeClasses(age: AgeClaim, note?: string): string {
  if (age.sourceConflict || ageBadge(age, note) === "End age unstated" || ageBadge(age, note) === "Boundary unclear")
    return "bg-[#fef3c7] text-[#92400e]";
  if (age.verification === "provider-confirmed" && age.level === "branch")
    return "bg-[#e3f2e8] text-[#14532d]";
  return "bg-[#f0ece4] text-[#6d675f]";
}

// A note that only restates the claim's own range (for example "12-23 mo"
// under "Walker (12 mo - 23 mo)") adds nothing; provenance notes stay.
function isDuplicateRangeNote(age: AgeClaim, note?: string): boolean {
  if (!note || age.sourceConflict) return false;
  return /^\s*\d+\s*-\s*\d+\s*(mo|months|yr|yrs|years)\s*$/i.test(note);
}

function ConflictNote({
  note,
  noteUrl,
  noteLabel,
}: {
  note: string;
  noteUrl?: string;
  noteLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <span className="block mt-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-[0.9375rem] font-semibold text-[#1a7a4a] underline underline-offset-2"
      >
        {open ? "Hide sources" : "See both sources"}
      </button>
      {open && (
        <span className="block text-[1rem] text-[#6d675f] mt-1 leading-snug">
          {note}
          {noteUrl && (
            <>
              {" "}
              <a
                href={noteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#1a7a4a] font-medium"
              >
                {noteLabel ?? "Source"}
              </a>
            </>
          )}
        </span>
      )}
    </span>
  );
}

export default function VenueDetails({
  venue,
  route,
  isRouting,
  routingError,
  onBack,
  backLabel = "All places",
  onOpenShare,
  onStartInAppNavigation,
  canNavigate = true,
}: VenueDetailsProps) {
  const [reportOpen, setReportOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportSaved, setReportSaved] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);
  const [reviewSourceOpen, setReviewSourceOpen] = useState(false);

  const approximate = venue.coordinateSource === "area-approximate";
  const routingBlocked = approximate || !!venue.caution;

  const openGoogleMaps = () => {
    const q = routingBlocked
      ? encodeURIComponent(`${venue.chain ?? ""} ${venue.branchName} ${venue.area}`.trim())
      : `${venue.lat},${venue.lng}`;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${q}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const saveReport = () => {
    if (!reportText.trim()) return;
    try {
      const existing = JSON.parse(localStorage.getItem(REPORTS_KEY) ?? "[]");
      existing.push({ venueId: venue.id, note: reportText.trim(), at: new Date().toISOString() });
      localStorage.setItem(REPORTS_KEY, JSON.stringify(existing));
      setReportSaved(true);
      setReportText("");
    } catch {
      setReportSaved(false);
    }
  };

  const offered = venue.programs.filter((p) => p.offering === "offered");
  const unconfirmedPrograms = venue.programs.filter((p) => p.offering === "unknown");
  const term = venue.programs.find((p) => p.term)?.term;

  return (
    <div className="flex flex-col gap-3.5 text-[#221d18] text-[1rem]">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#1a7a4a] hover:text-[#14532d] py-2 font-semibold transition-colors"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
          <span className="text-[1rem]">{backLabel}</span>
        </button>

        <button
          type="button"
          onClick={onOpenShare}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white border border-[#e7e0d4] text-[#221d18] hover:border-[#1a7a4a]/50 text-[0.9375rem] font-semibold transition-colors"
        >
          <Share2 className="w-4 h-4 text-[#1a7a4a]" />
          <span>Share</span>
        </button>
      </div>

      {/* Title */}
      <div className="flex flex-col">
        <h2 className="text-[1.25rem] font-bold text-[#221d18] leading-snug">
          {venue.chain ? `${venue.chain} ` : ""}
          {venue.branchName}
        </h2>
        <span className="text-[1rem] text-[#6d675f] mt-1">{venue.address}</span>
      </div>

      {approximate && (
        <p className="text-[0.9375rem] text-[#92400e] border border-[#fcd34d] bg-[#fef3c7] rounded-2xl px-3.5 py-3 flex items-start gap-2">
          <MapPin className="w-4.5 h-4.5 mt-0.5 shrink-0" />
          <span>
            Approximate area location. Confirm the exact venue with the provider
            before navigating; in-app routing is off for this pin.
          </span>
        </p>
      )}

      {venue.caution && (
        <p className="text-[0.9375rem] text-[#92400e] border border-[#fcd34d] bg-[#fef3c7] rounded-2xl px-3.5 py-3 flex items-start gap-2">
          <MapPin className="w-4.5 h-4.5 mt-0.5 shrink-0" />
          <span>{venue.caution}</span>
        </p>
      )}

      {/* Classes by age: the first thing a parent scans */}
      <div className="p-4 rounded-2xl border border-[#e7e0d4] bg-white flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#1a7a4a]" />
          <span className="font-bold text-[1rem] text-[#221d18]">Classes here by age</span>
        </div>
        <span className="text-[1rem] text-[#6d675f]">
          {FIT_STATUS_LABEL[venue.fitStatus] ?? venue.fitStatus}
        </span>
        {offered.length === 0 && !venue.branchAge ? (
          <span className="text-[1rem] text-[#6d675f]">
            No branch-confirmed classes for ages 0-3 in the dataset yet.
          </span>
        ) : (
          <div className="flex flex-col gap-2.5 pt-1">
            {venue.branchAge && (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[1rem] font-medium text-[#221d18]">
                  Branch statement: {formatAgeRange(venue.branchAge)}
                </span>
                <span className={`text-[0.8125rem] font-bold px-2 py-1 rounded-full shrink-0 ${badgeClasses(venue.branchAge)}`}>
                  {ageBadge(venue.branchAge)}
                </span>
              </div>
            )}
            {offered.map((p) => (
              <div key={p.name} className="flex flex-wrap items-start justify-between gap-2">
                <span className="text-[1rem] text-[#221d18]">
                  <span className="font-medium">{p.name}</span>{" "}
                  <span className="text-[#6d675f]">({formatAgeRange(p.age)})</span>
                  {p.note && !isDuplicateRangeNote(p.age, p.note) &&
                    (p.age.sourceConflict ? (
                      <ConflictNote note={p.note} noteUrl={p.noteUrl} noteLabel={p.noteLabel} />
                    ) : (
                      <span className="block text-[1rem] text-[#6d675f] mt-1 leading-snug">
                        {p.note}
                        {p.noteUrl && (
                          <>
                            {" "}
                            <a
                              href={p.noteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-[#1a7a4a] font-medium"
                            >
                              {p.noteLabel ?? "Source"}
                            </a>
                          </>
                        )}
                      </span>
                    ))}
                </span>
                <span className={`text-[0.8125rem] font-bold px-2 py-1 rounded-full shrink-0 ${badgeClasses(p.age, p.note)}`}>
                  {ageBadge(p.age, p.note)}
                </span>
              </div>
            ))}
          </div>
        )}
        {unconfirmedPrograms.length > 0 && (
          <div className="flex flex-col gap-1.5 pt-2 border-t border-[#f0ece4]">
            <span className="text-[0.9375rem] text-[#92400e] flex items-center gap-1.5 font-semibold">
              <HelpCircle className="w-4 h-4" />
              <span>Known at brand level, not confirmed at this branch:</span>
            </span>
            {unconfirmedPrograms.map((p) => (
              <span key={p.name} className="text-[1rem] text-[#4a443c]">
                {p.name} <span className="text-[#6d675f]">({formatAgeRange(p.age)})</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Branch reviews (only when collected for this branch) */}
      {venue.reviews && (
        <div className="p-4 rounded-2xl border border-[#e7e0d4] bg-white flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-[1rem] text-[#221d18] flex items-center gap-2">
              <Star className="w-4.5 h-4.5 text-[#f59e0b] fill-[#f59e0b]" />
              Branch reviews
            </span>
            {venue.reviews.rating !== null && (
              <span className="text-[1rem] font-bold text-[#221d18]">
                {venue.reviews.rating.toFixed(1)}
                {venue.reviews.reviewCount !== null && (
                  <span className="text-[#6d675f] font-medium">{` (${venue.reviews.reviewCount})`}</span>
                )}
              </span>
            )}
          </div>
          {venue.reviews.praiseThemes.length === 0 &&
          venue.reviews.complaintThemes.length === 0 ? (
            <span className="text-[0.9375rem] text-[#6d675f]">
              Review themes not yet collected for this branch.
            </span>
          ) : (
            <>
              {venue.reviews.praiseThemes.length > 0 && (
                <div className="text-[1rem] text-[#4a443c]">
                  <span className="font-semibold text-[#221d18]">Praised: </span>
                  {venue.reviews.praiseThemes.join("; ")}
                </div>
              )}
              {venue.reviews.complaintThemes.length > 0 && (
                <div className="text-[1rem] text-[#4a443c]">
                  <span className="font-semibold text-[#221d18]">
                    Concerns (1 reviewer each):{" "}
                  </span>
                  {venue.reviews.complaintThemes.join("; ")}
                </div>
              )}
            </>
          )}
          {venue.reviews.sampleNote && (
            <span className="text-[0.9375rem] text-[#6d675f]">{venue.reviews.sampleNote}</span>
          )}
          <button
            type="button"
            onClick={() => setReviewSourceOpen((v) => !v)}
            className="self-start flex items-center gap-1.5 text-[0.9375rem] font-semibold text-[#6d675f] hover:text-[#221d18] py-1 transition-colors"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${reviewSourceOpen ? "rotate-180" : ""}`} />
            <span>Review source and dates</span>
          </button>
          {reviewSourceOpen && (
            <span className="text-[0.9375rem] text-[#6d675f]">
              Reviews via {venue.reviews.source}, checked{" "}
              {venue.reviews.checkedAt} (date we looked, not review dates). Individual
              experiences vary.{" "}
              {venue.reviews.sourceUrl && (
                <a
                  href={venue.reviews.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#1a7a4a] font-medium"
                >
                  Source
                </a>
              )}
            </span>
          )}
        </div>
      )}

      {/* Distance / ETA: only real values. Straight-line distance is never
          presented as a travel ETA. */}
      <div className="flex flex-wrap gap-2 text-center">
        {(route || isRouting) && (
          <>
            <div className="bg-white p-3 rounded-2xl border border-[#e7e0d4] flex-1 min-w-[min(100%,13.75rem)]">
              <span className="text-[0.875rem] text-[#6d675f] block">Route distance</span>
              <span className="font-bold text-[#221d18] text-[1rem]">
                {isRouting ? "..." : `${route?.distance_km} km`}
              </span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#e7e0d4] flex-1 min-w-[min(100%,13.75rem)]">
              <span className="text-[0.875rem] text-[#6d675f] block">Drive ETA, no traffic</span>
              <span className="font-bold text-[#1a7a4a] text-[1rem]">
                {isRouting ? "..." : `${route?.duration_min} min`}
              </span>
            </div>
          </>
        )}
        {!route && !isRouting && venue.distance ? (
          <div className="bg-white p-3 rounded-2xl border border-[#e7e0d4] flex-1 min-w-[min(100%,13.75rem)]">
            <span className="text-[0.875rem] text-[#6d675f] block">Straight-line</span>
            <span className="font-bold text-[#221d18] text-[1rem]">
              {venue.distance} km
            </span>
          </div>
        ) : null}
        <div className="bg-white p-3 rounded-2xl border border-[#e7e0d4] flex-1 min-w-[min(100%,13.75rem)]">
          <span className="text-[0.875rem] text-[#6d675f] block">Area</span>
          <span className="font-bold text-[#221d18] text-[1rem] block px-1 break-words">
            {venue.area}
          </span>
        </div>
      </div>

      {route && (
        <p className="text-[0.9375rem] text-[#6d675f]">
          Route computed by the OSRM demo server, which receives your position and the
          destination coordinates to calculate it. This app does not store location history. The drive time ignores traffic, so allow more time at busy hours.
        </p>
      )}

      {routingError && (
        <p className="text-[0.9375rem] text-[#92400e] border border-[#fcd34d] rounded-2xl px-3.5 py-3 bg-[#fef3c7]">
          Routing is unavailable right now ({routingError}). Distance and ETA above are
          straight-line estimates.
        </p>
      )}

      {/* Actions */}
      <div className="pt-1 flex flex-col gap-2.5">
        {!routingBlocked && canNavigate && (
          <button
            type="button"
            onClick={onStartInAppNavigation}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#1a7a4a] hover:bg-[#14532d] text-white font-bold text-[1.0625rem] tracking-tight transition-colors"
          >
            <Navigation className="w-5 h-5 text-white fill-white" />
            <span>Navigate</span>
          </button>
        )}
        {!routingBlocked && !canNavigate && (
          <p className="text-[0.9375rem] text-[#6d675f] border border-[#e7e0d4] rounded-2xl px-3.5 py-3 bg-white">
            Turn on location to get in-app navigation from where you are, or open
            the destination in Google Maps.
          </p>
        )}

        <button
          type="button"
          onClick={openGoogleMaps}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-white hover:bg-[#fbf9f5] border border-[#e7e0d4] text-[#221d18] text-[1rem] font-semibold transition-colors"
        >
          <span>{routingBlocked ? "Search in Google Maps" : "Open in Google Maps"}</span>
          <ExternalLink className="w-4 h-4 text-[#6d675f]" />
        </button>
      </div>

      {/* Official links */}
      <div className="flex items-center justify-between text-[1rem] pt-1">
        <div className="flex items-center gap-3">
          {venue.website && (
            <a
              href={venue.website}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[#1a7a4a] font-semibold"
            >
              Official site
            </a>
          )}
          {venue.instagram && (
            <a
              href={venue.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[#1a7a4a] font-semibold"
            >
              Instagram
            </a>
          )}
        </div>
        {venue.phone && (
          <div className="flex items-center gap-1.5 text-[#4a443c]">
            <Clock className="w-4 h-4 text-[#6d675f]" />
            <span>{venue.phone}</span>
          </div>
        )}
      </div>

      {/* Why we list this: verification detail, one level down */}
      <div className="border-t border-[#e7e0d4] pt-1">
        <button
          type="button"
          onClick={() => setWhyOpen((v) => !v)}
          className="flex items-center gap-1.5 text-[0.9375rem] font-semibold text-[#6d675f] hover:text-[#221d18] py-2 transition-colors"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${whyOpen ? "rotate-180" : ""}`} />
          <span>Why we list this place</span>
        </button>
        {whyOpen && (
          <div className="flex flex-col gap-1.5 pb-2 text-[1rem] text-[#4a443c]">
            {term && <span>Term: {term}</span>}
            <span className="text-[#6d675f]">
              Source: {venue.sourceUrl} -{" "}
              {venue.lastCheckedAt ? `checked ${venue.lastCheckedAt}` : "not yet verified"}
            </span>
          </div>
        )}
      </div>

      {/* Report a problem (stored on this device only) */}
      <div className="border-t border-[#e7e0d4]">
        <button
          type="button"
          onClick={() => { setReportOpen((v) => !v); setReportSaved(false); }}
          className="flex items-center gap-1.5 text-[0.9375rem] font-semibold text-[#6d675f] hover:text-[#221d18] py-2 transition-colors"
        >
          <Flag className="w-4 h-4" />
          <span>Report a problem with this place</span>
        </button>
        {reportOpen && (
          <div className="flex flex-col gap-2 pb-2">
            {reportSaved ? (
              <p className="text-[0.9375rem] text-[#6d675f]">
                Saved on this device for your next data pass. Nothing was sent.
              </p>
            ) : (
              <>
                <textarea
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="e.g. branch closed, wrong address, class not offered"
                  rows={2}
                  className="w-full bg-white border border-[#e7e0d4] rounded-2xl p-3 text-[1rem] text-[#221d18] placeholder-[#6d675f] focus:outline-none focus:border-[#1a7a4a]"
                />
                <button
                  type="button"
                  onClick={saveReport}
                  className="self-start px-4 py-2.5 rounded-full bg-white hover:bg-[#fbf9f5] border border-[#e7e0d4] text-[0.9375rem] font-semibold text-[#221d18] transition-colors"
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
// Trailing sentinel: absorbs the web editor last-line indent artifact.
