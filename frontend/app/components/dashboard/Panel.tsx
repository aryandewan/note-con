import type { ReactNode } from "react";

/** The framed card each dashboard section lives in: titled header + body. */
export function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`flex flex-col rounded-card border border-line bg-bg ${className}`}>
      <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <h2 className="font-display text-[1rem] font-extrabold text-ink">{title}</h2>
        {action}
      </header>
      <div className="flex flex-1 flex-col p-5">{children}</div>
    </section>
  );
}
