import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link } from "react-router";
import { SquadCard } from "~/components/SquadCard";
import { Avatar } from "~/components/ui/Avatar";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Dot, Pill } from "~/components/ui/Pill";
import { Reveal } from "~/components/ui/Reveal";
import { Arrow, Bolt, Sliders } from "~/components/ui/icons";
import { easeExpo } from "~/lib/motion";
import { useLiveSquads } from "~/lib/useLiveSquads";

const TRUST = ["Nova R", "Tariq", "Mei L", "Loon", "Echo"];


export function Hero() {
  const reduce = useReducedMotion();
  const { squads, liveCount } = useLiveSquads();

  return (
    <section className="relative overflow-hidden pb-[clamp(3rem,7vw,5rem)] pt-[clamp(3rem,7vw,5.5rem)]">
      <Container className="grid items-center justify-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[clamp(2rem,5vw,4.5rem)]">
        {/* Copy */}
        <div className="max-w-xl space-y-10 mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 px-1.5 text-[0.9rem] font-medium text-muted shadow-card">
              <Pill variant="live">
                <Dot pulse /> LIVE
              </Pill>
              <span>
                <b className="text-ink">6,213</b> players online right now
              </span>
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-[clamp(2.75rem,7vw,5.25rem)] font-black leading-[1.04] tracking-[-0.035em] text-balance">
              Find your{" "}
              <span className="relative whitespace-nowrap text-primary">
                squad
                <motion.span
                  aria-hidden="true"
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={reduce ? undefined : { scaleX: 1 }}
                  transition={{ duration: 0.6, ease: easeExpo, delay: 0.55 }}
                  className="absolute inset-x-0 bottom-[0.04em] -z-10 h-[0.16em] origin-left rounded-full bg-live"
                />
              </span>
              . Tonight.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-[34ch] text-[clamp(0.9rem,1.6vw,1.3rem)] text-muted">
              Skip the LFG chat spam. Browse open squads filling up live, claim a slot, or host a
              session — players join until you’re full and the game kicks off.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="flex flex-col gap-3.5 sm:flex-row">
              <Button href="/signup" size="lg">
                <Bolt size={18} /> Browse open squads
              </Button>
              <Button href="/signup" variant="ghost" size="lg">
                Host a session
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex items-center gap-3.5 text-[0.95rem] text-muted">
              <span className="flex -space-x-2">
                {TRUST.map((m) => (
                  <Avatar key={m} name={m} />
                ))}
              </span>
              <span>
                Squads filling in <b className="text-ink">under 5 minutes</b> on average
              </span>
            </div>
          </Reveal>
        </div>

        {/* Live board */}
        <Reveal delay={0.08} className="w-full">
          <div
            id="squads"
            className="relative scroll-mt-24 rounded-panel border border-line bg-surface p-5 shadow-float"
          >
            <div className="flex items-center justify-between px-1.5 pb-4 pt-1.5">
              <span className="flex items-center gap-1.5 font-display text-sm font-extrabold">
                <Bolt size={18} />
                Open squads
                <span className="text-live-ink tabular-nums">· {liveCount} live</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-muted">
                <Sliders size={16} /> All games
              </span>
            </div>
            <motion.div layout className="relative flex flex-col gap-2.5">
              <AnimatePresence initial={false} mode="popLayout">
                {squads.map((s) => (
                  <SquadCard key={s.id} squad={s} />
                ))}
              </AnimatePresence>
            </motion.div>
            <div className="px-1.5 pb-1 pt-4 text-center">
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 font-display text-[0.92rem] font-bold text-primary-ink"
              >
                See all open squads <Arrow size={15} />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
