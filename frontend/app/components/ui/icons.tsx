/** One hand-rolled icon set — stroke icons share `base`, fills are explicit. */
export type IconProps = { size?: number; className?: string };

const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const Bolt = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" fill="currentColor" stroke="none" />
  </svg>
);
export const Clock = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const Users = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
    <circle cx="9" cy="7" r="3" />
    <path d="M22 19v-1a4 4 0 0 0-3-3.87M16 4.13A4 4 0 0 1 16 12" />
  </svg>
);
export const Arrow = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const Plus = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Check = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
export const Controller = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01" />
    <path d="M17.5 5h-11A4.5 4.5 0 0 0 2 9.5L1 16a3 3 0 0 0 5.4 1.8L8 16h8l1.6 1.8A3 3 0 0 0 23 16l-1-6.5A4.5 4.5 0 0 0 17.5 5Z" />
  </svg>
);
export const Sliders = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M20 18h0" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="8" cy="12" r="2" />
    <circle cx="18" cy="18" r="2" />
  </svg>
);
export const Menu = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const Close = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Grid = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
  </svg>
);
export const Calendar = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="4.5" width="18" height="16.5" rx="2.5" />
    <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
  </svg>
);
export const Gear = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 13a1.65 1.65 0 0 0 .33 1.82l.05.05a2 2 0 1 1-2.83 2.83l-.05-.05a1.65 1.65 0 0 0-2.81 1.17V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 7.9 19.4a1.65 1.65 0 0 0-1.82.33l-.05.05a2 2 0 1 1-2.83-2.83l.05-.05A1.65 1.65 0 0 0 3.6 14.1a1.65 1.65 0 0 0-1.6-1.1H2a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 3.6 7.9a1.65 1.65 0 0 0-.33-1.82l-.05-.05a2 2 0 1 1 2.83-2.83l.05.05A1.65 1.65 0 0 0 7.9 3.6 1.65 1.65 0 0 0 9 2v-.09a2 2 0 1 1 4 0V2a1.65 1.65 0 0 0 1.1 1.6 1.65 1.65 0 0 0 1.82-.33l.05-.05a2 2 0 1 1 2.83 2.83l-.05.05a1.65 1.65 0 0 0-.33 1.82V8a1.65 1.65 0 0 0 1.5 1H22a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
export const Search = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);
export const Bell = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
export const LogOut = ({ size, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5M21 12H9" />
  </svg>
);

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="10" fill="var(--color-primary)" />
      <circle cx="13" cy="14" r="3.4" fill="var(--color-cloud)" />
      <circle cx="23" cy="14" r="3.4" fill="var(--color-cloud)" />
      <path
        d="M9 25c1.6-3 4.6-4.6 9-4.6s7.4 1.6 9 4.6"
        stroke="var(--color-cloud)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
