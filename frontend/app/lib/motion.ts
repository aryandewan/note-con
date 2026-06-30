import { cubicBezier } from "motion/react";

/** Shared easings so motion gets a typed Easing (not an untyped number[]). */
export const easeExpo = cubicBezier(0.16, 1, 0.3, 1);
export const easeQuart = cubicBezier(0.22, 1, 0.36, 1);
