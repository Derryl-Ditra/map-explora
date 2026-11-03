"use client";

import { useState, useMemo } from "react";
import { VENUES } from "@/data/venues";
import { Venue, VenueFilterState, AgeClaim } from "@/types/venue";
import { calculateDistance, calculateETA } from "@/utils/geo";

// A claim covers the child when the exact month falls inside [min, max].
// Only provider-confirmed claims count as a confirmed fit; listed-unconfirmed
// and unknown keep the venue in the "check with branch" group. Claims with
// ANY unresolved bound never cover: "3 yrs" does not mean ">=36 forever",
// and an unstated upper bound is not eligibility at every later month.
function claimCovers(age: AgeClaim, months: number): boolean | null {
  if (age.verification !== "provider-confirmed") return null;
  if (age.minMonths === null || age.maxMonths === null) return null;
  return age.minMonths <= months && age.maxMonths >= months;
}

// An ambiguity flag on the source note means the owning numeric bounds do
// not establish inclusivity at the flagged boundary, so an exact boundary
// month is never a confirmed match. "upper-bound ... ambiguous" flags only
// the max; an unspecified "boundary ambiguous" flags both ends. This matters
// inside 0-47 too: 48 is outside the under-4 scope, but a flagged 36-month
// ("3 yr") boundary is not.
function claimCoversWithNote(age: AgeClaim, months: number, note?: string): boolean | null {
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

export function useVenueFilters(userPos: [number, number] | null) {
  const [filters, setFilters] = useState<VenueFilterState>({
    searchQuery: "",
    ageMonths: null,
    category: "ALL",
    area: "ALL",
  });

  const updateFilter = <K extends keyof VenueFilterState>(
    key: K,
    value: VenueFilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ searchQuery: "", ageMonths: null, category: "ALL", area: "ALL" });
  };

  const categories = useMemo(
    () => [...new Set(VENUES.flatMap((v) => v.categories))].sort(),
    []
  );
  const areas = useMemo(
    () => [...new Set(VENUES.map((v) => v.area))].sort(),
    []
  );

  const { confirmed, unconfirmed } = useMemo(() => {
    const withDistance = VENUES.map((v) => {
      const distance = userPos
        ? calculateDistance(userPos[0], userPos[1], v.lat, v.lng)
        : 0;
      const eta = calculateETA(distance, 25);
      return { ...v, distance: Number(distance.toFixed(1)), eta };
    });

    const base = withDistance.filter((v) => {
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const hay = [v.branchName, v.chain ?? "", v.address, v.area, v.city]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.category !== "ALL" && !v.categories.includes(filters.category))
        return false;
      if (filters.area !== "ALL" && v.area !== filters.area) return false;
      return true;
    });

    base.sort((a, b) => (a.distance || 0) - (b.distance || 0));

    if (filters.ageMonths === null) return { confirmed: base, unconfirmed: [] as Venue[] };
    const months = filters.ageMonths;
    const yes: Venue[] = [];
    const maybe: Venue[] = [];
    for (const v of base) {
      (venueConfirmedForAge(v, months) ? yes : maybe).push(v);
    }
    return { confirmed: yes, unconfirmed: maybe };
  }, [filters, userPos]);

  return {
    filters,
    updateFilter,
    resetFilters,
    categories,
    areas,
    confirmed,
    unconfirmed,
  };
}
