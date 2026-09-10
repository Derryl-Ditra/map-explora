"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Standard {
  id: string;
  name: string;
  plug: string;
}

const STANDARDS: Standard[] = [
  { id: 'all', name: 'All Charger Types', plug: 'all' },
  { id: 'ccs2', name: 'CCS2 (DC Fast)', plug: 'CCS2' },
  { id: 'type2', name: 'Type 2 (AC)', plug: 'Type 2' },
  { id: 'chademo', name: 'CHAdeMO', plug: 'CHAdeMO' },
  { id: 'gbt', name: 'GB/T (China Std)', plug: 'GB/T' },
  { id: 'schuko', name: 'Schuko (Home)', plug: 'Type 2' }
];

interface MagneticSelectorProps {
  onFilterChange: (plug: string) => void;
}

export default function MagneticSelector({ onFilterChange }: MagneticSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePlug, setActivePlug] = useState("all");
  const containerRef = useRef<HTMLDivElement>(null);

  const activeStandard = STANDARDS.find(s => s.plug === activePlug) || STANDARDS[0];

  const handleSelect = (plug: string) => {
    setActivePlug(plug);
    setIsOpen(false);
    onFilterChange(plug);
  };

  // Close on outside click or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative z-50">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="connector-filter-options"
        aria-label={`Filter by charger type. Currently selected: ${activeStandard.name}`}
        className="
          w-full flex items-center justify-between px-3 h-10 bg-zinc-800 
          border border-zinc-700 rounded-lg cursor-pointer 
          hover:bg-zinc-750 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        "
      >
        <span className="text-xs font-medium text-white">{activeStandard.name}</span>
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div 
          id="connector-filter-options"
          role="listbox"
          aria-label="Available charger types"
          className="
            absolute top-full left-0 right-0 mt-1 bg-zinc-800 
            border border-zinc-700 rounded-lg 
            shadow-xl overflow-hidden
          "
        >
          <div className="max-h-[200px] overflow-y-auto py-1 custom-scrollbar">
            {STANDARDS.map((s) => (
              <button
                key={s.id}
                type="button"
                role="option"
                aria-selected={activePlug === s.plug}
                onClick={() => handleSelect(s.plug)}
                className={`
                  w-full text-left px-3 py-2 cursor-pointer transition-colors
                  focus:outline-none focus-visible:bg-zinc-700
                  ${activePlug === s.plug ? 'bg-blue-600 text-white' : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'}
                `}
              >
                <span className="text-xs font-medium">{s.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
