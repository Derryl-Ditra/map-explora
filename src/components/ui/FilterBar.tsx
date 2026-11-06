"use client";

import { useState, useRef, useEffect } from "react";
import {AGE_BANDS, type AgeBandId} from '@/utils/ageBands';
import { VenueFilterState } from "@/types/venue";
import { MapPin, LayoutGrid, ChevronDown, RotateCcw } from "lucide-react";

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
  // Bump to open the age panel from outside (the map Age pill).
  openAgeTick?: number;
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

type Group = "area" | "activity";

  function SummaryButton({
    group,
    active,
    label,
    children, open, toggle,
  }: {
    open: Group | null;
    toggle: (group: Group) => void;
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


// Native age dropdown and compact area/activity controls keep results visible.
export default function FilterBar({
  filters,
  onUpdateFilter,
  onResetFilters,
  categories,
  areas,
  onOpenPanel,
  openAgeTick,
}: FilterBarProps) {
  // The map Age action focuses the native dropdown when the list opens.
  const [open, setOpen] = useState<Group | null>(null);

  const anyActive =
    filters.ageBand !== null || filters.area !== "ALL" || filters.category !== "ALL";

  const ageSelect=useRef<HTMLSelectElement>(null);
  useEffect(()=>{if(openAgeTick)ageSelect.current?.focus();},[openAgeTick]);

  const toggle = (g: Group) =>
    setOpen((cur) => {
      const next = cur === g ? null : g;
      if (next !== null) onOpenPanel?.();
      return next;
    });


  return (
    <div className="w-full shrink-0 flex flex-col gap-2.5">
      {/* Summary row: results stay visible; filters open on demand */}
      <div className="flex flex-wrap items-center gap-2">
        <select ref={ageSelect} aria-label="Child age range" value={filters.ageBand??''} onChange={e=>onUpdateFilter('ageBand',(e.target.value||null) as AgeBandId|null)} className={`max-w-full min-h-11 rounded-full border px-3.5 text-[0.9375rem] ${filters.ageBand?'bg-[#1a7a4a] text-white border-[#1a7a4a] font-bold':'bg-white text-[#4a443c] border-[#e7e0d4]'}`}>
          <option value="">Any age</option>{AGE_BANDS.map(b=><option key={b.id} value={b.id}>{b.label} · {b.stage}</option>)}
        </select>
        <SummaryButton open={open} toggle={toggle}
          group="area"
          active={filters.area !== "ALL"}
          label={filters.area === "ALL" ? "All areas" : areaDisplay(filters.area)}
        >
          <MapPin className={`w-4 h-4 ${filters.area !== "ALL" || open === "area" ? "text-white" : "text-[#1a7a4a]"}`} />
        </SummaryButton>
        <SummaryButton open={open} toggle={toggle}
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

      {filters.ageBand && <p className="text-sm text-[#51483d]">Matches at least part of this age range. Check each class&apos;s exact ages. Milestones are approximate, not an entry requirement.</p>}

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
