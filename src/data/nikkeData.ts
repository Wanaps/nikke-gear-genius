// RNG Value Tables (Tier 1 to Tier 15)
export const RNG_TABLES: Record<string, number[]> = {
  ATK: [4.77, 5.47, 6.18, 6.88, 7.59, 8.29, 9.00, 9.70, 10.40, 11.11, 11.81, 12.52, 13.22, 13.93, 14.63],
  DEF: [4.77, 5.47, 6.18, 6.88, 7.59, 8.29, 9.00, 9.70, 10.40, 11.11, 11.81, 12.52, 13.22, 13.93, 14.63],
  "Hit Rate": [4.77, 5.47, 6.18, 6.88, 7.59, 8.29, 9.00, 9.70, 10.40, 11.11, 11.81, 12.52, 13.22, 13.93, 14.63],
  "Charge DMG": [4.77, 5.47, 6.18, 6.88, 7.59, 8.29, 9.00, 9.70, 10.40, 11.11, 11.81, 12.52, 13.22, 13.93, 14.63],
  "Elem. DMG": [9.54, 10.94, 12.34, 13.75, 15.15, 16.55, 17.95, 19.35, 20.75, 22.15, 23.56, 24.96, 26.36, 27.76, 29.16],
  "Crit Rate": [2.30, 2.64, 2.98, 3.32, 3.66, 4.00, 4.35, 4.69, 5.03, 5.37, 5.70, 6.05, 6.39, 6.73, 7.07],
  "Crit DMG": [6.64, 7.62, 8.60, 9.58, 10.56, 11.54, 12.52, 13.50, 14.48, 15.46, 16.44, 17.42, 18.40, 19.38, 20.36],
  "Charge SPD": [1.98, 2.28, 2.57, 2.86, 3.16, 3.45, 3.75, 4.04, 4.33, 4.63, 4.92, 5.21, 5.51, 5.80, 6.09],
  "Max Ammo": [27.84, 31.95, 36.06, 40.17, 44.28, 48.39, 52.50, 56.60, 60.71, 64.82, 68.93, 73.04, 77.15, 81.26, 85.37],
};

export const STAT_NAMES = Object.keys(RNG_TABLES);

export const STAT_UNITS: Record<string, string> = {
  ATK: "%",
  DEF: "%",
  "Hit Rate": "%",
  "Charge DMG": "%",
  "Elem. DMG": "%",
  "Crit Rate": "%",
  "Crit DMG": "%",
  "Charge SPD": "%",
  "Max Ammo": "%",
};

export type GearLevel = "Tier 9" | "Tier 9 Manufacturer" | "OVERLOAD";

export const GEAR_LEVELS: GearLevel[] = ["Tier 9", "Tier 9 Manufacturer", "OVERLOAD"];

export type EquipmentSlot = "Head" | "Torso" | "Arm" | "Leg";

export const EQUIPMENT_SLOTS: EquipmentSlot[] = ["Head", "Torso", "Arm", "Leg"];

// Character weight profiles
export type WeightCategory = "vital" | "important" | "good" | "bonus" | "useless";

export const WEIGHT_VALUES: Record<WeightCategory, number> = {
  vital: 2.0,
  important: 1.5,
  good: 1.0,
  bonus: 0.5,
  useless: 0,
};

export interface CharacterProfile {
  name: string;
  imageKey: string;
  rarity: string;
  type: string;
  code: string;
  burst: string;
  weapon: string;
  weights: Record<string, WeightCategory>;
}

