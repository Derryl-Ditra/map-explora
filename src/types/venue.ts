// Under-4 activities map: domain model (aligned with the research collection plan).
// "Under 4" means under 48 months.
// Honesty rules baked into the type system:
// - a branch offers MANY programs; each program has its own age range
// - a program's offering status at this branch is explicit: offered / not-offered /
//   unknown. Co-occurrence on a brand website never counts as branch offering.
// - brand-level program ages and branch-level confirmation are SEPARATE:
//   a chain accepting under-4s never proves this branch runs those classes
// - age matching is by exact months against program ranges; coarse UI age chips
//   are a presentation choice only, never the match logic (18/30-month cutoffs
//   must not be misclassified)
// - coordinates carry provenance; approximate area pins are not routable
// - no prices, schedules, reviews or availability unless separately verified

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
}

export interface VenueFilterState {
  searchQuery: string;
  ageMonths: number | null; // child's exact age in months (0-47); null = any
  category: string; // "ALL" or a category present in the dataset
  area: string; // "ALL" or an area present in the dataset
}
