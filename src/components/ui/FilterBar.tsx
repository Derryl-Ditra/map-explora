"use client";

import { VenueFilterState } from "@/types/venue";
import { Baby } from "lucide-react";

interface FilterBarProps {
  filters: VenueFilterState;
  onUpdateFilter: <K extends keyof VenueFilterState>(
    key: K,
    value: VenueFilterState[K]
  ) => void;
  categories: string[];
  areas: string[];
}

const AGE_PRESETS: { label: string; months: number | null }[] = [
  { label: "Any age", months: null },
  { label: "6 mo", months: 6 },
  { label: "12 mo", months: 12 },
  { label: "18 mo", months: 18 },
  { label: "24 mo", months: 24 },
  { label: "36 mo", months: 36 },
  { label: "48 mo", months: 48 },
];

function ageLabel(months: number): string {
  if (months < 12) return `${months} months old`;
  const yrs = months / 12;
  const yrText = Number.isInteger(yrs) ? `${yrs} yr` : `${yrs.toFixed(1)} yrs`;
  return `${months} mo (${yrText})`;
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 shrink-0 px-4 py-2.5 rounded-full min-h-[44px] whitespace-nowrap transition-all border text-[1rem] ${
        active
          ? "bg-[#1a7a4a] text-white border-[#1a7a4a] font-bold"
          : "bg-white text-[#4a443c] border-[#e7e0d4] hover:border-[#1a7a4a] font-medium"
      }`}
    >
      {children}
    </button>
  );
}

// Chips wrap onto as many rows as they need: nothing clips and nothing hides
// behind a horizontal scroll, on phone or desktop.
export default function FilterBar({
  filters,
  onUpdateFilter,
  categories,
  areas,
}: FilterBarProps) {
  return (
    <div className="w-full shrink-0 flex flex-col gap-2.5">
      {/* Primary group: child's age (always visible, first control) */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[1rem] font-semibold text-[#221d18] flex items-center gap-1.5">
          <Baby className="w-4.5 h-4.5 text-[#1a7a4a]" />
          <span>Your child&apos;s age</span>
        </span>
        <div className="flex flex-wrap items-center gap-2 py-0.5">
          {AGE_PRESETS.map((a) => (
            <Chip
              key={a.label}
              active={filters.ageMonths === a.months}
              onClick={() => onUpdateFilter("ageMonths", a.months)}
            >
              <span>{a.label}</span>
            </Chip>
          ))}
        </div>
      </div>

      {filters.ageMonths !== null && (
        <div className="flex items-center gap-3 pr-1">
          <input
            type="range"
            min={0}
            max={59}
            step={1}
            value={filters.ageMonths}
            onChange={(e) => onUpdateFilter("ageMonths", Number(e.target.value))}
            className="flex-1 age-slider"
            aria-label="Exact child age in months"
          />
          <span className="text-[1rem] font-bold text-[#1a7a4a] shrink-0 min-w-[118px] text-right">
            {ageLabel(filters.ageMonths)}
          </span>
        </div>
      )}

      {/* Area */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[0.9375rem] font-semibold text-[#6d675f]">Area</span>
        <div className="flex flex-wrap items-center gap-2 py-0.5">
          <Chip
            active={filters.area === "ALL"}
            onClick={() => onUpdateFilter("area", "ALL")}
          >
            <span>All</span>
          </Chip>
          {areas.map((a) => (
            <Chip
              key={a}
              active={filters.area === a}
              onClick={() => onUpdateFilter("area", a)}
            >
              <span>{a}</span>
            </Chip>
          ))}
        </div>
      </div>

      {/* Activity: always visible, same weight as age and area */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[0.9375rem] font-semibold text-[#6d675f]">Activity</span>
        <div className="flex flex-wrap items-center gap-2 py-0.5">
          <Chip
            active={filters.category === "ALL"}
            onClick={() => onUpdateFilter("category", "ALL")}
          >
            <span>All</span>
          </Chip>
          {categories.map((c) => (
            <Chip
              key={c}
              active={filters.category === c}
              onClick={() => onUpdateFilter("category", c)}
            >
              <span>{c}</span>
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
// Trailing sentinel: absorbs the web editor last-line indent artifact.
