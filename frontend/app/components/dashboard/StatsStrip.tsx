const STATS = [
  { label: "Squads this week" },
  { label: "Avg. fill time" },
  { label: "Current streak" },
  { label: "Hours played" },
];

/** Top-of-dashboard stats row. Values are placeholders until there's data. */
export function StatsStrip() {
  return (
    <dl className="mb-6 flex flex-col divide-y divide-line overflow-hidden rounded-card border border-line bg-bg sm:flex-row sm:divide-x sm:divide-y-0">
      {STATS.map((s) => (
        <div key={s.label} className="flex-1 px-5 py-4">
          <dt className="text-[0.85rem] font-semibold text-muted">{s.label}</dt>
          <dd className="mt-1 font-display text-2xl font-extrabold tabular-nums text-line-strong">
            —
          </dd>
        </div>
      ))}
    </dl>
  );
}
