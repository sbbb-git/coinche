import { useState } from "react";
import { useGame, HUMAN } from "../state/store";
import { isTrump } from "../engine/cards";
import { modeLabel } from "./Table";
import { suitColorClassDark } from "./Card";
import { GameState } from "../engine/game";

/** Barre d'aide en jeu : conseil du coach à la demande, rappel des enchères et
 *  (optionnel) comptage des atouts tombés. */
export function CoachBar() {
  const game = useGame((s) => s.game);
  const overlay = useGame((s) => s.overlayTrick);
  const hint = useGame((s) => s.hint);
  const askHint = useGame((s) => s.askHint);
  const clearHint = useGame((s) => s.clearHint);
  const [recap, setRecap] = useState(false);

  if (game.phase !== "playing" && game.phase !== "bidding") return null;
  const myTurn = game.current === HUMAN && !overlay;

  const mode = game.contract?.mode;
  let trumpLine: string | null = null;
  if (game.settings.trumpHelper && game.phase === "playing" && mode && mode !== "NT") {
    let seen = 0;
    for (const t of game.completedTricks) for (const c of t.cards) if (isTrump(c, mode)) seen++;
    for (const p of overlay ?? game.trick) if (isTrump(p.card, mode)) seen++;
    const total = mode === "AT" ? 32 : 8;
    trumpLine = `Atouts tombés : ${seen}/${total}`;
  }

  return (
    <div className="px-2">
      <div className="mx-auto flex max-w-lg flex-wrap items-center justify-center gap-2">
        {myTurn && (
          <button
            onClick={askHint}
            className="min-h-9 rounded-full bg-sky-500/90 px-4 text-sm font-bold text-white shadow hover:bg-sky-400"
          >
            💡 Conseil
          </button>
        )}
        <button
          onClick={() => setRecap((v) => !v)}
          aria-pressed={recap}
          className="min-h-9 rounded-full bg-white/10 px-3 text-xs font-semibold text-white/85 hover:bg-white/20"
        >
          📜 Enchères
        </button>
        {trumpLine && (
          <span className="rounded-full bg-black/30 px-3 py-1 text-xs tabular-nums text-white/75">
            {trumpLine}
          </span>
        )}
      </div>

      {hint && (
        <div className="mx-auto mt-2 flex max-w-lg items-start gap-2 rounded-xl bg-sky-950/80 p-3 text-sm ring-1 ring-sky-600">
          <span aria-hidden>💡</span>
          <p className="min-w-0 flex-1 text-white/90">{hint.text}</p>
          <button
            onClick={clearHint}
            aria-label="Fermer le conseil"
            className="shrink-0 rounded px-1 text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {recap && <BidRecap game={game} />}
    </div>
  );
}

function BidRecap({ game }: { game: GameState }) {
  const names = game.settings.playerNames;
  return (
    <div className="mx-auto mt-2 max-w-lg rounded-xl bg-black/40 p-2.5 ring-1 ring-white/10">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/45">Enchères</p>
      {game.bidHistory.length === 0 ? (
        <p className="text-sm text-white/50">Aucune annonce pour l'instant.</p>
      ) : (
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
          {game.bidHistory.map((b, i) => {
            const isPartner = b.player % 2 === HUMAN % 2;
            const m = b.mode ? modeLabel(b.mode) : null;
            return (
              <span key={i} className="tabular-nums">
                <span className={isPartner ? "text-sky-300" : "text-white/60"}>{names[b.player]}</span>{" "}
                {b.kind === "pass" ? (
                  <span className="text-white/45">passe</span>
                ) : b.kind === "coinche" ? (
                  <b className="text-orange-300">coinche</b>
                ) : b.kind === "surcoinche" ? (
                  <b className="text-orange-300">surcoinche</b>
                ) : (
                  <b>
                    {b.generale ? "Générale" : b.capot ? "Capot" : b.value}
                    {m && (
                      <>
                        {" "}
                        {m.suit ? (
                          <span className={suitColorClassDark(m.suit, game.settings.fourColors)}>{m.text}</span>
                        ) : (
                          m.text
                        )}
                      </>
                    )}
                  </b>
                )}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
