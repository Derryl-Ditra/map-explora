import type { Venue } from "../types/venue";
import { isVerifiedAgeClaim, verifiedPrograms } from "./ageMatch";
import { estimatedPrograms } from "../data/age-estimates";

export type AgeConfidence = "verified" | "brand" | "listed" | "general";

export interface DecidedAgeRange {
  minMonths: number;
  maxMonths: number;
  confidence: AgeConfidence;
  basis: string;
}

// Owner rule 2026-11-22 (follow-up): always decide. One deterministic formula
// yields an age range for every venue from whatever sources exist - a data
// point beats nothing for users. Evidence is weighted: the branch's own
// confirmed ages first, then general/brand data from official pages, then any
// listed bounds (including planning estimates), and finally the catalog-wide
// under-5 span. Expert child-development data (CDC/WHO/AAP) remains the
// tiebreak for source conflicts, applied at the data layer where the
// bestAvailable notes cite it. Anything below verified confidence is shown
// with a confirm-by-phone-first note.
export function decidedAgeRange(v: Venue): DecidedAgeRange {
  const offered = v.programs.filter((p) => p.offering === "offered");
  const finite = (m: number | null): m is number => m !== null && Number.isFinite(m);
  const span = (ranges: readonly (readonly [number, number])[]): Pick<DecidedAgeRange, "minMonths" | "maxMonths"> => ({
    minMonths: Math.min(...ranges.map(([lo]) => lo)),
    maxMonths: Math.max(...ranges.map(([, hi]) => hi)),
  });

  // Tier 1: this branch's own confirmed evidence.
  const verified = [
    ...(v.branchAge && isVerifiedAgeClaim(v.branchAge) ? [v.branchAge] : []),
    ...verifiedPrograms(v).map((p) => p.age),
  ];
  if (verified.length) {
    return {
      ...span(verified.map((a) => [a.minMonths!, a.maxMonths!] as const)),
      confidence: "verified",
      basis: "Confirmed by this branch's own published class ages",
    };
  }

  // Tier 2: brand-level ages confirmed on the provider's official pages.
  const brand = offered.filter(isTrueBrandProgram);
  if (brand.length) {
    return {
      ...span(brand.map((p) => [p.age.minMonths!, p.age.maxMonths!] as const)),
      confidence: "brand",
      basis: "General brand data from the provider's official pages; not confirmed for this branch",
    };
  }

  // Tier 3: any listed numeric bounds, plus recorded planning estimates.
  const listed = offered.filter((p) => finite(p.age.minMonths) && finite(p.age.maxMonths)).map((p) => [p.age.minMonths!, p.age.maxMonths!] as const);
  const estimates = estimatedPrograms(v).map((e) => [e.minMonths, e.maxMonths] as const);
  if (listed.length || estimates.length) {
    return {
      ...span([...listed, ...estimates]),
      confidence: "listed",
      basis: "Listed but unconfirmed ages; confirm with the branch before visiting",
    };
  }

  // Tier 4: no numeric evidence. The catalog only lists under-5 venues, so
  // the honest default is the full under-5 span, marked lowest confidence.
  return {
    minMonths: 0,
    maxMonths: 60,
    confidence: "general",
    basis: "No class ages published; the catalog covers under-5 venues only",
  };
}

// Parents of under-4s read months; switch to years only past 36.
export function formatDecidedMonths(m: number): string {
  if (m <= 36) return `${m} mo`;
  const yrs = m / 12;
  return `${Number.isInteger(yrs) ? yrs : yrs.toFixed(1)} yr`;
}

export function formatDecidedRange(minMonths: number, maxMonths: number): string {
  return `${formatDecidedMonths(minMonths)} to ${formatDecidedMonths(maxMonths)}`;
}

// Under-5 map: venue-level summary ranges stop at the map's ceiling. A range
// reaching past 59 months displays as "under 5 yr" instead of "4.9 yr" or
// "5.9 yr"; the full stored range still shows on each class row.
export function formatUnder5Max(maxMonths: number): string {
  return maxMonths > 59 ? "under 5 yr" : formatDecidedMonths(maxMonths);
}

export function formatUnder5Range(minMonths: number, maxMonths: number): string {
  const min = formatDecidedMonths(minMonths);
  const max = formatUnder5Max(maxMonths);
  // "under 5 yr" reads badly after a hyphen; plain units join with one.
  return max === "under 5 yr" ? `${min} to ${max}` : `${min}-${max}`;
}

// One public line for venues whose stored ages and fees failed a verification
// pass (pendingReverification on the record). The numbers stay in the data,
// hidden on every surface, until they are re-checked against the provider.
export const AGES_BEING_RECHECKED = "Ages and fees are being re-checked.";

// Canonical low-confidence note (QC on PR #106): one wording across list,
// card and place page, sentences joined by a period, never a spaced hyphen.
export const CONFIRM_BY_PHONE = "Confirm by phone first.";

// Card-safe one-line summary of the decided range for non-verified venues.
export function decidedAgeSummary(v: Venue): string {
  if (v.pendingReverification) return AGES_BEING_RECHECKED;
  const d = decidedAgeRange(v);
  if (d.confidence === "general") return `Ages not published. ${CONFIRM_BY_PHONE}`;
  const label = d.confidence === "brand" ? "Brand ages" : "Listed ages";
  return `${label}: ${formatUnder5Range(d.minMonths, d.maxMonths)}. ${CONFIRM_BY_PHONE}`;
}

// QC on PR #106: the "Brand program ages" card section is reserved for true
// brand-level claims confirmed on the provider's official pages. Branch
// classes from the provider that fail exact verification (e.g. Rockstar
// boundary-ambiguous notes) and partner-listed classes are NOT brand data.
export function isTrueBrandProgram(p: Venue["programs"][number]): boolean {
  return p.offering === "offered" && p.age.level === "brand" &&
    p.age.verification === "provider-confirmed" && !p.age.sourceConflict &&
    p.age.minMonths !== null && p.age.maxMonths !== null;
}

// Source label for one recorded class age, from the page it was read on.
export function ageSourceLabel(p: Venue["programs"][number]): string | null {
  const url = p.age.providerAgeUrl;
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}
