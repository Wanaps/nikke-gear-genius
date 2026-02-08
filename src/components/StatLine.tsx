import { useState, useRef, useEffect } from "react";
import { Lock, Unlock, ChevronDown, X, Info } from "lucide-react";
import ReactDOM from "react-dom";
import { STAT_NAMES, RNG_TABLES, getTierFromValue, getQualityScore, getWeightedScore, getLineGrade, CharacterProfile, Grade } from "@/data/nikkeData";
import { GradeBadge } from "./GradeBadge";
import { getStatAdvice } from "@/lib/statAdvice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const HIGH_TIER_GRADES: Grade[] = ["S", "SS", "SSS", "OP"];

export function StatLine({ data, character, usedStats, onChange }: StatLineProps) {
  const tier = data.statName && data.value !== null ? getTierFromValue(data.statName, data.value) : 0;
  const quality = getQualityScore(tier);
  const weighted = getWeightedScore(quality, data.statName, character);
  const grade = tier > 0 ? getLineGrade(weighted) : null;

  const showLockAdvice = grade !== null && HIGH_TIER_GRADES.includes(grade);
  const advice = grade ? getStatAdvice(data.statName, grade, character) : null;

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
      <PortalDropdown
        value={data.statName}
        options={availableStats}
        placeholder="Stat..."
        onChange={(v) => onChange({ ...data, statName: v, value: null })}
        className="flex-1 min-w-0"
      />

      {/* Value selector */}
      <PortalDropdown
        value={data.value !== null ? `${data.value}%` : ""}
        options={data.statName ? (RNG_TABLES[data.statName] || []).map((v) => `${v}%`) : []}
        placeholder="Value..."
        onChange={(v) => onChange({ ...data, value: parseFloat(v.replace("%", "")) })}
        className="w-24"
        disabled={!data.statName}
      />

      {/* Grade + Lock Advice */}
      <div className="w-20 flex items-center justify-center gap-1 shrink-0">
        {grade ? (
          <>
            <GradeBadge grade={grade} size="sm" />
            {showLockAdvice && (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-[hsl(var(--neon-yellow))] cursor-help text-sm">🔒</span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    Top Tier Stat. Recommended to lock this line.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {advice && (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help text-muted-foreground hover:text-foreground transition-colors">
                      <Info className="w-3 h-3" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs max-w-[200px]">
                    <p>{advice.text}</p>
                    {advice.target && <p className="mt-1 text-[hsl(var(--neon-yellow))]">{advice.target}</p>}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </div>

      {/* Clear button */}
      {data.statName && (
        <button
          onClick={() => onChange({ statName: "", value: null, locked: false })}
          className="p-1 text-muted-foreground hover:text-destructive transition-colors shrink-0"
          title="Clear stat"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

// Portal-based dropdown to avoid clipping
function PortalDropdown({
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 4, left: rect.left, width: Math.max(rect.width, 120) });
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <button
        ref={triggerRef}
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        className={`w-full flex items-center gap-1 px-2 py-1.5 rounded text-xs font-body border border-border bg-secondary/50 hover:bg-secondary transition-colors truncate ${
          disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
        } ${value ? "text-foreground" : "text-muted-foreground"}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className="w-3 h-3 shrink-0 ml-auto" />
      </button>
      {open &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width, zIndex: 9999 }}
            className="max-h-48 overflow-y-auto rounded border border-border bg-popover shadow-lg"
          >
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
          </div>,
          document.body
        )}
    </div>
  );
}
