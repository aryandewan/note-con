import { HostSessionButton } from "./HostSessionButton";

/** Greeting row at the top of the dashboard. */
export function DashboardHeader() {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-black tracking-tight">
          Welcome back
        </h1>
        <p className="mt-1 text-[1.02rem] text-muted">
          Your lobby is quiet right now — let’s find you a squad.
        </p>
      </div>
      <HostSessionButton />
    </div>
  );
}
