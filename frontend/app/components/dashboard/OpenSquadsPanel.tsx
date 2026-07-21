import { useEffect } from "react";
import { Link } from "react-router";
import { useSquadsStore } from "~/stores/squads";
import { Bolt } from "~/components/ui/icons";
import { EmptyState, ctaClass } from "./EmptyState";
import { Panel } from "./Panel";
import { SquadCard } from "./SquadCard";

/** Sessions the current user is NOT in yet — read from the shared squads store. */
export function OpenSquadsPanel() {
  const squads = useSquadsStore((s) => s.openSquads);
  const joiningId = useSquadsStore((s) => s.joiningId);
  const error = useSquadsStore((s) => s.error);
  const fetchOpen = useSquadsStore((s) => s.fetchOpen);
  const onJoin = useSquadsStore((s) => s.join);

  useEffect(() => {
    fetchOpen();
  }, [fetchOpen]);

  return (
    <Panel title="Open squads filling now" className="lg:col-span-3">
      {error && (
        <p className="mb-3 rounded-pebble bg-hot/10 px-3 py-2 text-[0.85rem] font-semibold text-hot">
          {error}
        </p>
      )}
      {squads.length > 0 ? (
        <ul className="space-y-3">
          {squads.map((squad) => (
            <SquadCard
              key={squad.id}
              squad={squad}
              onJoin={onJoin}
              joining={joiningId === squad.id}
            />
          ))}
        </ul>
      ) : (
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
      )}
    </Panel>
  );
}
