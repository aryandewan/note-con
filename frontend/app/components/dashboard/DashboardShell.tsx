import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useState } from "react";
import { Link } from "react-router";
import { Avatar } from "~/components/ui/Avatar";
import {
  Bell,
  Bolt,
  Calendar,
  Close,
  Controller,
  Gear,
  Grid,
  LogOut,
  Logo,
  Menu,
  Search,
  Users,
} from "~/components/ui/icons";
import { easeExpo } from "~/lib/motion";

type NavItem = { label: string; icon: typeof Grid; href: string; current?: boolean };

const NAV: NavItem[] = [
  { label: "Lobby", icon: Grid, href: "/dashboard", current: true },
  { label: "My Squads", icon: Users, href: "/dashboard" },
  { label: "Schedule", icon: Calendar, href: "/dashboard" },
  { label: "Games", icon: Controller, href: "/dashboard" },
  { label: "Settings", icon: Gear, href: "/dashboard" },
];

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.href}
      onClick={onNavigate}
      aria-current={item.current ? "page" : undefined}
      className={`flex items-center gap-3 rounded-pebble px-3 py-2.5 font-display text-[0.95rem] font-bold transition-colors ${
        item.current
          ? "bg-primary-tint text-primary-ink"
          : "text-muted hover:bg-surface-2 hover:text-ink"
      }`}
    >
      <Icon size={20} />
      {item.label}
    </Link>
  );
}

/** Sidebar contents, reused by the fixed desktop rail and the mobile drawer. */
function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-line px-5">
        <Logo className="size-8" />
        <span className="font-display text-xl font-black tracking-[-0.03em]">Rally</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV.map((item) => (
          <NavLink key={item.label} item={item} onNavigate={onNavigate} />
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <Link
          to="/"
          onClick={onNavigate}
          className="group flex items-center gap-3 rounded-pebble p-2 transition-colors hover:bg-surface-2"
        >
          <Avatar name="You" you />
          <span className="min-w-0 flex-1">
            <span className="block truncate font-display text-[0.92rem] font-bold text-ink">
              Your account
            </span>
            <span className="block truncate text-[0.8rem] text-muted">@you</span>
          </span>
          <LogOut size={18} className="shrink-0 text-muted transition-colors group-hover:text-ink" />
        </Link>
      </div>
    </>
  );
}

function TopBar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-line bg-bg/85 px-4 backdrop-blur-md sm:gap-3 sm:px-6">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Open navigation"
        className="-ml-1 grid size-9 place-items-center rounded-pebble text-ink transition-colors hover:bg-surface-2 lg:hidden"
      >
        <Menu size={22} />
      </button>

      <label className="relative flex max-w-md flex-1 items-center">
        <Search size={18} className="pointer-events-none absolute left-3 text-muted" />
        <input
          type="search"
          placeholder="Search squads, games, players"
          className="w-full rounded-full border border-line bg-surface py-2 pl-9 pr-4 text-[0.92rem] text-ink placeholder:text-muted/80 transition-[background-color,border-color,box-shadow] duration-200 focus:border-primary focus:bg-bg focus:outline-none focus:ring-4 focus:ring-primary-tint2"
        />
      </label>

      <Link
        to="/dashboard"
        className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 font-display text-[0.92rem] font-bold text-cloud shadow-card transition-colors hover:bg-primary-hover sm:inline-flex"
      >
        <Bolt size={16} /> Host
      </Link>

      <button
        type="button"
        aria-label="Notifications"
        className="relative grid size-9 place-items-center rounded-pebble text-ink transition-colors hover:bg-surface-2"
      >
        <Bell size={20} />
        <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-hot ring-2 ring-bg" />
      </button>

      <Link to="/" aria-label="Your account" className="rounded-full focus-visible:outline-none">
        <Avatar name="You" you />
      </Link>
    </header>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const close = () => setOpen(false);

  return (
    <div className="min-h-svh bg-bg">
      {/* Fixed desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-line bg-surface lg:flex">
        <SidebarBody />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <div className="lg:hidden">
            <motion.div
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              onClick={close}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[82%] flex-col border-r border-line bg-surface"
              initial={reduce ? { opacity: 0 } : { x: "-100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "-100%" }}
              transition={{ duration: reduce ? 0 : 0.28, ease: easeExpo }}
              role="dialog"
              aria-label="Navigation"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close navigation"
                className="absolute right-3 top-4 grid size-9 place-items-center rounded-pebble text-muted transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <Close size={20} />
              </button>
              <SidebarBody onNavigate={close} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="lg:pl-60">
        <TopBar onMenu={() => setOpen(true)} />
        <main>{children}</main>
      </div>
    </div>
  );
}
