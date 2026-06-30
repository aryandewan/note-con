import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Layout effect on the client (runs before paint), plain effect on the server.
const useIsoLayout = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Crawler / SSR / headless-safe scroll reveal.
 *
 * Content renders visible by default (server + first client paint), so no-JS,
 * crawlers, and headless renderers never see a blank section. Only after a
 * pre-paint "arm" does the element hide (instantly, no flash) and wait to
 * animate in on scroll. A timer failsafe reveals anything that never receives
 * an IntersectionObserver callback (e.g. headless under virtual time).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const reduce = useReducedMotion();
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const [armed, setArmed] = useState(false);
  const [failsafe, setFailsafe] = useState(false);

  useIsoLayout(() => setArmed(true), []);
  useEffect(() => {
    const t = window.setTimeout(() => setFailsafe(true), 1400);
    return () => window.clearTimeout(t);
  }, []);

  // Visible unless we've armed on the client and haven't yet been triggered.
  const show = reduce || !armed || inView || failsafe;
  return { ref, reduce, show };
}
