import { Avatar } from "~/components/ui/Avatar";
import { Container } from "~/components/ui/Container";
import { Meter } from "~/components/ui/Meter";
import { Dot, Pill } from "~/components/ui/Pill";
import { Reveal } from "~/components/ui/Reveal";

const VISUAL =
  "mt-5 flex min-h-34 flex-col justify-center gap-2.5 rounded-card border border-line bg-surface p-4";
const CHIP = "rounded-full border border-line bg-bg px-2.5 py-1.5 text-[0.8rem] font-semibold text-muted";
const CHIP_ON = "rounded-full border border-primary bg-primary px-2.5 py-1.5 text-[0.8rem] font-semibold text-cloud";
const LABEL = "text-[0.78rem] font-bold uppercase tracking-[0.04em] text-muted";

function Connector() {
  return (
    <span
      aria-hidden="true"
      className="absolute left-[2.4rem] -right-4 top-[1.7rem] z-1 hidden h-0.5 bg-[repeating-linear-gradient(90deg,var(--color-line-strong)_0_6px,transparent_6px_12px)] md:block"
    />
  );
}

function Num({ children, className }: { children: string; className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative z-2 grid size-[2.4rem] place-items-center rounded-full font-display text-base font-black ${className}`}
    >
      {children}
    </span>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 py-[clamp(4rem,9vw,7.5rem)]">
      <Container>
        <Reveal className="mb-8 max-w-[40ch] md:mb-12">
          <span className="font-display text-[0.9rem] font-bold text-primary-ink">
            How Rally works
          </span>
          <h2 className="mt-2.5 text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold">
            From “anyone online?” to a full squad in three steps.
          </h2>
          <p className="mt-4 max-w-[52ch] text-[1.125rem] text-muted text-pretty">
            Hosting takes about fifteen seconds. Joining takes one tap. The squad sets its own
            intensity — Rally just gets everyone in the same lobby.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-[clamp(1.25rem,3vw,2rem)]">
          <Reveal delay={0.05} className="relative pt-2">
            <Connector />
            <Num className="bg-ink text-bg">01</Num>
            <h3 className="mt-5 font-display text-[1.4rem] font-extrabold">Open a session</h3>
            <p className="mt-2.5 text-[1.02rem] text-muted">
              Pick a game, set the vibe and squad size, and choose now or a time tonight. That’s it —
              your slots are live.
            </p>
            <div className={VISUAL}>
              <span className={LABEL}>Vibe</span>
              <div className="flex flex-wrap gap-1.5">
                <span className={CHIP_ON}>Ranked</span>
                <span className={CHIP}>Casual</span>
                <span className={CHIP_ON}>Mic up</span>
                <span className={CHIP}>Squad of 5</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.13} className="relative pt-2">
            <Connector />
            <Num className="bg-primary text-cloud">02</Num>
            <h3 className="mt-5 font-display text-[1.4rem] font-extrabold">Slots fill themselves</h3>
            <p className="mt-2.5 text-[1.02rem] text-muted">
              Players browsing open squads claim your open slots. Approve each request or let the
              right-fit ones auto-join.
            </p>
            <div className={VISUAL}>
              <div className="flex items-center gap-2.5">
                <span className="flex -space-x-2">
                  <Avatar name="Kestrel" size="sm" />
                  <Avatar name="Nova R" size="sm" />
                  <Avatar name="Bex" size="sm" />
                  <span className="grid size-7 place-items-center rounded-full border-2 border-dashed border-primary-tint2 bg-primary-tint font-display text-sm font-bold leading-none text-primary-ink">
                    +
                  </span>
                </span>
                <span className="ml-auto font-display text-[0.95rem] font-extrabold tabular-nums">
                  3<span className="font-semibold text-muted">/4</span>
                </span>
              </div>
              <Meter pct={75} />
            </div>
          </Reveal>

          <Reveal delay={0.21} className="relative pt-2">
            <Num className="bg-primary-tint2 text-primary-ink">03</Num>
            <h3 className="mt-5 font-display text-[1.4rem] font-extrabold">Squad’s full — you play</h3>
            <p className="mt-2.5 text-[1.02rem] text-muted">
              Everyone gets a ping and drops into voice the moment the last slot fills. Lobby code’s
              already waiting.
            </p>
            <div className={VISUAL}>
              <div className="flex items-center gap-2.5">
                <Pill variant="solid">
                  <Dot /> READY
                </Pill>
                <span className="rounded-md bg-ink px-3.5 py-2 font-display font-extrabold tracking-widest text-cloud">
                  RALLY-7F2
                </span>
              </div>
              <span className={LABEL}>Voice room live · 4 of 4 in</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
