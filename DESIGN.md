# Design

## Theme

Bright social arena. Light-only, crisp near-white surface with bold color
carried by the brand — azure-blue primary, electric-lime "live/open" signal,
coral urgency. Rounded, energetic, alive. Deliberately not dark-neon-esports.
Color strategy: **Committed** (azure + lime do the work; coral is a sparing
urgency signal).

## Color (OKLCH)

| Token | Value | Use |
|---|---|---|
| `--bg` | `oklch(0.992 0.004 224)` | base surface, crisp bright white w/ faint cool |
| `--surface` | `oklch(0.972 0.006 224)` | cards, panels |
| `--surface-2` | `oklch(0.945 0.009 224)` | wells, insets |
| `--line` | `oklch(0.90 0.012 224)` | borders, dividers |
| `--ink` | `oklch(0.22 0.03 232)` | body / headings (≥7:1 on bg) |
| `--muted` | `oklch(0.50 0.022 230)` | secondary text (≥4.5:1 on bg) |
| `--primary` | `oklch(0.52 0.155 224)` | brand azure — CTAs, hero band; white text |
| `--primary-ink` | `oklch(0.40 0.13 226)` | blue text on light, hover |
| `--primary-tint` | `oklch(0.95 0.03 224)` | light blue wash |
| `--live` (lime) | `oklch(0.86 0.19 128)` | live/open-slot signal; dark text on fill |
| `--live-ink` | `oklch(0.46 0.12 132)` | lime-toned text on light |
| `--hot` (coral) | `oklch(0.66 0.19 32)` | "last slot" urgency; white text on fill |

Text-on-color: white on `--primary`/`--hot` fills; `--ink` on `--live` fills.

## Typography

- **Display:** Gabarito (rounded high-impact grotesque), weights 600–900.
  Headlines, wordmark, big numbers. `text-wrap: balance`, letter-spacing
  ~-0.02em, never below -0.04em.
- **Body / UI:** Hanken Grotesk (warm humanist grotesque), 400–700. Body,
  labels, copy. Measure capped ~64ch. Tabular figures for slot counts/times.
- Pairing axis: geometric-rounded display vs humanist text. Fluid `clamp()`
  scale, ratio ≥1.25; hero max ≤ 6rem.

## Components

- **Squad card:** game label + accent dot, vibe line, host, avatar stack with
  filled members + open-slot pips, `n/m` fraction, animated fill meter,
  status pill (LIVE / open / 1 left), Join button.
- **Avatar:** deterministic gradient circle + initials (no external images).
- **Pills:** fully rounded status/tag chips. LIVE = lime, urgency = coral.
- **Buttons:** pill-shaped; primary = azure fill + white; secondary = outline.
- **Activity ticker:** horizontal marquee of recently-filled squads.
- **Step flow:** real 3-step ordered sequence (numbers earn their place).
- **Game tiles:** bold typographic tiles with per-game accent + live count
  (not copyrighted box art).
- **Icons:** one hand-rolled inline-SVG set; no icon dependency.

## Layout

- Centered container ~1180px, fluid `clamp()` gutters and section rhythm.
- Hero: copy + live squad board side by side (stacks on mobile).
- Grids: `repeat(auto-fit, minmax(...))`, breakpoint-free where possible.
- Semantic z-index scale (sticky-nav → ticker → modal → toast → tooltip).

## Motion

- CSS-driven, no motion library. Fill meters animate width on first view;
  live dot pulse; count-ups via rAF (SSR renders final value); activity ticker
  marquee (pauses on hover); subtle staggered section reveals from a
  JS-gated hidden state with a load failsafe so content never stays blank.
- Easing: ease-out (quart/expo). No bounce.
- `prefers-reduced-motion`: meters/counts show final value, ticker static,
  reveals off.
</content>
