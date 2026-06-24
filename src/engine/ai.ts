// Intelligence artificielle : enchères et jeu, sur 3 niveaux.

import { Card, Suit, SUITS, TrumpMode, freshDeck, isTrump, points, strength } from "./cards";
import {
  GameState,
  applyPlay,
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
  | { action: "bid"; value: number; mode: TrumpMode; capot: boolean; generale: boolean }
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
  if (has9) est += has9 && (hasJ || n >= 3) ? 14 : 10;
  if (hasA) est += 11;
  if (has10) est += n >= 3 ? 10 : 6;
  // Contrôle apporté par la longueur d'atout (chaque atout au-delà de 2 fait
  // tomber un atout adverse et sécurise les couleurs annexes).
  est += Math.max(0, n - 2) * 9;
  if (n >= 5) est += 14;
  if (n >= 6) est += 10;

  // Belote.
  const hasK = trumps.some((c) => c.rank === "K");
  const hasQ = trumps.some((c) => c.rank === "Q");
  if (hasK && hasQ) est += 20;
  else if (hasK || hasQ) est += 3;

  // Cartes maîtresses (et gardes) dans les couleurs annexes.
  for (const s of SUITS) {
    if (s === trump) continue;
    const suit = hand.filter((c) => c.suit === s);
    const ace = suit.some((c) => c.rank === "A");
    const ten = suit.some((c) => c.rank === "10");
    const king = suit.some((c) => c.rank === "K");
    if (ace) est += suit.length === 1 ? 13 : 11; // sec = très sûr
    if (ten && ace) est += 9;
    else if (ten && suit.length >= 2) est += 5;
    // Roi de côté : gardé il rapporte souvent, sec il tombe facilement.
    if (king && !ace) est += suit.length >= 2 ? 5 : 1;
    // Une couleur courte aide à couper (d'autant plus avec beaucoup d'atouts).
    if (suit.length === 0 && n >= 3) est += n >= 4 ? 12 : 8;
    else if (suit.length === 1 && n >= 4) est += 4;
  }

  // FORME (mains bicolores, cf. Graux §5.14) : une 2e couleur longue hors atout
  // donne des plis « de longueur » après la chute des atouts. Bonus volontairement
  // modéré (la longueur d'atout et les As sont déjà comptés) pour ne pas sur-annoncer.
  const sideLengths = SUITS.filter((s) => s !== trump)
    .map((s) => hand.filter((c) => c.suit === s).length)
    .sort((a, b) => b - a);
  if ((sideLengths[0] ?? 0) >= 5) est += 6; // couleur annexe longue (5+)
  if ((sideLengths[1] ?? 0) >= 4 && (sideLengths[0] ?? 0) >= 4) est += 4; // vrai bicolore
  // Contribution attendue du partenaire : à la coinche on joue en équipe, le
  // partenaire apporte en moyenne ~25-30 points. Sans cette allocation, l'IA
  // sous-évalue massivement (elle réalise ~140 mais n'annonce que ~90).
  est += 28;
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

/**
 * De combien (0 / 10 / 20) relancer le contrat du partenaire selon notre SOUTIEN
 * dans sa couleur : atouts détenus, Valet/9 de sa couleur, et As extérieurs (plis
 * probables pour l'équipe). Sert à ce que le partenaire ne « laisse pas tomber »
 * une bonne main quand on a déjà pris.
 */
export function partnerSupportRaise(hand: Card[], ps: Suit): number {
  const trumps = hand.filter((c) => c.suit === ps);
  const n = trumps.length;
  const hasJ = trumps.some((c) => c.rank === "J");
  const has9 = trumps.some((c) => c.rank === "9");
  const outsideAces = hand.filter((c) => c.suit !== ps && c.rank === "A").length;
  let s = 0;
  if (hasJ) s += 3;
  if (has9) s += 2;
  s += Math.max(0, n - 1); // chaque atout au-delà du premier renforce le soutien
  s += outsideAces * 3; // un As extérieur = un pli quasi sûr pour l'équipe
  if (s >= 8) return 20;
  if (s >= 5) return 10;
  return 0;
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

// --- Lecture des annonces ---------------------------------------------------

/** Information tirée des enchères déjà prononcées, du point de vue d'un joueur. */
export interface AuctionRead {
  oppBestInSuit: Partial<Record<TrumpMode, number>>; // plus haute annonce adverse par couleur
  oppBestAny: number; // plus haute annonce adverse, tous modes
  partnerSuit: TrumpMode | null; // couleur annoncée par le partenaire (la plus récente)
  partnerValue: number; // sa valeur
}

export function readAuction(state: GameState, player: number): AuctionRead {
  const myTeam = teamOf(player);
  const r: AuctionRead = { oppBestInSuit: {}, oppBestAny: 0, partnerSuit: null, partnerValue: 0 };
  for (const e of state.bidHistory) {
    if (e.kind !== "bid" || e.value == null || e.mode == null) continue;
    if (e.capot || e.generale) continue; // annonces de structure, traitées à part
    if (teamOf(e.player) !== myTeam) {
      r.oppBestAny = Math.max(r.oppBestAny, e.value);
      r.oppBestInSuit[e.mode] = Math.max(r.oppBestInSuit[e.mode] ?? 0, e.value);
    } else if (e.player !== player) {
      r.partnerSuit = e.mode;
      r.partnerValue = Math.max(r.partnerValue, e.value);
    }
  }
  return r;
}

/**
 * Estimation d'une main pour un mode, CORRIGÉE par les annonces déjà entendues :
 * - un adversaire a pris dans cette couleur ⇒ il tient les gros atouts (V/9) :
 *   très mauvais choix d'atout pour nous, on dévalue fortement ;
 * - des adversaires forts globalement ⇒ il reste moins de points pour notre camp ;
 * - le partenaire a annoncé notre couleur ⇒ soutien, on revalorise.
 * Sans annonce (début de parole), le résultat est identique à `estimateForMode`.
 */
export function estimateWithAuction(
  hand: Card[],
  mode: TrumpMode,
  read: AuctionRead,
): number {
  let est = estimateForMode(hand, mode);
  const oppInMode = read.oppBestInSuit[mode] ?? 0;
  if (oppInMode > 0 && mode !== "NT" && mode !== "AT") {
    est -= 22 + (oppInMode - 80) * 0.5; // ils ont les maîtres atouts de cette couleur
  }
  if (read.oppBestAny > 0) est -= 4 + (read.oppBestAny - 80) * 0.25;
  if (read.partnerSuit && read.partnerSuit === mode) est += 8;
  return est;
}

/** Meilleur contrat en tenant compte des annonces déjà entendues. */
export function bestContractAuction(
  state: GameState,
  player: number,
  modes: TrumpMode[],
): { mode: TrumpMode; est: number; read: AuctionRead } {
  const read = readAuction(state, player);
  const hand = state.hands[player];
  let best: { mode: TrumpMode; est: number } = { mode: modes[0], est: -Infinity };
  for (const m of modes) {
    const est = estimateWithAuction(hand, m, read);
    if (est > best.est) best = { mode: m, est };
  }
  return { ...best, read };
}

// --- Décision d'enchère -----------------------------------------------------

export function aiBid(state: GameState, player: number): BidDecision {
  const level = state.settings.aiLevel;
  const profile = state.settings.profile;
  const strong = level === "hard" || level === "expert";
  const hand = state.hands[player];
  const modes = availableModes(state.settings);
  if (modes.length === 0) return { action: "pass" }; // garde : aucun mode autorisé
  // Choix du contrat À LA LUMIÈRE DES ANNONCES déjà entendues (cf. estimateWithAuction).
  const { mode, est: rawEst } = bestContractAuction(state, player, modes);

  // Bruit selon le niveau. Biaisé vers le BAS pour les niveaux faibles : ils
  // évaluent mal et surtout sous-estiment / hésitent (ils ne doivent pas
  // surenchérir à l'aveugle, ce qui les ferait chuter).
  const noise =
    level === "easy"
      ? (rnd() - 0.75) * 36
      : level === "medium"
        ? (rnd() - 0.55) * 16
        : 0;
  // Le niveau d'enchère suit la force de JEU : seul l'Expert (recherche PIMC)
  // annonce au plus juste ; les niveaux qui jouent à l'heuristique enchérissent
  // plus prudemment, sinon ils sur-annoncent et chutent.
  const levelBias = level === "easy" ? -22 : level === "medium" ? -14 : 0;
  const aggro = (profile.aggressiveness - 0.5) * 24; // prudent baisse, offensif relève
  const est = rawEst + noise + aggro + levelBias;

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
      return { action: "bid", value: 100, mode: tr, capot: false, generale: false };
    }
  }

  // Générale : main capable de tout rafler SEUL (très rare, jamais en 1er de parole).
  if (
    level !== "easy" &&
    state.settings.allowGenerale &&
    state.bidHistory.length > 0 &&
    !state.standing?.generale &&
    generaleWorthy(hand, mode)
  ) {
    return { action: "bid", value: 500, mode, capot: false, generale: true };
  }

  // Valeur d'annonce visée (arrondie à la dizaine la plus proche).
  let target = Math.round(est / 10) * 10;
  target = Math.max(80, Math.min(160, target));

  const standingVal = state.standing?.value ?? 0;
  const standingIsPartner = state.standing
    ? teamOf(state.standing.player) === teamOf(player)
    : false;

  // On ne surenchérit pas son propre partenaire sans gain net.
  const minToBid = standingIsPartner ? standingVal + 20 : standingVal + 10;

  // Capot : main qui domine vraiment (atout maître + couleurs annexes tenues).
  if (level !== "easy" && !state.standing?.capot && capotWorthy(hand, mode)) {
    return { action: "bid", value: 250, mode, capot: true, generale: false };
  }

  // Soutien du partenaire : il a pris dans une couleur ; si j'y ai du jeu (atouts,
  // Valet/9) ou des As extérieurs, je RELANCE dans sa couleur au lieu de passer.
  // Garde-fou anti-surenchère en boucle : on ne soutient QUE si l'on n'a pas
  // encore annoncé soi-même dans cette donne, et tant que l'enchère reste basse.
  const iHaveBid = state.bidHistory.some((e) => e.player === player && e.kind === "bid");
  if (
    level !== "easy" &&
    state.standing &&
    !state.standing.capot &&
    !state.standing.generale &&
    !iHaveBid &&
    state.standing.value <= 120 &&
    teamOf(state.standing.player) === teamOf(player) &&
    (state.standing.mode === "S" ||
      state.standing.mode === "H" ||
      state.standing.mode === "D" ||
      state.standing.mode === "C")
  ) {
    const ps = state.standing.mode;
    const inc = partnerSupportRaise(hand, ps);
    const tgt = Math.min(160, state.standing.value + inc);
    if (inc > 0 && canBid(state, tgt, false)) {
      return { action: "bid", value: tgt, mode: ps, capot: false, generale: false };
    }
  }

  if (est >= 80 && target >= minToBid && !state.standing?.capot) {
    return { action: "bid", value: target, mode, capot: false, generale: false };
  }
  return { action: "pass" };
}

