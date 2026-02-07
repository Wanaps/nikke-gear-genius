import { useState } from "react";
import { Shield, Crosshair, Hand, Footprints } from "lucide-react";
import { motion } from "framer-motion";
import {
  GearLevel,
  GEAR_LEVELS,
  EquipmentSlot,
  CharacterProfile,
  getTierFromValue,
  getQualityScore,
  getWeightedScore,
  getGrade,
  Grade,
} from "@/data/nikkeData";
import { StatLine, StatLineData } from "./StatLine";
import { GradeBadge } from "./GradeBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SLOT_ICONS: Record<EquipmentSlot, React.ReactNode> = {
  Head: <Crosshair className="w-5 h-5" />,
  Torso: <Shield className="w-5 h-5" />,
  Arm: <Hand className="w-5 h-5" />,
  Leg: <Footprints className="w-5 h-5" />,
};

const LOW_TIER_GRADES: Grade[] = ["F", "C", "B"];

interface EquipmentCardProps {
  slot: EquipmentSlot;
  character: CharacterProfile | null;
  onScoreChange: (slot: EquipmentSlot, score: number) => void;
}

export function EquipmentCard({ slot, character, onScoreChange }: EquipmentCardProps) {
  const [gearLevel, setGearLevel] = useState<GearLevel>("OVERLOAD");
  const [stats, setStats] = useState<StatLineData[]>([
    { statName: "", value: null, locked: false },
    { statName: "", value: null, locked: false },
    { statName: "", value: null, locked: false },
  ]);

  const isOverload = gearLevel === "OVERLOAD";

  // Calculate piece score
  const pieceScore = stats.reduce((sum, s) => {
    if (!s.statName || s.value === null) return sum;
    const tier = getTierFromValue(s.statName, s.value);
    const quality = getQualityScore(tier);
    return sum + getWeightedScore(quality, s.statName, character);
  }, 0);

  const pieceGrade = isOverload && pieceScore > 0 ? getGrade(pieceScore) : null;
  const showRerollAdvice = pieceGrade !== null && LOW_TIER_GRADES.includes(pieceGrade);

  // Report score up
  const prevScore = useState(0);
  if (pieceScore !== prevScore[0]) {
    prevScore[1](pieceScore);
    onScoreChange(slot, pieceScore);
  }

  const usedStats = stats.map((s) => s.statName).filter(Boolean);

  const handleStatChange = (index: number, newData: StatLineData) => {
    const next = [...stats];
    next[index] = newData;
    setStats(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-border rounded-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 text-primary">
          {SLOT_ICONS[slot]}
          <span className="font-display text-sm tracking-wide">{slot}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {pieceGrade && <GradeBadge grade={pieceGrade} size="sm" score={pieceScore} />}
          {showRerollAdvice && (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-[hsl(var(--neon-yellow))] cursor-help text-base">🔄</span>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  Suboptimal performance. Recommended to reroll attributes.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      {/* Gear Level Toggle */}
      <div className="flex px-4 py-2 gap-1 border-b border-border">
        {GEAR_LEVELS.map((level) => (
          <button
            key={level}
            onClick={() => setGearLevel(level)}
            className={`flex-1 px-2 py-1.5 rounded text-xs font-display tracking-wide transition-colors ${
              gearLevel === level
                ? level === "OVERLOAD"
                  ? "bg-primary/20 text-primary border border-primary/40"
                  : "bg-secondary text-foreground border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Stat Lines */}
      {isOverload && (
        <div className="px-4 py-2 space-y-0.5">
          {stats.map((stat, i) => (
            <StatLine
              key={i}
              data={stat}
              character={character}
              usedStats={usedStats.filter((_, idx) => idx !== i)}
              onChange={(d) => handleStatChange(i, d)}
            />
          ))}
        </div>
      )}

      {!isOverload && (
        <div className="px-4 py-6 text-center text-sm text-muted-foreground font-body">
          No Overload stats to rate
        </div>
      )}
    </motion.div>
  );
}
