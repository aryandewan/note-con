import type { Squad } from "./types";

/**
 * A row of lobby-style slot indicators: one pip per slot, filled pips in the
 * brand color. For large lobbies (>8) it degrades to a single progress bar so
 * we don't render a wall of pips.
 */
function SlotPips({ filled, total }: { filled: number; total: number }) {
  if (total > 8) {
    const pct = total > 0 ? (filled / total) * 100 : 0;
    return (
      <div className="h-2 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    );
  }
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-2 flex-1 rounded-full transition-colors ${
            i < filled ? "bg-primary" : "bg-surface-2"
          }`}
        />
      ))}
    </div>
  );
}

/**
 * One squad in a list. Pass `onJoin` to show a Join button (open squads);
 * omit it for read-only cards (your squads).
 */
export function SquadCard({
  squad,
  onJoin,
  joining = false,
}: {
  squad: Squad;
  onJoin?: (id: string) => void;
  joining?: boolean;
}) {
  const filled = Math.min(squad.filled, squad.slots);
  const isFull = filled >= squad.slots;

  return (
    <li className="rounded-pebble border border-line bg-surface p-4 transition-colors hover:border-line-strong">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-display text-[1.05rem] font-extrabold text-ink">
            {squad.game}
          </p>
          <p className="mt-0.5 text-[0.85rem] text-muted">
            Hosted by <span className="font-semibold text-ink">@{squad.createdBy}</span>
          </p>
        </div>

        {onJoin && (
          <button
            type="button"
            disabled={isFull || joining}
            onClick={() => onJoin(squad.id)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 font-display text-[0.9rem] font-bold text-cloud shadow-card transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isFull ? "Full" : joining ? "Joining…" : "Join"}
          </button>
        )}
      </div>

      <div className="mt-3.5">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[0.78rem] font-semibold uppercase tracking-wide text-muted">
            Slots
          </span>
          <span className="font-display text-[0.85rem] font-bold tabular-nums text-ink">
            {filled}
            <span className="text-muted">/{squad.slots}</span>
          </span>
        </div>
        <SlotPips filled={filled} total={squad.slots} />
      </div>
    </li>
  );
}
