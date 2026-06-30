import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { Avatar } from "~/components/ui/Avatar";
import { Meter } from "~/components/ui/Meter";
import { Dot, Pill } from "~/components/ui/Pill";
import { Logo, Plus } from "~/components/ui/icons";

const TRUST = ["Nova R", "Tariq", "Mei L", "Loon", "Echo"];

/* ── Brand panel (left, drenched azure) ───────────────────────── */
function BrandPanel() {
  const reduce = useReducedMotion();
  const float = reduce
    ? undefined
    : { y: [0, -14, 0], transition: { duration: 11, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <aside className="relative hidden overflow-hidden bg-primary text-cloud lg:flex lg:flex-col lg:justify-between lg:p-12">

      <Link
        to="/"
        aria-label="Rally home"
        className="relative inline-flex items-center gap-2.5 font-display text-2xl font-black tracking-[-0.03em]"
      >
        <Logo className="size-[1.9rem]" />
        Rally
      </Link>

      <div className="relative">
        <h2 className="max-w-[15ch] text-[clamp(2.25rem,3.2vw,3.25rem)] font-black leading-[1.05] tracking-[-0.03em] text-balance">
          Your squad is one tap away.
        </h2>
        <p className="mt-4 max-w-[34ch] text-[1.05rem] text-cloud/75">
          Browse open squads filling up live, claim a slot, or host a session — players join until
          you’re full and the game kicks off.
        </p>

        {/* floating live-squad proof card */}
        <motion.div
          animate={float}
          className="mt-9 max-w-[20rem] rounded-card border border-white/15 bg-white/10 p-4 shadow-float backdrop-blur-md"
        >
          <div className="mb-3 flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 font-display text-[0.98rem] font-extrabold">
              <span className="size-2.5 rounded-full bg-g-valorant" />
              Valorant
            </span>
            <span className="ml-auto">
              <Pill variant="live">
                <Dot pulse /> LIVE
              </Pill>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex -space-x-2">
              {["vyn", "Tariq", "Mei L", "Sol"].map((m) => (
                <Avatar key={m} name={m} size="sm" />
              ))}
              <span className="grid size-7 place-items-center rounded-full border-2 border-dashed border-live-strong bg-live-tint text-live-ink">
                <Plus size={12} />
              </span>
            </span>
            <span className="ml-auto font-display text-[0.95rem] font-extrabold tabular-nums">
              4<span className="text-cloud/60">/5</span>
            </span>
          </div>
          <Meter pct={80} />
        </motion.div>
      </div>

      <div className="relative flex items-center gap-3.5 text-[0.95rem] text-cloud/75">
        <span className="flex -space-x-2">
          {TRUST.map((m) => (
            <Avatar key={m} name={m} />
          ))}
        </span>
        <span>
          <b className="text-cloud">6,213</b> players online right now
        </span>
      </div>
    </aside>
  );
}

/* ── Form-side primitives ─────────────────────────────────────── */
export function Field({
  label,
  name,
  type = "text",
  autoComplete,
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-[0.92rem] font-bold text-ink">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-pebble border border-line-strong bg-bg px-4 py-3 text-[1rem] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary-tint2"
      />
    </label>
  );
}

export function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3.5 py-1">
      <span className="h-px flex-1 bg-line" />
      <span className="text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-muted">
        {children}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

const DiscordIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.3 5.4A18 18 0 0 0 14.9 4l-.2.4a16 16 0 0 1 3.9 1.3 14 14 0 0 0-13.3 0A16 16 0 0 1 9.3 4.4L9 4a18 18 0 0 0-4.4 1.4C1.8 9.6 1 13.7 1.4 17.7a18 18 0 0 0 5.5 2.8l.7-1.2c-.7-.3-1.4-.6-2-1l.5-.4a13 13 0 0 0 11 0l.5.4c-.6.4-1.3.7-2 1l.7 1.2a18 18 0 0 0 5.5-2.8c.5-4.6-.8-8.7-3.2-12.3ZM8.6 15.3c-1 0-1.9-1-1.9-2.2 0-1.2.8-2.2 1.9-2.2s2 1 1.9 2.2c0 1.2-.8 2.2-1.9 2.2Zm6.8 0c-1 0-1.9-1-1.9-2.2 0-1.2.8-2.2 1.9-2.2s2 1 1.9 2.2c0 1.2-.8 2.2-1.9 2.2Z" />
  </svg>
);
const GoogleIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M21.6 12.2c0-.6-.1-1.3-.2-1.9H12v3.6h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.2Z" />
    <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.7-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" />
    <path fill="#FBBC05" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9l3.3-2.6Z" />
    <path fill="#EA4335" d="M12 5.8c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.5 9.4 5.8 12 5.8Z" />
  </svg>
);
const SteamIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-9.9 8.8l5.3 2.2a2.8 2.8 0 0 1 1.6-.5h.2l2.4-3.4v-.1a3.8 3.8 0 1 1 3.8 3.8h-.1l-3.4 2.4v.2a2.8 2.8 0 0 1-5.6.2l-3.8-1.6A10 10 0 1 0 12 2ZM8.7 17.2l-1.2-.5a2.1 2.1 0 0 0 3.9-.6 2.1 2.1 0 0 0-2.8-2l1.3.5a1.6 1.6 0 1 1-1.2 2.9v-.3Zm9-7.7a2.5 2.5 0 1 1-2.5-2.5 2.5 2.5 0 0 1 2.5 2.5Zm-4.3 0a1.9 1.9 0 1 0 1.9-1.9 1.9 1.9 0 0 0-1.9 1.9Z" />
  </svg>
);

const PROVIDERS = [
  { label: "Discord", Icon: DiscordIcon },
  { label: "Google", Icon: GoogleIcon },
  { label: "Steam", Icon: SteamIcon },
];

export function SocialRow() {
  const reduce = useReducedMotion();
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {PROVIDERS.map(({ label, Icon }) => (
        <motion.button
          key={label}
          type="button"
          aria-label={`Continue with ${label}`}
          whileTap={reduce ? undefined : { scale: 0.97 }}
          whileHover={reduce ? undefined : { y: -1 }}
          className="inline-flex items-center justify-center gap-2 rounded-pebble border border-line-strong bg-bg py-3 font-display text-[0.92rem] font-bold text-ink transition-colors hover:border-ink hover:bg-surface"
        >
          <Icon />
          <span className="hidden sm:inline">{label}</span>
        </motion.button>
      ))}
    </div>
  );
}

/* ── Shell ────────────────────────────────────────────────────── */
export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="grid min-h-svh lg:grid-cols-[1.05fr_1fr]">
      <BrandPanel />

      <section className="flex min-h-svh flex-col px-6 py-8 sm:px-10 lg:px-14 lg:py-10">
        <Link
          to="/"
          aria-label="Rally home"
          className="inline-flex items-center gap-2.5 self-start font-display text-2xl font-black tracking-[-0.03em] text-ink lg:hidden"
        >
          <Logo className="size-[1.9rem]" />
          Rally
        </Link>

        <div className="flex flex-1 flex-col justify-center py-10">
          <div className="mx-auto w-full max-w-100">
            <h1 className="text-[clamp(1.9rem,4vw,2.5rem)] font-black tracking-[-0.03em]">{title}</h1>
            <p className="mt-2.5 text-[1.05rem] text-muted">{subtitle}</p>

            <div className="mt-8">{children}</div>

            <p className="mt-7 text-center text-[0.95rem] text-muted">{footer}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
