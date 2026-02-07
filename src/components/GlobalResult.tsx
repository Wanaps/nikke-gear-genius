import { motion } from "framer-motion";
import { getGrade } from "@/data/nikkeData";
import { GradeBadge } from "./GradeBadge";

interface GlobalResultProps {
  totalScore: number;
  characterName: string | null;
}

export function GlobalResult({ totalScore, characterName }: GlobalResultProps) {
  const grade = totalScore > 0 ? getGrade(totalScore) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-border rounded-lg p-6 text-center"
    >
      <h2 className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
        Global Gear Score
      </h2>

      {grade && characterName ? (
        <div className="space-y-3">
          <GradeBadge grade={grade} size="xl" score={totalScore} />
          <p className="text-sm font-body text-muted-foreground mt-2">
            {totalScore > 350
              ? "🐋 Whale territory! Perfect gear."
              : totalScore > 250
              ? "🔥 Godlike rolls. Top-tier equipment."
              : totalScore > 180
              ? "⚡ Excellent gear. Very competitive."
              : totalScore > 120
              ? "✨ Solid gear. Battle-ready."
              : totalScore > 80
              ? "👍 Decent gear. Room for improvement."
              : totalScore > 50
              ? "😐 Average gear. Keep farming."
              : "💀 Re-roll this gear."}
          </p>
        </div>
      ) : (
        <p className="text-sm font-body text-muted-foreground">
          Select a NIKKE and set your Overload stats to see your gear score.
        </p>
      )}
    </motion.div>
  );
}
