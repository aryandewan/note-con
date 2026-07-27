import { useEffect } from "react";
import { Link } from "react-router";
import { useSquadsStore } from "~/stores/squads";
import { Users } from "~/components/ui/icons";
import { EmptyState, ctaClass } from "./EmptyState";
import { Panel } from "./Panel";
import { SquadCard } from "./SquadCard";

/** How many squads the lobby preview shows before pointing at the full page. */
const PREVIEW_COUNT = 2;

/** Sessions the current user is already a member of — read from the shared squads store. */
export function MySquadsPanel() {
  const squads = useSquadsStore((s) => s.mySquads);
  const latest = squads.slice(0, PREVIEW_COUNT);
  const fetchMine = useSquadsStore((s) => s.fetchMine);

  useEffect(() => {
    fetchMine();
  }, [fetchMine]);

  return (
    <Panel
      title="Your squads"
      className="lg:col-span-2"
      action={
        squads.length > PREVIEW_COUNT && (
          <Link
            to="/dashboard/squads"
            className="font-display text-[0.85rem] font-bold text-primary-ink transition-colors hover:text-primary"
          >
            View all {squads.length}
          </Link>
        )
      }
    >
      {squads.length > 0 ? (
        <ul className="space-y-3">
          {latest.map((squad) => (
            <SquadCard key={squad.id} squad={squad} />
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={Users}
          title="You’re not in a squad yet"
          body="Join an open squad or host your own — the ones you’re part of will live here."
          cta={
            <Link to="/dashboard/games" className={ctaClass}>
              Find a squad
            </Link>
          }
        />
      )}
    </Panel>
  );
}
