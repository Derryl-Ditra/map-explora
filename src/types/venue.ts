// Under-5 activities map: domain model (aligned with the research collection plan).
// "Under 5" means under 60 months.
// Honesty rules baked into the type system:
// - a branch offers MANY programs; each program has its own age range
// - a program's offering status at this branch is explicit: offered / not-offered /
//   unknown. Co-occurrence on a brand website never counts as branch offering.
// - brand-level program ages and branch-level confirmation are SEPARATE:
//   a chain accepting under-5s never proves this branch runs those classes
// - age matching is by exact months against program ranges; coarse UI age chips
//   are a presentation choice only, never the match logic (18/30-month cutoffs
//   must not be misclassified)
// - coordinates carry provenance; approximate area pins are not routable
// - no prices, schedules, reviews or availability unless separately verified
//   (prices live ONLY in priceListings below: each one carries its source,
//   partner-listed label and check date, and is never a provider-confirmed fee)

export type CoordinateSource =
  | "provider-address" // geocoded from the provider's own stated address
  | "maps-pin" // pin from a map listing
  | "area-approximate"; // approximate area centroid - NOT routable, shown as area only

export interface AgeClaim {
  minMonths: number | null; // null = bound unknown
  maxMonths: number | null;
  level: "brand" | "branch"; // brand program policy vs this branch confirmed
  verification: "provider-confirmed" | "listed-unconfirmed" | "unknown";
  providerAgeUrl?: string; // provider page stating the age range
  sourceCheckedAt: string | null; // ISO date the source was actually checked
  sourceConflict?: boolean; // two sources state different ranges; both claims shown, never matched
}

export type OfferingStatus =
  | "offered" // a branch-level source explicitly lists this program here
  | "not-offered" // a branch-level source explicitly omits/excludes it
  | "unknown"; // no branch-level evidence either way

// A price seen on a third-party booking page (e.g. Traveloka). Never shown
// without its source, the partner-listed label and the date it was read.
export interface PriceListing {
  label: string; // what the price buys, e.g. "Gymnastics class, 60 min"
  amountIdr: number; // price in IDR as shown on the page
  unit: string; // e.g. "per session"
  listPriceIdr?: number; // struck-through list price on the page, if any
  source: string; // site name, e.g. "Traveloka"
  sourceUrl: string; // exact product page
  checkedAt: string; // ISO date the page was read
  schedule?: string; // slots shown on that page, verbatim summary
}

export interface VenueProgram {
  name: string; // the class/course, e.g. "Baby Gym", "Pre-Ballet"
  category?: string; // normalized: "Gym & Movement", "English & Language", ... (optional; dataset offerings do not carry per-class categories)
  offering: OfferingStatus;
  age: AgeClaim;
  term?: string; // dated term when the source schedule carries one
  note?: string; // source wording / boundary ambiguity, preserved verbatim
  noteUrl?: string; // provenance link for the note (e.g. official age-key page)
  noteLabel?: string; // short human label for noteUrl, e.g. "Age key"
}

// One record per physical branch, never per brand.
export interface Venue {
  id: string;
  chain: string | null; // brand/chain name; null for independents
  branchName: string; // this branch, e.g. "Bintaro"
  categories: string[]; // union of categories of programs offered here
  address: string;
  area: string; // neighborhood, e.g. "Bintaro", "Kebayoran Baru"
  city: string; // Jakarta / Tangerang Selatan / Bogor / Depok / Bekasi / ...
  lat: number;
  lng: number;
  coordinateSource: CoordinateSource;
  caution?: string; // unresolved venue-identity conflict: blocks in-app routing, shown prominently
  branchAge?: AgeClaim; // optional branch-level statement ("classes from 6 months")
  programs: VenueProgram[]; // eligibility is derived from these, never flattened
  website?: string; // official links only
  instagram?: string;
  phone?: string;
  sourceUrl: string; // where this branch record came from
  lastCheckedAt: string | null; // ISO date this record was checked; null = never
  fitStatus: string; // raw verification status code from the reviewed dataset
  // (branch-confirmed-dated-term, branch-confirmed-live-undated,
  //  branch-category-confirmed-live-undated, branch-candidate-live-undated,
  //  official-chain-program, media-claimed, official-global-unverified-local,
  //  unvalidated-extraction, unknown)
  notes?: string;
  // Is this branch still operating? Evidence-based, dated, with its source.
  // official-listed = on the brand's own published branch list or schedule page
  // maps-listed     = Google Maps place page not flagged closed and showing opening hours (no official list found)
  // not-confirmed   = no live evidence the branch operates; show as unconfirmed
  operatingStatus?: {
    state: "official-listed" | "maps-listed" | "not-confirmed";
    source?: string;
    checkedAt: string; // ISO date the source was read
  };
  priceListings?: PriceListing[]; // partner-listed only; absent when no booking-site price was read
  reviews?: ReviewSummary; // absent until branch-specific review evidence is collected
  distance?: number; // km, calculated at runtime
  eta?: number; // minutes, calculated at runtime
}

