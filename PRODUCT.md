# Product

## Register

product

## Users

Gamers looking to fill out a squad for tonight's session, and hosts who want to open a session and let the right players claim slots. Context is mid-session or pre-session on desktop/mobile, often multitasking with a game client or Discord open — they need to scan open squads and commit fast, not browse a brochure. Rally is the coordination layer, not the entertainment; it should get out of the way.

## Product Purpose

Rally is an LFG (looking-for-group) matchmaking tool: browse open squads filling live, claim a slot, or host a session and let players join until it's full. Success is a full lobby in minutes, not a beautifully-marketed idea of one. Even the public homepage should read as the product's own front door — a tool a serious squad would trust — rather than a separate marketing "campaign" layer bolted on top.

## Brand Personality

Calm, premium, minimal. A "Gaming SaaS" — the confidence and restraint of a serious SaaS product (Linear/Stripe-grade craft), applied to a gaming context without borrowing gaming's usual visual language (neon, glow, per-game color chaos, icon soup). Quiet, precise, trustworthy. Still unmistakably built for gamers in its copy and content — never generic corporate-SaaS filler.

## Anti-references

- **Neon/RGB gaming aesthetics** — Discord-core, esports HUD overlays, glow/neon effects, per-game accent-color chips. This is the look being explicitly moved away from.
- **Generic templated SaaS** — the cookie-cutter AI-generated look: gradient text, tiny uppercase eyebrows above every section, numbered 01/02/03 scaffolding, identical icon+heading+text card grids, hero-metric clichés. Calm and minimal must not collapse into "looks like every other SaaS site."
- No icon usage in the redesigned surfaces. No glow. No neon.

## Design Principles

- **Restraint over spectacle.** The brand color (azure) plus black and white plus its own tints/shades do all the work — no lime/coral/per-game signal colors, no decoration for decoration's sake.
- **Familiar over novel.** Reach for proven, well-tuned product/SaaS patterns executed with real craft, not gamer-flourish or invented affordances.
- **Motion communicates state, not showmanship.** Reveals and feedback only; no orchestrated glow/pulse choreography. Always respect `prefers-reduced-motion`.
- **One visual vocabulary, screen to screen.** Buttons, panels, and type treatments stay consistent rather than each section reinventing its own style.
- **Copy stays gamer-specific.** The restraint is visual, not verbal — squads, lobbies, hosting, and games are still named plainly; don't launder the product into generic B2B SaaS language.

## Accessibility & Inclusion

WCAG AA as the floor: body text ≥4.5:1 contrast, large/display text ≥3:1. All motion must have a `prefers-reduced-motion` fallback (the codebase already does this via `useReducedMotion()` in `motion/react` — keep that pattern for any new motion).
