import type { ReactNode } from "react";
import { Link } from "react-router";
import { DashboardShell } from "~/components/dashboard/DashboardShell";
import { Bolt, Calendar, Controller, Users } from "~/components/ui/icons";
import type { Route } from "./+types/dashboard";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Dashboard — Rally" },
    { name: "description", content: "Your Rally lobby." },
  ];
}

const STATS = [
  { label: "Squads this week" },
  { label: "Avg. fill time" },
  { label: "Current streak" },
  { label: "Hours played" },
];

function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`flex flex-col rounded-card border border-line bg-bg ${className}`}>
      <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <h2 className="font-display text-[1rem] font-extrabold text-ink">{title}</h2>
        {action}
      </header>
      <div className="flex flex-1 flex-col p-5">{children}</div>
    </section>
  );
}

function EmptyState({
  icon: Icon,
  title,
  body,
  cta,
}: {
  icon: typeof Bolt;
  title: string;
  body: string;
  cta?: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-12 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-surface-2 text-muted">
        <Icon size={22} />
      </span>
      <div className="space-y-1">
        <p className="font-display font-bold text-ink">{title}</p>
        <p className="mx-auto max-w-[34ch] text-[0.9rem] text-muted text-pretty">{body}</p>
      </div>
      {cta}
    </div>
  );
}

const ctaClass =
  "mt-1 inline-flex items-center gap-1.5 rounded-full bg-primary-tint px-4 py-2 font-display text-[0.9rem] font-bold text-primary-ink transition-colors hover:bg-primary-tint2";

export default function Dashboard() {
  return (
    <DashboardShell>
      <div className="mx-auto w-full max-w-[1120px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Greeting */}
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-black tracking-[-0.025em]">
              Welcome back
            </h1>
            <p className="mt-1 text-[1.02rem] text-muted">
              Your lobby is quiet right now — let’s find you a squad.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-display text-[0.98rem] font-bold text-cloud shadow-card transition-colors hover:bg-primary-hover hover:shadow-pop"
          >
            <Bolt size={18} /> Host a session
          </Link>
        </div>

        {/* Stats strip — placeholders until there's data */}
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

        {/* Panels */}
        <div className="grid gap-5 lg:grid-cols-3">
          <Panel title="Open squads filling now" className="lg:col-span-2">
            <EmptyState
              icon={Bolt}
              title="No live squads yet"
              body="When squads start forming, they’ll show up here so you can claim a slot in one tap."
              cta={
                <Link to="/dashboard" className={ctaClass}>
                  Browse all games
                </Link>
              }
            />
          </Panel>

          <Panel title="Scheduled sessions">
            <EmptyState
              icon={Calendar}
              title="Nothing scheduled"
              body="Plan a session for later and let the slots fill while you’re away."
              cta={
                <Link to="/dashboard" className={ctaClass}>
                  Plan a session
                </Link>
              }
            />
          </Panel>

          <Panel title="Your squads" className="lg:col-span-2">
            <EmptyState
              icon={Users}
              title="You’re not in a squad yet"
              body="Join an open squad or host your own — the ones you’re part of will live here."
              cta={
                <Link to="/dashboard" className={ctaClass}>
                  Find a squad
                </Link>
              }
            />
          </Panel>

          <Panel title="Recent activity">
            <EmptyState
              icon={Controller}
              title="No activity yet"
              body="Invites, joins, and session reminders will appear here."
            />
          </Panel>
        </div>
      </div>
    </DashboardShell>
  );
}