// Match rule (for the filter hook, documented here so UI cannot drift):
// a branch matches a child's age band only if at least one program with
// offering "offered" has a BRANCH-LEVEL provider-confirmed age claim whose
// [minMonths, maxMonths] intersects the band, or a branch-level branchAge
// claim (level "branch", provider-confirmed) intersects it. Brand/catalog
// ages never produce a confirmed match even when the offering is confirmed:
// a category trial button does not prove which age levels this branch runs.
// Intersection, not a single point, so 6-18mo still matches a 14-month-old.
// Brand-level claims alone NEVER match; they render as "confirm with branch".
// Unknown-age branches stay visible but outside the confirmed-fit results.

export interface ReviewSummary {
  rating: number | null; // e.g. 4.6; null when unavailable
  reviewCount: number | null;
  source: string; // e.g. "Google Maps"
  sourceUrl?: string; // link rendered only when present
  checkedAt: string; // ISO date the reviews were looked at (NOT review posted dates)
  sampleNote?: string; // bounded sample framing, e.g. "3 of 7 reviews visible"
  praiseThemes: string[]; // short paraphrased recurring themes, each evidence-backed
  complaintThemes: string[];
  // Reviewer support behind complaintThemes (2026-11-08 pulse): parallel array,
  // complaintThemeReviewers[i] = how many low-rated (<=3 star) customer reviews
  // matched complaintThemes[i]. Owner responses never count.
  complaintThemeReviewers?: number[];
  lowRatedCount?: number; // customer reviews rated <=3 stars in the collected window
  // Live-Maps review pulse (weekly data job). All optional: absent until collected.
  // Both fields come only from a sort=newest Maps review listing.
  latestReview?: {
    date: string; // exact ISO day, or ISO month (YYYY-MM) when approximate
    approximate?: boolean; // derived from a relative label ("a month ago"): month
    // precision only - relative wording never becomes an invented exact ISO day.
  };
  // Judged from the newest Maps reviews. Labeled only when the evidence backs
  // it; otherwise "insufficient". The UI re-verifies the evidence before
  // showing any label. Two accepted methods:
  // - "maps-sort-newest": bounded sample of 20; 10+ dated reviews spanning BOTH
  //   halves of [from, to], ISO-day bounds.
  // - "maps-window-3m-3m" (2026-11-08 job): current 3 months vs prior 3 months
  //   inside a 6-month window; 10+ dated reviews in the window AND 3+ in each
  //   3-month half; bounds are ISO months derived from relative labels, so
  //   approximate must be true. Relative wording never becomes an exact day.
  // Legacy claim field. The UI never trusts it: for the window method the
  // label is DERIVED in code from the stored per-half averages below.
  trend?: "improving" | "mixed" | "steady" | "worsening" | "insufficient";
  trendEvidence?: {
    method: "maps-sort-newest" | "maps-window-3m-3m"; // how the sample was taken; required so the rule is verifiable
    sampled: number; // dated reviews in the bounded sample or window
    from: string; // ISO day, or ISO month (YYYY-MM) when approximate
    to: string; // ISO day, or ISO month (YYYY-MM) when approximate
    approximate?: boolean; // bounds come from relative labels: month precision only
    olderHalf: number; // dated reviews in the older half (prior 3 months for the window method)
    newerHalf: number; // dated reviews in the newer half (current 3 months for the window method)
    // Window-method evidence, computed from the raw collected reviews. The
    // trend label is derived from these in code (see reviewPulse.ts):
    // diff = newerAvg - olderAvg; improving >= +0.3, worsening <= -0.3,
    // otherwise steady. Positive = 4-5 stars, negative = 1-3 stars.
    olderAvg?: number;
    newerAvg?: number;
    olderPositive?: number;
    olderNegative?: number;
    newerPositive?: number;
    newerNegative?: number;
    checkedAt?: string; // ISO day this pulse was collected (NOT review dates)
  };
}

export interface VenueFilterState {
  searchQuery: string;
  ageBand: import('../utils/ageBands').AgeBandId | null; // inclusive month range; null = any
  category: string; // "ALL" or a category present in the dataset
  area: string; // "ALL" or an area present in the dataset
}
