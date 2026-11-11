"use client";
import { phoneHref } from "@/utils/venueSummary";
import { estimatedPrograms } from "@/data/age-estimates";

import { useState } from "react";
import { Venue, AgeClaim } from "@/types/venue";
import { isVerifiedAgeClaim, verifiedPrograms } from "@/utils/ageMatch";
import { trendVerdict, formatIsoMonth, REVIEW_TREND_FALLBACK } from "@/utils/reviewPulse";
import {
  Phone,
  ShieldCheck,
  Flag,
  Star,
  MapPin,
  TriangleAlert,
  ChevronDown,
  Banknote,
} from "lucide-react";

interface VenueDetailsProps {
  venue: Venue;
}

const REPORTS_KEY = "map-explora-venue-reports";

function formatMonths(m: number): string {
  // Parents of under-4s read months; switch to years only past 36.
  if (m <= 36) return `${m} mo`;
  const yrs = m / 12;
  return `${Number.isInteger(yrs) ? yrs : yrs.toFixed(1)} yr`;
}

function formatIdr(n: number): string {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function formatCheckedDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

function formatAgeRange(age: AgeClaim): string {
  if (age.minMonths === null && age.maxMonths === null) return "ages not stated";
  const lo = age.minMonths === null ? "0 mo" : formatMonths(age.minMonths);
  if (age.maxMonths === null) return `from ${lo}`;
  return `${lo} - ${formatMonths(age.maxMonths)}`;
}

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  className: "w-[18px] h-[18px] shrink-0",
} as const;

function GlobeIcon() {
  return (
    <svg {...ICON_PROPS}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>
  );
}
function InstagramIcon() {
  return (
    <svg {...ICON_PROPS}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
  );
}
function TikTokIcon() {
  return (
    <svg {...ICON_PROPS}><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 3c.4 2.6 2.1 4.2 5 4.4" /></svg>
  );
}

