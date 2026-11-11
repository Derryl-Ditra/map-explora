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

const IG_PATH = "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077";
const TT_PATH = "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";

type LinkKey = "website" | "instagram" | "tiktok";

function BrandIcon({ kind }: { kind: LinkKey }) {
  if (kind === "website") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-11 h-11">
        <rect width="24" height="24" rx="7" fill="#1a7a4a" />
        <g fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round">
          <circle cx="12" cy="12" r="6.5" />
          <path d="M5.5 12h13M12 5.5c2.2 2.4 2.2 10.6 0 13M12 5.5c-2.2 2.4-2.2 10.6 0 13" />
        </g>
      </svg>
    );
  }
  if (kind === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-11 h-11">
        <defs>
          <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#fdb84a" />
            <stop offset=".35" stopColor="#f0452f" />
            <stop offset=".65" stopColor="#d62976" />
            <stop offset="1" stopColor="#6a3fd0" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="7" fill="url(#ig-grad)" />
        <path transform="translate(4.8 4.8) scale(.6)" fill="#fff" d={IG_PATH} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-11 h-11">
      <rect width="24" height="24" rx="7" fill="#111" />
      <path transform="translate(5.4 5.2) scale(.6)" fill="#25f4ee" d={TT_PATH} />
      <path transform="translate(6.6 6.4) scale(.6)" fill="#fe2c55" d={TT_PATH} />
      <path transform="translate(6 5.8) scale(.6)" fill="#fff" d={TT_PATH} />
    </svg>
  );
}

const LINK_LABEL: Record<LinkKey, string> = {
  website: "Website",
  instagram: "Instagram",
  tiktok: "TikTok",
};

function OfficialLinks({ venue }: { venue: Venue }) {
  const links = (["website", "instagram", "tiktok"] as const)
    .map((key) => ({ key, href: venue[key] }))
    .filter((l) => Boolean(l.href));
  if (links.length === 0) return null;
  // Icon-only 44px tiles beside the title, 12px apart so a thumb cannot hit
  // the neighbour. 1 to 3 links stack in one column (44px wide, so the title
  // keeps its width); 4 or more use two columns.
  return (
    <nav aria-label="Official pages" className={`shrink-0 grid gap-3 ${links.length > 3 ? "grid-cols-2" : "grid-cols-1"}`} data-testid="official-links">
      {links.map(({ key, href }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${LINK_LABEL[key]} (opens in a new tab)`}
          title={LINK_LABEL[key]}
          className="rounded-xl shrink-0 transition-transform active:scale-95 motion-reduce:transition-none hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a7a4a]"
        >
          <BrandIcon kind={key} />
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
      {/* Title, with official links as icon tiles on the right (none = full-width title) */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col min-w-0 flex-1">
          <h2 className="text-[1.25rem] font-bold text-[#221d18] leading-snug break-words">
            {venue.chain ? `${venue.chain} ` : ""}
            {venue.branchName}
          </h2>
          <span className="text-[1rem] text-[#6d675f] mt-1 break-words">{venue.address}</span>
        </div>
        <OfficialLinks venue={venue} />
      </div>

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
