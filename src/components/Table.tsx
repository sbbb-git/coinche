import { useGame, HUMAN } from "../state/store";
import { useT, translate, currentLang } from "../i18n";
import { CardBack, PlayingCard } from "./Card";
import { Suit, SUIT_SYMBOL, TrumpMode } from "../engine/cards";
import { GameState } from "../engine/game";
import { PlayedCard, winningIndex } from "../engine/rules";

// Position écran de chaque siège (0 = humain en bas).
const SEAT_POS: Record<number, string> = {
  0: "bottom-2 left-1/2 -translate-x-1/2",
  1: "left-2 top-1/2 -translate-y-1/2",
  2: "top-2 left-1/2 -translate-x-1/2",
  3: "right-2 top-1/2 -translate-y-1/2",
};

// Position de la carte jouée par chaque siège dans la zone centrale.
const TRICK_POS: Record<number, string> = {
  0: "bottom-0 left-1/2 -translate-x-1/2",
  1: "left-0 top-1/2 -translate-y-1/2",
  2: "top-0 left-1/2 -translate-x-1/2",
  3: "right-0 top-1/2 -translate-y-1/2",
};

export function modeLabel(mode: TrumpMode): { text: string; suit: Suit | null } {
  if (mode === "NT") return { text: translate(currentLang(), "table.noTrump"), suit: null };
  if (mode === "AT") return { text: translate(currentLang(), "table.allTrump"), suit: null };
  return { text: SUIT_SYMBOL[mode], suit: mode };
}

function lastBidText(game: GameState, player: number): string | null {
  for (let i = game.bidHistory.length - 1; i >= 0; i--) {
    const b = game.bidHistory[i];
    if (b.player !== player) continue;
    if (b.kind === "pass") return translate(currentLang(), "table.pass");
    if (b.kind === "coinche") return translate(currentLang(), "table.coinche");
    if (b.kind === "surcoinche") return translate(currentLang(), "table.surcoinche");
    if (b.kind === "bid") {
      const m = modeLabel(b.mode!);
      return b.capot
        ? translate(currentLang(), "table.capot", { mode: m.text })
        : translate(currentLang(), "table.bid", { value: b.value!, mode: m.text });
    }
  }
  return null;
}

function Seat({ game, seat, thinking }: { game: GameState; seat: number; thinking: boolean }) {
  const t = useT();
  const name = game.settings.playerNames[seat];
  const isTaker = game.contract?.taker === seat;
  const isCurrent = game.current === seat && (game.phase === "bidding" || game.phase === "playing");
  const count = game.hands[seat].length;
  const bid = game.phase === "bidding" ? lastBidText(game, seat) : null;
  const isPartner = seat % 2 === HUMAN % 2;

  return (
    <div className={`absolute ${SEAT_POS[seat]} flex flex-col items-center gap-1 z-10`}>
      {(seat === 1 || seat === 3 || seat === 2) && count > 0 && (
        <div className="flex -space-x-5">
          {Array.from({ length: Math.min(count, 8) }).map((_, i) => (
            <CardBack key={i} size="sm" />
          ))}
        </div>
      )}
      <div
        className={[
          "px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow",
          isCurrent ? "bg-yellow-400 text-emerald-950" : "bg-black/40 text-white",
        ].join(" ")}
      >
        <span className={isPartner ? "text-sky-300" : ""}>{name}</span>
        {isTaker && <span role="img" aria-label={t("table.taker")}>👑</span>}
        {isCurrent && thinking && <span className="animate-pulse">…</span>}
      </div>
      {bid && (
        <div className="animate-pop px-2 py-0.5 rounded-md bg-white text-emerald-950 text-xs font-semibold shadow">
          {bid}
        </div>
      )}
    </div>
  );
}

function TrickArea({
  trick,
  mode,
  names,
  complete,
}: {
  trick: PlayedCard[];
  mode: TrumpMode | null;
  names: GameState["settings"]["playerNames"];
  complete: boolean;
}) {
  // Carte maîtresse à l'instant t : surlignée en continu (« qui tient le pli »),
  // et fortement mise en avant + nommée quand le pli est complet (« qui le remporte »).
  const winnerPlayer =
    mode && trick.length > 0 ? trick[winningIndex(trick, mode)].player : -1;

  return (
    <div className="absolute inset-0 m-auto w-44 h-44 sm:w-56 sm:h-56">
      <div className="relative w-full h-full">
        {trick.map((p) => {
          const isWinner = p.player === winnerPlayer;
          // En cours : anneau blanc discret (« tient le pli »). Pli complet :
          // anneau jaune marqué + agrandissement + badge nominatif (« remporte »).
          const ringCls = isWinner
            ? complete
              ? "ring-2 ring-yellow-400 ring-offset-1 ring-offset-emerald-900 scale-110"
              : "ring-2 ring-white/70"
            : complete
              ? "opacity-50 saturate-50"
              : "";
          return (
            <div key={p.player} className={`absolute ${TRICK_POS[p.player]} animate-pop`}>
              <div className={["relative rounded-lg transition", ringCls].join(" ")}>
                <PlayingCard card={p.card} size="md" />
              </div>
              {complete && isWinner && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 max-w-24 truncate animate-pop whitespace-nowrap rounded-full bg-yellow-400 px-2 py-0.5 text-[11px] font-bold text-emerald-950 shadow">
                  ✓ {names[p.player]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Table() {
  const game = useGame((s) => s.game);
  const overlay = useGame((s) => s.overlayTrick);
  const thinking = useGame((s) => s.thinking);
  const trick = overlay ?? game.trick;
  const complete = trick.length === 4;

  return (
    <div className="relative flex-1 min-h-40 rounded-3xl m-2 bg-felt-dark/60 shadow-inner ring-1 ring-emerald-900/50 overflow-hidden">
      {[2, 1, 3, 0].map((seat) => (
        <Seat key={seat} game={game} seat={seat} thinking={thinking} />
      ))}
      <TrickArea
        trick={trick}
        mode={game.contract?.mode ?? null}
        names={game.settings.playerNames}
        complete={complete}
      />
    </div>
  );
}
