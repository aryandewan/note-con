export type Squad = {
  id: number;
  game: string;
  accent: string;
  vibe: string;
  host: string;
  size: number;
  members: string[];
  time: string;
  ranked: boolean;
};

export type SquadStatus =
  | { kind: "full"; label: string; open: number }
  | { kind: "hot"; label: string; open: number }
  | { kind: "live"; label: string; open: number }
  | { kind: "open"; label: string; open: number };

export function statusOf(s: Squad): SquadStatus {
  const open = s.size - s.members.length;
  if (open <= 0) return { kind: "full", label: "Full", open };
  if (open === 1) return { kind: "hot", label: "1 slot left", open };
  if (s.time === "Now") return { kind: "live", label: "Live now", open };
  return { kind: "open", label: `${open} open`, open };
}