export const CHARACTERS: CharacterProfile[] = [
  {
    name: "Red Hood",
    imageKey: "red_hood",
    rarity: "ssr",
    type: "pilgrim",
    code: "iron",
    burst: "all",
    weapon: "SR",
    weights: {
      "Charge SPD": "vital",
      ATK: "vital",
      "Elem. DMG": "important",
      "Charge DMG": "good",
      "Crit Rate": "good",
      "Crit DMG": "good",
      "Max Ammo": "bonus",
      "Hit Rate": "useless",
      DEF: "useless",
    },
  },
  {
    name: "Modernia",
    imageKey: "modernia",
    rarity: "SSR",
    type: "tetra",
    code: "fire",
    burst: "3",
    weapon: "SR",
    weights: {
      ATK: "vital",
      "Elem. DMG": "vital",
      "Max Ammo": "vital",
      "Hit Rate": "important",
      "Crit Rate": "bonus",
      "Crit DMG": "bonus",
      "Charge SPD": "useless",
      "Charge DMG": "useless",
      DEF: "useless",
    },
  },
  {
    name: "Scarlet",
    imageKey: "scarlet",
    rarity: "SSR",
    type: "pilgrim",
    code: "elec",
    burst: "3",
    weapon: "AR",
    weights: {
      "Max Ammo": "vital",
      ATK: "vital",
      "Elem. DMG": "important",
      "Crit Rate": "good",
      "Crit DMG": "good",
      "Hit Rate": "bonus",
      "Charge SPD": "useless",
      "Charge DMG": "useless",
      DEF: "useless",
    },
  },
  {
    name: "Alice",
    imageKey: "alice",
    rarity: "SSR",
    type: "",
    code: "",
    burst: "",
    weapon: "",
    weights: {
      "Charge SPD": "vital",
      "Max Ammo": "vital",
      ATK: "important",
      "Elem. DMG": "important",
      "Charge DMG": "good",
      "Crit Rate": "bonus",
      "Crit DMG": "bonus",
      "Hit Rate": "useless",
      DEF: "useless",
    },
  },
  {
    name: "Liter",
    imageKey: "liter",
    rarity: "SSR",
    type: "missils",
    code: "iron",
    burst: "1",
    weapon: "SG",
    weights: {
      "Max Ammo": "vital",
      ATK: "good",
      "Elem. DMG": "good",
      "Hit Rate": "good",
      DEF: "good",
      "Crit Rate": "bonus",
      "Crit DMG": "bonus",
      "Charge SPD": "useless",
      "Charge DMG": "useless",
    },
  },
  {
    name: "Crown",
    imageKey: "crown",
    rarity: "SSR",
    type: "pilgrim",
    code: "iron",
    burst: "2",
    weapon: "MG",
    weights: {
      "Max Ammo": "vital",
      ATK: "good",
      "Elem. DMG": "good",
      "Hit Rate": "good",
      DEF: "good",
      "Crit Rate": "bonus",
      "Crit DMG": "bonus",
      "Charge SPD": "useless",
      "Charge DMG": "useless",
    },
  },
  {
    name: "Dorothy",
    imageKey: "dorothy",
    rarity: "SSR",
    type: "pilgrim",
    code: "water",
    burst: "1",
    weapon: "AR",
    weights: {
      ATK: "vital",
      "Elem. DMG": "important",
      "Max Ammo": "important",
      "Crit Rate": "good",
      "Crit DMG": "good",
      "Hit Rate": "bonus",
      "Charge SPD": "useless",
      "Charge DMG": "useless",
      DEF: "useless",
    },
  },
  {
    name: "Blanc",
    imageKey: "blanc",
    rarity: "SSR",
    type: "tetra",
    code: "wind",
    burst: "2",
    weapon: "AR",
    weights: {
      "Max Ammo": "vital",
      ATK: "good",
      "Elem. DMG": "good",
      "Hit Rate": "good",
      DEF: "good",
      "Crit Rate": "bonus",
      "Crit DMG": "bonus",
      "Charge SPD": "useless",
      "Charge DMG": "useless",
    },
  },
  {
    name: "Noir",
    imageKey: "noir",
    rarity: "SSR",
    type: "tetra",
    code: "wind",
    burst: "3",
    weapon: "SG",
    weights: {
      ATK: "vital",
      "Max Ammo": "important",
      "Elem. DMG": "important",
      "Hit Rate": "good",
      DEF: "good",
      "Crit Rate": "bonus",
      "Crit DMG": "bonus",
      "Charge SPD": "useless",
      "Charge DMG": "useless",
    },
  },
  {
    name: "Tia",
    imageKey: "tia",
    rarity: "SSR",
    type: "missils",
    code: "iron",
    burst: "1",
    weapon: "RL",
    weights: {
      "Max Ammo": "vital",
      "Charge SPD": "important",
      ATK: "good",
      "Elem. DMG": "good",
      DEF: "good",
      "Hit Rate": "good",
      "Crit Rate": "bonus",
      "Crit DMG": "bonus",
      "Charge DMG": "useless",
    },
  },
  {
    name: "Naga",
    imageKey: "naga",
    rarity: "SSR",
    type: "missils",
    code: "elec",
    burst: "2",
    weapon: "SG",
    weights: {
      ATK: "vital",
      "Elem. DMG": "vital",
      "Max Ammo": "important",
      "Hit Rate": "good",
      "Crit Rate": "bonus",
      "Crit DMG": "bonus",
      "Charge SPD": "useless",
      "Charge DMG": "useless",
      DEF: "useless",
    },
  },
  {
    name: "Scarlet: Black Shadow",
    imageKey: "scarlet_black_shadow",
    rarity: "SSR",
    type: "pilgrim",
    code: "wind",
    burst: "3",
    weapon: "RL",
    weights: {
      "Max Ammo": "vital",
      ATK: "vital",
      "Elem. DMG": "vital",
      "Charge SPD": "important",
      "Crit Rate": "bonus",
      "Crit DMG": "bonus",
      "Hit Rate": "useless",
      "Charge DMG": "useless",
      DEF: "useless",
    },
  },
  {
    name: "D: Killer Wife",
    imageKey: "d_killer_wife",
    rarity: "SSR",
    type: "elysion",
    code: "fire",
    burst: "1",
    weapon: "SR",
    weights: {
      "Charge SPD": "vital",
      "Max Ammo": "important",
      ATK: "good",
      "Elem. DMG": "good",
      "Hit Rate": "bonus",
      "Crit Rate": "useless",
      "Crit DMG": "useless",
      "Charge DMG": "useless",
      DEF: "useless",
    },
  },
  {
    name: "Maxwell",
    imageKey: "maxwell",
    rarity: "SSR",
    type: "missils",
    code: "iron",
    burst: "3",
    weapon: "SR",
    weights: {
      ATK: "vital",
      "Elem. DMG": "vital",
      "Charge DMG": "important",
      "Charge SPD": "important",
      "Max Ammo": "good",
      "Crit Rate": "good",
      "Crit DMG": "good",
      "Hit Rate": "useless",
      DEF: "useless",
    },
  },
  {
    name: "Privaty",
    imageKey: "privaty",
    rarity: "SSR",
    type: "elysion",
    code: "water",
    burst: "3",
    weapon: "AR",
    weights: {
      ATK: "vital",
      "Elem. DMG": "vital",
      "Hit Rate": "important",
      "Crit Rate": "good",
      "Crit DMG": "good",
      "Max Ammo": "useless",
      "Charge SPD": "useless",
      "Charge DMG": "useless",
      DEF: "useless",
    },
  },
];

