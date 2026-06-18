import { useGame } from "../state/store";
import { modeLabel } from "./Table";

export function ScorePanel({ onMenu }: { onMenu: () => void }) {
  const game = useGame((s) => s.game);
  const names = game.settings.playerNames;
  const c = game.contract;

  return (
    <div className="safe-top px-3 pt-2">
      <div className="flex items-center justify-between gap-2 text-sm">
        <TeamScore
          label={`${names[0]} & ${names[2]}`}
          score={game.scores[0]}
          highlight={c ? c.taker % 2 === 0 : false}
        />

        <div className="flex flex-col items-center min-w-0">
          {c ? (
            <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1">
              <span className="text-white/70">Contrat</span>
              <span className="font-bold">
                {c.capot ? "Capot" : c.value}{" "}
                <span className={modeLabel(c.mode).red ? "text-red-400" : ""}>
                  {modeLabel(c.mode).text}
                </span>
              </span>
              {c.coinche > 1 && (
                <span className="rounded bg-orange-500 px-1 text-xs font-bold">
                  {c.coinche === 4 ? "×4" : "×2"}
                </span>
              )}
            </div>
          ) : (
            <div className="rounded-full bg-black/40 px-3 py-1 text-white/70">
              {game.phase === "bidding" ? "Enchères" : "Coincheur"}
            </div>
          )}
          <span className="text-xs text-white/70">jusqu'à {game.settings.targetScore}</span>
        </div>

        <TeamScore
          label={`${names[1]} & ${names[3]}`}
          score={game.scores[1]}
          highlight={c ? c.taker % 2 === 1 : false}
        />

        <button
          onClick={onMenu}
          aria-label="Menu"
          className="ml-1 grid h-11 w-11 place-items-center rounded-full bg-white/15 hover:bg-white/25"
        >
          ⚙️
        </button>
      </div>
    </div>
  );
}

function TeamScore({
  label,
  score,
  highlight,
}: {
  label: string;
  score: number;
  highlight: boolean;
}) {
  return (
    <div
      className={[
        "flex flex-col items-center rounded-lg px-2 py-1 min-w-20",
        highlight ? "bg-yellow-400/20 ring-1 ring-yellow-400/60" : "",
      ].join(" ")}
    >
      <span className="truncate text-[11px] text-white/70 max-w-24">{label}</span>
      <span className="text-lg font-bold tabular-nums">{score}</span>
    </div>
  );
}
