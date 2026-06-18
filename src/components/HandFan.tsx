import { useGame, HUMAN } from "../state/store";
import { PlayingCard } from "./Card";
import { legalForCurrent } from "../engine/game";

export function HandFan() {
  const game = useGame((s) => s.game);
  const overlay = useGame((s) => s.overlayTrick);
  const play = useGame((s) => s.play);

  const hand = game.hands[HUMAN];
  const myTurn = game.current === HUMAN && game.phase === "playing" && !overlay;
  const legalIds = new Set(myTurn ? legalForCurrent(game).map((c) => c.id) : []);

  return (
    <div className="safe-bottom px-2 pb-2">
      <div className="flex justify-center items-end gap-1 flex-wrap">
        {hand.map((card) => {
          const playable = myTurn && legalIds.has(card.id);
          return (
            <PlayingCard
              key={card.id}
              card={card}
              size="lg"
              playable={playable}
              dimmed={myTurn && !playable}
              onClick={() => play(card)}
            />
          );
        })}
        {hand.length === 0 && (
          <div className="h-21 grid place-items-center text-white/50 text-sm">
            En attente de la donne…
          </div>
        )}
      </div>
    </div>
  );
}
