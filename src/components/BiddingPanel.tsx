import { useState } from "react";
import { useGame, HUMAN } from "../state/store";
import {
  BID_VALUES,
  availableModes,
  canBid,
  canCoinche,
  canSurcoinche,
} from "../engine/game";
import { TrumpMode } from "../engine/cards";
import { modeLabel } from "./Table";

export function BiddingPanel() {
  const game = useGame((s) => s.game);
  const overlay = useGame((s) => s.overlayTrick);
  const bid = useGame((s) => s.bid);
  const pass = useGame((s) => s.pass);
  const coinche = useGame((s) => s.coinche);
  const surcoinche = useGame((s) => s.surcoinche);

  const myTurn = game.phase === "bidding" && game.current === HUMAN && !overlay;
  const modes = availableModes(game.settings);
  const minValue = Math.max(80, (game.standing?.value ?? 70) + 10);

  const [mode, setMode] = useState<TrumpMode>(modes[0]);
  const [value, setValue] = useState<number>(80);

  if (!myTurn) return null;

  // Décision de surcoinche (le preneur a été coinché).
  if (canSurcoinche(game, HUMAN)) {
    return (
      <Panel>
        <p className="text-sm font-medium">Vous avez été coinché ! Confiant ?</p>
        <div className="flex gap-2">
          <Btn primary onClick={surcoinche}>
            Surcoincher
          </Btn>
          <Btn onClick={pass}>Laisser</Btn>
        </div>
      </Panel>
    );
  }

  const effValue = Math.max(value, minValue);
  const canAnnounce = !game.standing?.capot && canBid(game, effValue, false);
  const values = BID_VALUES.filter((v) => v >= minValue);

  return (
    <Panel>
      <p className="text-sm font-medium">À vous d'annoncer</p>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1">
          {modes.map((m) => {
            const lbl = modeLabel(m);
            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={[
                  "h-11 min-w-11 px-2 rounded-md text-base font-bold shadow",
                  mode === m ? "bg-yellow-400 text-emerald-950" : "bg-white/90 text-zinc-800",
                  lbl.red && mode !== m ? "text-red-600" : "",
                ].join(" ")}
              >
                {lbl.text}
              </button>
            );
          })}
        </div>
        <select
          value={effValue}
          onChange={(e) => setValue(Number(e.target.value))}
          className="h-11 px-2 rounded-md bg-white/90 text-zinc-800 font-semibold"
        >
          {values.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-2">
        <Btn primary disabled={!canAnnounce} onClick={() => bid(effValue, mode, false)}>
          Annoncer {effValue} {modeLabel(mode).text}
        </Btn>
        {canCoinche(game, HUMAN) && (
          <Btn warn onClick={coinche}>
            Coincher
          </Btn>
        )}
        <Btn onClick={pass}>Passer</Btn>
      </div>
    </Panel>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-pop mx-auto mb-1 flex max-w-lg flex-col gap-2 rounded-xl bg-emerald-950/90 p-3 shadow-lg ring-1 ring-emerald-700">
      {children}
    </div>
  );
}

function Btn({
  children,
  onClick,
  primary,
  warn,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  warn?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "px-4 py-2.5 rounded-lg text-sm font-semibold shadow transition",
        disabled
          ? "bg-white/20 text-white/40 cursor-not-allowed"
          : warn
            ? "bg-orange-500 text-white hover:bg-orange-400"
            : primary
              ? "bg-yellow-400 text-emerald-950 hover:bg-yellow-300"
              : "bg-white/15 text-white hover:bg-white/25",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
