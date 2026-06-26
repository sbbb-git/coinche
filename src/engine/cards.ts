// Cartes, couleurs, ordres et valeurs selon le type de contrat.

export type Suit = "S" | "H" | "D" | "C"; // Pique, Cœur, Carreau, Trèfle
export type Rank = "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

export interface Card {
  suit: Suit;
  rank: Rank;
  /** identifiant stable, ex: "SA" = As de pique */
  id: string;
}

/** Mode d'atout d'un contrat :
 *  une couleur (atout classique), "NT" = Sans Atout, "AT" = Tout Atout. */
export type TrumpMode = Suit | "NT" | "AT";

export const SUITS: Suit[] = ["S", "H", "D", "C"];
export const RANKS: Rank[] = ["7", "8", "9", "10", "J", "Q", "K", "A"];

export const SUIT_LABEL: Record<Suit, string> = {
  S: "Pique",
  H: "Cœur",
  D: "Carreau",
  C: "Trèfle",
};

/** Noms de couleurs en anglais (lecteurs d'écran / version EN). */
export const SUIT_LABEL_EN: Record<Suit, string> = {
  S: "Spades",
  H: "Hearts",
  D: "Diamonds",
  C: "Clubs",
};

/** Noms parlés des rangs (accessibilité), FR et EN. Le texte affiché reste
 *  l'abréviation (RANK_LABEL) ; ces noms ne servent qu'aux aria-labels. */
export const RANK_SPOKEN: Record<"fr" | "en", Record<Rank, string>> = {
  fr: { "7": "7", "8": "8", "9": "9", "10": "10", J: "Valet", Q: "Dame", K: "Roi", A: "As" },
  en: { "7": "7", "8": "8", "9": "9", "10": "10", J: "Jack", Q: "Queen", K: "King", A: "Ace" },
};

export const SUIT_SYMBOL: Record<Suit, string> = {
  S: "♠",
  H: "♥",
  D: "♦",
  C: "♣",
};

export const SUIT_IS_RED: Record<Suit, boolean> = {
  S: false,
  H: true,
  D: true,
  C: false,
};

export const RANK_LABEL: Record<Rank, string> = {
  "7": "7",
  "8": "8",
  "9": "9",
  "10": "10",
  J: "V",
  Q: "D",
  K: "R",
  A: "A",
};

export function cardId(suit: Suit, rank: Rank): string {
  return `${suit}${rank}`;
}

export function makeCard(suit: Suit, rank: Rank): Card {
  return { suit, rank, id: cardId(suit, rank) };
}

/** Jeu de 32 cartes, ordre stable. */
export function freshDeck(): Card[] {
  const deck: Card[] = [];
  for (const s of SUITS) for (const r of RANKS) deck.push(makeCard(s, r));
  return deck;
}

// --- Forces (ordre de prise) ------------------------------------------------
// Plus la valeur est grande, plus la carte est forte dans son rôle.

const TRUMP_ORDER: Record<Rank, number> = {
  J: 8,
  "9": 7,
  A: 6,
  "10": 5,
  K: 4,
  Q: 3,
  "8": 2,
  "7": 1,
};

const PLAIN_ORDER: Record<Rank, number> = {
  A: 8,
  "10": 7,
  K: 6,
  Q: 5,
  J: 4,
  "9": 3,
  "8": 2,
  "7": 1,
};

// --- Valeurs en points ------------------------------------------------------

const TRUMP_POINTS: Record<Rank, number> = {
  J: 20,
  "9": 14,
  A: 11,
  "10": 10,
  K: 4,
  Q: 3,
  "8": 0,
  "7": 0,
};

const PLAIN_POINTS: Record<Rank, number> = {
  A: 11,
  "10": 10,
  K: 4,
  Q: 3,
  J: 2,
  "9": 0,
  "8": 0,
  "7": 0,
};

// Sans Atout : tout est "plain" mais les points sont rééquilibrés à 152.
const NT_POINTS: Record<Rank, number> = {
  A: 19,
  "10": 10,
  K: 4,
  Q: 3,
  J: 2,
  "9": 0,
  "8": 0,
  "7": 0,
};

// Tout Atout : tout est atout mais les points sont rééquilibrés à 152.
const AT_POINTS: Record<Rank, number> = {
  J: 14,
  "9": 9,
  A: 6,
  "10": 5,
  K: 3,
  Q: 1,
  "8": 0,
  "7": 0,
};

/** Une carte est-elle atout dans ce mode ? */
export function isTrump(card: Card, mode: TrumpMode): boolean {
  if (mode === "AT") return true;
  if (mode === "NT") return false;
  return card.suit === mode;
}

/** Force d'une carte (pour comparer deux cartes de même rôle). */
export function strength(card: Card, mode: TrumpMode): number {
  return isTrump(card, mode) ? TRUMP_ORDER[card.rank] : PLAIN_ORDER[card.rank];
}

/** Valeur en points d'une carte selon le mode. */
export function points(card: Card, mode: TrumpMode): number {
  if (mode === "NT") return NT_POINTS[card.rank];
  if (mode === "AT") return AT_POINTS[card.rank];
  return isTrump(card, mode) ? TRUMP_POINTS[card.rank] : PLAIN_POINTS[card.rank];
}

/** Total des points d'un ensemble de cartes. */
export function totalPoints(cards: Card[], mode: TrumpMode): number {
  return cards.reduce((sum, c) => sum + points(c, mode), 0);
}