function OfficialLinks({ venue }: { venue: Venue }) {
  const links = [
    { key: "website", label: "Website", href: venue.website, Icon: GlobeIcon },
    { key: "instagram", label: "Instagram", href: venue.instagram, Icon: InstagramIcon },
    { key: "tiktok", label: "TikTok", href: venue.tiktok, Icon: TikTokIcon },
  ].filter((l) => Boolean(l.href));
  if (links.length === 0) return null;
  // Layout by count. 1 chip keeps its natural width, left aligned. 2 chips
  // share the row and wrap rather than overflow. 3 chips sit in equal columns
  // with the icon above the label, so they fit one row from 320px up.
  const n = links.length;
  const wrap = n === 3 ? "grid grid-cols-3 gap-2" : "flex flex-wrap gap-2";
  const chip =
    n === 3
      ? "rounded-2xl flex-col gap-0.5 px-1 py-1.5 min-h-[3.25rem] text-[0.8125rem]"
      : `rounded-full ${n === 2 ? "flex-auto " : ""}flex-row gap-1.5 px-3.5 min-h-11 text-[0.8125rem] min-[360px]:text-[0.875rem]`;
  return (
    <nav aria-label="Official pages" className={wrap} data-testid="official-links">
      {links.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} (opens in a new tab)`}
          className={`${chip} inline-flex items-center justify-center border border-[#e7e0d4] bg-white text-[#14532d] font-semibold leading-tight hover:bg-[#e3f2e8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a7a4a]`}
        >
          <Icon />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}

export default function VenueDetails({
  venue,
}: VenueDetailsProps) {
  const [reportOpen, setReportOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportSaved, setReportSaved] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);
  const [reviewSourceOpen, setReviewSourceOpen] = useState(false);

  const approximate = venue.coordinateSource === "area-approximate";

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

  const offered = verifiedPrograms(venue);
  const estimates = estimatedPrograms(venue);
  const branchAge = venue.branchAge && isVerifiedAgeClaim(venue.branchAge) ? venue.branchAge : null;
  const term = venue.programs.find((p) => p.term)?.term;

  return (
    <div className="flex flex-col gap-3.5 text-[#221d18] text-[1rem]">
      {/* Title */}
      <div className="flex flex-col">
        <h2 className="text-[1.25rem] font-bold text-[#221d18] leading-snug">
          {venue.chain ? `${venue.chain} ` : ""}
          {venue.branchName}
        </h2>
        <span className="text-[1rem] text-[#6d675f] mt-1">{venue.address}</span>
      </div>

      {/* Official pages: one row of 44px chips; only links this place has */}
      <OfficialLinks venue={venue} />

      {approximate && (
        <p className="text-[0.9375rem] text-[#92400e] border border-[#fcd34d] bg-[#fef3c7] rounded-2xl px-3.5 py-3 flex items-start gap-2">
          <MapPin className="w-4.5 h-4.5 mt-0.5 shrink-0" />
          <span>
            Approximate area location. Confirm the exact venue with the provider
            before you travel; only a Google Maps search is available for this pin.
          </span>
        </p>
      )}

      {venue.caution && (
        <p className="text-[0.9375rem] text-[#92400e] border border-[#fcd34d] bg-[#fef3c7] rounded-2xl px-3.5 py-3 flex items-start gap-2">
          <TriangleAlert className="w-4.5 h-4.5 mt-0.5 shrink-0" />
          <span>{venue.caution}</span>
        </p>
      )}

      {/* Classes by age: the first thing a parent scans */}
      <div className="p-4 rounded-2xl border border-[#e7e0d4] bg-white flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#1a7a4a]" />
          <span className="font-bold text-[1rem] text-[#221d18]">Classes here by age</span>
        </div>
        {offered.length === 0 && !branchAge ? (
          <span className="text-[1rem] text-[#6d675f]">
            Class ages not verified yet
          </span>
        ) : (
          <div className="flex flex-col gap-2.5 pt-1">
            {branchAge && (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[1rem] font-medium text-[#221d18]">
                  Branch statement: {formatAgeRange(branchAge)}
                </span>
                <span className={`text-[0.8125rem] font-bold px-2 py-1 rounded-full shrink-0 bg-[#e3f2e8] text-[#14532d]`}>
                  Verified
                </span>
              </div>
            )}
            {offered.map((p) => (
              <div key={p.name} className="flex flex-wrap items-start justify-between gap-2">
                <span className="text-[1rem] text-[#221d18]">
                  <span className="font-medium">{p.name}</span>{" "}
                  <span className="text-[#6d675f]">({formatAgeRange(p.age)})</span>

                </span>
                <span className={`text-[0.8125rem] font-bold px-2 py-1 rounded-full shrink-0 bg-[#e3f2e8] text-[#14532d]`}>
                  Verified
                </span>
              </div>
            ))}
          </div>
        )}

      </div>

      {estimates.length > 0 && (
        <div className="p-4 rounded-2xl border border-[#fcd34d] bg-[#fffbeb] flex flex-col gap-3">
          <span className="font-bold">Estimated ages</span>
          <p className="text-[0.9375rem] text-[#6d675f]">Planning only. Eligibility is not verified. These ages do not enter confirmed age matches and are not a safety assessment.</p>
          {estimates.map(estimate => {
            return <div key={estimate.name} className="flex flex-col gap-1 text-[0.9375rem]">
              <span className="font-semibold">{estimate.name}: {estimate.minMonths} to {estimate.maxMonths} months</span>
              <span>{estimate.rule === "latest-dated-official" ? "Dated official source" : "Conservative overlap"}{estimate.sourceDate ? ` (${estimate.sourceDate})` : " (sources undated)"}</span>
              <span className="text-[#6d675f]">{estimate.reason}</span>
              <div className="flex flex-wrap gap-3">{estimate.sources.map((url, i) => <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-[#1a7a4a] underline">Source {i + 1}</a>)}</div>
            </div>;
          })}
        </div>
      )}

      {/* Prices: booking-site listings only, always with source, label and check date */}
      {venue.priceListings && venue.priceListings.length > 0 && (
        <div className="p-4 rounded-2xl border border-[#e7e0d4] bg-white flex flex-col gap-2.5" data-testid="price-listings">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Banknote aria-hidden="true" className="w-5 h-5 text-[#6d675f]" />
              <span className="font-bold text-[1rem] text-[#221d18]">Price</span>
            </div>
            <span className="text-[0.8125rem] font-bold px-2 py-1 rounded-full shrink-0 bg-[#f1ece2] text-[#4a443c]">
              Partner-listed
            </span>
          </div>
          {venue.priceListings.map((pl) => (
            <div key={`${pl.label}-${pl.sourceUrl}`} className="flex flex-col gap-0.5">
              <span className="text-[1rem] text-[#221d18]">
                <span className="font-bold">{formatIdr(pl.amountIdr)}</span> {pl.unit}
                {pl.listPriceIdr ? (
                  <span className="text-[#6d675f]"> (list price <s>{formatIdr(pl.listPriceIdr)}</s>)</span>
                ) : null}
              </span>
              <span className="text-[0.9375rem] text-[#4a443c]">{pl.label}</span>
              {pl.schedule && <span className="text-[0.9375rem] text-[#4a443c]">{pl.schedule}</span>}
              <span className="text-[0.875rem] text-[#6d675f]">
                From{" "}
                <a href={pl.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline text-[#1a7a4a] font-semibold">
                  {pl.source}
                </a>
                , read {formatCheckedDate(pl.checkedAt)}
              </span>
            </div>
          ))}
          <p className="text-[0.875rem] text-[#6d675f]">
            Listed by a booking site, not confirmed by the provider. Prices change; confirm with the provider before you book.
          </p>
        </div>
      )}

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
                    {venue.reviews.lowRatedCount != null
                      ? `Concerns (from ${venue.reviews.lowRatedCount} ${venue.reviews.lowRatedCount === 1 ? "review" : "reviews"} rated 3 stars or lower): `
                      : "Concerns: "}
                  </span>
                  {venue.reviews.complaintThemes.join("; ")}
                </div>
              )}
            </>
          )}
          {venue.reviews.sampleNote && (
            <span className="text-[0.9375rem] text-[#6d675f]">{venue.reviews.sampleNote}</span>
          )}
          {(() => {
            const verdict = trendVerdict(venue.reviews);
            const badge = verdict.trend
              ? {
                  improving: "bg-[#dcfce7] text-[#166534]",
                  steady: "bg-[#f1ede6] text-[#4a443c]",
                  worsening: "bg-[#fee2e2] text-[#b91c1c]",
                  mixed: "bg-[#fef3c7] text-[#92400e]",
                }[verdict.trend]
              : "bg-[#f1ede6] text-[#6d675f]";
            const label = verdict.trend
              ? verdict.trend.charAt(0).toUpperCase() + verdict.trend.slice(1)
              : "Not enough data";
            return (
              <div className="flex flex-col gap-1">
                <span
                  className={`self-start inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.8125rem] font-semibold ${badge}`}
                >
                  {label}
                </span>
                {verdict.trend && verdict.comparisonText ? (
                  <span className="text-[0.9375rem] text-[#4a443c]">
                    {verdict.comparisonText}
                  </span>
                ) : (
                  <span className="text-[0.9375rem] text-[#6d675f]">
                    {REVIEW_TREND_FALLBACK}
                  </span>
                )}
                {venue.reviews.latestReview?.date && (
                  <span className="text-[0.9375rem] text-[#6d675f]">
                    Latest review: {venue.reviews.latestReview.approximate ? formatIsoMonth(venue.reviews.latestReview.date) : venue.reviews.latestReview.date}.
                  </span>
                )}
                {verdict.evidenceText && (
                  <span className="text-[0.8125rem] text-[#6d675f]">
                    {verdict.evidenceText}
                  </span>
                )}
              </div>
            );
          })()}
          <button
            type="button"
            onClick={() => setReviewSourceOpen((v) => !v)}
            className="self-start flex items-center gap-1.5 min-h-[44px] text-[0.9375rem] font-semibold text-[#6d675f] hover:text-[#221d18] transition-colors"
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
        {venue.distance ? (
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

      <p className="text-[0.875rem] text-[#6d675f]">Check tolls and ganjil/genap settings in Google Maps before travelling.</p>

      {/* Phone */}
      {venue.phone && (
        <div className="flex items-center gap-1.5 text-[1rem] text-[#4a443c]">
          <Phone aria-hidden="true" className="w-4 h-4 text-[#6d675f] shrink-0" />
          {phoneHref(venue.phone) ? (
            <a href={phoneHref(venue.phone)!} className="inline-flex items-center min-h-11 underline text-[#1a7a4a] font-semibold" aria-label={`Call ${venue.chain || venue.branchName}: ${venue.phone}`}>
              {venue.phone}
            </a>
          ) : <span>{venue.phone}</span>}
        </div>
      )}

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
