import { motion, useReducedMotion } from "motion/react";
import { easeExpo } from "~/lib/motion";

/**
 * Squad fill meter. Grows from 0 on mount and smoothly re-animates whenever the
 * fill changes (a slot gets claimed), so the bar visibly fills in real time.
 */
export function Meter({ pct }: { pct: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={reduce ? false : { width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={reduce ? { duration: 0 } : { duration: 0.7, ease: easeExpo }}
      />
    </div>
  );
}
