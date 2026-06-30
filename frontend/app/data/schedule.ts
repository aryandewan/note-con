export type ScheduleDay = { name: string; count: number; active?: boolean };
export type ScheduleRow = {
  time: string;
  game: string;
  vibe: string;
  spots: string;
};

export const SCHEDULE_DAYS: ScheduleDay[] = [
  { name: "Tonight", count: 28, active: true },
  { name: "Thu", count: 41 },
  { name: "Fri", count: 96 },
  { name: "Sat", count: 124 },
  { name: "Sun", count: 73 },
];

export const SCHEDULE_ROWS: ScheduleRow[] = [
  { time: "8:00 PM", game: "Rocket League", vibe: "3v3 ranked push", spots: "1 spot" },
  { time: "8:30 PM", game: "Valorant", vibe: "Premier scrim, Plat+", spots: "2 spots" },
  { time: "9:00 PM", game: "Lethal Company", vibe: "Chaotic co-op, no exp needed", spots: "2 spots" },
  { time: "9:45 PM", game: "Helldivers 2", vibe: "Helldive ops, mic up", spots: "1 spot" },
  { time: "10:30 PM", game: "Marvel Rivals", vibe: "Late-night quick play", spots: "3 spots" },
];
