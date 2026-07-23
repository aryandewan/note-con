import { useEffect, useState } from "react";
import { Link } from "react-router";
import { DashboardHeader } from "~/components/dashboard/DashboardHeader";
import { EmptyState, ctaClass } from "~/components/dashboard/EmptyState";
import { HostSessionButton } from "~/components/dashboard/HostSessionButton";
import { Panel } from "~/components/dashboard/Panel";
import { SquadCard } from "~/components/dashboard/SquadCard";
import { Bolt, Users } from "~/components/ui/icons";
import { useSquadsStore } from "~/stores/squads";
import type { Route } from "./+types/dashboard.squads";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "My Squads — Rally" },
    { name: "description", content: "Sessions you’re hosting or have joined." },
  ];
}

export default function MySquads() {
  const squads = useSquadsStore((s) => s.mySquads);
  const fetchMine = useSquadsStore((s) => s.fetchMine);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    fetchMine();
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("/api/auth/info", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : null))
      .then((user) => setUsername(user?.username ?? null));
  }, [fetchMine]);

  const hosting = squads.filter((s) => s.createdBy === username);
  const joined = squads.filter((s) => s.createdBy !== username);

  return (
    <>
      <DashboardHeader
        title="My squads"
        subtitle="Every session you’re part of — the ones you run and the ones you joined."
        action={<HostSessionButton />}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          title="Hosting"
          action={
            hosting.length > 0 && (
              <span className="font-display text-[0.85rem] font-bold tabular-nums text-muted">
                {hosting.length} active
              </span>
            )
          }
        >
          {hosting.length > 0 ? (
            <ul className="space-y-3">
              {hosting.map((squad) => (
                <SquadCard key={squad.id} squad={squad} />
              ))}
            </ul>
          ) : (
            <EmptyState
              icon={Bolt}
              title="You’re not hosting anything"
              body="Open a session and let players claim your slots — it takes about fifteen seconds."
            />
          )}
        </Panel>

        <Panel
          title="Joined"
          action={
            joined.length > 0 && (
              <span className="font-display text-[0.85rem] font-bold tabular-nums text-muted">
                {joined.length} active
              </span>
            )
          }
        >
          {joined.length > 0 ? (
            <ul className="space-y-3">
              {joined.map((squad) => (
                <SquadCard key={squad.id} squad={squad} />
              ))}
            </ul>
          ) : (
            <EmptyState
              icon={Users}
              title="You haven’t joined a squad yet"
              body="Claim a slot in an open squad from the lobby and it’ll show up here."
              cta={
                <Link to="/dashboard" className={ctaClass}>
                  Browse open squads
                </Link>
              }
            />
          )}
        </Panel>
      </div>
    </>
  );
}
