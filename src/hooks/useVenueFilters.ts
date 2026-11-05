"use client";

import { useState, useMemo } from "react";
import { VENUES } from "@/data/venues";
import { Venue, VenueFilterState } from "@/types/venue";
import { calculateDistance, calculateETA } from "@/utils/geo";
import { venueConfirmedForAge } from "@/utils/ageMatch";
import { venueMatchesSearch } from "@/utils/searchMatch";
import { isShownToUsers } from "@/utils/visibility";

// Only places with an official aliveness source are shown. The rest stay in the data file.
const SHOWN_VENUES = VENUES.filter(isShownToUsers);

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
    () => [...new Set(SHOWN_VENUES.flatMap((v) => v.categories))].sort(),
    []
  );
  const areas = useMemo(
    () => [...new Set(SHOWN_VENUES.map((v) => v.area))].sort(),
    []
  );

  const { confirmed, unconfirmed } = useMemo(() => {
    const withDistance = SHOWN_VENUES.map((v) => {
      const distance = userPos
        ? calculateDistance(userPos[0], userPos[1], v.lat, v.lng)
        : undefined;
      const eta = distance !== undefined ? calculateETA(distance, 25) : undefined;
      return { ...v, distance: distance !== undefined ? Number(distance.toFixed(1)) : undefined, eta };
    });

    const base = withDistance.filter((v) => {
      if (!venueMatchesSearch(v, filters.searchQuery)) return false;
      if (filters.category !== "ALL" && !v.categories.includes(filters.category))
        return false;
      if (filters.area !== "ALL" && v.area !== filters.area) return false;
      return true;
    });

    // With a real location fix, nearest first. Without one, group by area then name so the list can be scanned.
    base.sort((a, b) =>
      userPos
        ? (a.distance || 0) - (b.distance || 0)
        : a.area.localeCompare(b.area) || a.branchName.localeCompare(b.branchName)
    );

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
