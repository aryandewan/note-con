import { useEffect } from "react";
import { Link } from "react-router";
import { DashboardHeader } from "~/components/dashboard/DashboardHeader";
import { useHostSession } from "~/components/dashboard/DashboardShell";
import { GAMES, type GameTile } from "~/data/games";
import { useSquadsStore } from "~/stores/squads";
import type { Route } from "./+types/dashboard.games";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Games — Rally" },
    { name: "description", content: "Every game Rally supports, with live open-squad counts." },
  ];
}

function GameCard({ game, openCount }: { game: GameTile; openCount: number }) {
  const openHost = useHostSession();
  return (
    <section className="flex flex-col rounded-card border border-line bg-bg">
      <div className="grid h-36 place-items-center rounded-3xl border-b border-line bg-surface p-6">
        {game.tint ? (
          <span
            role="img"
            aria-label={`${game.name} logo`}
            style={{ WebkitMaskImage: `url(${game.logo})`, maskImage: `url(${game.logo})` }}
            className="h-12 w-[70%] bg-ink mask-center mask-no-repeat mask-contain [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
          />
        ) : (
          <img
            src={game.logo}
            alt={`${game.name} logo`}
            loading="lazy"
            className="max-h-14 w-auto max-w-[70%] object-contain"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h2 className="font-display text-[1.05rem] font-extrabold text-ink">{game.name}</h2>
          <p className="mt-0.5 text-[0.85rem] text-muted">Squads of up to {game.maxSlots}</p>
        </div>

        <p className="text-[0.9rem] font-semibold text-muted">
          {openCount > 0 ? (
            <>
              <span className="font-display text-ink tabular-nums">{openCount}</span>{" "}
              {openCount === 1 ? "open squad" : "open squads"} right now
            </>
          ) : (
            "No open squads right now"
          )}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => openHost(game.name)}
            className="inline-flex cursor-pointer items-center rounded-full bg-primary px-4 py-2 font-display text-[0.9rem] font-bold text-cloud shadow-card transition-colors hover:bg-primary-hover"
          >
            Host
          </button>
          {openCount > 0 && (
            <Link
              to="/dashboard"
              className="inline-flex items-center rounded-full bg-primary-tint px-4 py-2 font-display text-[0.9rem] font-bold text-primary-ink transition-colors hover:bg-primary-tint2"
            >
              See squads
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Games() {
  const openSquads = useSquadsStore((s) => s.openSquads);
  const fetchOpen = useSquadsStore((s) => s.fetchOpen);

  useEffect(() => {
    fetchOpen();
  }, [fetchOpen]);

  const countFor = (name: string) =>
    openSquads.filter((s) => s.game.toLowerCase() === name.toLowerCase()).length;

  return (
    <>
      <DashboardHeader
        title="Games"
        subtitle="Every game Rally supports — host a session or jump into what’s already forming."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {GAMES.map((game) => (
          <GameCard key={game.name} game={game} openCount={countFor(game.name)} />
        ))}
      </div>
    </>
  );
}