// Scoring
export function getTierFromValue(statName: string, value: number): number {
  const table = RNG_TABLES[statName];
  if (!table) return 0;
  const idx = table.indexOf(value);
  return idx >= 0 ? idx + 1 : 0;
}

export function getQualityScore(tier: number): number {
  if (tier <= 0) return 0;
  // Tier 1 = ~10, Tier 15 = 100, linear
  return Math.round((tier / 15) * 100 * 10) / 10;
}

export function getWeightedScore(
  qualityScore: number,
  statName: string,
  character: CharacterProfile | null
): number {
  if (!character) return qualityScore;
  const category = character.weights[statName] || "useless";
  return qualityScore * WEIGHT_VALUES[category];
}

export type Grade = "OP" | "SSS" | "SS" | "S" | "A" | "B" | "C" | "F";

export function getGrade(score: number): Grade {
  if (score > 350) return "OP";
  if (score > 250) return "SSS";
  if (score > 180) return "SS";
  if (score > 120) return "S";
  if (score > 80) return "A";
  if (score > 50) return "B";
  if (score > 20) return "C";
  return "F";
}

export function getLineGrade(weightedScore: number): Grade {
  // Per-line: scale is smaller. Max single line = 100 * 2.0 = 200
  if (weightedScore >= 180) return "OP";
  if (weightedScore >= 150) return "SSS";
  if (weightedScore >= 120) return "SS";
  if (weightedScore >= 90) return "S";
  if (weightedScore >= 60) return "A";
  if (weightedScore >= 30) return "B";
  if (weightedScore > 0) return "C";
  return "F";
}

export function getGradeColor(grade: Grade): string {
  const map: Record<Grade, string> = {
    OP: "text-grade-op",
    SSS: "text-grade-sss",
    SS: "text-grade-ss",
    S: "text-grade-s",
    A: "text-grade-a",
    B: "text-grade-b",
    C: "text-grade-c",
    F: "text-muted-foreground",
  };
  return map[grade];
}

export function getGradeBg(grade: Grade): string {
  const map: Record<Grade, string> = {
    OP: "bg-grade-op/20 border-grade-op/50",
    SSS: "bg-grade-sss/20 border-grade-sss/50",
    SS: "bg-grade-ss/20 border-grade-ss/50",
    S: "bg-grade-s/20 border-grade-s/50",
    A: "bg-grade-a/20 border-grade-a/50",
    B: "bg-grade-b/20 border-grade-b/50",
    C: "bg-grade-c/20 border-grade-c/50",
    F: "bg-muted/20 border-muted/50",
  };
  return map[grade];
}

export function getCharacterImageUrl(imageKey: string): string {
  return `/images/characters/${imageKey}.png`;
}
