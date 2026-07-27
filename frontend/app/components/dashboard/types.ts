/** A squad card's data, normalized so it doesn't matter which endpoint it came from. */
export type Squad = {
  id: string;
  game: string;
  slots: number;
  createdBy: string;
  /** How many slots are currently taken (members in the session). */
  filled: number;
};


export type Notification = {
  id: string,
  type: "SQUAD_CREATED" | "SQUAD_JOINED" | "MEMBER_JOINED",
  readAt: string | null,
  createdAt: string,
  session: { id: string; game: string}
}