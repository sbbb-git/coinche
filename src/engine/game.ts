// Machine d'état d'une partie : distribution, enchères, jeu des plis.

import { Card, TrumpMode, freshDeck } from "./cards";
import { Contract, ScoreBreakdown, Team, scoreDeal, teamOf } from "./scoring";
import { PlayedCard, legalMoves, winningIndex } from "./rules";

export type AiLevel = "easy" | "medium" | "hard";
export type Phase = "bidding" | "playing" | "dealScored" | "gameOver";

export interface Settings {
  targetScore: number; // 1000 / 1500 / 2000
  coincheEndsGame: boolean; // "la coinche fait gagner la partie"
  allowNT: boolean; // autoriser Sans Atout
  allowAT: boolean; // autoriser Tout Atout
  allowCoinche: boolean;
  aiLevel: AiLevel;
  /** noms des 4 joueurs ; index 0 = joueur humain (en bas) */
  playerNames: [string, string, string, string];
}

export const DEFAULT_SETTINGS: Settings = {
  targetScore: 1000,
  coincheEndsGame: false,
  allowNT: false, // Sans Atout désactivé par défaut (Sacha joue sans)
  allowAT: false, // Tout Atout désactivé par défaut
  allowCoinche: true,
  aiLevel: "medium",
  playerNames: ["Vous", "Ouest", "Nord", "Est"],
};

export interface StandingBid {
  player: number;
  value: number;
  mode: TrumpMode;
  capot: boolean;
}

export interface BidEntry {
  player: number;
  kind: "bid" | "pass" | "coinche" | "surcoinche";
  value?: number;
  mode?: TrumpMode;
  capot?: boolean;
}

export interface GameState {
  settings: Settings;
  phase: Phase;
  dealer: number;
  current: number;
  hands: Card[][]; // main courante de chaque joueur
  dealtHands: Card[][]; // copie des mains distribuées (pour la belote)

  // Enchères
  bidHistory: BidEntry[];
  standing: StandingBid | null;
  coinche: 1 | 2 | 4;
  passStreak: number;

  // Jeu
  contract: Contract | null;
  trick: PlayedCard[];
  trickLeader: number;
  completedTricks: { cards: Card[]; winner: number; winnerTeam: Team }[];

  // Scores
  scores: [number, number];
  lastResult: ScoreBreakdown | null;
  message: string;
}

export const BID_VALUES = [80, 90, 100, 110, 120, 130, 140, 150, 160];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function availableModes(s: Settings): TrumpMode[] {
  const modes: TrumpMode[] = ["S", "H", "D", "C"];
  if (s.allowNT) modes.push("NT");
  if (s.allowAT) modes.push("AT");
  return modes;
}

export function newGame(settings: Settings): GameState {
  const dealer = Math.floor(Math.random() * 4);
  const base: GameState = {
    settings,
    phase: "bidding",
    dealer,
    current: 0,
    hands: [[], [], [], []],
    dealtHands: [[], [], [], []],
    bidHistory: [],
    standing: null,
    coinche: 1,
    passStreak: 0,
    contract: null,
    trick: [],
    trickLeader: 0,
    completedTricks: [],
    scores: [0, 0],
    lastResult: null,
    message: "",
  };
  return startDeal(base);
}

/** Distribue une nouvelle donne et ouvre les enchères. */
export function startDeal(state: GameState): GameState {
  const deck = shuffle(freshDeck());
  const hands: Card[][] = [[], [], [], []];
  // Distribution 3-2-3 en partant du joueur à gauche du donneur.
  const order = [0, 1, 2, 3].map((i) => (state.dealer + 1 + i) % 4);
  let k = 0;
  for (const count of [3, 2, 3]) {
    for (const p of order) {
      for (let c = 0; c < count; c++) hands[p].push(deck[k++]);
    }
  }
  const sorted = hands.map(sortHand);
  return {
    ...state,
    phase: "bidding",
    hands: sorted,
    dealtHands: sorted.map((h) => [...h]),
    current: (state.dealer + 1) % 4,
    bidHistory: [],
    standing: null,
    coinche: 1,
    passStreak: 0,
    contract: null,
    trick: [],
    trickLeader: (state.dealer + 1) % 4,
    completedTricks: [],
    lastResult: null,
    message: "",
  };
}

