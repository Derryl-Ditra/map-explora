"use client";

import { useState, useMemo } from "react";
import { VENUES } from "@/data/venues";
import { Venue, VenueFilterState } from "@/types/venue";
import { calculateDistance, calculateETA } from "@/utils/geo";
import { venueConfirmedForGroup } from "@/utils/ageMatch";
import { isShownToUsers } from "@/utils/visibility";

// Only places with an official aliveness source are shown. The rest stay in the data file.
const SHOWN_VENUES = VENUES.filter(isShownToUsers);

export function useVenueFilters(userPos: [number, number] | null) {
  const [filters, setFilters] = useState<VenueFilterState>({
    searchQuery: "",
    ageGroup: null,
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
    setFilters({ searchQuery: "", ageGroup: null, category: "ALL", area: "ALL" });
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

    if (filters.ageGroup === null) return { confirmed: base, unconfirmed: [] as Venue[] };
    const groupMax = filters.ageGroup;
    const yes: Venue[] = [];
    const maybe: Venue[] = [];
    for (const v of base) {
      (venueConfirmedForGroup(v, groupMax) ? yes : maybe).push(v);
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
