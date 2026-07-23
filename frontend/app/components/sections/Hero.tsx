import { motion, useReducedMotion } from "motion/react";
import { Avatar } from "~/components/ui/Avatar";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Dot, Pill } from "~/components/ui/Pill";
import { Reveal } from "~/components/ui/Reveal";
import { easeExpo } from "~/lib/motion";

const TRUST = ["Nova R", "Tariq", "Mei L", "Loon", "Echo"];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-[clamp(3.5rem,8vw,6rem)] pt-[clamp(3.5rem,9vw,7rem)]">
      <Container className="flex flex-col items-center gap-9 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 px-1.5 text-[0.9rem] font-medium text-muted shadow-card">
            <Pill variant="solid">
              <Dot pulse /> LIVE
            </Pill>
            <span>
              <b className="text-ink">6,213</b> players online right now
            </span>
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="max-w-[22ch] text-[clamp(2.75rem,7vw,5.25rem)] font-black leading-[1.04] tracking-[-0.035em] text-balance">
            Find your{" "}
            <span className="relative whitespace-nowrap text-primary">
              squad
              <motion.span
                aria-hidden="true"
                initial={reduce ? false : { scaleX: 0 }}
                animate={reduce ? undefined : { scaleX: 1 }}
                transition={{ duration: 0.6, ease: easeExpo, delay: 0.55 }}
                className="absolute inset-x-0 bottom-[0.04em] -z-10 h-[0.16em] origin-left rounded-full bg-primary"
              />
            </span>
            . Tonight.
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="max-w-[46ch] text-[clamp(0.9rem,1.6vw,1.3rem)] text-muted text-pretty">
            Skip the LFG chat spam. Browse open squads filling up live, claim a slot, or host a
            session — players join until you’re full and the game kicks off.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="flex flex-col gap-3.5 sm:flex-row">
            <Button href="/signup" size="lg">
              Browse open squads
            </Button>
            <Button href="/signup" variant="ghost" size="lg">
              Host a session
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="flex flex-col items-center gap-3 text-[0.95rem] text-muted sm:flex-row">
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
      </Container>
    </section>
  );
}
