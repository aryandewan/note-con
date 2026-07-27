import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Bolt, Close } from "~/components/ui/icons";
import { GAMES } from "~/data/games";
import { easeExpo } from "~/lib/motion";
import { useNotificationsStore } from "~/stores/notifications";
import { useSquadsStore } from "~/stores/squads";

/** Per-game accent dot, mapped to the tokens in app.css. */
const GAME_ACCENT: Record<string, string> = {
  "VALORANT": "bg-g-valorant",
  "Apex Legends": "bg-g-apex",
  "Helldivers 2": "bg-g-helldivers",
  "Marvel Rivals": "bg-g-rivals",
  "Counter-Strike 2": "bg-g-cs2",
};

/** Smallest squad you can host (you + at least one other). */
const MIN_SLOTS = 2;

const chipClass =
  "flex items-center gap-2 rounded-pebble border border-line-strong bg-bg px-3 py-2.5 font-display text-[0.9rem] font-bold text-ink transition-colors hover:border-ink peer-checked:border-primary peer-checked:bg-primary-tint peer-checked:text-black peer-focus-visible:ring-4 peer-focus-visible:ring-primary-tint2";

export function HostSessionModal({
  open,
  initialGame,
  onClose,
}: {
  open: boolean;
  initialGame?: string;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState(GAMES[0].name);
  const [slots, setSlots] = useState(GAMES[0].maxSlots);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchMine = useSquadsStore((s) => s.fetchMine);
  const loadNotifications = useNotificationsStore((s) => s.fetch);

  // Slot choices depend on the selected game's real party size.
  const selectedGame = GAMES.find((g) => g.name === game) ?? GAMES[0];
  const slotOptions = Array.from(
    { length: selectedGame.maxSlots - MIN_SLOTS + 1 },
    (_, i) => MIN_SLOTS + i,
  );

  // If a smaller game is picked, pull the slot count back down into range.
  useEffect(() => {
    setSlots((s) => Math.min(s, selectedGame.maxSlots));
  }, [selectedGame.maxSlots]);

  useEffect(() => {
    if (!open) return;
    setError(null);
    if (initialGame && GAMES.some((g) => g.name === initialGame)) {
      setGame(initialGame);
    }
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          "button, input, [tabindex]:not([tabindex='-1'])",
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [open, initialGame, onClose]);

  const onSubmit = async () => {
    setError(null);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to sign in before hosting a session.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ game, slots }),
      });
      if (res.ok) {
        // New squad exists — refresh "Your squads" so it shows up immediately.
        await fetchMine();
        loadNotifications();
        onClose();
        return;
      }
      setError(
        res.status === 401
          ? "Your session expired — sign in again to host."
          : "Couldn't open your squad. Try again.",
      );
    } catch {
      setError("Couldn't reach the server — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-60 grid place-items-center p-4">
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="host-session-title"
            tabIndex={-1}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: reduce ? 0.15 : 0.28, ease: easeExpo }}
            className="relative w-full max-w-104 rounded-panel border border-line bg-bg shadow-float focus:outline-none"
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-6 pb-4 pt-5">
              <div>
                <h2
                  id="host-session-title"
                  className="font-display text-[1.35rem] font-black tracking-[-0.02em]"
                >
                  Host a session
                </h2>
                <p className="mt-0.5 text-[0.92rem] text-muted">
                  Pick a game and squad size — slots fill as players join.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid size-9 shrink-0 place-items-center rounded-pebble text-muted transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <Close size={20} />
              </button>
            </div>

            <form action={onSubmit} className="flex flex-col gap-5 px-6 pb-6 pt-5">
              <fieldset>
                <legend className="mb-2 font-display text-[0.92rem] font-bold text-ink">
                  Game
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {GAMES.map((g) => (
                    <label key={g.name} className="cursor-pointer">
                      <input
                        type="radio"
                        name="game"
                        value={g.name}
                        checked={game === g.name}
                        onChange={() => setGame(g.name)}
                        className="peer sr-only"
                      />
                      <span className={chipClass}>
                        <span className="truncate">{g.name}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-2 font-display text-[0.92rem] font-bold text-ink">
                  Squad size
                </legend>
                <div
                  className="grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${slotOptions.length}, minmax(0, 1fr))` }}
                >
                  {slotOptions.map((n) => (
                    <label key={n} className="cursor-pointer">
                      <input
                        type="radio"
                        name="slots"
                        value={n}
                        checked={slots === n}
                        onChange={() => setSlots(n)}
                        className="peer sr-only"
                      />
                      <span className={`${chipClass} justify-center text-[1rem] font-extrabold tabular-nums`}>
                        {n}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="mt-2 text-[0.85rem] text-muted">
                  You take the first slot — {slots - 1} open for others.
                </p>
              </fieldset>

              {error && (
                <p
                  role="alert"
                  className="rounded-pebble bg-hot-tint px-3.5 py-2.5 text-[0.9rem] font-semibold text-[oklch(0.45_0.17_30)]"
                >
                  {error}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={submitting}
                whileTap={reduce || submitting ? undefined : { scale: 0.98 }}
                whileHover={reduce || submitting ? undefined : { y: -1 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-[0.95rem] font-display text-[1.05rem] font-bold text-cloud shadow-card transition-colors duration-200 hover:bg-primary-hover hover:shadow-pop disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Bolt size={18} />
                {submitting ? "Opening squad…" : "Open the squad"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
