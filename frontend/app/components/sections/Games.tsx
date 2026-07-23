import { useReducedMotion } from "motion/react";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { MotionLink } from "~/components/ui/MotionLink";
import { Reveal } from "~/components/ui/Reveal";
import { GAMES } from "~/data/games";

export function Games() {
  const reduce = useReducedMotion();
  return (
    <section id="games" className="scroll-mt-20 border-y border-line bg-surface py-[clamp(4rem,9vw,7.5rem)]">
      <Container>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-8 md:mb-10">
          <Reveal className="max-w-[40ch]">
            <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold">
              Squads forming across every game you play.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <Button href="/signup" variant="ghost">
              Browse all games →
            </Button>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {GAMES.map((g, i) => (
            <Reveal key={g.name} delay={(i % 5) * 0.04} className="flex flex-col gap-3">
              <MotionLink
                to="/signup"
                aria-label={`${g.name} — ${g.live} squads live. Find a squad.`}
                className="grid aspect-square place-items-center rounded-card border-2 border-line bg-bg p-6 transition-[border-color,box-shadow] duration-200 hover:border-primary sm:p-7"
              >
                {g.tint ? (
                  <span
                    role="img"
                    aria-label={`${g.name} logo`}
                    style={{ WebkitMaskImage: `url(${g.logo})`, maskImage: `url(${g.logo})` }}
                    className="h-14 w-[82%] bg-ink mask-center mask-no-repeat mask-contain [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain] sm:h-16"
                  />
                ) : (
                  <img
                    src={g.logo}
                    alt={`${g.name} logo`}
                    loading="lazy"
                    className="max-h-16 w-auto max-w-[82%] object-contain sm:max-h-20"
                  />
                )}
              </MotionLink>
              <span className="inline-flex items-center gap-1.5 px-1 text-[0.85rem] font-semibold text-muted">
                <span className="size-2 rounded-full bg-primary" />
                <b className="font-display text-ink tabular-nums">{g.live}</b> squads live
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
