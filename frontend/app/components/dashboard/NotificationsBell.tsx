import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Bell } from "~/components/ui/icons";
import type { Notification } from "~/components/dashboard/types";
import { easeExpo } from "~/lib/motion";
import { useNotificationsStore } from "~/stores/notifications";

/** How often we re-check for new notifications while the tab is visible. */
const POLL_MS = 30_000;

/** One sentence per notification kind. Keeps wording in one place. */
const MESSAGE: Record<Notification["type"], (game: string) => string> = {
  SQUAD_CREATED: (game) => `Your ${game} squad is live`,
  SQUAD_JOINED: (game) => `You joined a ${game} squad`,
  MEMBER_JOINED: (game) => `Someone claimed a slot in your ${game} squad`,
};

/** Compact "how long ago" label — 45s → "just now", 3h → "3h ago". */
function timeAgo(iso: string) {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function NotificationRow({ item, isNew }: { item: Notification; isNew: boolean }) {
  const game = item.session?.game ?? "your";
  const write = MESSAGE[item.type];

  return (
    <li className={`flex gap-3 px-4 py-3 ${isNew ? "bg-primary-tint/60" : ""}`}>
      <span
        aria-hidden="true"
        className={`mt-1.5 size-2 shrink-0 rounded-full ${isNew ? "bg-primary" : "bg-transparent"}`}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9rem] text-ink text-pretty">
          {write ? write(game) : `Update on your ${game} squad`}
          {isNew && <span className="sr-only"> (unread)</span>}
        </span>
        <time
          dateTime={item.createdAt}
          className="mt-0.5 block text-[0.78rem] tabular-nums text-muted"
        >
          {timeAgo(item.createdAt)}
        </time>
      </span>
    </li>
  );
}

/** Bell button with an unread count and a dropdown of recent notifications. */
export function NotificationsBell() {
  const notifications = useNotificationsStore((s) => s.notifications);
  const unreadCount = useNotificationsStore((s) => s.unreadCount);
  const load = useNotificationsStore((s) => s.fetch);
  const markAllRead = useNotificationsStore((s) => s.markAllRead);

  const [open, setOpen] = useState(false);
  /** Ids that were unread when the panel opened — they stay highlighted while it's open. */
  const [justRead, setJustRead] = useState<Set<string>>(new Set());
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Load once, then keep checking while the tab is actually being looked at.
  // Coming back to the tab refreshes straight away rather than waiting out the timer.
  useEffect(() => {
    load();
    const id = setInterval(() => {
      if (!document.hidden) load();
    }, POLL_MS);
    const onVisible = () => {
      if (!document.hidden) load();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [load]);

  // Click outside / Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => {
    if (open) {
      setOpen(false);
      return;
    }
    // Remember what was new before clearing the badge, so the list still shows it.
    setJustRead(new Set(notifications.filter((n) => !n.readAt).map((n) => n.id)));
    setOpen(true);
    if (unreadCount > 0) markAllRead();
  };

  const newCount = justRead.size;

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="notifications-panel"
        aria-label={
          unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"
        }
        className="relative grid size-9 cursor-pointer place-items-center rounded-pebble text-ink transition-colors hover:bg-surface-2"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -top-0.5 grid h-[1.15rem] min-w-[1.15rem] place-items-center rounded-full bg-hot px-1 font-display text-[0.7rem] font-bold leading-none text-cloud ring-2 ring-bg"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="notifications-panel"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.99 }}
            transition={{ duration: reduce ? 0.12 : 0.2, ease: easeExpo }}
            className="absolute right-0 top-[calc(100%+0.5rem)] z-40 w-[min(21rem,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-card border border-line bg-bg shadow-float"
          >
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <h2 className="font-display text-[0.95rem] font-extrabold text-ink">
                Notifications
              </h2>
              {newCount > 0 && (
                <span className="font-display text-[0.78rem] font-bold text-primary-ink">
                  {newCount} new
                </span>
              )}
            </div>

            {notifications.length > 0 ? (
              <ul className="max-h-96 divide-y divide-line overflow-y-auto">
                {notifications.map((n) => (
                  <NotificationRow key={n.id} item={n} isNew={justRead.has(n.id)} />
                ))}
              </ul>
            ) : (
              <p className="px-4 py-8 text-center text-[0.88rem] text-muted text-pretty">
                Nothing yet. Host or join a squad and updates will show up here.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
