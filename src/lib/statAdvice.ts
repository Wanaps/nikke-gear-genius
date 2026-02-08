import { CharacterProfile, WEIGHT_VALUES, RNG_TABLES, Grade } from "@/data/nikkeData";

export interface StatAdvice {
  text: string;
  target?: string;
}

const LOW_GRADES: Grade[] = ["A", "B"];
const TRASH_GRADES: Grade[] = ["C", "F"];

export function getTop3Stats(character: CharacterProfile): string[] {
  return Object.entries(character.weights)
    .sort(([, a], [, b]) => WEIGHT_VALUES[b] - WEIGHT_VALUES[a])
    .slice(0, 3)
    .map(([stat]) => stat);
}

export function getStatAdvice(
  statName: string,
  grade: Grade,
  character: CharacterProfile | null
): StatAdvice | null {
  if (!character || !statName) return null;

  const top3 = getTop3Stats(character);
  const isPriority = top3.includes(statName);

  // For S+ grades, StatLine shows only the lock icon — no advice needed here
  const HIGH_GRADES: Grade[] = ["S", "SS", "SSS", "OP"];
  if (HIGH_GRADES.includes(grade)) {
    return null;
  }

  // Reverse-calculate S rank target:
  // S grade requires weightedScore >= 90
  // weightedScore = (tier/15)*100 * weight
  // tier = (90 / (weight * 100)) * 15
  const weight = WEIGHT_VALUES[character.weights[statName] || "useless"] || 1;
  const sThresholdTier = Math.ceil((90 / (weight * 100)) * 15);
  const clampedTier = Math.min(Math.max(sThresholdTier, 1), 15);
  const sTarget = RNG_TABLES[statName]?.[clampedTier - 1];
  const targetStr = sTarget ? `Target: ≥${sTarget}% for S Rank.` : "";

  if (isPriority) {
    if (LOW_GRADES.includes(grade)) {
      return {
        text: "Good stat type, but low roll. KEEP for now if low on modules. Reroll value later.",
        target: targetStr,
      };
    }
    if (TRASH_GRADES.includes(grade)) {
      return {
        text: "Right stat, bad roll. REROLL Value.",
        target: targetStr,
      };
    }
  }

  if (!isPriority) {
    return { text: "Not a priority for this character. Reroll Attribute." };
  }

  return null;
}
