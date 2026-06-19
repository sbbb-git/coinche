// Machine d'état d'une partie : distribution, enchères, jeu des plis.

import { Card, TrumpMode, freshDeck } from "./cards";
import { Contract, ScoreBreakdown, Team, scoreDeal, teamOf } from "./scoring";
import { PlayedCard, legalMoves, winningIndex } from "./rules";

export type AiLevel = "easy" | "medium" | "hard" | "expert";
export type Phase = "bidding" | "playing" | "dealScored" | "gameOver";

/** Profil de jeu commun à l'IA et au coach. */
export interface PlayProfile {
  aggressiveness: number; // 0 (prudent / petit jeu) → 1 (offensif)
  appels: "directs" | "indirects" | "aucun"; // signalisation au partenaire
  jeuAuxAs: boolean; // privilégier la sortie des as à l'entame
  entameAtoutValet: boolean; // le partenaire entame atout s'il a le valet
  appelBelote: boolean; // annonce de la belote
  systemeEncheres: "simple" | "graux"; // conventions d'enchères
  conventionAnnonce100: boolean; // annoncer 100 après un 80 si on a Valet + 9
}

export interface Settings {
  // — Jeu (règles) —
  targetScore: number; // 1000 / 1500 / 2000
  allowNT: boolean; // autoriser Sans Atout
  allowAT: boolean; // autoriser Tout Atout
  beloteAtToutAtout: boolean; // belote/rebelote comptée à Tout Atout
  allowCoinche: boolean;
  allowSurcoinche: boolean;
  allowGenerale: boolean; // autoriser l'annonce de Générale (500)
  pisserObligatoire: boolean; // obligation de mettre de l'atout si on ne peut surcouper
  coincheEndsGame: boolean; // "la coinche fait gagner la partie"

  // — Comptage des points —
  roundToTen: boolean; // arrondir les scores à la dizaine
  contractCanSucceedIfDefenseMore: boolean; // sinon il faut faire > la défense
  beloteCountsToSucceed: boolean; // la belote compte pour réussir un contrat
  beloteCountsToFail: boolean; // la belote compte pour faire chuter un contrat

  // — IA —
  aiLevel: AiLevel;
  /** profondeur de simulation de l'IA Expert (force ↔ rapidité) */
  expertDepth: "rapide" | "normal" | "fort";
  profile: PlayProfile;

  // — Interface —
  gameSpeed: "lent" | "normal" | "rapide";
  sensHoraire: boolean; // sens de jeu (false = anti-horaire, défaut app)
  cardSort: "asc" | "desc"; // ordre d'affichage de la main
  fourColors: boolean; // jeu 4 couleurs (accessibilité daltoniens)
  sound: boolean; // effets sonores
  haptics: boolean; // vibrations (iPhone)
  autoPlaySingle: boolean; // jouer automatiquement quand une seule carte est jouable
  preselectPlayable: boolean; // mettre en évidence les cartes jouables
  showLiveScores: boolean; // afficher les scores en cours de donne

  /** noms des 4 joueurs ; index 0 = joueur humain (en bas) */
  playerNames: [string, string, string, string];
}

export const DEFAULT_PROFILE: PlayProfile = {
  aggressiveness: 0.5,
  appels: "directs",
  jeuAuxAs: true,
  entameAtoutValet: false,
  appelBelote: true,
  systemeEncheres: "graux",
  conventionAnnonce100: true,
};

export const DEFAULT_SETTINGS: Settings = {
  targetScore: 1000,
  allowNT: false, // Sans Atout désactivé par défaut (Sacha joue sans)
  allowAT: false, // Tout Atout désactivé par défaut
  beloteAtToutAtout: false,
  allowCoinche: true,
  allowSurcoinche: true,
  allowGenerale: false,
  pisserObligatoire: true,
  coincheEndsGame: false,
  roundToTen: false,
  contractCanSucceedIfDefenseMore: false,
  beloteCountsToSucceed: true,
  beloteCountsToFail: true,
  aiLevel: "medium",
  expertDepth: "normal",
  profile: DEFAULT_PROFILE,
  gameSpeed: "normal",
  sensHoraire: false,
  cardSort: "asc",
  fourColors: false,
  sound: true,
  haptics: true,
  autoPlaySingle: false,
  preselectPlayable: true,
  showLiveScores: true,
  playerNames: ["Vous", "Ouest", "Nord", "Est"],
};

