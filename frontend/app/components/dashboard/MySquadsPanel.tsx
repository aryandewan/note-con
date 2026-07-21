import { useEffect } from "react";
import { Link } from "react-router";
import { useSquadsStore } from "~/stores/squads";
import { Users } from "~/components/ui/icons";
import { EmptyState, ctaClass } from "./EmptyState";
import { Panel } from "./Panel";
import { SquadCard } from "./SquadCard";

/** Sessions the current user is already a member of — read from the shared squads store. */
export function MySquadsPanel() {
  const squads = useSquadsStore((s) => s.mySquads);
  const fetchMine = useSquadsStore((s) => s.fetchMine);

  useEffect(() => {
    fetchMine();
  }, [fetchMine]);

  return (
    <Panel title="Your squads" className="lg:col-span-2">
      {squads.length > 0 ? (
        <ul className="space-y-3">
          {squads.map((squad) => (
            <SquadCard key={squad.id} squad={squad} />
          ))}
        </ul>
      ) : (
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
      )}
    </Panel>
  );
}