const SUIT_SORT = { S: 0, H: 1, C: 2, D: 3 } as const;
const RANK_SORT: Record<Card["rank"], number> = {
  A: 0,
  "10": 1,
  K: 2,
  Q: 3,
  J: 4,
  "9": 5,
  "8": 6,
  "7": 7,
};

/** Tri d'affichage : par couleur puis par force usuelle. */
export function sortHand(hand: Card[]): Card[] {
  return [...hand].sort((a, b) => {
    if (a.suit !== b.suit) return SUIT_SORT[a.suit] - SUIT_SORT[b.suit];
    return RANK_SORT[a.rank] - RANK_SORT[b.rank];
  });
}

// --- Enchères ---------------------------------------------------------------

export function canBid(state: GameState, value: number, capot: boolean): boolean {
  if (capot) return !state.standing?.capot;
  if (state.standing?.capot) return false;
  return !state.standing || value > state.standing.value;
}

export function canCoinche(state: GameState, player: number): boolean {
  if (!state.settings.allowCoinche || !state.standing) return false;
  if (state.coinche !== 1) return false;
  return teamOf(player) !== teamOf(state.standing.player);
}

export function canSurcoinche(state: GameState, player: number): boolean {
  if (!state.settings.allowCoinche || !state.standing) return false;
  if (state.coinche !== 2) return false;
  return teamOf(player) === teamOf(state.standing.player);
}

function nextPlayer(p: number): number {
  return (p + 1) % 4;
}

/** Le joueur courant passe. */
export function applyPass(state: GameState): GameState {
  const history = [...state.bidHistory, { player: state.current, kind: "pass" as const }];
  const passStreak = state.passStreak + 1;
  // 4 passes sans annonce -> redonne (donneur suivant).
  if (!state.standing && passStreak >= 4) {
    const redeal = { ...state, dealer: nextPlayer(state.dealer), bidHistory: history };
    return { ...startDeal(redeal), message: "Personne n'a pris — nouvelle donne." };
  }
  // Une annonce existe et tout le monde a passé après elle -> on joue.
  if (state.standing && passStreak >= 3) {
    return openPlay({ ...state, bidHistory: history });
  }
  return { ...state, bidHistory: history, passStreak, current: nextPlayer(state.current) };
}

/** Le joueur courant annonce un contrat. */
export function applyBid(
  state: GameState,
  value: number,
  mode: TrumpMode,
  capot: boolean,
): GameState {
  if (!canBid(state, value, capot)) return state;
  const standing: StandingBid = { player: state.current, value, mode, capot };
  const history = [
    ...state.bidHistory,
    { player: state.current, kind: "bid" as const, value, mode, capot },
  ];
  return {
    ...state,
    standing,
    bidHistory: history,
    passStreak: 0,
    current: nextPlayer(state.current),
  };
}

/** Coincher l'annonce en cours (un adversaire du preneur). */
export function applyCoinche(state: GameState): GameState {
  if (!canCoinche(state, state.current)) return state;
  const history = [...state.bidHistory, { player: state.current, kind: "coinche" as const }];
  // Après la coinche, on laisse au preneur l'occasion de surcoincher puis on joue.
  return {
    ...state,
    coinche: 2,
    bidHistory: history,
    passStreak: 0,
    current: state.standing!.player,
  };
}

export function applySurcoinche(state: GameState): GameState {
  if (!canSurcoinche(state, state.current)) return state;
  const history = [
    ...state.bidHistory,
    { player: state.current, kind: "surcoinche" as const },
  ];
  return openPlay({ ...state, coinche: 4, bidHistory: history });
}