/** Durée des pauses selon la vitesse de jeu choisie. */
export function speedMs(s: Settings): { ai: number; trick: number } {
  switch (s.gameSpeed) {
    case "lent":
      return { ai: 900, trick: 1900 };
    case "rapide":
      return { ai: 350, trick: 800 };
    default:
      return { ai: 600, trick: 1300 };
  }
}

export interface StandingBid {
  player: number;
  value: number;
  mode: TrumpMode;
  capot: boolean;
  generale: boolean;
}

export interface BidEntry {
  player: number;
  kind: "bid" | "pass" | "coinche" | "surcoinche";
  value?: number;
  mode?: TrumpMode;
  capot?: boolean;
  generale?: boolean;
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
  completedTricks: {
    cards: Card[];
    played: PlayedCard[]; // cartes + joueurs, dans l'ordre (pour appels & review)
    winner: number;
    winnerTeam: Team;
  }[];

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
  // Distribution 3-2-3 en partant du joueur après le donneur (sens de jeu).
  const order: number[] = [];
  let seat = next(state, state.dealer);
  for (let i = 0; i < 4; i++) {
    order.push(seat);
    seat = next(state, seat);
  }
  let k = 0;
  for (const count of [3, 2, 3]) {
    for (const p of order) {
      for (let c = 0; c < count; c++) hands[p].push(deck[k++]);
    }
  }
  const sorted = hands.map((h) => sortHand(h, state.settings.cardSort));
  const opener = next(state, state.dealer);
  return {
    ...state,
    phase: "bidding",
    hands: sorted,
    dealtHands: sorted.map((h) => [...h]),
    current: opener,
    bidHistory: [],
    standing: null,
    coinche: 1,
    passStreak: 0,
    contract: null,
    trick: [],
    trickLeader: opener,
    completedTricks: [],
    lastResult: null,
    message: "",
  };
}

/** Reconstruit l'état initial d'une donne (phase enchères) à partir de mains
 *  connues, sans mélanger — pour rejouer/analyser une partie enregistrée. */
