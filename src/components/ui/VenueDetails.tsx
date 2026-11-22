"use client";
import { publicLocation } from "@/utils/publicLocation";
import { isDeadSourceUrl } from "@/data/deadLinks";
import { phoneHref } from "@/utils/venueSummary";
import { estimatedPrograms } from "@/data/age-estimates";

import { useState } from "react";
import { Venue, AgeClaim } from "@/types/venue";
import { isVerifiedAgeClaim, verifiedPrograms } from "@/utils/ageMatch";
import { canRouteVenue } from "@/utils/mapsLink";
import { decidedAgeRange, formatDecidedRange, CONFIRM_BY_PHONE, isTrueBrandProgram, ageSourceLabel } from "@/utils/decideAge";
import { formatIsoMonth, trendVerdict } from "@/utils/reviewPulse";
import {
  Phone,
  ShieldCheck,
  Flag,
  Star,
  MapPin,
  ChevronDown,
  Banknote,
} from "lucide-react";

interface VenueDetailsProps {
  venue: Venue;
  onCenterMap?: () => void;
  mapPeek?: boolean;
  onExpandDetails?: () => void;
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

// QC on PR #106: settled claims get a tiny inline tag on their own class row,
// not a separate box with paragraphs.
function BestAvailableTag({ age }: { age: AgeClaim }) {
  if (!age.bestAvailable) return null;
  return (
    <span className="ml-1.5 text-sm text-[#3d5546]">
      Best available{age.bestAvailableUrl && <> · <a href={age.bestAvailableUrl} target="_blank" rel="noopener noreferrer" className="underline text-[#1a7a4a]">Reference</a></>}
    </span>
  );
}

const IG_PATH = "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077";
const TT_PATH = "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";

type LinkKey = "website" | "instagram" | "tiktok";

function BrandIcon({ kind }: { kind: LinkKey }) {
  if (kind === "website") return <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18M12 3c-5 5-5 13 0 18"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px]" fill="currentColor"><path d={kind === "instagram" ? IG_PATH : TT_PATH}/></svg>;
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
  // Small quiet glyphs share the existing Compare row; each link keeps a 44px target.
  return (
    <nav aria-label="Official pages" className="shrink-0 flex items-center gap-0" data-testid="official-links">
      {links.map(({ key, href }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${LINK_LABEL[key]} (opens in a new tab)`}
          title={LINK_LABEL[key]}
          className="w-11 h-11 inline-flex items-center justify-center rounded-md shrink-0 text-[#6d675f] hover:text-[#14532d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a7a4a]"
        >
          <BrandIcon kind={key} />
        </a>
      ))}
    </nav>
  );
}

export default function VenueDetails({
  venue, onCenterMap, mapPeek, onExpandDetails,
}: VenueDetailsProps) {
  const [reportOpen, setReportOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportSaved, setReportSaved] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);

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

  const offered = verifiedPrograms(venue).sort((a,b) => a.age.minMonths! - b.age.minMonths! || (a.age.maxMonths ?? Infinity) - (b.age.maxMonths ?? Infinity));
  // Brand-level offered programs (owner ask 2026-11-22: capture and show
  // general data): official brand pages state these ages, but the branch has
  // not confirmed its own. Shown separately, never as verified, and never
  // part of exact age matching (verifiedPrograms above stays branch-only).
  // QC on PR #106: only true brand-level provider-confirmed claims belong
  // here; branch classes with boundary-ambiguous notes (Rockstar, Outgrow)
  // and partner-listed classes (Happy Kamper, Teman Autis) render under a
  // neutral label with their source named per item, below.
  const brandPrograms = venue.programs.filter((p) => !offered.includes(p) && isTrueBrandProgram(p));
  const otherPrograms = venue.programs.filter(
    (p) => p.offering === "offered" && !offered.includes(p) && !isTrueBrandProgram(p) && p.age.minMonths != null && p.age.maxMonths != null
  );
  // Owner rule 2026-11-22 (follow-up): always a decided range, never a shrug.
  const decided = decidedAgeRange(venue);
  const [allClasses, setAllClasses] = useState(false);
  const estimates = estimatedPrograms(venue);
  const branchAge = venue.branchAge && isVerifiedAgeClaim(venue.branchAge) ? venue.branchAge : null;
  const term = venue.programs.find((p) => p.term)?.term;

  return (
    <div className={`${mapPeek ? "draft-card-peek" : ""} flex flex-col gap-3.5 text-[#221d18] text-[1rem]`}>
      <div className="flex flex-col gap-1">
        {venue.chain && venue.chain !== venue.branchName && <p className="text-sm font-medium text-[#6d675f]">{venue.chain}</p>}
        <h2 className="text-[1.5rem] font-bold leading-tight break-words">{venue.branchName}</h2>
        <div className="flex flex-wrap items-center justify-between gap-x-3 text-sm text-[#6d675f]">
          <span>{venue.area}</span>
          {onCenterMap && <button type="button" onClick={onCenterMap} aria-label="Show on map" className="flex min-h-11 items-center gap-1.5 text-[#14532d] font-semibold rounded-md focus-visible:outline-2"><MapPin className="w-4 h-4" aria-hidden="true"/>Show on map</button>}
        </div>
        {mapPeek && <button type="button" onClick={onExpandDetails} className="md:hidden min-h-11 text-sm font-semibold text-[#14532d] text-left">See classes and reviews</button>}
      </div>

      {/* Classes by age: the first thing a parent scans */}
      <div className="pb-4 border-b border-[#e7e0d4] flex flex-col gap-3">
        <div className="flex items-center gap-2">
          
          <span className="font-bold text-[1rem] text-[#221d18]">Classes by age</span>
          {(offered.length > 0 || branchAge) && <span className="ml-auto text-sm text-[#14532d] font-semibold flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5"/>Verified</span>}
        </div>
        {offered.length === 0 && !branchAge ? (
          <span className="text-[1rem] text-[#6d675f]">
            {decided.confidence === "general"
              ? `Ages not published. ${CONFIRM_BY_PHONE}`
              : brandPrograms.length > 0 || otherPrograms.length > 0
                // QC on PR #106: the section below already lists the ranges;
                // repeating the merged range here read as the same fact 3x.
                ? `${decided.confidence === "brand" ? "Brand" : "Listed"} ages below. ${CONFIRM_BY_PHONE}`
                : `${decided.confidence === "brand" ? "Brand" : "Listed"} ages: ${formatDecidedRange(decided.minMonths, decided.maxMonths)}. ${CONFIRM_BY_PHONE}`}
          </span>
        ) : (
          <div className="flex flex-col gap-2 pt-0">
            {branchAge && (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[1rem] font-medium text-[#221d18]">
                  Branch statement: {formatAgeRange(branchAge)}
                </span>
              </div>
            )}
            {(allClasses ? offered : offered.slice(0,3)).map((p) => (
              <div key={p.name} className="flex items-start justify-between gap-4 text-[1rem] leading-6">
                <span className="min-w-0">{p.name}<BestAvailableTag age={p.age} /></span><span className="shrink-0 text-[#6d675f]">{formatAgeRange(p.age)}</span>
              </div>
            ))}
            {offered.length > 3 && <button type="button" onClick={()=>setAllClasses(v=>!v)} aria-expanded={allClasses} className="min-h-11 self-start text-sm font-semibold text-[#14532d] rounded-md focus-visible:outline-2">{allClasses ? "Show fewer" : `Show all ${offered.length} classes`}</button>}

          </div>
        )}

      </div>

      {brandPrograms.length > 0 && (
        <div className="py-3 border-b border-[#e7e0d4] flex flex-col gap-2">
          <span className="font-bold">Brand program ages</span>
          {brandPrograms.map((p) => (
            <div key={p.name} className="flex items-start justify-between gap-4 text-[1rem] leading-6">
              <span className="min-w-0">{p.name}<BestAvailableTag age={p.age} /></span><span className="shrink-0 text-[#6d675f]">{formatAgeRange(p.age)}</span>
            </div>
          ))}
        </div>
      )}

      {otherPrograms.length > 0 && (
        <div className="py-3 border-b border-[#e7e0d4] flex flex-col gap-2">
          <span className="font-bold">Other recorded class ages</span>
          {otherPrograms.map((p) => (
            <div key={p.name} className="flex items-start justify-between gap-4 text-[1rem] leading-6">
              <span className="min-w-0">{p.name}<BestAvailableTag age={p.age} /></span><span className="shrink-0 text-[#6d675f]">{formatAgeRange(p.age)}{p.age.providerAgeUrl && !isDeadSourceUrl(p.age.providerAgeUrl) && ageSourceLabel(p) && <> · <a href={p.age.providerAgeUrl} target="_blank" rel="noopener noreferrer" className="underline text-[#1a7a4a]">{ageSourceLabel(p)}</a></>}</span>
            </div>
          ))}
        </div>
      )}

      {estimates.length > 0 && (
        <div className="py-3 border-b border-[#e7e0d4] flex flex-col gap-3">
          <span className="font-bold">Estimated ages</span>
          {estimates.map(estimate => {
            return <div key={estimate.name} className="flex flex-col gap-1 text-[0.9375rem]">
              <span className="font-semibold">{estimate.name}: {estimate.minMonths} to {estimate.maxMonths} months</span>
              <div className="flex flex-wrap gap-3">{estimate.sources.map((url, i) => <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-[#1a7a4a] underline">Source {i + 1}</a>)}</div>
            </div>;
          })}
        </div>
      )}

      {(["age-conflict", "parent-review", "class-details"] as const).map(kind => {
        // Explicit note kinds render whenever set; legacy conflict notes still
        // key off sourceConflict when no kind is recorded.
        const notes = venue.programs.filter(program => (program.noteKind ?? (program.age.sourceConflict ? "age-conflict" : undefined)) === kind);
        if (!notes.length) return null;
        const ageConflict = kind === "age-conflict";
        return <section key={kind} className={ageConflict ? "rounded-xl bg-[#fff8e8] border border-[#ead9ae] p-3.5 flex flex-col gap-2" : "pl-3 py-2 border-l-2 border-[#d4cbbf] flex flex-col gap-2"} data-testid={ageConflict ? "age-conflicts" : "program-notes"}>
          <span className="font-bold text-[#221d18]">{ageConflict ? "Age details to confirm" : kind === "parent-review" ? "Parent review note" : "Class details to check"}</span>
          {notes.map(program => <div key={program.name} className={`text-[0.875rem] ${ageConflict ? "text-[#665026]" : "text-[#6d675f]"}`}>
            <p><strong>{program.name}:</strong> {program.note}</p>
            {program.age.providerAgeUrl && !isDeadSourceUrl(program.age.providerAgeUrl) && <a href={program.age.providerAgeUrl} target="_blank" rel="noopener noreferrer" className="underline text-[#1a7a4a] mr-3">Program source</a>}
            {program.noteUrl && !isDeadSourceUrl(program.noteUrl) && <a href={program.noteUrl} target="_blank" rel="noopener noreferrer" className="underline text-[#1a7a4a]">{program.noteLabel || "Other source"}</a>}
          </div>)}
        </section>;
      })}

      {/* Branch reviews (only when collected for this branch) */}
      {venue.reviews && (
        <div className="pb-4 border-b border-[#e7e0d4] flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-[1rem] text-[#221d18] flex items-center gap-2">
              <Star className="w-4.5 h-4.5 text-[#f59e0b] fill-[#f59e0b]" />
              Branch reviews
            </span>
            {venue.reviews.rating !== null && (
              <span className="text-[1rem] font-bold text-[#221d18]">
                {venue.reviews.rating.toFixed(1)}
                {venue.reviews.reviewCount !== null && (
                  <span className="text-[#6d675f] font-medium">{` (${venue.reviews.reviewCount})`}{venue.reviews.reviewCount < 10 && " · few ratings"}</span>
                )}
              </span>
            )}
          </div>
          {(() => {
            // Review trend restored 2026-11-22 at Derryl's request: one compact
            // data row, shown only when the trend is evidence-backed (no fallback prose).
            const verdict = trendVerdict(venue.reviews);
            if (!verdict.trend) return null;
            const badge = {
              improving: "bg-[#dcfce7] text-[#166534]",
              steady: "bg-[#f1ede6] text-[#4a443c]",
              worsening: "bg-[#fee2e2] text-[#b91c1c]",
              mixed: "bg-[#fef3c7] text-[#92400e]",
            }[verdict.trend];
            const label = verdict.trend.charAt(0).toUpperCase() + verdict.trend.slice(1);
            return (
              <div className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
                <span className="font-semibold text-[#221d18]">Trend:</span>
                <span className={`text-sm font-semibold px-1.5 py-0.5 rounded-md ${badge}`}>{label}</span>
                {verdict.comparisonText && (
                  <span className="text-[#4a443c]">{verdict.comparisonText}</span>
                )}
              </div>
            );
          })()}
          {(venue.reviews.praiseThemes.length > 0 ||
          venue.reviews.complaintThemes.length > 0) && (
            <>
              {venue.reviews.praiseThemes.length > 0 && (
                <div className="text-[0.9375rem] text-[#4a443c]">
                  <span className="font-semibold text-[#221d18]">Praised: </span>
                  {venue.reviews.praiseThemes.join("; ")}
                </div>
              )}
              {venue.reviews.complaintThemes.length > 0 && (
                <div className="text-[0.9375rem] text-[#4a443c]">
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
          {venue.reviews.latestReview?.date && (
            <span className="text-[0.9375rem] text-[#6d675f]">
              Latest review: {venue.reviews.latestReview.approximate ? formatIsoMonth(venue.reviews.latestReview.date) : venue.reviews.latestReview.date}{venue.reviews.checkedAt && ` · checked ${venue.reviews.checkedAt}`}.
            </span>
          )}
          {venue.reviews.sourceUrl && (
            <a href={venue.reviews.sourceUrl} target="_blank" rel="noopener noreferrer" className="self-start underline text-[#1a7a4a] font-medium min-h-11 inline-flex items-center">
              {venue.reviews.source}
            </a>
          )}
        </div>
      )}

      <div className="flex flex-nowrap items-center justify-between gap-1 py-1">
        <OfficialLinks venue={venue}/>
        <button type="button" onClick={()=>window.dispatchEvent(new CustomEvent("map-explora-compare",{detail:venue.id}))} className="min-h-11 text-sm font-semibold text-[#14532d] rounded-md focus-visible:outline-2">Compare this place</button>
      </div>
      <details className="border-b border-[#e7e0d4] pb-3"><summary className="min-h-11 cursor-pointer text-sm text-[#6d675f] flex items-center justify-between">Address and travel details<ChevronDown className="w-4 h-4"/></summary><p className="text-sm leading-6">{publicLocation(venue).address}</p></details>

      {/* One travel-note panel retains every location disclaimer without repeated alerts. */}
      {(publicLocation(venue).notice || venue.caution) && <section className="pl-3 py-2 border-l-2 border-[#d4cbbf] flex flex-col gap-2 text-[0.9375rem] text-[#6d675f]">
        <h3 className="font-semibold text-[#4a443c]">Before you travel</h3>
        {publicLocation(venue).notice && <p>{publicLocation(venue).notice}</p>}
        {venue.caution && <p>{venue.caution}</p>}
      </section>}


      {/* Standing rule 2026-11-20: the approximate-location warning stays,
          one short line below the content, never on top. */}
      {!canRouteVenue(venue) && (
        <p className="text-[0.9375rem] text-[#6d675f]">Approximate location. Confirm the venue before travelling.</p>
      )}

      {venue.cardNote && (
        <p className="text-[0.9375rem] text-[#6d675f]" data-testid="card-note">{venue.cardNote}</p>
      )}

      {/* Prices: provenance belongs to each listing; legacy entries default to partner. */}
      {venue.priceListings && venue.priceListings.length > 0 && (
        <div className="py-3 border-b border-[#e7e0d4] flex flex-col gap-2.5" data-testid="price-listings">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Banknote aria-hidden="true" className="w-5 h-5 text-[#6d675f]" />
              <span className="font-bold text-[1rem] text-[#221d18]">Price</span>
            </div>
            <span className="text-[0.8125rem] font-bold px-2 py-1 rounded-full shrink-0 bg-[#f1ece2] text-[#4a443c]">
              Listed prices
            </span>
          </div>
          {venue.priceListings.map((pl) => (
            <div key={`${pl.label}-${pl.sourceUrl}`} className="flex flex-col gap-0.5">
              <span className="text-[1rem] text-[#221d18]">
                <span className="font-bold">{formatIdr(pl.amountIdr)}{pl.amountIdrMax ? `\u2013${formatIdr(pl.amountIdrMax).replace(/^Rp\s*/, "")}` : ""}</span> {pl.unit}
                {pl.listPriceIdr ? (
                  <span className="text-[#6d675f]"> (list price <s>{formatIdr(pl.listPriceIdr)}</s>)</span>
                ) : null}
              </span>
              <span className="text-[0.8125rem] font-bold text-[#4a443c]">{pl.sourceKind === "official" ? "Official-listed" : "Partner-listed"}</span>
              <span className="text-[0.9375rem] text-[#4a443c]">{pl.label}</span>
              {pl.note && pl.note.split("; ").map((row, ri) => (
                <span key={ri} className="text-[0.875rem] text-[#6d675f]">{row}</span>
              ))}
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
        </div>
      )}

      {venue.distance ? <p className="text-sm text-[#6d675f]">Straight-line distance: {venue.distance} km</p> : null}

      {/* Phone */}
      {venue.phone && venue.phoneScope === "shared-enquiry" && <p className="text-[0.875rem] text-[#6d675f]">Shared enquiry number</p>}
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
          className="flex items-center gap-1.5 text-[0.9375rem] font-semibold text-[#6d675f] hover:text-[#221d18] min-h-11 py-2 transition-colors"
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
          className="flex items-center gap-1.5 text-[0.9375rem] font-semibold text-[#6d675f] hover:text-[#221d18] min-h-11 py-2 transition-colors"
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
