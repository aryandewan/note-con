/** Deterministic index from a name, for picking a stable avatar tone. */
function hashIndex(s: string, mod: number): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 997;
  return h % mod;
}

/**
 * Flat neutral tones for other players — the accent is reserved for "you"
 * (see below), so avatars stay inside brand + black/white rather than a
 * hash-hue rainbow.
 */
const TONES = [
  "oklch(0.22 0.03 232)", // ink
  "oklch(0.4 0.02 230)", // dark gray
  "oklch(0.56 0.02 228)", // mid gray
];

/** Background + initials for a generated avatar. */
export function avatarFor(name: string, you = false) {
  const background = you ? "var(--color-primary)" : TONES[hashIndex(name, TONES.length)];
  const initials = you
    ? "YOU"
    : name
        .split(/\s+/)
        .map((w) => w[0])
        .join("")
        .slice(0, 2);
  return { background, initials };
}
