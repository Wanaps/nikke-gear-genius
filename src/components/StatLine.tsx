import { useState } from "react";
import { Lock, Unlock, ChevronDown } from "lucide-react";
import { STAT_NAMES, RNG_TABLES, getTierFromValue, getQualityScore, getWeightedScore, getLineGrade, CharacterProfile } from "@/data/nikkeData";
import { GradeBadge } from "./GradeBadge";
import { useRef, useEffect } from "react";

export interface StatLineData {
  statName: string;
  value: number | null;
  locked: boolean;
}

interface StatLineProps {
  data: StatLineData;
  character: CharacterProfile | null;
  usedStats: string[];
  onChange: (data: StatLineData) => void;
}

export function StatLine({ data, character, usedStats, onChange }: StatLineProps) {
  const tier = data.statName && data.value !== null ? getTierFromValue(data.statName, data.value) : 0;
  const quality = getQualityScore(tier);
  const weighted = getWeightedScore(quality, data.statName, character);
  const grade = tier > 0 ? getLineGrade(weighted) : null;

  const availableStats = STAT_NAMES.filter(
    (s) => s === data.statName || !usedStats.includes(s)
  );

  return (
    <div className="flex items-center gap-2 py-1.5">
      {/* Lock */}
      <button
        onClick={() => onChange({ ...data, locked: !data.locked })}
        className="p-1 text-muted-foreground hover:text-primary transition-colors shrink-0"
      >
        {data.locked ? <Lock className="w-3.5 h-3.5 text-primary" /> : <Unlock className="w-3.5 h-3.5" />}
      </button>

      {/* Stat selector */}
      <MiniDropdown
        value={data.statName}
        options={availableStats}
        placeholder="Stat..."
        onChange={(v) => onChange({ ...data, statName: v, value: null })}
        className="flex-1 min-w-0"
      />

      {/* Value selector */}
      <MiniDropdown
        value={data.value !== null ? `${data.value}%` : ""}
        options={data.statName ? (RNG_TABLES[data.statName] || []).map((v) => `${v}%`) : []}
        placeholder="Value..."
        onChange={(v) => onChange({ ...data, value: parseFloat(v.replace("%", "")) })}
        className="w-24"
        disabled={!data.statName}
      />

      {/* Grade */}
      <div className="w-12 flex justify-center shrink-0">
        {grade ? <GradeBadge grade={grade} size="sm" /> : <span className="text-xs text-muted-foreground">—</span>}
      </div>
    </div>
  );
}

// Mini dropdown component
function MiniDropdown({
  value,
  options,
  placeholder,
  onChange,
  className = "",
  disabled = false,
}: {
  value: string;
  options: string[];
  placeholder: string;
  onChange: (v: string) => void;
  className?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        className={`w-full flex items-center gap-1 px-2 py-1.5 rounded text-xs font-body border border-border bg-secondary/50 hover:bg-secondary transition-colors truncate ${
          disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
        } ${value ? "text-foreground" : "text-muted-foreground"}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className="w-3 h-3 shrink-0 ml-auto" />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full min-w-[120px] max-h-48 overflow-y-auto rounded border border-border bg-popover shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-2 py-1.5 text-xs font-body hover:bg-secondary transition-colors ${
                opt === value ? "bg-secondary text-foreground" : "text-foreground/80"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
