import { CharacterProfile, WEIGHT_VALUES, WeightCategory } from "@/data/nikkeData";
import { motion } from "framer-motion";
import { Crosshair } from "lucide-react";

interface TacticalHUDProps {
  character: CharacterProfile;
}

export function TacticalHUD({ character }: TacticalHUDProps) {
  // Get top 3 stats sorted by weight
  const top3 = Object.entries(character.weights)
    .sort(([, a], [, b]) => WEIGHT_VALUES[b] - WEIGHT_VALUES[a])
    .slice(0, 3)
    .map(([stat]) => stat);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      key={character.name}
      className="cyber-border rounded-lg px-4 py-3 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-2">
        <Crosshair className="w-4 h-4 text-primary shrink-0" />
        <span className="font-display text-[10px] tracking-[0.2em] uppercase text-muted-foreground shrink-0">
          REC. FOR
        </span>
        <span className="font-display text-xs text-primary tracking-wide shrink-0">
          {character.name}
        </span>
        <span className="text-muted-foreground mx-1 shrink-0">:</span>
        <span className="font-mono text-sm text-[hsl(var(--neon-green))] tracking-wide truncate">
          {top3.join(" / ")}
        </span>
      </div>
    </motion.div>
  );
}
