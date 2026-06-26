import type { Squad } from "~/lib/squad";

/** Squads shown in the hero board on first load. */
export const HERO_SEED: Squad[] = [
  {
    id: 1,
    game: "Helldivers 2",
    accent: "var(--color-g-helldivers)",
    vibe: "Helldive difficulty · mic up, we’re spreading democracy",
    host: "Kestrel",
    size: 4,
    members: ["Kestrel", "Nova R"],
    time: "9:30 PM",
    ranked: false,
  },
  {
    id: 2,
    game: "Valorant",
    accent: "var(--color-g-valorant)",
    vibe: "Ranked · Diamond+ · comms required, no rage",
    host: "vyn",
    size: 5,
    members: ["vyn", "Tariq", "Mei L", "Sol"],
    time: "Now",
    ranked: true,
  },
  {
    id: 3,
    game: "Marvel Rivals",
    accent: "var(--color-g-rivals)",
    vibe: "Quick play · anyone welcome, learning heroes",
    host: "PixelMoth",
    size: 6,
    members: ["PixelMoth", "Dee"],
    time: "10:00 PM",
    ranked: false,
  },
];

/** Fresh squads rotated in as others fill up. */
export const NEXT_POOL: Omit<Squad, "id">[] = [
  {
    game: "Apex Legends",
    accent: "var(--color-g-apex)",
    vibe: "Trios · just vibing, drop hot",
    host: "Loon",
    size: 3,
    members: ["Loon"],
    time: "Now",
    ranked: false,
  },
  {
    game: "Deep Rock Galactic",
    accent: "var(--color-g-drg)",
    vibe: "Haz 5 · Rock and Stone, beers welcome",
    host: "Greybeard",
    size: 4,
    members: ["Greybeard", "Mol"],
    time: "Now",
    ranked: false,
  },
  {
    game: "Overwatch 2",
    accent: "var(--color-g-overwatch)",
    vibe: "Comp · flex players, climbing to Plat",
    host: "Echo",
    size: 5,
    members: ["Echo", "Juno", "Rhe"],
    time: "Now",
    ranked: true,
  },
  {
    game: "Counter-Strike 2",
    accent: "var(--color-g-cs2)",
    vibe: "Premier · need an entry, chill comms",
    host: "Frost",
    size: 5,
    members: ["Frost", "Ace", "Ka", "Ven"],
    time: "Now",
    ranked: true,
  },
];

/** Names used when the live simulation fills a slot. */
export const FILLERS = ["Ash", "Koi", "Bex", "Ty", "Wren"];
