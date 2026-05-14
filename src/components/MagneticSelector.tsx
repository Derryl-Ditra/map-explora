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
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeStandard = STANDARDS.find(s => s.plug === activePlug) || STANDARDS[0];

  const handleSelect = (plug: string) => {
    setActivePlug(plug);
    setIsOpen(false);
    onFilterChange(plug);
  };

  return (
    <div className="relative z-50">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center justify-between px-3 h-10 bg-zinc-800 
          border border-zinc-700 rounded-lg cursor-pointer 
          hover:bg-zinc-700 transition-colors
        "
      >
        <span className="text-xs font-medium text-white">{activeStandard.name}</span>
        <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div 
          className="
            absolute top-full left-0 right-0 mt-1 bg-zinc-800 
            border border-zinc-700 rounded-lg 
            shadow-xl overflow-hidden
          "
        >
          <div 
            ref={scrollRef}
            className="max-h-[200px] overflow-y-auto py-1"
          >
            {STANDARDS.map((s) => (
              <div
                key={s.id}
                onClick={() => handleSelect(s.plug)}
                className={`
                  px-3 py-2 cursor-pointer
                  ${activePlug === s.plug ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'}
                `}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-medium">{s.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
