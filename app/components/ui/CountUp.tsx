import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { easeQuart } from "~/lib/motion";

/**
 * Counts up to `value` when scrolled into view. Initialised to the final value
 * so SSR / no-JS renders the real number; the animation only resets-and-counts
 * on the client when in view and motion is allowed.
 */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString("en-US"));

  useEffect(() => {
    if (!inView || reduce) return;
    mv.set(0);
    const controls = animate(mv, value, { duration: 1.4, ease: easeQuart });
    return () => controls.stop();
  }, [inView, reduce, value, mv]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
