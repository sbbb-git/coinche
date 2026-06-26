import { useGame } from "../state/store";
import { useT } from "../i18n";
import { modeLabel } from "./Table";
import { suitColorClassDark } from "./Card";
import { GameState } from "../engine/game";
import { points } from "../engine/cards";
import { Team } from "../engine/scoring";

/** Points « ramassés » par chaque équipe dans la manche en cours (plis joués). */
function dealCardPoints(game: GameState): [number, number] {
  const res: [number, number] = [0, 0];
  const mode = game.contract?.mode;
  if (!mode) return res;
  for (const t of game.completedTricks) {
    let p = 0;
    for (const card of t.cards) p += points(card, mode);
    res[t.winnerTeam] += p;
  }
  // 10 de der une fois la donne terminée (8 plis joués).
  if (game.completedTricks.length === 8) {
    res[game.completedTricks[7].winnerTeam] += 10;
  }
  return res;
}

export function ScorePanel({ onMenu, onHome }: { onMenu: () => void; onHome: () => void }) {
  const t = useT();
  const game = useGame((s) => s.game);
  const names = game.settings.playerNames;
  const c = game.contract;
  const hideScores =
    !game.settings.showLiveScores && (game.phase === "playing" || game.phase === "bidding");
  const showDeal = !!c && !hideScores && (game.phase === "playing" || game.phase === "dealScored");
  const dealPts = showDeal ? dealCardPoints(game) : null;

  return (
    <div className="safe-top px-3 pt-2">
      <div className="flex items-center justify-between gap-1 text-sm">
        <button
          onClick={onHome}
          aria-label={t("score.home")}
          className="grid h-11 w-11 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
        >
          ←
        </button>
        <TeamScore
          label={`${names[0]} & ${names[2]}`}
          score={game.scores[0]}
          hidden={hideScores}
          highlight={c ? c.taker % 2 === 0 : false}
        />

        <div className="flex flex-col items-center min-w-0">
          {c ? (
            <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1">
              <span className="text-white/70">{t("score.contract")}</span>
              <span className="font-bold">
                {c.generale ? t("score.generale") : c.capot ? t("score.capot") : c.value}{" "}
                <span
                  className={
                    modeLabel(c.mode).suit
                      ? suitColorClassDark(modeLabel(c.mode).suit!, game.settings.fourColors)
                      : ""
                  }
                >
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
              {game.phase === "bidding" ? t("score.bidding") : t("score.coincheur")}
            </div>
          )}
          <span className="text-xs text-white/70">{t("score.upTo", { target: game.settings.targetScore })}</span>
        </div>

        <TeamScore
          label={`${names[1]} & ${names[3]}`}
          score={game.scores[1]}
          hidden={hideScores}
          highlight={c ? c.taker % 2 === 1 : false}
        />

        <button
          onClick={onMenu}
          aria-label={t("score.menu")}
          className="ml-1 grid h-11 w-11 place-items-center rounded-full bg-white/15 hover:bg-white/25"
        >
          ⚙️
        </button>
      </div>

      {dealPts && c && <DealProgress game={game} contractValue={c.value} takerTeam={(c.taker % 2) as Team} dealPts={dealPts} />}
    </div>
  );
}

/** Bandeau « manche en cours » : points ramassés par chaque camp + progression du
 *  preneur vers son contrat (distinct du score TOTAL affiché au-dessus). */
function DealProgress({
  game,
  contractValue,
  takerTeam,
  dealPts,
}: {
  game: GameState;
  contractValue: number;
  takerTeam: Team;
  dealPts: [number, number];
}) {
  const t = useT();
  const names = game.settings.playerNames;
  const teamName = (t: Team) => `${names[t === 0 ? 0 : 1]} & ${names[t === 0 ? 2 : 3]}`;
  const defTeam = (1 - takerTeam) as Team;
  const taken = dealPts[takerTeam];
  const target = Math.min(contractValue, 162);
  const pct = Math.max(0, Math.min(100, (taken / target) * 100));
  const made = taken >= target;

  return (
    <div className="mx-auto mt-1.5 max-w-md rounded-lg bg-black/30 px-3 py-1.5">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-semibold uppercase tracking-wide text-white/85">
          {t("score.deal")} · {teamName(takerTeam)} <span className="font-normal text-white/60">{t("score.taker")}</span>
        </span>
        <span className="tabular-nums text-white/70">
          <b className={made ? "text-emerald-300" : "text-yellow-300"}>{taken}</b> / {target}
        </span>
      </div>
      <div
        className="my-1 h-1.5 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={taken}
        aria-valuemin={0}
        aria-valuemax={target}
        aria-label={t("score.takerProgress")}
      >
        <div
          className={`h-full transition-all ${made ? "bg-emerald-400" : "bg-yellow-400"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-[11px] text-white/55">
        <span>
          {teamName(defTeam)} <span className="text-white/40">{t("score.defense")}</span>
        </span>
        <span className="tabular-nums">{dealPts[defTeam]}</span>
      </div>
    </div>
  );
}

function TeamScore({
  label,
  score,
  highlight,
  hidden,
}: {
  label: string;
  score: number;
  highlight: boolean;
  hidden?: boolean;
}) {
  return (
    <div
      className={[
        "flex flex-col items-center rounded-lg px-2 py-1 min-w-20",
        highlight ? "bg-yellow-400/20 ring-1 ring-yellow-400/60" : "",
      ].join(" ")}
    >
      <span className="truncate text-[11px] text-white/70 max-w-24">{label}</span>
      <span className="text-lg font-bold tabular-nums">{hidden ? "-" : score}</span>
    </div>
  );
}
