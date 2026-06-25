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
import { suitColorClass, suitColorClassDark } from "./Card";

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
        <p className="text-sm font-medium">Tu as été coinché ! Confiant ?</p>
        <div className="flex gap-2">
          <Btn primary onClick={surcoinche}>
            Surcoincher
          </Btn>
          <Btn onClick={pass}>Laisser</Btn>
        </div>
      </Panel>
    );
  }

  const values = BID_VALUES.filter((v) => v >= minValue);
  const canStillAnnounce = values.length > 0 && !game.standing?.capot;
  const minBid = values[0] ?? minValue;
  const maxBid = values[values.length - 1] ?? minValue;
  const effValue = Math.min(maxBid, Math.max(value, minBid));
  const canAnnounce = canStillAnnounce && canBid(game, effValue, false);
  const step = (delta: number) =>
    setValue(Math.min(maxBid, Math.max(minBid, effValue + delta)));

  return (
    <Panel>
      <p className="text-sm font-medium">
        {canStillAnnounce ? "À toi d'annoncer" : "Plus d'annonce possible"}
      </p>
      {canStillAnnounce && (
        <div className="flex flex-col gap-2">
          {/* Choix de l'atout */}
          <div className="flex gap-1">
            {modes.map((m) => {
              const lbl = modeLabel(m);
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={[
                    "h-11 flex-1 min-w-11 px-2 rounded-md text-lg font-bold shadow",
                    mode === m ? "bg-yellow-400" : "bg-white/90",
                    // Couleur du symbole : rouge pour ♥/♦, sombre pour ♠/♣ (lisibilité).
                    // Pour SA/TA (sans couleur), texte sombre selon l'état.
                    lbl.suit
                      ? suitColorClass(lbl.suit, game.settings.fourColors)
                      : mode === m
                        ? "text-emerald-950"
                        : "text-zinc-800",
                  ].join(" ")}
                >
                  {lbl.text}
                </button>
              );
            })}
          </div>
          {/* Choix de la valeur : pas de −/+ + accès direct au palier */}
          <div className="flex items-stretch gap-2">
            <button
              onClick={() => step(-10)}
              disabled={effValue <= minBid}
              aria-label="Diminuer l'annonce"
              className="h-12 w-12 rounded-lg bg-white/15 text-2xl font-bold text-white shadow transition hover:bg-white/25 disabled:opacity-30"
            >
              −
            </button>
            <div className="flex h-12 flex-1 items-center justify-center gap-1 rounded-lg bg-black/30 text-2xl font-bold tabular-nums">
              <span>{effValue}</span>
              {modeLabel(mode).suit ? (
                <span className={suitColorClassDark(modeLabel(mode).suit!, game.settings.fourColors)}>
                  {modeLabel(mode).text}
                </span>
              ) : (
                <span className="text-base text-white/80">{modeLabel(mode).text}</span>
              )}
            </div>
            <button
              onClick={() => step(10)}
              disabled={effValue >= maxBid}
              aria-label="Augmenter l'annonce"
              className="h-12 w-12 rounded-lg bg-white/15 text-2xl font-bold text-white shadow transition hover:bg-white/25 disabled:opacity-30"
            >
              +
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {canStillAnnounce && (
          <Btn primary disabled={!canAnnounce} onClick={() => bid(effValue, mode, false)}>
            Annoncer {effValue} {modeLabel(mode).text}
          </Btn>
        )}
        {canCoinche(game, HUMAN) && (
          <Btn warn onClick={coinche}>
            Coincher
          </Btn>
        )}
        {game.settings.allowGenerale &&
          game.bidHistory.length > 0 &&
          !game.standing?.generale && (
            <Btn onClick={() => bid(500, mode, false, true)}>Générale {modeLabel(mode).text}</Btn>
          )}
        <Btn onClick={pass}>Passer</Btn>
      </div>
    </Panel>
  );
}

/** Coinche « à la volée » : visible pendant que les adversaires enchérissent. */
export function CoinchePrompt() {
  const game = useGame((s) => s.game);
  const overlay = useGame((s) => s.overlayTrick);
  const coinche = useGame((s) => s.coinche);
  if (game.phase !== "bidding" || overlay) return null;
  if (game.current === HUMAN) return null; // géré par le panneau normal
  if (!canCoinche(game, HUMAN)) return null;
  return (
    <div className="pointer-events-none flex justify-center pb-1">
      <button
        onClick={coinche}
        className="pointer-events-auto animate-pop rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-orange-400"
      >
        ✊ Coincher !
      </button>
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-pop mx-auto mb-1 flex max-h-[46vh] max-w-lg flex-col gap-2 overflow-y-auto rounded-xl bg-emerald-950/90 p-3 shadow-lg ring-1 ring-emerald-700">
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
        "min-h-11 px-4 py-2.5 rounded-lg text-sm font-semibold shadow transition",
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
