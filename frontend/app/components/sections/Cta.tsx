import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Avatar } from "~/components/ui/Avatar";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Dot } from "~/components/ui/Pill";
import { Reveal } from "~/components/ui/Reveal";
import { easeExpo } from "~/lib/motion";

/** Squads cycled through the live-fill chip — kept to a handful, swapped for real data later. */
const FILLS = [
  { game: "Valorant", squad: ["vyn", "Tariq", "Mei L", "Sol"], joining: "Ash" },
  { game: "Marvel Rivals", squad: ["PixelMoth", "Dee", "Rhe", "Juno"], joining: "Koi" },
  { game: "Apex Legends", squad: ["Loon", "Bex", "Wren", "Ty"], joining: "Pax" },
  { game: "Helldivers 2", squad: ["Kestrel", "Nova R", "Mol", "Frost"], joining: "Zia" },
];

/**
 * A self-contained proof of the headline: a real squad's last slot fills, the
 * count ticks over, and it resets with a fresh squad — looping quietly. Renders
 * a valid "one slot open" state server-side; motion only enhances it, and
 * reduced-motion holds it still. See {@link Cta}.
 */
function LiveFill() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [filled, setFilled] = useState(false);
  const cur = FILLS[i];
  const size = cur.squad.length + 1;
  const count = filled ? size : size - 1;

  useEffect(() => {
    if (reduce) return;
    let fillT: ReturnType<typeof setTimeout>;
    const cycle = setInterval(() => {
      setFilled(true);
      fillT = setTimeout(() => {
        setFilled(false);
        setI((v) => (v + 1) % FILLS.length);
      }, 1700);
    }, 3400);
    return () => {
      clearInterval(cycle);
      clearTimeout(fillT);
    };
  }, [reduce]);

  return (
    <div className="relative mx-auto mb-7 flex w-fit items-center gap-3 rounded-full border border-white/12 bg-white/[0.06] py-2 pl-3 pr-3.5 backdrop-blur-md">
      {/* one-shot ring when the slot fills */}
      <AnimatePresence>
        {filled && !reduce && (
          <motion.span
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-primary"
            initial={{ opacity: 0.55, scale: 1 }}
            animate={{ opacity: 0, scale: 1.14 }}
            transition={{ duration: 0.75, ease: easeExpo }}
          />
        )}
      </AnimatePresence>

      <span className="flex items-center text-primary">
        <Dot pulse />
      </span>

      <span className="font-display text-[0.9rem] font-extrabold text-cloud">{cur.game}</span>

      <span className="flex -space-x-2">
        {cur.squad.map((m) => (
          <Avatar key={m} name={m} size="sm" />
        ))}
        {filled ? (
          <motion.span
            key={`join-${i}`}
            initial={reduce ? false : { scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: easeExpo }}
          >
            <Avatar name={cur.joining} size="sm" />
          </motion.span>
        ) : (
          <motion.span
            aria-hidden="true"
            animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="grid size-7 place-items-center rounded-full border-2 border-dashed border-primary-tint2 bg-primary-tint font-display text-xs font-bold leading-none text-primary-ink"
          >
            +
          </motion.span>
        )}
      </span>

      <span className="flex items-center gap-1 font-display text-[0.9rem] font-extrabold tabular-nums text-cloud">
        <motion.span
          key={count}
          initial={reduce ? false : { y: -7, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: easeExpo }}
          className="inline-block"
        >
          {count}
        </motion.span>
        <span className="text-cloud/55">/{size}</span>
      </span>
    </div>
  );
}

export function Cta() {
  return (
    <section className="py-[clamp(4rem,9vw,7.5rem)] text-center">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-panel bg-ink px-[clamp(1.5rem,5vw,4rem)] py-[clamp(2.75rem,6vw,5rem)]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(oklch(1_0_0/0.06)_1px,transparent_1px)] bg-[length:24px_24px]"
            />

            <div className="relative">
              <LiveFill />
              <h2 className="mx-auto max-w-[18ch] text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold tracking-[-0.035em] text-cloud">
                Your next squad is filling up right now.
              </h2>
              <p className="mt-[1.1rem] text-[1.15rem] text-[oklch(0.85_0.02_230)]">
                Jump into a live lobby or open your own. It’s free, and it’s fast.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3.5 sm:flex-row">
                <Button href="/signup" variant="inverse" size="lg">
                  Browse open squads
                </Button>
                <Button href="/signup" variant="ghost-light" size="lg">
                  Start a squad
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
