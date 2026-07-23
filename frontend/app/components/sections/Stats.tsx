import { Container } from "~/components/ui/Container";
import { CountUp } from "~/components/ui/CountUp";
import { Reveal } from "~/components/ui/Reveal";

const STAT =
  "relative text-center md:text-left [&:not(:first-child)]:border-t [&:not(:first-child)]:border-white/15 [&:not(:first-child)]:pt-8 md:[&:not(:first-child)]:border-t-0 md:[&:not(:first-child)]:pt-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-white/15 md:[&:not(:first-child)]:pl-[clamp(1rem,3vw,2rem)]";
const NUM = "font-display text-[clamp(2.5rem,5vw,3.75rem)] font-black leading-none tracking-[-0.03em] tabular-nums";
const LABEL = "mt-2 text-[1rem] text-[oklch(0.93_0.03_224)]";

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-primary py-[clamp(4rem,9vw,7.5rem)] text-[oklch(0.97_0.02_224)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(oklch(1_0_0/0.07)_1px,transparent_1px)] bg-[length:24px_24px]"
      />
      <Container className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-[clamp(1.5rem,4vw,3rem)]">
        <Reveal className={STAT}>
          <div className={NUM}>
            <CountUp value={12840} />
          </div>
          <div className={LABEL}>squads filled this week</div>
        </Reveal>
        <Reveal delay={0.08} className={STAT}>
          <div className={NUM}>
            4<span className="opacity-70">:</span>
            <CountUp value={12} />
          </div>
          <div className={LABEL}>average minutes to a full squad</div>
        </Reveal>
        <Reveal delay={0.16} className={STAT}>
          <div className={NUM}>
            <CountUp value={80} />
            <span className="opacity-70">+</span>
          </div>
          <div className={LABEL}>games with live squads tonight</div>
        </Reveal>
      </Container>
    </section>
  );
}
