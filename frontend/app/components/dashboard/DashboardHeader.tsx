import type { ReactNode } from "react";

/** Page header row shared by every dashboard page: title, subtitle, optional action. */
export function DashboardHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-black tracking-tight">
          {title}
        </h1>
        <p className="mt-1 text-[1.02rem] text-muted">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}
