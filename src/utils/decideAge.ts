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
  const brand = offered.filter(
    (p) => p.age.level === "brand" && p.age.verification === "provider-confirmed" && !p.age.sourceConflict && finite(p.age.minMonths) && finite(p.age.maxMonths)
  );
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

// Card-safe one-line summary of the decided range for non-verified venues.
export function decidedAgeSummary(v: Venue): string {
  const d = decidedAgeRange(v);
  if (d.confidence === "general") return "Ages not published - confirm by phone first";
  const label = d.confidence === "brand" ? "Brand ages" : "Listed ages";
  return `${label}: ${d.minMonths} to ${d.maxMonths} months - confirm by phone first`;
}
