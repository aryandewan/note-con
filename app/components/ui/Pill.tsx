import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type PillVariant = "live" | "open" | "hot" | "full";

const PILLS: Record<PillVariant, string> = {
  live: "bg-live text-onlive",
  open: "bg-primary-tint text-primary-ink",
  hot: "bg-hot text-cloud",
  full: "bg-surface-2 text-muted",
};

export function Pill({
  variant,
  children,
}: {
  variant: PillVariant;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-display text-[0.78rem] font-bold leading-none ${PILLS[variant]}`}
    >
      {children}
    </span>
  );
}

/** A status dot, optionally with an outward pulsing ring (motion). */
export function Dot({ pulse = false }: { pulse?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-grid size-2 place-items-center">
      <span className="size-2 rounded-full bg-current" />
      {pulse && !reduce && (
        <motion.span
          className="absolute inset-0 rounded-full bg-current"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
    </span>
  );
}
