import type { ReactNode } from "react";

/**
 * Centered page container with a fluid gutter that also respects the
 * left/right safe-area insets on notched phones.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-page pl-[max(clamp(1.25rem,4vw,3rem),env(safe-area-inset-left))] pr-[max(clamp(1.25rem,4vw,3rem),env(safe-area-inset-right))] ${className}`}
    >
      {children}
    </div>
  );
}