/** Main qui justifie un capot : atout maître long + couleurs annexes tenues par un As. */
function capotWorthy(hand: Card[], mode: TrumpMode): boolean {
  if (mode === "NT" || mode === "AT") return false;
  const trumps = hand.filter((c) => c.suit === mode);
  const hasJ = trumps.some((c) => c.rank === "J");
  const has9 = trumps.some((c) => c.rank === "9");
  if (!hasJ || !has9 || trumps.length < 6) return false;
  const sideSuits = SUITS.filter((s) => s !== mode && hand.some((c) => c.suit === s));
  const heldBySAce = sideSuits.filter((s) => hand.some((c) => c.suit === s && c.rank === "A"));
  return heldBySAce.length === sideSuits.length; // chaque couleur annexe a son As
}

/** Main capable de remporter les 8 plis SEUL : suite d'atouts maîtres (sans trou
 *  depuis le Valet) assez longue pour épuiser les atouts adverses, et toutes les
 *  cartes hors atout sont des As (imprenables une fois les atouts tombés). */
function generaleWorthy(hand: Card[], mode: TrumpMode): boolean {
  if (mode === "NT" || mode === "AT") return false;
  const trumps = hand.filter((c) => c.suit === mode);
  const n = trumps.length;
  if (n < 5) return false; // 5 atouts du haut épuisent les 3 atouts adverses
  // Les atouts doivent être les n plus forts : forces 8 (V), 7 (9), 6 (As), 5 (10)…
  const strengths = trumps.map((c) => strength(c, mode)).sort((a, b) => b - a);
  for (let i = 0; i < n; i++) if (strengths[i] !== 8 - i) return false;
  // Toutes les cartes hors atout sont des As.
  return hand.every((c) => c.suit === mode || c.rank === "A");
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
  if (state.standing!.capot) return strong && rnd() < 0.35;
  // On coinche un contrat qu'on pense pouvoir faire chuter (défense forte).
  // Seuils pilotés par l'agressivité : un profil offensif coinche plus large.
  const aggroShift = (aggressiveness - 0.5) * 2; // -1..+1
  const vThresh = 100 - aggroShift * 15; // prudent ~115, offensif ~85
  const margin = (strong ? 6 : 16) - aggroShift * 8;
  const defenseEst = estimateForMode(state.hands[player], state.standing!.mode);
  const proba = (strong ? 0.7 : 0.45) + aggroShift * 0.15;
  return v >= vThresh && defenseEst >= 162 - v + margin && rnd() < proba;
}

