// Intelligence artificielle : enchères et jeu, sur 3 niveaux.

import { Card, Suit, SUITS, TrumpMode, isTrump, points, strength } from "./cards";
import {
  GameState,
  availableModes,
  canBid,
  canCoinche,
  canSurcoinche,
  legalForCurrent,
} from "./game";
import { PlayedCard, beats, partnerIsWinning, winningIndex } from "./rules";
import { teamOf } from "./scoring";

export type BidDecision =
  | { action: "pass" }
  | { action: "bid"; value: number; mode: TrumpMode; capot: boolean }
  | { action: "coinche" }
  | { action: "surcoinche" };

function rnd(): number {
  return Math.random();
}

// --- Évaluation d'une main pour un mode d'atout donné -----------------------

/** Estimation grossière des points qu'une main peut rapporter dans un mode. */
export function estimateForMode(hand: Card[], mode: TrumpMode): number {
  if (mode === "NT") return estimateNT(hand);
  if (mode === "AT") return estimateAT(hand);
  return estimateSuit(hand, mode);
}

function estimateSuit(hand: Card[], trump: Suit): number {
  const trumps = hand.filter((c) => c.suit === trump);
  const n = trumps.length;
  if (n === 0) return 0;

  let est = 0;
  const hasJ = trumps.some((c) => c.rank === "J");
  const has9 = trumps.some((c) => c.rank === "9");
  const hasA = trumps.some((c) => c.rank === "A");
  const has10 = trumps.some((c) => c.rank === "10");

  if (hasJ) est += 20;
  if (has9) est += has9 && (hasJ || n >= 3) ? 14 : 9;
  if (hasA) est += 11;
  if (has10) est += n >= 3 ? 10 : 4;
  // Contrôle apporté par la longueur d'atout.
  est += Math.max(0, n - 2) * 6;
  if (n >= 5) est += 8;

  // Belote.
  const hasK = trumps.some((c) => c.rank === "K");
  const hasQ = trumps.some((c) => c.rank === "Q");
  if (hasK && hasQ) est += 20;
  else if (hasK || hasQ) est += 2;

  // Cartes maîtresses dans les couleurs annexes.
  for (const s of SUITS) {
    if (s === trump) continue;
    const suit = hand.filter((c) => c.suit === s);
    const ace = suit.some((c) => c.rank === "A");
    const ten = suit.some((c) => c.rank === "10");
    if (ace) est += suit.length === 1 ? 11 : 9; // sec = très sûr
    if (ten && ace) est += 8;
    else if (ten && suit.length >= 2) est += 4;
    // Une couleur courte aide à couper.
    if (suit.length === 0 && n >= 3) est += 6;
  }
  return est;
}

function estimateNT(hand: Card[]): number {
  // Sans atout : on compte surtout les As et les 10 protégés.
  let est = 0;
  for (const s of SUITS) {
    const suit = hand.filter((c) => c.suit === s);
    const ace = suit.some((c) => c.rank === "A");
    const ten = suit.some((c) => c.rank === "10");
    const king = suit.some((c) => c.rank === "K");
    if (ace) est += 19;
    if (ten && (ace || suit.length >= 3)) est += 10;
    if (king && suit.length >= 3) est += 4;
  }
  return est * 0.85; // sans atout, c'est risqué : on tempère.
}

function estimateAT(hand: Card[]): number {
  // Tout atout : les valets et 9 valent de l'or.
  let est = 0;
  for (const s of SUITS) {
    const suit = hand.filter((c) => c.suit === s);
    if (suit.some((c) => c.rank === "J")) est += 14;
    if (suit.some((c) => c.rank === "9")) est += 9;
    if (suit.some((c) => c.rank === "A")) est += 6;
  }
  return est * 0.9;
}

/** Meilleur mode pour une main + estimation associée. */
export function bestContract(hand: Card[], modes: TrumpMode[]): { mode: TrumpMode; est: number } {
  let best: { mode: TrumpMode; est: number } = { mode: "S", est: -1 };
  for (const m of modes) {
    const est = estimateForMode(hand, m);
    if (est > best.est) best = { mode: m, est };
  }
  return best;
}

// --- Décision d'enchère -----------------------------------------------------

