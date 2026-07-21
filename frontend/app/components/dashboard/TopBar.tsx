import { Bell, Bolt, Menu, Search } from "~/components/ui/icons";

/** Sticky top bar: mobile menu toggle, search, notifications, host shortcut. */
export function TopBar({ onMenu, onHost }: { onMenu: () => void; onHost: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-2 border-b border-line bg-bg/85 px-4 backdrop-blur-md sm:gap-3 sm:px-6">
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

      <div className="flex items-center">
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid size-9 place-items-center rounded-pebble text-ink transition-colors hover:bg-surface-2"
        >
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-hot ring-2 ring-bg" />
        </button>
        <button
          type="button"
          onClick={onHost}
          className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 font-display text-[0.92rem] font-bold text-cloud shadow-card transition-colors hover:bg-primary-hover sm:inline-flex"
        >
          <Bolt size={16} /> Host
        </button>
      </div>
    </header>
  );
}
