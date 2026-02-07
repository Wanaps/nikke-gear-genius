import { Grade, getGradeColor, getGradeBg } from "@/data/nikkeData";
import { motion } from "framer-motion";

interface GradeBadgeProps {
  grade: Grade;
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  score?: number;
}

export function GradeBadge({ grade, size = "md", label, score }: GradeBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-lg px-4 py-2",
    xl: "text-3xl px-6 py-3",
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {label && <span className="text-xs font-body text-muted-foreground uppercase tracking-wider">{label}</span>}
      <motion.div
        key={grade}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`font-display font-bold border rounded-md ${sizeClasses[size]} ${getGradeColor(grade)} ${getGradeBg(grade)}`}
      >
        {grade}
      </motion.div>
      {score !== undefined && (
        <span className="text-xs font-body text-muted-foreground">{score.toFixed(1)} pts</span>
      )}
    </div>
  );
}
