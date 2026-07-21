import { Link } from "react-router";
import { Calendar } from "~/components/ui/icons";
import { EmptyState, ctaClass } from "./EmptyState";
import { Panel } from "./Panel";

/** Placeholder panel for future scheduled sessions. */
export function SchedulePanel() {
  return (
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
  );
}
