import { Card as TCard, RANK_LABEL, SUIT_IS_RED, SUIT_LABEL, SUIT_SYMBOL, Suit } from "../engine/cards";
import { useGame } from "../state/store";

// Couleurs des enseignes en mode "4 couleurs" (accessibilité daltoniens).
const FOUR_COLOR: Record<Suit, string> = {
  S: "text-zinc-900",
  H: "text-red-600",
  D: "text-blue-600",
  C: "text-green-700",
};

/** Classe de couleur d'une enseigne sur fond clair (carte/symbole). */
export function suitColorClass(suit: Suit, fourColors: boolean): string {
  if (fourColors) return FOUR_COLOR[suit];
  return SUIT_IS_RED[suit] ? "text-red-600" : "text-zinc-900";
}

/** Variante pour fond sombre (bandeau) : rouge clair / blanc, ou 4 couleurs. */
export function suitColorClassDark(suit: Suit, fourColors: boolean): string {
  if (fourColors)
    return { S: "text-white", H: "text-red-400", D: "text-blue-400", C: "text-green-400" }[suit];
  return SUIT_IS_RED[suit] ? "text-red-400" : "text-white";
}

interface Props {
  card: TCard;
  size?: "sm" | "md" | "lg";
  playable?: boolean;
  /** met en évidence la carte jouable (anneau) ; séparé de la cliquabilité */
  highlight?: boolean;
  dimmed?: boolean;
  onClick?: () => void;
}

const SIZES = {
  sm: "w-9 h-13 text-sm rounded-md",
  md: "w-12 h-18 text-base rounded-lg",
  lg: "w-14 h-21 text-lg rounded-lg",
} as const;

const SYM_SIZE = { sm: "text-lg", md: "text-2xl", lg: "text-3xl" } as const;

/** Une carte à jouer (face visible). */
export function PlayingCard({ card, size = "md", playable, highlight = true, dimmed, onClick }: Props) {
  const fourColors = useGame((s) => s.game.settings.fourColors);
  const sym = SUIT_SYMBOL[card.suit];
  const rank = RANK_LABEL[card.rank];
  const colorClass = suitColorClass(card.suit, fourColors);
  const emphasize = playable && highlight;
  return (
    <button
      type="button"
      disabled={!playable && !!onClick}
      onClick={playable ? onClick : undefined}
      aria-label={`${rank} de ${SUIT_LABEL[card.suit]}`}
      className={[
        SIZES[size],
        "relative flex flex-col justify-between bg-white shadow-md border border-black/10 leading-none p-1",
        "transition-transform duration-150",
        colorClass,
        playable ? "cursor-pointer hover:-translate-y-3" : "",
        emphasize ? "ring-2 ring-yellow-400/90" : "",
        dimmed ? "opacity-50 saturate-50" : "",
        onClick && !playable ? "cursor-not-allowed" : "",
      ].join(" ")}
    >
      <span className="font-bold self-start">{rank}</span>
      <span className={`absolute inset-0 grid place-items-center ${SYM_SIZE[size]}`}>{sym}</span>
      <span className="font-bold self-end rotate-180">{rank}</span>
    </button>
  );
}

/** Dos de carte (mains des adversaires). */
export function CardBack({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <div
      className={[
        SIZES[size],
        "bg-gradient-to-br from-emerald-800 to-emerald-950 border border-emerald-700 shadow",
        "flex items-center justify-center",
      ].join(" ")}
    >
      <div className="w-2/3 h-2/3 rounded border border-emerald-600/50" />
    </div>
  );
}
