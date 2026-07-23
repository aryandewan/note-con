import { animate, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { TICKER } from "~/data/ticker";

export function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const controls = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    if (reduce || !trackRef.current) return;
    controls.current = animate(
      trackRef.current,
      { x: ["0%", "-50%"] },
      { duration: 40, ease: "linear", repeat: Infinity }
    );
    return () => controls.current?.stop();
  }, [reduce]);

  return (
    <div
      className="relative overflow-hidden border-y border-line bg-surface"
      aria-label="Recently filled squads"
      onMouseEnter={() => controls.current?.pause()}
      onMouseLeave={() => controls.current?.play()}
    >
      <span className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-16 bg-gradient-to-r from-surface to-transparent sm:w-24" />
      <span className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-16 bg-gradient-to-l from-surface to-transparent sm:w-24" />
      <div ref={trackRef} className="flex w-max gap-10 py-3.5">
        {[...TICKER, ...TICKER].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 whitespace-nowrap text-[0.92rem] text-muted">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              <span className="font-semibold text-ink">{t.name}</span> {t.what} just went full
            </span>
            <span className="opacity-80">· {t.when}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
