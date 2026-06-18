// Règles de jeu : qui remporte un pli, et quelles cartes on a le droit de jouer.

import { Card, TrumpMode, isTrump, strength } from "./cards";

export interface PlayedCard {
  card: Card;
  player: number; // 0..3
}

/** Couleur demandée par l'entame du pli. */
export function ledSuit(trick: PlayedCard[]): Card["suit"] | null {
  return trick.length > 0 ? trick[0].card.suit : null;
}

/**
 * Index (dans `trick`) de la carte qui remporte actuellement le pli.
 * Règle : un atout bat toute carte non-atout ; entre atouts ou entre
 * cartes de la couleur demandée, c'est la force qui tranche ; une carte
 * d'une autre couleur (ni atout ni demandée) ne peut jamais gagner.
 */
export function winningIndex(trick: PlayedCard[], mode: TrumpMode): number {
  if (trick.length === 0) return -1;
  const led = trick[0].card.suit;
  let best = 0;
  for (let i = 1; i < trick.length; i++) {
    if (beats(trick[i].card, trick[best].card, led, mode)) best = i;
  }
  return best;
}

/** `a` bat-elle `b` sachant la couleur demandée et le mode ? */
export function beats(a: Card, b: Card, led: Card["suit"], mode: TrumpMode): boolean {
  const aT = isTrump(a, mode);
  const bT = isTrump(b, mode);
  if (aT && !bT) return true;
  if (!aT && bT) return false;
  if (aT && bT) return strength(a, mode) > strength(b, mode);
  // aucune des deux n'est atout : seule la couleur demandée peut gagner
  const aLed = a.suit === led;
  const bLed = b.suit === led;
  if (aLed && !bLed) return true;
  if (!aLed && bLed) return false;
  if (aLed && bLed) return strength(a, mode) > strength(b, mode);
  return false; // deux défausses : la première posée reste maîtresse
}

/** Le joueur courant a-t-il son partenaire qui mène le pli ? (équipes 0/2 vs 1/3) */
export function partnerIsWinning(trick: PlayedCard[], current: number, mode: TrumpMode): boolean {
  if (trick.length === 0) return false;
  const w = winningIndex(trick, mode);
  const winner = trick[w].player;
  return (winner + current) % 2 === 0 && winner !== current;
}

/**
 * Cartes jouables par `hand` au vu du pli en cours.
 * Implémente : obligation de fournir, obligation de couper, obligation de
 * monter à l'atout, et l'exception du partenaire maître.
 */
export interface MoveOptions {
  /** true (défaut) : on doit mettre de l'atout même sans pouvoir surcouper. */
  pisserObligatoire?: boolean;
}

export function legalMoves(
  hand: Card[],
  trick: PlayedCard[],
  current: number,
  mode: TrumpMode,
  opts: MoveOptions = {},
): Card[] {
  if (trick.length === 0) return [...hand]; // entame libre
  const led = trick[0].card.suit;

  const trumpsInTrick = trick.filter((p) => isTrump(p.card, mode)).map((p) => p.card);
  const highestTrumpStrength =
    trumpsInTrick.length > 0
      ? Math.max(...trumpsInTrick.map((c) => strength(c, mode)))
      : -1;

  const myTrumps = hand.filter((c) => isTrump(c, mode));
  const myHigherTrumps = myTrumps.filter((c) => strength(c, mode) > highestTrumpStrength);

  // --- Cas Sans Atout : pas d'atout, on suit sinon on défausse librement. ---
  if (mode === "NT") {
    const followers = hand.filter((c) => c.suit === led);
    return followers.length > 0 ? followers : [...hand];
  }

  // --- L'entame est de la couleur d'atout (ou mode Tout Atout). ---
  const ledIsTrump = mode === "AT" || led === mode;
  if (ledIsTrump) {
    const followers = hand.filter((c) => c.suit === led && isTrump(c, mode));
    if (followers.length > 0) {
      // Obligation de monter si possible.
      const higher = followers.filter((c) => strength(c, mode) > highestTrumpStrength);
      return higher.length > 0 ? higher : followers;
    }
    // Tout Atout, couleur demandée absente : on défausse librement.
    if (mode === "AT") return [...hand];
    // Atout couleur, je n'ai plus d'atout : tout est jouable.
    return [...hand];
  }

  // --- L'entame est une couleur non-atout (mode atout-couleur). ---
  const followers = hand.filter((c) => c.suit === led);
  if (followers.length > 0) return followers; // je fournis : pas d'obligation de force

  // Je ne peux pas fournir.
  if (myTrumps.length === 0) return [...hand]; // pas d'atout : défausse libre

  // J'ai de l'atout. Si mon partenaire est maître, je ne suis pas obligé de couper.
  if (partnerIsWinning(trick, current, mode)) return [...hand];

  // Adversaire maître : je dois couper, et monter si un adversaire a déjà coupé.
  if (highestTrumpStrength >= 0) {
    if (myHigherTrumps.length > 0) return myHigherTrumps;
    // Je ne peux pas surcouper : si « pisser » n'est pas obligatoire, défausse libre.
    return opts.pisserObligatoire === false ? [...hand] : myTrumps;
  }
  return myTrumps;
}
