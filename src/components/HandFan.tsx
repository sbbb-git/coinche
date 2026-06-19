import { useGame, HUMAN } from "../state/store";
import { PlayingCard } from "./Card";
import { legalForCurrent } from "../engine/game";
import { useCompactHeight } from "../app/useMediaQuery";

export function HandFan() {
  const game = useGame((s) => s.game);
  const overlay = useGame((s) => s.overlayTrick);
  const play = useGame((s) => s.play);
  const hint = useGame((s) => s.hint);
  const compact = useCompactHeight();

  const hand = game.hands[HUMAN];
  const myTurn = game.current === HUMAN && game.phase === "playing" && !overlay;
  const legalIds = new Set(myTurn ? legalForCurrent(game).map((c) => c.id) : []);
  const preselect = game.settings.preselectPlayable;
  const hintId = hint?.cardId ?? null;

  return (
    <div className="safe-bottom px-1 pb-2 pt-1">
      {/* chevauchement pour tenir sur un petit iPhone, scroll de secours si besoin */}
      <div className="flex justify-center overflow-x-auto">
        <div className="flex items-end pt-4 pl-3">
          {hand.map((card) => {
            const playable = myTurn && legalIds.has(card.id);
            const hinted = hintId === card.id;
            return (
              <div
                key={card.id}
                className={[
                  "-ml-4 sm:-ml-1 transition-transform",
                  playable ? "z-10 hover:z-20" : "",
                  hinted ? "z-30 -translate-y-3" : "",
                ].join(" ")}
              >
                <div
                  className={
                    hinted ? "rounded-lg ring-4 ring-sky-300 ring-offset-2 ring-offset-emerald-900" : ""
                  }
                >
                  <PlayingCard
                    card={card}
                    size={compact ? "md" : "lg"}
                    playable={playable}
                    highlight={preselect}
                    dimmed={myTurn && !playable && preselect}
                    onClick={() => play(card)}
                  />
                </div>
              </div>
            );
          })}
          {hand.length === 0 && (
            <div className="grid h-21 place-items-center text-sm text-white/60">
              En attente de la donne…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
