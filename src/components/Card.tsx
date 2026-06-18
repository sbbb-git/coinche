import { Card as TCard, RANK_LABEL, SUIT_IS_RED, SUIT_LABEL, SUIT_SYMBOL } from "../engine/cards";

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

/** Une carte à jouer (face visible). */
export function PlayingCard({ card, size = "md", playable, highlight = true, dimmed, onClick }: Props) {
  const red = SUIT_IS_RED[card.suit];
  const sym = SUIT_SYMBOL[card.suit];
  const rank = RANK_LABEL[card.rank];
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
        red ? "text-red-600" : "text-zinc-900",
        playable ? "cursor-pointer hover:-translate-y-3" : "",
        emphasize ? "ring-2 ring-yellow-400/90" : "",
        dimmed ? "opacity-50 saturate-50" : "",
        onClick && !playable ? "cursor-not-allowed" : "",
      ].join(" ")}
    >
      <span className="font-bold self-start">{rank}</span>
      <span className="absolute inset-0 grid place-items-center text-2xl">{sym}</span>
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
