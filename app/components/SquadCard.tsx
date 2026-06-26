import { motion, useReducedMotion } from "motion/react";
import { forwardRef } from "react";
import { Avatar } from "~/components/ui/Avatar";
import { MotionLink } from "~/components/ui/MotionLink";
import { Meter } from "~/components/ui/Meter";
import { Dot, Pill } from "~/components/ui/Pill";
import { Arrow, Check, Plus } from "~/components/ui/icons";
import { easeExpo } from "~/lib/motion";
import { statusOf, type Squad } from "~/lib/squad";

function SlotPip({ target }: { target: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-7 shrink-0 place-items-center rounded-full border-2 border-dashed ${
        target
          ? "border-live-strong bg-live-tint text-live-ink"
          : "border-line-strong bg-surface text-muted"
      }`}
    >
      <Plus size={12} />
    </span>
  );
}

export const SquadCard = forwardRef<HTMLElement, { squad: Squad }>(function SquadCard(
  { squad },
  ref
) {
  const reduce = useReducedMotion();
  const st = statusOf(squad);
  const pct = Math.round((squad.members.length / squad.size) * 100);
  const openSlots = Math.max(0, squad.size - squad.members.length);
  const full = st.kind === "full";

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: -12, scale: 0.97 }}
      animate={{ opacity: full ? 0.7 : 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: easeExpo }}
      whileHover={reduce ? undefined : { y: -2 }}
      className="rounded-card border border-line bg-bg p-4 transition-[box-shadow,border-color] duration-200 hover:border-line-strong hover:shadow-pop"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="inline-flex items-center gap-1.5 font-display text-[0.98rem] font-extrabold">
          <span className="size-2.5 shrink-0 rounded-full" style={{ background: squad.accent }} />
          {squad.game}
        </span>
        <span className="ml-auto">
          {st.kind === "live" && (
            <Pill variant="live">
              <Dot pulse /> LIVE
            </Pill>
          )}
          {st.kind === "open" && <Pill variant="open">{st.label}</Pill>}
          {st.kind === "hot" && <Pill variant="hot">{st.label}</Pill>}
          {st.kind === "full" && <Pill variant="full">Full</Pill>}
        </span>
      </div>

      <p className="mb-3.5 text-[0.92rem] text-muted">
        <strong className="font-semibold text-ink">
          {squad.ranked ? "Ranked" : "Casual"}
        </strong>{" "}
        · {squad.vibe}
      </p>

      <div className="flex items-center gap-2.5 sm:gap-3.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex -space-x-2">
            {squad.members.slice(0, 5).map((m) => (
              <Avatar key={m} name={m} you={m === "You"} size="sm" />
            ))}
            {Array.from({ length: Math.min(openSlots, 5) }).map((_, i) => (
              <SlotPip key={`o${i}`} target={i === 0 && !full} />
            ))}
          </span>
          <span className="font-display text-[0.95rem] font-extrabold tabular-nums">
            {squad.members.length}
            <span className="font-semibold text-muted">/{squad.size}</span>
          </span>
        </div>

        {full ? (
          <span
            aria-label={`${squad.game} squad is full`}
            className="ml-auto inline-flex shrink-0 cursor-default items-center gap-1.5 rounded-full bg-surface-2 px-3.5 py-2.5 font-display text-[0.92rem] font-bold text-muted"
          >
            <Check size={15} /> Full
          </span>
        ) : (
          <MotionLink
            to="/signup"
            whileTap={reduce ? undefined : { scale: 0.96 }}
            aria-label={`Join ${squad.host}'s ${squad.game} squad — ${openSlots} ${
              openSlots === 1 ? "slot" : "slots"
            } open`}
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-tint px-3.5 py-2.5 font-display text-[0.92rem] font-bold text-primary transition-colors hover:bg-primary-tint2"
          >
            <span className="hidden sm:inline">Claim slot</span>
            <span className="sm:hidden">Join</span>
            <Arrow size={15} />
          </MotionLink>
        )}
      </div>

      <Meter pct={pct} hot={st.kind === "hot"} />
    </motion.article>
  );
});