export function aiBid(state: GameState, player: number): BidDecision {
  const level = state.settings.aiLevel;
  const profile = state.settings.profile;
  const strong = level === "hard" || level === "expert";
  const hand = state.hands[player];
  const modes = availableModes(state.settings);
  const { mode, est: rawEst } = bestContract(hand, modes);

  // Bruit selon le niveau + biais d'agressivité du profil.
  const noise = level === "easy" ? (rnd() - 0.5) * 40 : level === "medium" ? (rnd() - 0.5) * 12 : 0;
  const aggro = (profile.aggressiveness - 0.5) * 24; // prudent baisse, offensif relève
  const est = rawEst + noise + aggro;

  // Coinche défensive.
  if (state.standing && teamOf(state.standing.player) !== teamOf(player)) {
    if (canCoinche(state, player) && shouldCoinche(state, player, strong, profile.aggressiveness)) {
      return { action: "coinche" };
    }
  }
  // Surcoinche si on est le preneur coinché et très confiant.
  if (canSurcoinche(state, player)) {
    const myEst = estimateForMode(hand, state.standing!.mode);
    if (strong && myEst >= state.standing!.value + 25) return { action: "surcoinche" };
    return { action: "pass" };
  }

  // Convention « 100 fort » : après un 80 du partenaire à la couleur, relancer à 100
  // dans cette couleur si on a le Valet ET le 9 d'atout.
  if (
    profile.systemeEncheres === "graux" &&
    profile.conventionAnnonce100 &&
    state.standing &&
    !state.standing.capot &&
    state.standing.value === 80 &&
    teamOf(state.standing.player) === teamOf(player) &&
    (state.standing.mode === "S" ||
      state.standing.mode === "H" ||
      state.standing.mode === "D" ||
      state.standing.mode === "C")
  ) {
    const tr = state.standing.mode;
    const hasJ = hand.some((c) => c.suit === tr && c.rank === "J");
    const has9 = hand.some((c) => c.suit === tr && c.rank === "9");
    if (hasJ && has9 && canBid(state, 100, false)) {
      return { action: "bid", value: 100, mode: tr, capot: false };
    }
  }

  // Valeur d'annonce visée (arrondie à la dizaine inférieure).
  let target = Math.floor(est / 10) * 10;
  target = Math.max(80, Math.min(160, target));

  const standingVal = state.standing?.value ?? 0;
  const standingIsPartner = state.standing
    ? teamOf(state.standing.player) === teamOf(player)
    : false;

  // On ne surenchérit pas son propre partenaire sans gain net.
  const minToBid = standingIsPartner ? standingVal + 20 : standingVal + 10;

  if (est >= 80 && target >= minToBid && !state.standing?.capot) {
    // Capot si la main est exceptionnelle.
    if (level !== "easy" && est >= 155 && rnd() < 0.5) {
      return { action: "bid", value: 250, mode, capot: true };
    }
    return { action: "bid", value: target, mode, capot: false };
  }
  return { action: "pass" };
}

function shouldCoinche(
  state: GameState,
  player: number,
  strong: boolean,
  aggressiveness: number,
): boolean {
  const level = state.settings.aiLevel;
  if (level === "easy") return false;
  const v = state.standing!.value;
  if (state.standing!.capot) return strong && rnd() < 0.3;
  // On coinche un contrat ambitieux qu'on pense pouvoir faire chuter.
  const defenseEst = estimateForMode(state.hands[player], state.standing!.mode);
  const margin = strong ? 0 : 15;
  const proba = (strong ? 0.6 : 0.3) + (aggressiveness - 0.5) * 0.3;
  return v >= 120 && defenseEst >= 162 - v + margin && rnd() < proba;
}

// --- Choix d'une carte ------------------------------------------------------

export function aiPlay(state: GameState): Card {
  const legal = legalForCurrent(state);
  if (legal.length === 1) return legal[0];
  const level = state.settings.aiLevel;
  if (level === "easy") return legal[Math.floor(rnd() * legal.length)];
  const hard = level === "hard" || level === "expert";
  return heuristicPlay(state, legal, hard);
}

function lowest(cards: Card[], mode: TrumpMode): Card {
  return [...cards].sort((a, b) => points(a, mode) - points(b, mode) || strength(a, mode) - strength(b, mode))[0];
}
function highest(cards: Card[], mode: TrumpMode): Card {
  return [...cards].sort((a, b) => strength(b, mode) - strength(a, mode))[0];
}
function cheapestWinner(legal: Card[], trick: PlayedCard[], mode: TrumpMode): Card | null {
  if (trick.length === 0) return null;
  const led = trick[0].card.suit;
  const wIdx = winningIndex(trick, mode);
  const toBeat = trick[wIdx].card;
  const winners = legal.filter((c) => beats(c, toBeat, led, mode));
  if (winners.length === 0) return null;
  // Le moins cher qui gagne (économise les grosses cartes).
  return [...winners].sort(
    (a, b) => strength(a, mode) - strength(b, mode) || points(a, mode) - points(b, mode),
  )[0];
}

