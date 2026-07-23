import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { MotionLink } from "~/components/ui/MotionLink";

type Variant = "primary" | "ghost" | "ghost-light" | "inverse";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-cloud shadow-card hover:bg-primary-hover hover:shadow-pop",
  ghost: "border-[1.5px] border-line-strong text-ink hover:border-ink hover:bg-surface",
  "ghost-light": "border-[1.5px] border-white/30 text-cloud hover:border-white/70 hover:bg-white/10",
  inverse: "bg-cloud text-ink shadow-card hover:bg-primary-tint",
};
const SIZES: Record<Size, string> = {
  md: "text-base px-6 py-[0.95rem]",
  lg: "text-[1.1rem] px-[1.9rem] py-[1.1rem]",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  block = false,
  className = "",
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  const reduce = useReducedMotion();
  const cls = `inline-flex items-center justify-center gap-2 font-display font-bold leading-none rounded-full whitespace-nowrap transition-colors duration-200 select-none ${
    VARIANTS[variant]
  } ${SIZES[size]} ${block ? "w-full" : ""} ${className}`;

  const anim = reduce
    ? {}
    : {
        whileTap: { scale: 0.98 },
        whileHover: variant.startsWith("ghost") ? undefined : { y: -1 },
      };

  if (href) {
    // Internal paths route client-side; hashes / external use a plain anchor.
    if (href.startsWith("/")) {
      return (
        <MotionLink to={href} onClick={onClick} className={cls} aria-label={ariaLabel} {...anim}>
          {children}
        </MotionLink>
      );
    }
    return (
      <motion.a href={href} onClick={onClick} className={cls} aria-label={ariaLabel} {...anim}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={onClick} className={cls} aria-label={ariaLabel} {...anim}>
      {children}
    </motion.button>
  );
}
