import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { api } from "~/lib/api";
import {
  Calendar,
  Controller,
  Gear,
  Grid,
  LogOut,
  Logo,
  Users,
} from "~/components/ui/icons";

type NavItem = { label: string; icon: typeof Grid; href: string; end?: boolean };

const NAV: NavItem[] = [
  { label: "Lobby", icon: Grid, href: "/dashboard", end: true },
  { label: "My Squads", icon: Users, href: "/dashboard/squads" },
  { label: "Schedule", icon: Calendar, href: "/dashboard/schedule" },
  { label: "Games", icon: Controller, href: "/dashboard/games" },
  { label: "Settings", icon: Gear, href: "/dashboard/settings" },
];

function SidebarLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.href}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-pebble px-3 py-2.5 font-display text-[0.95rem] font-bold transition-colors ${
          isActive
            ? "bg-primary-tint text-primary-ink"
            : "text-muted hover:bg-surface-2 hover:text-ink"
        }`
      }
    >
      <Icon size={20} />
      {item.label}
    </NavLink>
  );
}

/** Sidebar contents, reused by the fixed desktop rail and the mobile drawer. */
export function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(api("/api/auth/info"), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then(setUser);
  }, []);

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <>
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-line px-5">
        <Logo className="size-8" />
        <span className="font-display text-xl font-black tracking-[-0.03em]">Rally</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV.map((item) => (
          <SidebarLink key={item.label} item={item} onNavigate={onNavigate} />
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <div className="flex items-center gap-3 p-2">
          <span className="min-w-0 flex-1">
            <span className="block truncate font-display text-[0.92rem] font-bold text-ink">
              Your account
            </span>
            <span className="block truncate text-[0.8rem] text-muted">@{user?.username}</span>
          </span>
          <button onClick={onLogout} className="group rounded-pebble p-2 hover:bg-black/10">
            <LogOut
              size={20}
              className="shrink-0 text-muted transition-colors group-hover:text-ink"
            />
          </button>
        </div>
      </div>
    </>
  );
}
