/** Deterministic hue (0–359) from a name, for generated avatar gradients. */
export function hashHue(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
}

/** Background gradient + initials for a generated avatar. */
export function avatarFor(name: string, you = false) {
  const h = hashHue(name);
  const background = you
    ? "linear-gradient(135deg, oklch(0.55 0.16 224), oklch(0.62 0.16 250))"
    : `linear-gradient(135deg, oklch(0.66 0.15 ${h}), oklch(0.56 0.16 ${(h + 40) % 360}))`;
  const initials = you
    ? "YOU"
    : name
        .split(/\s+/)
        .map((w) => w[0])
        .join("")
        .slice(0, 2);
  return { background, initials };
}