function heuristicPlay(state: GameState, legal: Card[], hard: boolean): Card {
  const mode = state.contract!.mode;
  const trick = state.trick;
  const me = state.current;

  // Entame.
  if (trick.length === 0) return leadCard(state, legal, hard);

  const partnerMaster = partnerIsWinning(trick, me, mode);
  const isLastToPlay = trick.length === 3;
  const trickPoints = trick.reduce((s, p) => s + points(p.card, mode), 0);

  if (partnerMaster) {
    // Le partenaire tient le pli.
    if (isLastToPlay || partnerSurelyWins(state, hard)) {
      // On "charge" : on donne le maximum de points au partenaire.
      return [...legal].sort((a, b) => points(b, mode) - points(a, mode))[0];
    }
    // Sinon on se défausse petit (sans gaspiller une maîtresse).
    return discardLow(legal, mode);
  }

  // L'adversaire tient le pli : peut-on (et doit-on) prendre ?
  const winner = cheapestWinner(legal, trick, mode);
  if (winner) {
    // On prend si le pli vaut le coup, ou si on est dernier, ou avec une petite carte.
    const worthIt = isLastToPlay || trickPoints >= 8 || points(winner, mode) <= 4;
    if (worthIt) return winner;
  }
  // On ne peut/veut pas prendre : on se défausse au plus économique.
  return discardLow(legal, mode);
}

/** Le partenaire est-il certain de remporter le pli (aucune carte adverse ne peut surpasser) ? */
function partnerSurelyWins(state: GameState, hard: boolean): boolean {
  if (!hard) return false;
  const mode = state.contract!.mode;
  const trick = state.trick;
  const led = trick[0].card.suit;
  const wIdx = winningIndex(trick, mode);
  const master = trick[wIdx].card;
  // Cartes encore en jeu chez les adversaires non encore passés.
  const seen = seenCards(state);
  const remaining = allCards().filter((c) => !seen.has(c.id));
  // Les joueurs restant à jouer après nous.
  const toPlay = 4 - trick.length - 1;
  if (toPlay <= 0) return true;
  // Une carte adverse restante pourrait-elle battre le maître ?
  return !remaining.some((c) => beats(c, master, led, mode));
}

function leadCard(state: GameState, legal: Card[], hard: boolean): Card {
  const mode = state.contract!.mode;
  const me = state.current;
  const profile = state.settings.profile;
  const iAmTaker = teamOf(state.contract!.taker) === teamOf(me);
  const trumps = legal.filter((c) => isTrump(c, mode));

  // Convention : entamer atout avec le Valet si on l'a (équipe preneuse).
  if (iAmTaker && profile.entameAtoutValet) {
    const jack = trumps.find((c) => c.rank === "J");
    if (jack) return jack;
  }

  // Équipe preneuse : tirer ses atouts maîtres pour faire tomber ceux des adversaires.
  if (iAmTaker && trumps.length > 0) {
    const topTrump = highest(trumps, mode);
    if (!hard || isMasterCard(state, topTrump)) return topTrump;
  }

  // Jouer une couleur maîtresse (As) hors atout, si le profil le veut.
  if (profile.jeuAuxAs) {
    const aces = legal.filter((c) => c.rank === "A" && !isTrump(c, mode));
    for (const ace of aces) {
      if (!hard || isMasterCard(state, ace)) return ace;
    }
  }

  // À défaut, entamer petit dans une couleur non-atout.
  const sideLow = legal.filter((c) => !isTrump(c, mode));
  if (sideLow.length > 0) return lowest(sideLow, mode);
  return lowest(legal, mode);
}

function isMasterCard(state: GameState, card: Card): boolean {
  const mode = state.contract!.mode;
  const seen = seenCards(state);
  const remaining = allCards().filter((c) => !seen.has(c.id) && c.id !== card.id);
  // Maître si aucune carte de même rôle plus forte n'est encore dehors.
  const led = card.suit;
  return !remaining.some((c) => beats(c, card, led, mode));
}

function discardLow(legal: Card[], mode: TrumpMode): Card {
  // On évite de défausser une carte chère ; à valeur égale, la plus faible.
  return [...legal].sort(
    (a, b) => points(a, mode) - points(b, mode) || strength(a, mode) - strength(b, mode),
  )[0];
}

// --- Mémoire des cartes (niveau difficile) ----------------------------------

let CACHE: Card[] | null = null;
function allCards(): Card[] {
  if (!CACHE) {
    CACHE = [];
    for (const s of SUITS)
      for (const r of ["7", "8", "9", "10", "J", "Q", "K", "A"] as Card["rank"][])
        CACHE.push({ suit: s, rank: r, id: `${s}${r}` });
  }
  return CACHE;
}

/** Toutes les cartes déjà vues (plis terminés + pli courant + ma main). */
function seenCards(state: GameState): Set<string> {
  const seen = new Set<string>();
  for (const t of state.completedTricks) for (const c of t.cards) seen.add(c.id);
  for (const p of state.trick) seen.add(p.card.id);
  for (const c of state.hands[state.current]) seen.add(c.id);
  return seen;
}
