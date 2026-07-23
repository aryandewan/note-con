import { DashboardHeader } from "~/components/dashboard/DashboardHeader";
import { HostSessionButton } from "~/components/dashboard/HostSessionButton";
import { MySquadsPanel } from "~/components/dashboard/MySquadsPanel";
import { OpenSquadsPanel } from "~/components/dashboard/OpenSquadsPanel";
import { RecentActivityPanel } from "~/components/dashboard/RecentActivityPanel";
import type { Route } from "./+types/dashboard.lobby";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Lobby — Rally" },
    { name: "description", content: "Your Rally lobby." },
  ];
}

export default function Lobby() {
  return (
    <>
      <DashboardHeader
        title="Welcome back"
        subtitle="Your lobby is quiet right now — let’s find you a squad."
        action={<HostSessionButton />}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <OpenSquadsPanel />
        <MySquadsPanel />
        <RecentActivityPanel />
      </div>
    </>
  );
}
