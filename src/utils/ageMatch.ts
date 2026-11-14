import type { Venue, AgeClaim } from "../types/venue";

// One UI evidence rule for details, preview and exact-age matching. Brand
// catalog ages, unresolved bounds, conflicts and ambiguous notes stay in the
// dataset but never become a visible class or a confirmed fit.
export function isVerifiedAgeClaim(age: AgeClaim, note?: string): boolean {
  return age.level === "branch" &&
    age.verification === "provider-confirmed" &&
    !age.sourceConflict && !!age.providerAgeUrl &&
    age.minMonths !== null && age.maxMonths !== null &&
    Number.isFinite(age.minMonths) && Number.isFinite(age.maxMonths) &&
    age.minMonths >= 0 && age.minMonths <= age.maxMonths &&
    !/ambigu/i.test(note ?? "");
}

export function verifiedPrograms(v: Venue) {
  return v.programs.filter(p => p.offering === "offered" && isVerifiedAgeClaim(p.age, p.note));
}

export function hasVerifiedAgeEvidence(v: Venue): boolean {
  return !!(v.branchAge && isVerifiedAgeClaim(v.branchAge)) || verifiedPrograms(v).length > 0;
}

export function claimCovers(age: AgeClaim, months: number): boolean | null {
  if (!isVerifiedAgeClaim(age)) return null;
  return age.minMonths! <= months && age.maxMonths! >= months;
}

export function claimCoversWithNote(age: AgeClaim, months: number, note?: string): boolean | null {
  if (!isVerifiedAgeClaim(age, note)) return null;
  return claimCovers(age, months);
}

export function venueConfirmedForAge(v: Venue, months: number): boolean {
  return !!(v.branchAge && claimCovers(v.branchAge, months) === true) ||
    verifiedPrograms(v).some(p => claimCovers(p.age, months) === true);
}

// Inclusive whole-month display ranges only. Keep source claims and named
// class boundaries intact; a missing month must stay a visible gap.
export function mergeAgeRanges(ranges: ReadonlyArray<readonly [number, number]>): [number, number][] {
  const sorted = ranges.map(([lo, hi]): [number, number] => [lo, hi])
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged: [number, number][] = [];
  for (const [lo, hi] of sorted) {
    const last = merged.at(-1);
    if (last && lo <= last[1] + 1) last[1] = Math.max(last[1], hi);
    else merged.push([lo, hi]);
  }
  return merged;
}