/** Termine les enchères et passe au jeu. */
export function openPlay(state: GameState): GameState {
  const s = state.standing!;
  const contract: Contract = {
    value: s.capot ? 250 : s.value,
    mode: s.mode,
    taker: s.player,
    capot: s.capot,
    coinche: state.coinche,
  };
  const leader = nextPlayer(state.dealer);
  return {
    ...state,
    phase: "playing",
    contract,
    trick: [],
    trickLeader: leader,
    current: leader,
    completedTricks: [],
    message: "",
  };
}

// --- Jeu des plis -----------------------------------------------------------

export function legalForCurrent(state: GameState): Card[] {
  if (state.phase !== "playing" || !state.contract) return [];
  return legalMoves(state.hands[state.current], state.trick, state.current, state.contract.mode);
}

/** Le joueur courant joue une carte. */
export function applyPlay(state: GameState, card: Card): GameState {
  if (state.phase !== "playing" || !state.contract) return state;
  const legal = legalForCurrent(state);
  if (!legal.some((c) => c.id === card.id)) return state;

  const hands = state.hands.map((h, i) =>
    i === state.current ? h.filter((c) => c.id !== card.id) : h,
  );
  const trick: PlayedCard[] = [...state.trick, { card, player: state.current }];

  // Pli incomplet : au joueur suivant.
  if (trick.length < 4) {
    return { ...state, hands, trick, current: nextPlayer(state.current) };
  }

  // Pli complet : on détermine le gagnant.
  const wIdx = winningIndex(trick, state.contract.mode);
  const winner = trick[wIdx].player;
  const completed = [
    ...state.completedTricks,
    {
      cards: trick.map((p) => p.card),
      winner,
      winnerTeam: teamOf(winner),
    },
  ];

  // Dernière levée : on décompte la donne.
  if (completed.length === 8) {
    return finishDeal({ ...state, hands, trick: [], completedTricks: completed });
  }

  return {
    ...state,
    hands,
    trick: [],
    completedTricks: completed,
    trickLeader: winner,
    current: winner,
  };
}

/** Décompte la donne, met à jour les scores et l'état de fin de partie. */
function finishDeal(state: GameState): GameState {
  const contract = state.contract!;
  const result = scoreDeal(contract, {
    trickWinners: state.completedTricks.map((t) => t.winnerTeam),
    tricks: state.completedTricks.map((t) => t.cards),
    hands: state.dealtHands,
  });

  const scores: [number, number] = [
    state.scores[0] + result.scores[0],
    state.scores[1] + result.scores[1],
  ];

  // Fin de partie : score cible atteint, ou coinche gagnante si l'option est active.
  const coinched = contract.coinche > 1;
  const reachedTarget =
    scores[0] >= state.settings.targetScore || scores[1] >= state.settings.targetScore;
  const gameOver =
    reachedTarget ||
    (state.settings.coincheEndsGame && coinched && scores[0] !== scores[1]);

  const takerName = state.settings.playerNames[contract.taker];
  const verb = result.made ? "réussit" : "chute sur";
  const message = `${takerName} ${verb} son contrat. ` +
    `(+${result.scores[result.takerTeam]} / +${result.scores[(1 - result.takerTeam) as Team]})`;

  return {
    ...state,
    phase: gameOver ? "gameOver" : "dealScored",
    scores,
    lastResult: result,
    message,
  };
}

/** Passe à la donne suivante (donneur tournant). */
export function nextDeal(state: GameState): GameState {
  return startDeal({ ...state, dealer: nextPlayer(state.dealer) });
}

export function winnerTeam(state: GameState): Team | null {
  if (state.phase !== "gameOver") return null;
  return state.scores[0] >= state.scores[1] ? 0 : 1;
}
