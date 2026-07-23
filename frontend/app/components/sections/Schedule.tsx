import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Reveal } from "~/components/ui/Reveal";
import { SCHEDULE_DAYS, SCHEDULE_ROWS } from "~/data/schedule";

export function Schedule() {
  return (
    <section id="schedule" className="scroll-mt-20 py-[clamp(4rem,9vw,7.5rem)]">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-[clamp(2rem,5vw,4rem)]">
        <Reveal className="max-w-[40ch]">
          <span className="font-display text-[0.9rem] font-bold text-primary-ink">
            Plan ahead
          </span>
          <h2 className="mt-2.5 text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold">
            Can’t play right now? Lock in a session for later.
          </h2>
          <p className="mt-4 max-w-[52ch] text-[1.125rem] text-muted text-pretty">
            Schedule a squad for tonight or next week and let the slots fill while you’re away.
            Everyone gets a reminder before go-time — no one’s left staring at an empty lobby.
          </p>
          <div className="mt-7">
            <Button href="/signup">Schedule a session</Button>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="w-full">
          <div className="rounded-panel border border-line bg-surface p-4 shadow-pop sm:p-[1.4rem]">
            <div className="flex flex-col gap-2">
              {SCHEDULE_ROWS.map((r) => (
                <div
                  key={r.time}
                  className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 rounded-pebble border border-line bg-bg px-3.5 py-2.5 sm:flex-nowrap"
                >
                  <span className="flex-none font-display text-[0.95rem] font-extrabold tabular-nums sm:w-[4.4rem]">
                    {r.time}
                  </span>
                  <span className="order-last w-full min-w-0 sm:order-none sm:w-auto">
                    <span className="font-display text-[0.95rem] font-bold">{r.game}</span>
                    <span className="text-[0.84rem] text-muted"> · {r.vibe}</span>
                  </span>
                  <span className="ml-auto flex-none rounded-full bg-primary-tint px-2.5 py-1.5 text-[0.82rem] font-bold text-primary-ink">
                    {r.spots}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
