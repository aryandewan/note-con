import { motion } from "motion/react";
import type { ReactNode } from "react";
import { easeExpo } from "~/lib/motion";
import { useReveal } from "~/lib/useReveal";

/**
 * Scroll-reveal wrapper. Enhances an already-visible default: with reduced
 * motion (or before JS arms it) the content simply renders in place — its
 * visibility is never gated on the animation firing. See {@link useReveal}.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, reduce, show } = useReveal<HTMLDivElement>();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : y }}
      transition={show ? { duration: 0.7, ease: easeExpo, delay } : { duration: 0 }}
    >
      {children}
    </motion.div>
  );
}
