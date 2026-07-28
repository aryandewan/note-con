/**
 * Base URL for the Express API.
 *
 * Unset in dev, so paths stay relative and go through the Vite proxy in
 * vite.config.ts. On Vercel, VITE_API_URL points at the Render service, which
 * makes the same paths absolute and cross-origin.
 */
const raw = import.meta.env.VITE_API_URL ?? ""

/** Trailing slash would produce a double slash when joined with a path. */
export const API_BASE = raw.replace(/\/$/, "")

/** Prefix an `/api/...` path with the API origin. */
export const api = (path: string) => `${API_BASE}${path}`
