import type { Venue, AgeClaim } from "../types/venue";

// A claim covers the child when the exact month falls inside [min, max].
// Only provider-confirmed claims count as a confirmed fit; listed-unconfirmed
// and unknown keep the venue in the "check with branch" group. Claims with
// ANY unresolved bound never cover: "3 yrs" does not mean ">=36 forever",
// and an unstated upper bound is not eligibility at every later month.
export function claimCovers(age: AgeClaim, months: number): boolean | null {
  if (age.verification !== "provider-confirmed") return null;
  if (age.minMonths === null || age.maxMonths === null) return null;
  return age.minMonths <= months && age.maxMonths >= months;
}

// An ambiguity flag on the source note means the owning numeric bounds do
// not establish inclusivity at the flagged boundary, so an exact boundary
// month is never a confirmed match. "upper-bound ... ambiguous" flags only
// the max; an unspecified "boundary ambiguous" flags both ends. This matters
// inside 0-59 too: a flagged 48-month or 36-month boundary remains
// uncertain even though it is inside the under-5 scope.
export function claimCoversWithNote(age: AgeClaim, months: number, note?: string): boolean | null {
  const base = claimCovers(age, months);
  if (base !== true || !note || !/ambigu/i.test(note)) return base;
  const upperOnly = /upper[- ]bound/i.test(note);
  if (months === age.maxMonths) return null;
  if (!upperOnly && months === age.minMonths) return null;
  return true;
}

// Confirmed fit: an offered program with a BRANCH-LEVEL provider-confirmed
// age claim covering the child's exact month. Brand/catalog ages never
// confirm a fit, even for confirmed offerings. Exact-month matching keeps
// 18/19 and 23/24-month class cutoffs honest; coarse bands would misclassify.
export function venueConfirmedForAge(v: Venue, months: number): boolean {
  if (
    v.branchAge &&
    v.branchAge.level === "branch" &&
    v.branchAge.verification === "provider-confirmed" &&
    claimCovers(v.branchAge, months) === true
  ) {
    return true;
  }
  return v.programs.some(
    (p) =>
      p.offering === "offered" &&
      p.age.level === "branch" &&
      claimCoversWithNote(p.age, months, p.note) === true
  );
}

export const AGE_GROUPS = [
  { label: "12 months and under", min: 0, max: 12 },
  { label: "13 to 24 months", min: 13, max: 24 },
  { label: "25 to 36 months", min: 25, max: 36 },
  { label: "37 to 48 months", min: 37, max: 48 },
  { label: "49 to 59 months", min: 49, max: 59 },
];
// A group match means at least one age in the group fits a confirmed branch
// claim, not that every child in the group is eligible. Preserve exact boundaries.
export function venueConfirmedForGroup(v: Venue, groupMax: number): boolean {
  const group = AGE_GROUPS.find(g => g.max === groupMax);
  if (!group) return false;
  for (let month = group.min; month <= group.max; month++) {
    if (venueConfirmedForAge(v, month)) return true;
  }
  return false;
}
