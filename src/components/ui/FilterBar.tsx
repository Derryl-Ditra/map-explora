"use client";

import { useState } from "react";
import { VenueFilterState } from "@/types/venue";
import { Baby, MapPin, LayoutGrid, ChevronDown, RotateCcw } from "lucide-react";

interface FilterBarProps {
  filters: VenueFilterState;
  onUpdateFilter: <K extends keyof VenueFilterState>(
    key: K,
    value: VenueFilterState[K]
  ) => void;
  onResetFilters: () => void;
  categories: string[];
  areas: string[];
  // Fired when a filter group opens, so a collapsed host (mobile peek sheet)
  // can raise enough to show the panel.
  onOpenPanel?: () => void;
}

const AGE_PRESETS = [
  { label: "Any age", months: null },
  { label: "12 months and under", months: 12 },
  { label: "13 to 24 months", months: 24 },
  { label: "25 to 36 months", months: 36 },
  { label: "37 to 48 months", months: 48 },
  { label: "49 to 59 months", months: 59 },
];

// Display-only shortening; the underlying data value is unchanged.
function areaDisplay(a: string): string {
  return a === "Jabodetabek (unclassified)" ? "Unclassified" : a;
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

type Group = "age" | "area" | "activity";

// Compact filter controls: one summary row of three toggles. Only one group
// expands at a time (chips wrapped, nothing clipped), so venue results stay
// visible above the fold. Area/activity collapse on pick; age stays open so
// the age group can be changed easily.
export default function FilterBar({
  filters,
  onUpdateFilter,
  onResetFilters,
  categories,
  areas,
  onOpenPanel,
}: FilterBarProps) {
  const [open, setOpen] = useState<Group | null>(null);

  const anyActive =
    filters.ageGroup !== null || filters.area !== "ALL" || filters.category !== "ALL";

  const ageSummary =
    filters.ageGroup === null
      ? "Any age"
      : AGE_PRESETS.find((a) => a.months === filters.ageGroup)?.label ?? `${filters.ageGroup} mo`;

  const toggle = (g: Group) =>
    setOpen((cur) => {
      const next = cur === g ? null : g;
      if (next !== null) onOpenPanel?.();
      return next;
    });

  function SummaryButton({
    group,
    active,
    label,
    children,
  }: {
    group: Group;
    active: boolean;
    label: string;
    children: React.ReactNode;
  }) {
    const isOpen = open === group;
    return (
      <button
        type="button"
        onClick={() => toggle(group)}
        aria-expanded={isOpen}
        className={`flex items-center gap-1.5 px-3.5 min-h-[44px] rounded-full border text-[0.9375rem] transition-all ${
          active || isOpen
            ? "bg-[#1a7a4a] text-white border-[#1a7a4a] font-bold"
            : "bg-white text-[#4a443c] border-[#e7e0d4] hover:border-[#1a7a4a] font-medium"
        }`}
      >
        {children}
        <span className="whitespace-nowrap">{label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""} ${active || isOpen ? "text-white" : "text-[#6d675f]"}`}
        />
      </button>
    );
  }

  return (
    <div className="w-full shrink-0 flex flex-col gap-2.5">
      {/* Summary row: results stay visible; filters open on demand */}
      <div className="flex flex-wrap items-center gap-2">
        <SummaryButton group="age" active={filters.ageGroup !== null} label={ageSummary}>
          <Baby className={`w-4 h-4 ${filters.ageGroup !== null || open === "age" ? "text-white" : "text-[#1a7a4a]"}`} />
        </SummaryButton>
        <SummaryButton
          group="area"
          active={filters.area !== "ALL"}
          label={filters.area === "ALL" ? "All areas" : areaDisplay(filters.area)}
        >
          <MapPin className={`w-4 h-4 ${filters.area !== "ALL" || open === "area" ? "text-white" : "text-[#1a7a4a]"}`} />
        </SummaryButton>
        <SummaryButton
          group="activity"
          active={filters.category !== "ALL"}
          label={filters.category === "ALL" ? "All activities" : filters.category}
        >
          <LayoutGrid className={`w-4 h-4 ${filters.category !== "ALL" || open === "activity" ? "text-white" : "text-[#1a7a4a]"}`} />
        </SummaryButton>
        {anyActive && (
          <button
            type="button"
            onClick={() => { onResetFilters(); setOpen(null); }}
            className="flex items-center gap-1 px-3 min-h-[44px] rounded-full text-[0.9375rem] font-semibold text-[#1a7a4a]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* Age groups stay visible while choosing. */}
      {open === "age" && (
        <div className="flex flex-col gap-2 rounded-2xl bg-white/60 border border-[#ece6db] p-3">
          <div className="flex flex-wrap items-center gap-2">
            {AGE_PRESETS.map((a) => (
              <Chip
                key={a.label}
                active={filters.ageGroup === a.months}
                onClick={() => onUpdateFilter("ageGroup", a.months)}
              >
                <span>{a.label}</span>
              </Chip>
            ))}
          </div>
          <p className="text-sm text-[#51483d]">A match covers at least one age in the group, not every age. Check the class range.</p>
        </div>
      )}

      {open === "area" && (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-white/60 border border-[#ece6db] p-3">
          <Chip
            active={filters.area === "ALL"}
            onClick={() => { onUpdateFilter("area", "ALL"); setOpen(null); }}
          >
            <span>All</span>
          </Chip>
          {areas.map((a) => (
            <Chip
              key={a}
              active={filters.area === a}
              onClick={() => { onUpdateFilter("area", a); setOpen(null); }}
            >
              <span>{areaDisplay(a)}</span>
            </Chip>
          ))}
        </div>
      )}

      {open === "activity" && (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-white/60 border border-[#ece6db] p-3">
          <Chip
            active={filters.category === "ALL"}
            onClick={() => { onUpdateFilter("category", "ALL"); setOpen(null); }}
          >
            <span>All</span>
          </Chip>
          {categories.map((c) => (
            <Chip
              key={c}
              active={filters.category === c}
              onClick={() => { onUpdateFilter("category", c); setOpen(null); }}
            >
              <span>{c}</span>
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
}

// Trailing sentinel: absorbs the web editor last-line indent artifact.
