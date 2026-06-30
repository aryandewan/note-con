import { useCallback, useEffect, useRef, useState } from "react";
import { FILLERS, HERO_SEED, NEXT_POOL } from "~/data/squads";
import type { Squad } from "~/lib/squad";

/**
 * Drives the hero board: lets visitors claim a slot, and simulates other
 * players filling slots until a squad is full, then rotating in a fresh one.
 * The simulation pauses on hidden tabs and respects reduced-motion.
 */
export function useLiveSquads() {
  const [squads, setSquads] = useState<Squad[]>(HERO_SEED);
  const [incomingId, setIncomingId] = useState<number | null>(null);
  const nextId = useRef(100);
  const poolIdx = useRef(0);

  const joinSquad = useCallback((id: number) => {
    setSquads((prev) =>
      prev.map((s) =>
        s.id === id && s.members.length < s.size && !s.members.includes("You")
          ? { ...s, members: [...s.members, "You"] }
          : s
      )
    );
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const tick = () => {
      if (document.hidden) return;
      setSquads((prev) => {
        const fillable = prev.filter(
          (s) => s.members.length < s.size && !s.members.includes("You")
        );
        if (fillable.length === 0) return prev;
        const pick = fillable[Math.floor(Math.random() * fillable.length)];
        const filler = FILLERS[Math.floor(Math.random() * FILLERS.length)];
        const next = prev.map((s) =>
          s.id === pick.id ? { ...s, members: [...s.members, filler] } : s
        );
        const filled = next.find((s) => s.members.length >= s.size);
        if (filled && filled.members.length === filled.size) {
          window.setTimeout(() => {
            const seed = NEXT_POOL[poolIdx.current % NEXT_POOL.length];
            poolIdx.current += 1;
            const fresh: Squad = {
              ...seed,
              id: ++nextId.current,
              members: [...seed.members],
            };
            setIncomingId(fresh.id);
            setSquads((cur) => {
              const idx = cur.findIndex((s) => s.id === filled.id);
              if (idx === -1) return cur;
              const copy = [...cur];
              copy.splice(idx, 1);
              return [fresh, ...copy];
            });
            window.setTimeout(() => setIncomingId(null), 700);
          }, 1300);
        }
        return next;
      });
    };

    const timer = window.setInterval(tick, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const liveCount = squads.filter((s) => s.members.length < s.size).length;
  return { squads, incomingId, joinSquad, liveCount };
}
