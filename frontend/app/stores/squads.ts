import { create } from "zustand";
import { api } from "~/lib/api";
import type { Squad } from "~/components/dashboard/types";
import { useNotificationsStore } from "./notifications";

const token = () => localStorage.getItem("token");
const authHeaders = (t: string) => ({ Authorization: `Bearer ${t}` });

/** Raw session objects from the API, in either endpoint's shape. */
type RawSession = {
  id: string;
  game: string;
  slots: number;
  createdBy: string;
  members?: unknown[];
  _count?: { members: number };
};

/** Normalize a session from either endpoint into a Squad the UI can render. */
function toSquad(s: RawSession): Squad {
  return {
    id: s.id,
    game: s.game,
    slots: s.slots,
    createdBy: s.createdBy,
    // /session returns the members array; /browse returns _count.members.
    filled: Array.isArray(s.members) ? s.members.length : s._count?.members ?? 0,
  };
}

type SquadsState = {
  mySquads: Squad[];
  openSquads: Squad[];
  joiningId: string | null;
  error: string | null;

  /** Sessions I'm already in. */
  fetchMine: () => Promise<void>;
  /** Sessions I could join. */
  fetchOpen: () => Promise<void>;
  /** Join an open squad; moves it from openSquads into mySquads. */
  join: (sessionId: string) => Promise<void>;
};

export const useSquadsStore = create<SquadsState>((set) => ({
  mySquads: [],
  openSquads: [],
  joiningId: null,
  error: null,

  fetchMine: async () => {
    const t = token();
    if (!t) return;
    const res = await fetch(api("/api/session"), { headers: authHeaders(t) });
    const data: RawSession[] = res.ok ? await res.json() : [];
    set({ mySquads: data.map(toSquad) });
  },

  fetchOpen: async () => {
    const t = token();
    if (!t) return;
    const res = await fetch(api("/api/session/browse"), { headers: authHeaders(t) });
    const data: RawSession[] = res.ok ? await res.json() : [];
    set({ openSquads: data.map(toSquad) });
  },

  join: async (sessionId) => {
    const t = token();
    if (!t) return;
    set({ joiningId: sessionId, error: null });
    try {
      const res = await fetch(api("/api/session/join"), {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders(t) },
        body: JSON.stringify({ sessionId }),
      });
      if (!res.ok) throw new Error("join failed");
      const joined = toSquad(await res.json());
      set((state) => ({
        openSquads: state.openSquads.filter((s) => s.id !== sessionId),
        // Replace-or-add, so a re-join can't duplicate the card.
        mySquads: [...state.mySquads.filter((s) => s.id !== joined.id), joined],
        joiningId: null,
      }));
      // The server just wrote a "you joined" notification — pick it up now
      // instead of waiting for the bell's next poll.
      useNotificationsStore.getState().fetch();
    } catch {
      set({ error: "Could not join that squad. Try again.", joiningId: null });
    }
  },
}));
