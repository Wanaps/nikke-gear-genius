import { useState, useCallback, useEffect } from "react";
import { ELEMENT_THEMES } from "@/data/nikkeData";
import { Zap } from "lucide-react";
import { CHARACTERS, EQUIPMENT_SLOTS, CharacterProfile, EquipmentSlot, getGrade, getTierFromValue, getQualityScore, getWeightedScore, getLineGrade } from "@/data/nikkeData";
import { StatLineData } from "@/components/StatLine";
import { useMemo } from "react";
import { CharacterSelector } from "@/components/CharacterSelector";
import { EquipmentCard } from "@/components/EquipmentCard";
import { GlobalResult } from "@/components/GlobalResult";
import { TacticalHUD } from "@/components/TacticalHUD";
import NikkeCard from "@/components/Cards";


const Index = () => {
  const [character, setCharacter] = useState<CharacterProfile | null>(null);
  const [scores, setScores] = useState<Record<EquipmentSlot, number>>({
    Head: 0,
    Torso: 0,
    Arm: 0,
    Leg: 0,
  });
  const [slotStats, setSlotStats] = useState<Record<EquipmentSlot, StatLineData[]>>({} as Record<EquipmentSlot, StatLineData[]>);

  const [userName, setUserName] = useState("");
  const [friendCode, setFriendCode] = useState("");

  const [selectedSkin, setSelectedSkin] = useState<string>("base");
  const [burstbgImage, setBurstbgImage] = useState<string>("");
  useEffect(() => {
    setSelectedSkin("base");
  }, [character]);

  useEffect(() => {
    if (character) {
      // On récupère la couleur selon l'élément de la Nikke
      const element = character.code.toLowerCase();
      const themeColor = ELEMENT_THEMES[element] || ELEMENT_THEMES.default;
      
      // On l'injecte dans le CSS
      document.documentElement.style.setProperty('--primary-theme', themeColor);
    }
  }, [character]);

  useEffect(() => {
    if (character) {
      const cleanNikke = character.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "_")
        .replace(/:/g, "")
        .replace(/'/g, "");
      
      const cleanSkin = selectedSkin
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "_")
        .replace(/:/g, "")
        .replace(/'/g, "");

      const burstPath = `bursts_bg/${cleanNikke}_${cleanSkin}.png`;
      const img = new Image();
      img.onload = () => setBurstbgImage(burstPath);
      img.onerror = () => setBurstbgImage(`bursts_bg/${cleanNikke}_base.png`);
      img.src = `/images/card_assets/${burstPath}`;
    } else {
      setBurstbgImage("");
    }
  }, [character, selectedSkin]);

  const handleScoreChange = useCallback((slot: EquipmentSlot, score: number) => {
    setScores((prev) => ({ ...prev, [slot]: score }));
    console.log(`⚙️ Score Updated - ${slot}: ${score}`);
  }, []);

  const handleStatsChange = useCallback((slot: EquipmentSlot, stats: StatLineData[]) => {
    setSlotStats((prev) => ({ ...prev, [slot]: stats }));
  }, []);

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  // Create card data from character and scores
  const getCardData = () => {
    if (!character) return null;

  const cleanNikkeName = character.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/:/g, "")
      .replace(/'/g, "");

  const cleanSkinName = selectedSkin
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/:/g, "")
      .replace(/'/g, "");

    const bestStats = Object.entries(character.weights)
      .filter(([, weight]) => weight === "vital" || weight === "important")
      .map(([statName]) => statName)
      .join(", ") || "None";

    const averageScore = totalScore / 4;
    const globalGrade = averageScore > 0 ? getGrade(averageScore) : "F";

    const cardData = {
      userName: userName || null,
      friendCode: friendCode || null,
      siteURL: "nikkegeargenius.netlify.app/?v=1",
      name: character.name,
      rarity: character.rarity.toLowerCase(),
      type: character.type.toLowerCase(),
      code: character.code.toLowerCase(),
      burst: character.burst.toLowerCase(),
      weapon: character.weapon.toLowerCase(),
      globalScore: globalGrade,
      bestStats: bestStats,
      skinImage: `characters/${cleanNikkeName}_${cleanSkinName}.png`,
      burstbgImage: burstbgImage,
      basebgImage: `cards/${cleanNikkeName}_base.png`,
      rarityImage: `rarity/${character.rarity.toLowerCase()}.png`,
      typeImage: `faction/${character.type.toLowerCase()}.png`,
      codeImage: `code/${character.code.toLowerCase()}_code.png`,
      burstImage: `burst/${character.burst.toLowerCase()}.png`,
      weaponImage: `weapons/${character.weapon.toLowerCase()}.png`,
      globalScoreImage: `stats/ranks/${globalGrade.toLowerCase()}_rank.png`,
      gears: EQUIPMENT_SLOTS.map((slot) => {
        const statLines = slotStats[slot] || [];
        const statsForCard = statLines
          .filter((s) => s.statName && s.value !== null)
          .map((s) => {
            const val = s.value as number;
            const tier = getTierFromValue(s.statName, val);
            const quality = getQualityScore(tier);
            const weighted = getWeightedScore(quality, s.statName, character);
            const lineGrade = getLineGrade(weighted);
            return {
              name: s.statName,
              value: `${val}%`,
              grade: lineGrade,
              percent: val,
            };
          });

        const equipmentIcon = `stats/equipments/${slot.toLowerCase()}_icon.png`;
        const stat1Icon = statsForCard[0] ? `stats/ranks/${statsForCard[0].grade.toLowerCase()}_rank.png` : undefined;
        const stat2Icon = statsForCard[1] ? `stats/ranks/${statsForCard[1].grade.toLowerCase()}_rank.png` : undefined;
        const stat3Icon = statsForCard[2] ? `stats/ranks/${statsForCard[2].grade.toLowerCase()}_rank.png` : undefined;

        return {
          slot,
          grade: getGrade(scores[slot]),
          icon: equipmentIcon,
          stat1Icon,
          stat2Icon,
          stat3Icon,
          stats: statsForCard,
        };
      }),
    };

    console.log("📊 Card Data Generated:", cardData);
    return cardData;
  };

  const [resetKey, setResetKey] = useState(0);

  const handleClearAll = () => {
    setCharacter(null);
    setScores({ Head: 0, Torso: 0, Arm: 0, Leg: 0 });
    setSlotStats({} as Record<EquipmentSlot, StatLineData[]>);
    setUserName("");
    setFriendCode("");
    
    setResetKey(prev => prev + 1);
    
    console.log("🧹 Interface Reset Force");
  };

  return (
    <div className="min-h-screen bg-background cyber-scanline">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Zap className="w-6 h-6" />
            <h1 className="font-display text-xl md:text-2xl tracking-wider font-bold neon-text">
              OVERLOAD GEAR RATER
            </h1>
            <Zap className="w-6 h-6" />
          </div>
          <p className="font-body text-sm text-muted-foreground tracking-wide">
            NIKKE: Goddess of Victory — Gear Optimizer
          </p>
        </header>

        {/* Character Selection */}
        <section className="space-y-3 flex flex-col items-center">
          <h2 className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground text-center">
            Select NIKKE
          </h2>
          
          <div className="search-group">
            <CharacterSelector
              characters={CHARACTERS}
              selected={character}
              onSelect={setCharacter}
            />
            <button 
              onClick={handleClearAll}
              className="clear-btn"
              title="Clear all stats"
            >
              X
            </button>
          </div>
        </section>

        {/* Tactical HUD */}
        {character && (
          <section>
            <TacticalHUD character={character} />
          </section>
        )}

        {/* Equipment Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EQUIPMENT_SLOTS.map((slot) => (
            <EquipmentCard
              key={`${slot}-${resetKey}`} // Ici la clé change, donc le composant se vide
              slot={slot}
              character={character}
              onScoreChange={handleScoreChange}
              onStatsChange={handleStatsChange}
            />
          ))}
        </section>

        {/* Global Result */}
        <GlobalResult totalScore={totalScore} characterName={character?.name ?? null} />

        {/* User Info Inputs */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Username (Optional)</label>
            <input 
              type="text" 
              placeholder="Commander Name" 
              className="w-full bg-secondary/20 border border-border/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">Friend Code (Optional)</label>
            <input 
              type="text" 
              placeholder="ID: 00000000" 
              className="w-full bg-secondary/20 border border-border/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              value={friendCode} 
              onChange={(e) => setFriendCode(e.target.value)} 
            />
          </div>
        </section>

        {/* Skin Selector */}
        {character && character.skins && character.skins.length > 1 && (
          <div className="flex justify-center gap-4 my-6">
        {character.skins.map((skin) => {
          const cleanNikke = character.name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "_")
            .replace(/:/g, "")
            .replace(/'/g, "");
          
          const cleanSkin = skin
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "_")
            .replace(/:/g, "")
            .replace(/'/g, "");

          const iconPath = `/images/card_assets/characters/${cleanNikke}_${cleanSkin}.png`;

          return (
            <button 
              key={skin}
              onClick={() => setSelectedSkin(skin)}
              className={`flex flex-col items-center p-2 border-2 transition-all ${
                selectedSkin === skin ? 'neon-border' : 'border-transparent opacity-60'
              }`}
            >
              <div className="w-12 h-16 bg-secondary/50 rounded overflow-hidden mb-1 border border-white/10">
                <img 
                  src={iconPath} 
                  alt={skin}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log("❌ Erreur chargement icône skin:", iconPath);
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `/images/card_assets/characters/${cleanNikke}_base.png`;
                  }}
                />
              </div>
              <span className="text-[8px] uppercase tracking-tighter text-muted-foreground">
                {skin.replace('_', ' ')}
              </span>
            </button>
          );
        })}
        </div>
        )}

        {/* Gear Card Preview */}
        {character && getCardData() && (
          <section className="mt-8">
            <NikkeCard nikkeData={getCardData()!} />
          </section>
        )}

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