// --- Choix d'une carte ------------------------------------------------------

export function aiPlay(state: GameState, deterministic = false): Card {
  const legal = legalForCurrent(state);
  if (legal.length === 1) return legal[0];
  const level = state.settings.aiLevel;
  // Échelle de force RÉELLEMENT distincte :
  //  Facile = aléatoire ; Moyen = heuristique ;
  //  Difficile = mini-PIMC (recherche légère, 8 sims) ;
  //  Expert = PIMC profond (le coach), le seul avec beaucoup de simulations.
  //  Le rollout PIMC utilise la politique BASIQUE (mesurée comme la plus forte).
  if (level === "easy") return legal[Math.floor(rnd() * legal.length)];
  if (level === "medium") return heuristicPlay(state, legal, false);
  const rng = deterministic ? mulberry32(hashState(state)) : Math.random;
  if (level === "hard") return expertPlay(state, legal, deterministic ? rng : Math.random, 8, false);
  const depth = { rapide: 14, normal: 24, fort: 40 }[state.settings.expertDepth] ?? 24;
  // Le coach n'est pas contraint par le temps réel, mais 48 sims gelaient le
  // thread sur mobile (~300-800 ms) ; 32 = bon compromis fiabilité/réactivité.
  const samples = deterministic ? 32 : depth;
  // Expert : PIMC. Le rollout utilise la politique BASIQUE — mesuré comme la plus
  // forte (les variantes « malines » se sont révélées contre-productives en jeu).
  return expertPlay(state, legal, rng, samples, false);
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
  if (trick.length === 0) return leadCard(state, legal);

  const partnerMaster = partnerIsWinning(trick, me, mode);
  const isLastToPlay = trick.length === 3;
  const trickPoints = trick.reduce((s, p) => s + points(p.card, mode), 0);

  if (partnerMaster) {
    // Le partenaire tient le pli.
    if (isLastToPlay || partnerSurelyWins(state, hard)) {
      // On "charge" : on donne le maximum de points au partenaire.
      return [...legal].sort((a, b) => points(b, mode) - points(a, mode))[0];
    }
    // Sinon on se défausse en signalant à son partenaire (appel).
    return discardWithSignal(state, legal, mode);
  }

  // L'adversaire tient le pli : peut-on (et doit-on) prendre ?
  const winner = cheapestWinner(legal, trick, mode);
  if (winner) {
    // Seuil de prise selon l'agressivité : « petit jeu » prudent attend des plis
    // riches, un profil offensif prend plus volontiers.
    const aggro = state.settings.profile.aggressiveness;
    const threshold = Math.round(10 - aggro * 8); // ~10 (prudent) → ~2 (offensif)
    const worthIt = isLastToPlay || trickPoints >= threshold || points(winner, mode) <= 4;
    if (worthIt) return winner;
  }
  // On ne peut/veut pas prendre : on se défausse en signalant (appel).
  return discardWithSignal(state, legal, mode);
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

/** Un adversaire est-il connu coupé (void) dans cette couleur ? (lecture des plis) */
function opponentVoidInSuit(state: GameState, suit: Suit): boolean {
  const voids = inferVoids(state);
  const me = state.current;
  for (let p = 0; p < 4; p++) {
    if (teamOf(p) !== teamOf(me) && voids[p].has(suit)) return true;
  }
  return false;
}

function leadCard(state: GameState, legal: Card[]): Card {
  const mode = state.contract!.mode;
  const me = state.current;
  const profile = state.settings.profile;
  const iAmTaker = teamOf(state.contract!.taker) === teamOf(me);
  const trumps = legal.filter((c) => isTrump(c, mode));

  // RÈGLE TACITE (Graux) : preneur CONTRÉ → on ne PART JAMAIS à l'atout. Le
  // contreur a très probablement de l'atout/des As bien placés ; ouvrir atout
  // jouerait dans son jeu. On encaisse d'abord ses maîtres dans les couleurs.
  if (iAmTaker && (state.contract!.coinche ?? 1) > 1) {
    const sideAces = legal.filter((c) => c.rank === "A" && !isTrump(c, mode));
    const safeAce =
      sideAces.find((a) => isMasterCard(state, a)) ??
      sideAces.find((a) => !opponentVoidInSuit(state, a.suit)) ??
      sideAces[0];
    if (safeAce) return safeAce;
    const sideLow = legal.filter((c) => !isTrump(c, mode));
    if (sideLow.length > 0) return lowest(sideLow, mode); // une couleur, surtout pas l'atout
  }

  // Convention : entamer atout avec le Valet si on l'a (équipe preneuse).
  if (iAmTaker && profile.entameAtoutValet) {
    const jack = trumps.find((c) => c.rank === "J");
    if (jack) return jack;
  }

  // Équipe preneuse : tirer ses atouts maîtres pour faire tomber ceux des adversaires.
  if (iAmTaker && trumps.length > 0) {
    return highest(trumps, mode);
  }

  // Lecture de l'appel du partenaire : il a réclamé une couleur, on la lui rejoue (petit).
  const called = partnerCalledSuit(state);
  if (called) {
    const inCalled = legal.filter((c) => c.suit === called && !isTrump(c, mode));
    if (inCalled.length > 0) return lowest(inCalled, mode);
  }

  // Jouer une couleur maîtresse (As) hors atout, si le profil le veut.
  if (profile.jeuAuxAs) {
    const ace = legal.find((c) => c.rank === "A" && !isTrump(c, mode));
    if (ace) return ace;
  }

  // À défaut, entamer petit dans une couleur non-atout.
  const sideLow = legal.filter((c) => !isTrump(c, mode));
  if (sideLow.length > 0) return lowest(sideLow, mode);
  return lowest(legal, mode);
}

/**
 * Défausse en signalant à son partenaire (appel), sans donner de points.
 * - directs   : jeter une carte « haute » (9) d'une couleur où l'on est fort (As)
 *   => « rejoue cette couleur ».
 * - indirects : jeter une petite carte (7) d'une couleur faible
 *   => « ne joue pas celle-ci » (donc l'autre).
 */
function discardWithSignal(state: GameState, legal: Card[], mode: TrumpMode): Card {
  const appels = state.settings.profile.appels;
  if (appels === "aucun") return discardLow(legal, mode);

  // On ne signale qu'avec des cartes sans valeur (7/8/9 hors atout).
  const cheap = legal.filter((c) => !isTrump(c, mode) && points(c, mode) === 0);
  if (cheap.length === 0) return discardLow(legal, mode);

  const myHand = state.hands[state.current];
  const aceSuits = new Set(
    myHand.filter((c) => !isTrump(c, mode) && c.rank === "A").map((c) => c.suit),
  );

  if (appels === "directs") {
    const inStrong = cheap.filter((c) => aceSuits.has(c.suit));
    const pool = inStrong.length > 0 ? inStrong : cheap;
    return [...pool].sort((a, b) => strength(b, mode) - strength(a, mode))[0]; // la plus haute
  }
  // indirects
  const inWeak = cheap.filter((c) => !aceSuits.has(c.suit));
  const pool = inWeak.length > 0 ? inWeak : cheap;
  return [...pool].sort((a, b) => strength(a, mode) - strength(b, mode))[0]; // la plus basse
}

/** Couleur appelée par le partenaire (appel direct), lue dans les plis passés. */
function partnerCalledSuit(state: GameState): Suit | null {
  if (state.settings.profile.appels !== "directs") return null;
  const mode = state.contract!.mode;
  const partner = (state.current + 2) % 4;
  for (let i = state.completedTricks.length - 1; i >= 0; i--) {
    const t = state.completedTricks[i];
    const led = t.played[0].card.suit;
    const p = t.played.find((x) => x.player === partner);
    if (!p) continue;
    // Défausse off-suit, hors atout, sans valeur, et plutôt haute (9/8) = appel.
    // Défausse off-suit, hors atout, sans valeur (7/8/9) = appel direct.
    if (p.card.suit !== led && !isTrump(p.card, mode) && points(p.card, mode) === 0) {
      return p.card.suit;
    }
  }
  return null;
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

const ALL_CARDS: Card[] = freshDeck();
function allCards(): Card[] {
  return ALL_CARDS;
}

/** Toutes les cartes déjà vues (plis terminés + pli courant + ma main). */
function seenCards(state: GameState): Set<string> {
  const seen = new Set<string>();
  for (const t of state.completedTricks) for (const c of t.cards) seen.add(c.id);
  for (const p of state.trick) seen.add(p.card.id);
  for (const c of state.hands[state.current]) seen.add(c.id);
  return seen;
}

// --- Niveau Expert : Monte-Carlo à information imparfaite (PIMC) -------------

type Rng = () => number;

function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Empreinte stable d'un état (pour un coach déterministe). */
function hashState(state: GameState): number {
  let h = 2166136261;
  const add = (s: string) => {
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
  };
  add(String(state.current));
  if (state.contract) {
    add(state.contract.mode);
    add(String(state.contract.value));
    add(String(state.contract.taker));
    add(String(state.contract.coinche));
  }
  for (const c of state.hands[state.current]) add(c.id);
  for (const p of state.trick) add(p.card.id + p.player);
  // Contenu complet des plis terminés : seed vraiment unique par état distinct.
  for (const t of state.completedTricks) for (const c of t.cards) add(c.id);
  return h >>> 0;
}

function shuffleRng<T>(arr: T[], rng: Rng): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Coupes constatées : un joueur qui n'a pas fourni est void dans la couleur demandée. */
function inferVoids(state: GameState): Record<number, Set<Suit>> {
  const voids: Record<number, Set<Suit>> = { 0: new Set(), 1: new Set(), 2: new Set(), 3: new Set() };
  const scan = (played: PlayedCard[]) => {
    if (played.length === 0) return;
    const led = played[0].card.suit;
    for (let i = 1; i < played.length; i++) {
      if (played[i].card.suit !== led) voids[played[i].player].add(led);
    }
  };
  for (const t of state.completedTricks) scan(t.played);
  scan(state.trick);
  return voids;
}

/** Indices d'enchères qui orientent le placement des cartes inconnues. */
interface PlacementBias {
  taker: number; // preneur du contrat
  trump: Suit | null; // couleur d'atout (null si SA/TA)
  bidSuit: Record<number, Set<Suit>>; // couleurs annoncées par chaque joueur
}

/** Reconstruit, depuis les enchères, qui a annoncé quoi (pour placer les cartes). */
function placementBias(state: GameState): PlacementBias {
  const bidSuit: Record<number, Set<Suit>> = { 0: new Set(), 1: new Set(), 2: new Set(), 3: new Set() };
  for (const e of state.bidHistory) {
    if (e.kind !== "bid" || e.mode == null) continue;
    if (e.mode === "NT" || e.mode === "AT") continue;
    bidSuit[e.player].add(e.mode);
  }
  const mode = state.contract?.mode;
  const trump = mode && mode !== "NT" && mode !== "AT" ? (mode as Suit) : null;
  return { taker: state.contract?.taker ?? -1, trump, bidSuit };
}

/** Biais de vraisemblance pour attribuer `card` au joueur `p` (annonces lues). */
function cardBias(card: Card, p: number, b: PlacementBias): number {
  let bias = 0;
  if (b.trump && card.suit === b.trump) {
    // Le preneur a annoncé l'atout : il tient très probablement V/9/As d'atout.
    if (p === b.taker) {
      if (card.rank === "J") bias += 16;
      else if (card.rank === "9") bias += 10;
      else if (card.rank === "A") bias += 5;
      else bias += 2;
    } else if (card.rank === "J" || card.rank === "9") {
      bias -= 7; // un gros atout chez un défenseur est peu probable
    }
  }
  // Une couleur annoncée par p ⇒ il y est fort (honneurs plus probables chez lui).
  if (b.bidSuit[p]?.has(card.suit) && (card.rank === "A" || card.rank === "10" || card.rank === "K")) {
    bias += 4;
  }
  return bias;
}

/** Distribue les cartes inconnues aux autres joueurs (tailles + coupes respectées,
 *  placement orienté par les annonces lues dans les enchères). */
function sampleWorld(
  state: GameState,
  me: number,
  voids: Record<number, Set<Suit>>,
  rng: Rng,
  bias: PlacementBias,
): Card[][] {
  const myHand = state.hands[me];
  const seen = new Set<string>();
  for (const t of state.completedTricks) for (const c of t.cards) seen.add(c.id);
  for (const p of state.trick) seen.add(p.card.id);
  for (const c of myHand) seen.add(c.id);
  const unknown = allCards().filter((c) => !seen.has(c.id));
  const others = [0, 1, 2, 3].filter((p) => p !== me);
  const need: Record<number, number> = {};
  for (const p of others) need[p] = state.hands[p].length;

  for (let attempt = 0; attempt < 30; attempt++) {
    const remaining = shuffleRng(unknown, rng);
    const left = { ...need };
    const hands: Card[][] = [[], [], [], []];
    hands[me] = [...myHand];
    let ok = true;
    while (remaining.length > 0) {
      // À chaque étape, place la carte la plus contrainte (moins de joueurs éligibles).
      let pick = -1;
      let pickCands: number[] = [];
      let fewest = 99;
      for (let i = 0; i < remaining.length; i++) {
        const cands = others.filter((p) => left[p] > 0 && !voids[p].has(remaining[i].suit));
        if (cands.length < fewest) {
          fewest = cands.length;
          pick = i;
          pickCands = cands;
        }
      }
      if (fewest === 0) {
        ok = false;
        break;
      }
      const [card] = remaining.splice(pick, 1);
      // Choix du joueur : la place disponible reste dominante (faisabilité du
      // mélange), pondérée par la vraisemblance issue des annonces + un peu d'aléa.
      let bestP = pickCands[0];
      let bestScore = -Infinity;
      for (const p of pickCands) {
        const score = left[p] * 3 + cardBias(card, p, bias) + rng() * 2;
        if (score > bestScore) {
          bestScore = score;
          bestP = p;
        }
      }
      hands[bestP].push(card);
      left[bestP]--;
    }
    if (ok && others.every((p) => left[p] === 0)) return hands;
  }
  // Repli : on ignore les coupes.
  const pool = shuffleRng(unknown, rng);
  const hands: Card[][] = [[], [], [], []];
  hands[me] = [...myHand];
  let idx = 0;
  for (const p of others)
    for (let k = 0; k < need[p] && idx < pool.length; k++) hands[p].push(pool[idx++]);
  return hands;
}

/** Joue la donne jusqu'au bout avec une politique gloutonne. `smart` choisit
 *  l'heuristique forte (évaluations plus réalistes = Expert) ou basique (Difficile). */
function rollout(state: GameState, smart: boolean): GameState {
  let g = state;
  let guard = 0;
  while (g.phase === "playing" && guard++ < 40) {
    const legal = legalForCurrent(g);
    if (legal.length === 0) break; // garde défensive (état incohérent)
    g = applyPlay(g, legal.length === 1 ? legal[0] : heuristicPlay(g, legal, smart));
  }
  return g;
}

/**
 * PIMC (Monte-Carlo à information imparfaite). `samples` = nombre de mondes
 * échantillonnés (Difficile 8, Expert 24-48). Plus de simulations = recherche
 * plus fine. `smart` = politique de rollout ; on passe `false` (politique basique,
 * mesurée comme la plus forte) à tous les niveaux.
 */
function expertPlay(state: GameState, legal: Card[], rng: Rng, samples: number, smart: boolean): Card {
  const me = state.current;
  const myTeam = teamOf(me);
  const voids = inferVoids(state);
  const bias = placementBias(state);
  const scores = new Array(legal.length).fill(0);

  for (let s = 0; s < samples; s++) {
    const sampled = sampleWorld(state, me, voids, rng, bias);
    // dealtHands (mains initiales) = mains restantes échantillonnées + cartes déjà
    // jouées par chaque joueur, sinon la belote au décompte serait biaisée.
    const dealtHands = sampled.map((h) => [...h]);
    for (const t of state.completedTricks) for (const pc of t.played) dealtHands[pc.player].push(pc.card);
    for (const pc of state.trick) dealtHands[pc.player].push(pc.card);
    const world: GameState = { ...state, hands: sampled, dealtHands };
    // Mêmes cartes échantillonnées pour tous les candidats (réduction de variance).
    for (let i = 0; i < legal.length; i++) {
      const after = applyPlay(world, legal[i]);
      const end = after.phase === "playing" ? rollout(after, smart) : after;
      const r = end.lastResult;
      if (r) scores[i] += r.scores[myTeam] - r.scores[(1 - myTeam) as 0 | 1];
    }
  }

  let best = 0;
  for (let i = 1; i < legal.length; i++) if (scores[i] > scores[best]) best = i;
  return legal[best];
}

// --- Analyse probabiliste pour le COACH (scénarios chiffrés) ----------------

/** Statistiques Monte-Carlo d'un coup candidat, mesurées sur les mondes simulés. */
export interface PlayOutcome {
  card: Card;
  /** Différentiel de score final moyen sur la donne (mon camp − adverse). */
  scoreDiff: number;
  /** Probabilité que MON camp remporte LE PLI EN COURS (0..1). */
  trickWinPct: number;
  /** Points moyens que ce pli rapporte à mon camp (0 si on le perd). */
  trickPtsForUs: number;
  /** Probabilité que mon camp remporte la donne (score final ≥ adverse). */
  dealWinPct: number;
}

export interface PlayAnalysis {
  best: Card;
  outcomes: PlayOutcome[]; // triés du meilleur au pire (par scoreDiff)
  samples: number;
}

/**
 * Comme `expertPlay`, mais retient pour CHAQUE carte des statistiques lisibles par
 * un humain (probabilité de gagner le pli, points moyens, issue de la donne). Le
 * meilleur coup retourné est IDENTIQUE à celui d'`aiPlay` déterministe EN MODE EXPERT
 * (même seed, mêmes 32 mondes) — le coach force toujours ce mode (cf. asCoach), donc
 * la carte affichée colle au coup recommandé. (En « hard », aiPlay n'utilise que 8
 * mondes : ne pas comparer analyzePlay à ce niveau.)
 */
export function analyzePlay(state: GameState, deterministic = true): PlayAnalysis {
  const legal = legalForCurrent(state);
  if (legal.length === 0) throw new Error("analyzePlay: aucun coup légal");
  const me = state.current;
  const myTeam = teamOf(me);
  const oppTeam = (1 - myTeam) as 0 | 1;
  const mode = state.contract!.mode;
  const voids = inferVoids(state);
  const bias = placementBias(state);
  // Nombre de mondes échantillonnés indexé sur le réglage de profondeur Expert,
  // pour que « Conseil » ne soit pas plus lourd que le jeu choisi par l'utilisateur.
  const samples = { rapide: 20, normal: 28, fort: 40 }[state.settings.expertDepth] ?? 28;
  const rng: Rng = deterministic ? mulberry32(hashState(state)) : Math.random;
  // Le pli en cours portera cet indice une fois terminé.
  const trickIdx = state.completedTricks.length;

  const acc = legal.map((c) => ({ card: c, scoreSum: 0, trickWins: 0, trickPts: 0, dealWins: 0 }));

  for (let s = 0; s < samples; s++) {
    const sampled = sampleWorld(state, me, voids, rng, bias);
    const dealtHands = sampled.map((h) => [...h]);
    for (const t of state.completedTricks) for (const pc of t.played) dealtHands[pc.player].push(pc.card);
    for (const pc of state.trick) dealtHands[pc.player].push(pc.card);
    const world: GameState = { ...state, hands: sampled, dealtHands };
    for (let i = 0; i < legal.length; i++) {
      const after = applyPlay(world, legal[i]);
      const end = after.phase === "playing" ? rollout(after, false) : after;
      const r = end.lastResult;
      if (r) {
        acc[i].scoreSum += r.scores[myTeam] - r.scores[oppTeam];
        if (r.scores[myTeam] > r.scores[oppTeam]) acc[i].dealWins++;
      }
      const ct = end.completedTricks[trickIdx];
      if (ct && ct.winnerTeam === myTeam) {
        acc[i].trickWins++;
        // Points du pli, + les 10 « de der » s'il s'agit du dernier pli de la donne.
        const isLastTrick = trickIdx === 7;
        acc[i].trickPts += ct.cards.reduce((sum, c) => sum + points(c, mode), 0) + (isLastTrick ? 10 : 0);
      }
    }
  }

  // Meilleur coup : argmax du différentiel (même règle que expertPlay, 1er en cas d'égalité).
  let bestIdx = 0;
  for (let i = 1; i < legal.length; i++) if (acc[i].scoreSum > acc[bestIdx].scoreSum) bestIdx = i;
  const best = legal[bestIdx];

  const outcomes: PlayOutcome[] = acc
    .map((a) => ({
      card: a.card,
      scoreDiff: a.scoreSum / samples,
      trickWinPct: a.trickWins / samples,
      trickPtsForUs: a.trickPts / samples,
      dealWinPct: a.dealWins / samples,
    }))
    .sort((x, y) => y.scoreDiff - x.scoreDiff);

  return { best, outcomes, samples };
}
