import { create } from "zustand";
import { api } from "~/lib/api"
import type { Notification } from "~/components/dashboard/types";

const token = () => localStorage.getItem("token")
const authHeaders = (t: string) => ({ Authorization: `Bearer ${t}` });

type NotificationState = {
    notifications: Notification[];
    unreadCount: number;
    fetch: () => Promise<void>;
    markAllRead: () => Promise<void>
}

export const useNotificationsStore = create<NotificationState>((set) => ({
    notifications: [],
    unreadCount: 0,

    fetch: async () => {
        const t = token()
        if(!t) return

        const res = await fetch(api("/api/notification"), { headers: authHeaders(t)})
        if(!res.ok) return

        const data = await res.json()
        set({ notifications: data.notifications, unreadCount: data.unreadCount})
    },
    markAllRead: async () => {
        const t = token()
        if(!t) return

        const res = await fetch(api("/api/notification"), {
            method: "PUT",
            headers: authHeaders(t),
        })
        if(!res.ok) return
        
        set((state) => ({
            unreadCount: 0,
            notifications: state.notifications.map((n) => ({
                ...n,
                readAt: new Date().toISOString()
            }))
        }))
    }
}))