export function dealStateFrom(settings: Settings, dealer: number, hands: Card[][]): GameState {
  const base: GameState = {
    settings,
    phase: "bidding",
    dealer,
    current: 0,
    hands: hands.map((h) => [...h]),
    dealtHands: hands.map((h) => [...h]),
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
  const opener = next(base, dealer);
  return { ...base, current: opener, trickLeader: opener };
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

/** Tri d'affichage : par couleur puis par force usuelle (ordre réglable). */
export function sortHand(hand: Card[], order: "asc" | "desc" = "asc"): Card[] {
  const dir = order === "asc" ? 1 : -1;
  return [...hand].sort((a, b) => {
    if (a.suit !== b.suit) return (SUIT_SORT[a.suit] - SUIT_SORT[b.suit]) * dir;
    return (RANK_SORT[a.rank] - RANK_SORT[b.rank]) * dir;
  });
}

// --- Enchères ---------------------------------------------------------------

export function canBid(
  state: GameState,
  value: number,
  capot: boolean,
  generale = false,
): boolean {
  // Générale : autorisée si l'option est active, jamais en premier de parole,
  // et bat tout (capot inclus).
  if (generale) {
    return (
      state.settings.allowGenerale &&
      state.bidHistory.length > 0 &&
      !state.standing?.generale
    );
  }
  if (state.standing?.generale) return false; // rien ne passe au-dessus d'une générale
  if (capot) return !state.standing?.capot;
  if (state.standing?.capot) return false;
  // Annonce valide : 80..160 par pas de 10.
  if (value < 80 || value > 160 || value % 10 !== 0) return false;
  return !state.standing || value > state.standing.value;
}

export function canCoinche(state: GameState, player: number): boolean {
  if (!state.settings.allowCoinche || !state.standing) return false;
  if (state.coinche !== 1) return false;
  return teamOf(player) !== teamOf(state.standing.player);
}

export function canSurcoinche(state: GameState, player: number): boolean {
  if (!state.settings.allowCoinche || !state.settings.allowSurcoinche || !state.standing)
    return false;
  if (state.coinche !== 2) return false;
  return teamOf(player) === teamOf(state.standing.player);
}

/** Joueur suivant selon le sens de jeu (anti-horaire par défaut). */
function next(state: GameState, p: number): number {
  return state.settings.sensHoraire ? (p + 1) % 4 : (p + 3) % 4;
}

/** Le joueur courant passe. */
export function applyPass(state: GameState): GameState {
  const history = [...state.bidHistory, { player: state.current, kind: "pass" as const }];
  // Cas particulier : on vient de coincher, le preneur décline la surcoinche -> on joue.
  if (
    state.coinche === 2 &&
    state.standing &&
    teamOf(state.current) === teamOf(state.standing.player)
  ) {
    return openPlay({ ...state, bidHistory: history });
  }
  const passStreak = state.passStreak + 1;
  // 4 passes sans annonce -> redonne (donneur suivant).
  if (!state.standing && passStreak >= 4) {
    const redeal = { ...state, dealer: next(state, state.dealer), bidHistory: history };
    return { ...startDeal(redeal), message: "Personne n'a pris — nouvelle donne." };
  }
  // Une annonce existe et tout le monde a passé après elle -> on joue.
  if (state.standing && passStreak >= 3) {
    return openPlay({ ...state, bidHistory: history });
  }
  return { ...state, bidHistory: history, passStreak, current: next(state, state.current) };
}

/** Le joueur courant annonce un contrat. */
export function applyBid(
  state: GameState,
  value: number,
  mode: TrumpMode,
  capot: boolean,
  generale = false,
): GameState {
  if (!canBid(state, value, capot, generale)) return state;
  const standing: StandingBid = { player: state.current, value, mode, capot, generale };
  const history = [
    ...state.bidHistory,
    { player: state.current, kind: "bid" as const, value, mode, capot, generale },
  ];
  return {
    ...state,
    standing,
    bidHistory: history,
    passStreak: 0,
    current: next(state, state.current),
  };
}

/** Coincher l'annonce en cours (un adversaire du preneur). La coinche est
 *  possible « à la volée » : `player` peut différer du joueur dont c'est le tour. */
export function applyCoinche(state: GameState, player = state.current): GameState {
  if (!canCoinche(state, player)) return state;
  const history = [...state.bidHistory, { player, kind: "coinche" as const }];
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
    value: s.generale ? 500 : s.capot ? 250 : s.value,
    mode: s.mode,
    taker: s.player,
    capot: s.capot,
    generale: s.generale,
    coinche: state.coinche,
  };
  const leader = next(state, state.dealer);
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
  return legalMoves(state.hands[state.current], state.trick, state.current, state.contract.mode, {
    pisserObligatoire: state.settings.pisserObligatoire,
  });
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
    return { ...state, hands, trick, current: next(state, state.current) };
  }

  // Pli complet : on détermine le gagnant.
  const wIdx = winningIndex(trick, state.contract.mode);
  const winner = trick[wIdx].player;
  const completed = [
    ...state.completedTricks,
    {
      cards: trick.map((p) => p.card),
      played: trick,
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
  const s = state.settings;
  const result = scoreDeal(
    contract,
    {
      trickWinners: state.completedTricks.map((t) => t.winnerTeam),
      trickWinnerPlayers: state.completedTricks.map((t) => t.winner),
      tricks: state.completedTricks.map((t) => t.cards),
      hands: state.dealtHands,
    },
    {
      roundToTen: s.roundToTen,
      contractCanSucceedIfDefenseMore: s.contractCanSucceedIfDefenseMore,
      beloteCountsToSucceed: s.beloteCountsToSucceed,
      beloteCountsToFail: s.beloteCountsToFail,
      beloteAtToutAtout: s.beloteAtToutAtout,
    },
  );

  const scores: [number, number] = [
    state.scores[0] + result.scores[0],
    state.scores[1] + result.scores[1],
  ];

  // Fin de partie : score cible atteint, ou coinche gagnante si l'option est active.
  const coinched = contract.coinche > 1;
  // Cible atteinte ET pas d'égalité : sinon on joue une donne de départage.
  const reachedTarget =
    (scores[0] >= state.settings.targetScore || scores[1] >= state.settings.targetScore) &&
    scores[0] !== scores[1];
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
  return startDeal({ ...state, dealer: next(state, state.dealer) });
}

export function winnerTeam(state: GameState): Team | null {
  if (state.phase !== "gameOver") return null;
  return state.scores[0] >= state.scores[1] ? 0 : 1;
}
