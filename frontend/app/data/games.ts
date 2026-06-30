export type GameTile = {
  name: string;
  live: number;
  /** Path to the game's logo (served from /public), shown in its original colors. */
  logo: string;
  /**
   * When true the logo art is a single light color (no dark lockup exists), so it
   * is rendered as an ink silhouette via CSS mask to stay legible on the tile.
   */
  tint?: boolean;
};

// Sample tiles only — replaced by real game data from the backend.
export const GAMES: GameTile[] = [
  { name: "Valorant", live: 312, logo: "/games/valorant.svg" },
  { name: "Apex Legends", live: 188, logo: "/games/apex.svg" },
  { name: "Helldivers 2", live: 241, logo: "/games/helldivers.png", tint: true },
  { name: "Marvel Rivals", live: 274, logo: "/games/rivals.svg" },
  { name: "Counter-Strike 2", live: 203, logo: "/games/cs2.svg" },
];
