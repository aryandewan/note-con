import type { ComponentType, ReactNode } from "react";

type IconType = ComponentType<{ size?: number; className?: string }>;

/** Shared pill-button style for empty-state calls to action. */
export const ctaClass =
  "mt-1 inline-flex items-center gap-1.5 rounded-full bg-primary-tint px-4 py-2 font-display text-[0.9rem] font-bold text-primary-ink transition-colors hover:bg-primary-tint2";

/** Centered icon + message shown when a panel has no data yet. */
export function EmptyState({
  icon: Icon,
  title,
  body,
  cta,
}: {
  icon: IconType;
  title: string;
  body: string;
  cta?: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-12 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-surface-2 text-muted">
        <Icon size={22} />
      </span>
      <div className="space-y-1">
        <p className="font-display font-bold text-ink">{title}</p>
        <p className="mx-auto max-w-[34ch] text-[0.9rem] text-muted text-pretty">{body}</p>
      </div>
      {cta}
    </div>
  );
}
