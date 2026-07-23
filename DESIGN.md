# Design

## Overview

Rally's public/marketing surface (home page, header, footer, sign-in/sign-up) reads as a **Gaming SaaS**: the restraint and craft of a serious product (Linear/Stripe-grade) applied to an LFG/squad-matchmaking product, without borrowing gaming's usual visual noise. One brand color (azure), black, white, and that brand color's own tints/shades carry the entire surface — no lime "live" green, no coral "hot" orange, no per-game accent hues, no icon glyphs, no glow/neon effects on these surfaces.

The dashboard (authenticated app area under `/dashboard`) is a **separate design scope** and keeps its existing signal-color vocabulary (`--color-live`, `--color-hot`, `--color-g-*`) for real operational state (a squad really is "1 slot left" or "live now") — those tokens remain defined in `app.css` for that surface. Do not port marketing's restraint back onto dashboard call sites, and do not port dashboard's signal colors onto marketing call sites; they are different registers by deliberate choice.

## Color Palette

Defined in `frontend/app/app.css` under `@theme`. Marketing surfaces use only this subset:

- **Neutrals**: `--color-bg` (white), `--color-surface` / `--color-surface-2` (near-white grays for panel backgrounds), `--color-line` / `--color-line-strong` (borders), `--color-ink` (near-black text), `--color-muted` (mid-gray secondary text), `--color-cloud` (white, for text/icons on dark or brand-color backgrounds).
- **Brand (azure)** — the one accent, used only for primary actions, current-state emphasis, and small live/selection indicators:
  - `--color-primary` — the accent itself.
  - `--color-primary-hover` — dark variant (button hover, "you" emphasis, ink-adjacent dark surfaces).
  - `--color-primary-ink` — dark variant tuned for text-on-light (kickers, links).
  - `--color-primary-tint` / `--color-primary-tint2` — light variants (chip/badge backgrounds, focus rings, "open slot" placeholders).
- **Explicitly not used on marketing surfaces**: `--color-live*`, `--color-hot*`, `--color-g-*` (per-game hues). These remain in the token file for the dashboard only.

Color strategy is **Restrained**: white/near-white body, black ink text, one blue accent for actions and live-state emphasis. `Stats` and `Cta` are the two sections allowed to go **Committed** (full-bleed `bg-primary` and `bg-ink` panels respectively) — everywhere else stays neutral-first.

## Typography

- Display: `Gabarito` (headings, buttons, labels, numerals) — unchanged.
- Body: `Hanken Grotesk` — unchanged.
- Marketing headings keep the fluid `clamp()` scale (this is still a landing page, not dense app UI); ceiling stays ≤ ~5.25rem, letter-spacing floor ≥ -0.035em.

## Iconography

**No icon glyphs on marketing surfaces.** Every previous `~/components/ui/icons` usage (`Bolt`, `Controller`, `Sliders`, `Clock`, `Arrow`, `Check`, `Plus`, `Users`) has been removed from Hero, Header, Footer, HowItWorks, Ticker, Games, Schedule, Stats, Cta, and Faq. Where an icon signified state (accordion open/closed, an open-slot placeholder, a directional cue), it's replaced by a plain typographic glyph (a text `+`, `→`, or nothing) or by motion/color alone — never an SVG icon component.

Two narrow, deliberate exceptions, both third-party identity marks rather than decorative UI icons:
- Game logos in `Games.tsx` (official third-party marks — the content itself, not decoration).
- OAuth provider marks (Discord/Google/Steam) in `AuthLayout`'s `SocialRow` — standard, expected affordance for recognizing a sign-in method.

The brand `Logo` mark itself is not a "UI icon" — it's the identity mark and stays, recolored off the lime accent onto pure brand + white.

The dashboard is unaffected: it keeps its full icon set (`Bell`, `Menu`, `Search`, `Gear`, `Controller`, `Bolt`, `Close`, etc.).

## Layout — Hero

Single centered column (SaaS-hero convention), no side-by-side live board. Order: live/online badge → headline → subhead → CTA row → trust row (avatars + fill-time line). Max width keeps line lengths sane; everything center-aligned on all breakpoints.

## Components

- **Button** (`ui/Button.tsx`): `primary` (brand fill, light backgrounds), `ghost` (bordered, light backgrounds), `ghost-light` (bordered, dark backgrounds), `inverse` (white fill + ink text — the strong CTA on a dark/`bg-ink` panel, replacing the old `lime` variant).
- **Pill** (`ui/Pill.tsx`): `solid` (brand fill), `outline` (bordered neutral), `muted` (subdued gray) — replacing the old `live`/`open`/`hot`/`full` signal variants on marketing surfaces.
- **Dot** (`ui/Pill.tsx`): unchanged mechanism (expanding pulse ring), recolored via the wrapping text color to `text-primary` wherever it appears on marketing surfaces (was `text-live`).
- **Meter** (`ui/Meter.tsx`): single solid `bg-primary` fill bar. Dropped the `hot` coral gradient prop (no marketing call site needs it).
- **Avatar** (`ui/Avatar.tsx`): flat solid tone, no hash-hue rainbow gradients. Cycles through neutral tones (ink / dark gray / mid gray) for other players; the current user (`you`) is always solid `primary` — the one place avatar color intentionally carries meaning ("you" = the accent).
- **"Open slot" placeholder circles** (dashed border + `+`): consistently `border-primary-tint2 · bg-primary-tint · text-primary-ink` everywhere they appear (was `border-live-strong · bg-live-tint · text-live-ink`).

## Motion

- Reveal-on-scroll and hover/tap micro-interactions unchanged (`motion/react`, `easeExpo`, `useReducedMotion()` guards everywhere).
- Removed: the two blurred glow orbs behind the `Cta` panel (`blur-[60px]` radial gradients in azure/lime) — glow effects are banned on this surface. The panel is a flat `bg-ink` with the same quiet dot-grid texture as `Stats` (no blur).
- Kept: the live-fill pulse ring in `Cta`'s `LiveFill`, recolored from lime to `primary` — it signals real state (a slot just filled), which is allowed under "motion conveys state, not decoration."

## Accessibility

WCAG AA floor: body text ≥4.5:1, large/display text ≥3:1. `bg-primary` panels (`Stats`) use white/near-white text, verified for contrast. All motion respects `prefers-reduced-motion` via the existing `useReducedMotion()` / `useReveal()` pattern — no exceptions introduced by this redesign.
