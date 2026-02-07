import { motion } from "framer-motion";
import { getGrade } from "@/data/nikkeData";
import { GradeBadge } from "./GradeBadge";

interface GlobalResultProps {
  totalScore: number;
  characterName: string | null;
}

export function GlobalResult({ totalScore, characterName }: GlobalResultProps) {
  const averageScore = totalScore / 4;
  const grade = averageScore > 0 ? getGrade(averageScore) : null;

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
          <GradeBadge grade={grade} size="xl" score={Math.round(averageScore)} />
          <p className="text-sm font-body text-muted-foreground mt-2">
            {averageScore > 350
              ? "🐋 Whale territory! Perfect gear."
              : averageScore > 250
              ? "🔥 Godlike rolls. Top-tier equipment."
              : averageScore > 180
              ? "⚡ Excellent gear. Very competitive."
              : averageScore > 120
              ? "✨ Solid gear. Battle-ready."
              : averageScore > 80
              ? "👍 Decent gear. Room for improvement."
              : averageScore > 50
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
