import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CharacterProfile, getCharacterImageUrl } from "@/data/nikkeData";

interface CharacterSelectorProps {
  characters: CharacterProfile[];
  selected: CharacterProfile | null;
  onSelect: (char: CharacterProfile) => void;
}

export function CharacterSelector({ characters, selected, onSelect }: CharacterSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-md mx-auto">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 cyber-border rounded-lg hover:border-primary/50 transition-colors"
      >
        {selected ? (
          <>
            <CharacterIcon imageKey={selected.imageKey} name={selected.name} />
            <span className="font-display text-sm tracking-wide text-foreground">{selected.name}</span>
          </>
        ) : (
          <span className="font-display text-sm tracking-wide text-muted-foreground">Select a NIKKE...</span>
        )}
        <ChevronDown className={`ml-auto h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-full rounded-lg border border-border bg-popover shadow-xl overflow-hidden"
          >
            <div className="max-h-80 overflow-y-auto">
              {characters.map((char) => (
                <button
                  key={char.imageKey}
                  onClick={() => { onSelect(char); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors ${
                    selected?.imageKey === char.imageKey ? "bg-secondary" : ""
                  }`}
                >
                  <CharacterIcon imageKey={char.imageKey} name={char.name} />
                  <span className="font-body text-base font-medium text-foreground">{char.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CharacterIcon({ imageKey, name }: { imageKey: string; name: string }) {
  const [error, setError] = useState(false);
  return error ? (
    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-display text-muted-foreground shrink-0">
      {name.charAt(0)}
    </div>
  ) : (
    <img
      src={getCharacterImageUrl(imageKey)}
      alt={name}
      className="w-10 h-10 rounded-full object-cover bg-secondary shrink-0"
      onError={() => setError(true)}
    />
  );
}
