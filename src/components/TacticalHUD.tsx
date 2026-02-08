import { CharacterProfile, WEIGHT_VALUES, STAT_NAMES } from "@/data/nikkeData";
import { motion } from "framer-motion";
import { Crosshair } from "lucide-react";

interface TacticalHUDProps {
  character: CharacterProfile;
}

export function TacticalHUD({ character }: TacticalHUDProps) {
  const best: string[] = [];
  const good: string[] = [];
  const avoid: string[] = [];

  for (const [stat, category] of Object.entries(character.weights)) {
    const w = WEIGHT_VALUES[category];
    if (w >= 1.5) best.push(stat);
    else if (w >= 1.0) good.push(stat);
    else if (w === 0) avoid.push(stat);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      key={character.name}
      className="cyber-border rounded-lg px-4 py-3 max-w-2xl mx-auto space-y-1.5"
    >
      <div className="flex items-center gap-2 mb-2">
        <Crosshair className="w-4 h-4 text-primary shrink-0" />
        <span className="font-display text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          TACTICAL READOUT
        </span>
        <span className="font-display text-xs text-primary tracking-wide">
          — {character.name}
        </span>
      </div>

      {best.length > 0 && (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[hsl(var(--neon-green))]">🟢</span>
          <span className="font-display text-[10px] tracking-wider uppercase text-[hsl(var(--neon-green))]">Best:</span>
          <span className="font-mono text-sm text-[hsl(var(--neon-green))] tracking-wide">
            {best.join(" / ")}
          </span>
        </div>
      )}

      {good.length > 0 && (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[hsl(var(--neon-yellow))]">🟡</span>
          <span className="font-display text-[10px] tracking-wider uppercase text-[hsl(var(--neon-yellow))]">Good:</span>
          <span className="font-mono text-sm text-[hsl(var(--neon-yellow))] tracking-wide">
            {good.join(" / ")}
          </span>
        </div>
      )}

      {avoid.length > 0 && (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">🔴</span>
          <span className="font-display text-[10px] tracking-wider uppercase text-muted-foreground">Avoid:</span>
          <span className="font-mono text-sm text-muted-foreground tracking-wide">
            {avoid.join(" / ")}
          </span>
        </div>
      )}
    </motion.div>
  );
}
