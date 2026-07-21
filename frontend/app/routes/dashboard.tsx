import { DashboardHeader } from "~/components/dashboard/DashboardHeader";
import { DashboardShell } from "~/components/dashboard/DashboardShell";
import { MySquadsPanel } from "~/components/dashboard/MySquadsPanel";
import { OpenSquadsPanel } from "~/components/dashboard/OpenSquadsPanel";
import { RecentActivityPanel } from "~/components/dashboard/RecentActivityPanel";
import { SchedulePanel } from "~/components/dashboard/SchedulePanel";
import { StatsStrip } from "~/components/dashboard/StatsStrip";
import type { Route } from "./+types/dashboard";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Dashboard — Rally" },
    { name: "description", content: "Your Rally lobby." },
  ];
}

export default function Dashboard() {
  return (
    <DashboardShell>
      <div className="mx-auto w-full max-w-280 px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader />
        <StatsStrip />

        <div className="grid gap-5 lg:grid-cols-3">
          <OpenSquadsPanel />
          <MySquadsPanel />
          <RecentActivityPanel />
        </div>
      </div>
    </DashboardShell>
  );
}
