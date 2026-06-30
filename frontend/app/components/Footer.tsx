import { Container } from "~/components/ui/Container";
import { Bolt, Controller, Logo, Users } from "~/components/ui/icons";

const COLS: { title: string; links: string[] }[] = [
  { title: "Product", links: ["Open squads", "How it works", "Schedule", "Rally Plus", "Download app"] },
  { title: "Games", links: ["Valorant", "Helldivers 2", "Marvel Rivals", "Apex Legends", "All 80+ games"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Press kit", "Contact"] },
];

export function Footer() {
  return (
    <footer className="border-t border-line pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[clamp(3rem,6vw,4.5rem)]">
      <Container>
        <div className="mb-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)] lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="inline-flex items-center gap-2.5 font-display text-2xl font-black tracking-[-0.03em] text-ink">
              <Logo className="size-[1.9rem]" />
              Rally
            </span>
            <p className="mt-4 max-w-[28ch] text-[0.98rem] text-muted">
              Find your squad. Tonight. The fastest way to a full lobby, on every game you play.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-display text-[0.95rem] font-extrabold">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[0.95rem] text-muted transition-colors hover:text-ink">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-7 text-[0.9rem] text-muted">
          <span>© {new Date().getFullYear()} Rally Labs · Privacy · Terms</span>
          <div className="flex gap-2.5">
            {[
              { icon: Controller, label: "Rally on Discord" },
              { icon: Bolt, label: "Rally on X" },
              { icon: Users, label: "Rally on Twitch" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full border border-line text-muted transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
