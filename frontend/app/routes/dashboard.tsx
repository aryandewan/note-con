import { Outlet } from "react-router";
import { DashboardShell } from "~/components/dashboard/DashboardShell";
import type { Route } from "./+types/dashboard";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Dashboard — Rally" },
    { name: "description", content: "Your Rally lobby." },
  ];
}

export default function DashboardLayout() {
  return (
    <DashboardShell>
      <div className="mx-auto w-full max-w-280 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </DashboardShell>
  );
}
