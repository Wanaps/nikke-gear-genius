import { CharacterProfile, WEIGHT_VALUES, RNG_TABLES, Grade } from "@/data/nikkeData";

export interface StatAdvice {
  text: string;
  target?: string;
}

const HIGH_GRADES: Grade[] = ["S", "SS", "SSS", "OP"];
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

  // Scenario A: High tier stat
  if (HIGH_GRADES.includes(grade)) {
    return { text: "Excellent stat. LOCK this immediately." };
  }

  // Tier 11 value = index 10 in RNG table (S rank threshold)
  const sTarget = RNG_TABLES[statName]?.[10];
  const targetStr = sTarget ? `Target: >${sTarget}% for S Rank.` : "";

  if (isPriority) {
    // Scenario B: Priority + low roll
    if (LOW_GRADES.includes(grade)) {
      return {
        text: "Good stat type, but low roll. KEEP for now if low on modules. Reroll value later.",
        target: targetStr,
      };
    }
    // Scenario C: Priority + trash roll
    if (TRASH_GRADES.includes(grade)) {
      return {
        text: "Right stat, bad roll. REROLL Value.",
        target: targetStr,
      };
    }
  }

  // Scenario D: Non-priority stat
  if (!isPriority) {
    return { text: "Not a priority for this character. Reroll Attribute." };
  }

  return null;
}
