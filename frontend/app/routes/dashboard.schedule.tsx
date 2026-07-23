import { useHostSession } from "~/components/dashboard/DashboardShell";
import { DashboardHeader } from "~/components/dashboard/DashboardHeader";
import { EmptyState, ctaClass } from "~/components/dashboard/EmptyState";
import { Panel } from "~/components/dashboard/Panel";
import { Calendar } from "~/components/ui/icons";
import type { Route } from "./+types/dashboard.schedule";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Schedule — Rally" },
    { name: "description", content: "Your upcoming Rally sessions." },
  ];
}

export default function Schedule() {
  const openHost = useHostSession();

  return (
    <>
      <DashboardHeader
        title="Schedule"
        subtitle="Sessions locked in for later — so tonight’s squad is sorted before tonight."
      />

      <Panel title="Upcoming sessions">
        <EmptyState
          icon={Calendar}
          title="Scheduling is on its way"
          body="Soon you’ll be able to open a session for tonight or next week and let the slots fill while you’re away. For now, squads go live the moment you host them."
          cta={
            <button type="button" onClick={() => openHost()} className={ctaClass}>
              Host a session now
            </button>
          }
        />
      </Panel>
    </>
  );
}
