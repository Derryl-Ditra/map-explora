"use client";

import { useState, useMemo } from "react";
import { STATIONS } from "@/constants/stations";
import { StationFilterState } from "@/types/station";
import { calculateDistance, calculateETA } from "@/utils/geo";

export function useStationFilters(userPos: [number, number] | null) {
  const [filters, setFilters] = useState<StationFilterState>({
    searchQuery: "",
    minKw: 0,
    surfaceOnly: false,
    denzaOnly: true, // Default to Denza-approved for our luxury/executive niche
    connector: "ALL",
  });

  const updateFilter = <K extends keyof StationFilterState>(
    key: K,
    value: StationFilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: "",
      minKw: 0,
      surfaceOnly: false,
      denzaOnly: false,
      connector: "ALL",
    });
  };

  const filteredStations = useMemo(() => {
    return STATIONS.filter((station) => {
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchName = station.name.toLowerCase().includes(query);
        const matchAddress = station.address.toLowerCase().includes(query);
        const matchBrand = station.brand.toLowerCase().includes(query);
        if (!matchName && !matchAddress && !matchBrand) return false;
      }

      // Minimum power in kW
      if (filters.minKw > 0 && station.kw < filters.minKw) {
        return false;
      }

      // Surface only (anti-basement filter)
      if (filters.surfaceOnly && station.parking_type === "Basement") {
        return false;
      }

      // Denza D9 approved filter
      if (filters.denzaOnly && !station.denza_approved) {
        return false;
      }

      // Connector type
      if (filters.connector !== "ALL" && !station.connectors.includes(filters.connector)) {
        return false;
      }

      return true;
    }).map((station) => {
      const distance = userPos
        ? calculateDistance(userPos[0], userPos[1], station.lat, station.lng)
        : 0;
      const eta = calculateETA(distance, 25);
      return {
        ...station,
        distance: Number(distance.toFixed(1)),
        eta,
      };
    }).sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }, [filters, userPos]);

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredStations,
  };
}
