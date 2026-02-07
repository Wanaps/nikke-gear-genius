import { useState, useCallback } from "react";
import { Zap } from "lucide-react";
import { CHARACTERS, EQUIPMENT_SLOTS, CharacterProfile, EquipmentSlot } from "@/data/nikkeData";
import { CharacterSelector } from "@/components/CharacterSelector";
import { EquipmentCard } from "@/components/EquipmentCard";
import { GlobalResult } from "@/components/GlobalResult";

const Index = () => {
  const [character, setCharacter] = useState<CharacterProfile | null>(null);
  const [scores, setScores] = useState<Record<EquipmentSlot, number>>({
    Head: 0,
    Torso: 0,
    Arm: 0,
    Leg: 0,
  });

  const handleScoreChange = useCallback((slot: EquipmentSlot, score: number) => {
    setScores((prev) => ({ ...prev, [slot]: score }));
  }, []);

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-background cyber-scanline">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Zap className="w-6 h-6" />
            <h1 className="font-display text-xl md:text-2xl tracking-wider font-bold glow-text-red">
              OVERLOAD GEAR RATER
            </h1>
            <Zap className="w-6 h-6" />
          </div>
          <p className="font-body text-sm text-muted-foreground tracking-wide">
            NIKKE: Goddess of Victory — Gear Optimizer
          </p>
        </header>

        {/* Character Selection */}
        <section className="space-y-3">
          <h2 className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground text-center">
            Select NIKKE
          </h2>
          <CharacterSelector
            characters={CHARACTERS}
            selected={character}
            onSelect={setCharacter}
          />
        </section>

        {/* Equipment Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EQUIPMENT_SLOTS.map((slot) => (
            <EquipmentCard
              key={slot}
              slot={slot}
              character={character}
              onScoreChange={handleScoreChange}
            />
          ))}
        </section>

        {/* Global Result */}
        <GlobalResult totalScore={totalScore} characterName={character?.name ?? null} />

        {/* Footer */}
        <footer className="text-center py-4 border-t border-border space-y-1">
          <p className="text-xs font-body text-muted-foreground">
            Data sourced from nikke.gg • Not affiliated with SHIFT UP
          </p>
          <p className="text-xs font-body text-muted-foreground">
            © {new Date().getFullYear()} <span className="text-primary font-display">Wanaps</span>. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
