import { Controller } from "~/components/ui/icons";
import { EmptyState } from "./EmptyState";
import { Panel } from "./Panel";

/** Placeholder panel for future activity feed. */
export function RecentActivityPanel() {
  return (
    <Panel title="Recent activity">
      <EmptyState
        icon={Controller}
        title="No activity yet"
        body="Invites, joins, and session reminders will appear here."
      />
    </Panel>
  );
}
