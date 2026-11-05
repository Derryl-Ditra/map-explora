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
// the exact month stays easy to change.
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
    filters.ageMonths !== null || filters.area !== "ALL" || filters.category !== "ALL";

  const ageSummary = filters.ageMonths === null ? "Any age" : `${filters.ageMonths} months`;

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
        <SummaryButton group="age" active={filters.ageMonths !== null} label={ageSummary}>
          <Baby className={`w-4 h-4 ${filters.ageMonths !== null || open === "age" ? "text-white" : "text-[#1a7a4a]"}`} />
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

      {open === "age" && (
        <div className="flex flex-col gap-2 rounded-2xl bg-white/60 border border-[#ece6db] p-3">
          <label htmlFor="child-age-months" className="text-sm font-semibold text-[#51483d]">Child age in months (0 to 59)</label>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" aria-label="Decrease age by one month" disabled={filters.ageMonths === null || filters.ageMonths === 0} onClick={() => onUpdateFilter("ageMonths", Math.max(0, (filters.ageMonths ?? 0) - 1))} className="w-11 h-11 rounded-full border border-[#e7e0d4] bg-white text-xl disabled:opacity-40">−</button>
            <input id="child-age-months" type="number" min={0} max={59} step={1} value={filters.ageMonths ?? ""} placeholder="Any" onChange={(e) => {
              const raw = e.target.value;
              if (raw === "") { onUpdateFilter("ageMonths", null); return; }
              const value = Number(raw);
              if (Number.isInteger(value) && value >= 0 && value <= 59) onUpdateFilter("ageMonths", value);
            }} className="w-20 h-11 rounded-xl border border-[#e7e0d4] bg-white text-center text-lg font-bold text-[#1a7a4a]" />
            <button type="button" aria-label="Increase age by one month" disabled={filters.ageMonths === 59} onClick={() => onUpdateFilter("ageMonths", filters.ageMonths === null ? 0 : Math.min(59, filters.ageMonths + 1))} className="w-11 h-11 rounded-full border border-[#e7e0d4] bg-white text-xl disabled:opacity-40">+</button>
            <Chip active={filters.ageMonths === null} onClick={() => onUpdateFilter("ageMonths", null)}>Any age</Chip>
          </div>
          <p className="text-sm text-[#51483d]">Matches the branch's confirmed age range. Unconfirmed ages stay separate.</p>
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
