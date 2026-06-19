// Décompte d'une donne : réalisation du contrat, chute, coinche, belote.

import { Card, Suit, TrumpMode, totalPoints } from "./cards";

export type Team = 0 | 1; // équipe 0 = joueurs 0 & 2, équipe 1 = joueurs 1 & 3

export function teamOf(player: number): Team {
  return (player % 2) as Team;
}

export interface Contract {
  value: number; // 80..160, 250 (capot) ou 500 (générale)
  mode: TrumpMode;
  taker: number; // joueur preneur (0..3)
  capot: boolean;
  generale: boolean; // tous les plis par le preneur SEUL (500)
  coinche: 1 | 2 | 4; // 1 = normal, 2 = coinché, 4 = surcoinché
}

export interface DealResult {
  /** plis remportés, chacun = liste de cartes + équipe gagnante */
  trickWinners: Team[];
  /** joueur gagnant de chaque pli (pour la générale) */
  trickWinnerPlayers?: number[];
  tricks: Card[][]; // les 8 plis (cartes), dans l'ordre
  /** main initiale de chaque joueur, pour détecter la belote */
  hands: Card[][];
}

export interface ScoreBreakdown {
  cardPoints: [number, number]; // points cartes (+10 de der) par équipe
  belote: [number, number]; // 0 ou 20 par équipe
  realized: [number, number]; // total réalisé (cartes + belote) par équipe
  made: boolean; // contrat réussi ?
  scores: [number, number]; // points marqués au final par équipe
  takerTeam: Team;
}

/** Options de comptage (réglables, défauts = barème de l'app la Coinche). */
export interface ScoreOptions {
  roundToTen: boolean;
  contractCanSucceedIfDefenseMore: boolean;
  beloteCountsToSucceed: boolean;
  beloteCountsToFail: boolean;
  beloteAtToutAtout: boolean;
}

export const DEFAULT_SCORE_OPTIONS: ScoreOptions = {
  roundToTen: false,
  contractCanSucceedIfDefenseMore: false,
  beloteCountsToSucceed: true,
  beloteCountsToFail: true,
  beloteAtToutAtout: false,
};

/** Couleurs concernées par la belote (R+D) selon le mode. */
function beloteSuits(mode: TrumpMode, beloteAtAT: boolean): Suit[] {
  if (mode === "NT") return [];
  if (mode === "AT") return beloteAtAT ? ["S", "H", "D", "C"] : [];
  return [mode];
}

/** Détecte la belote/rebelote : 20 pts à l'équipe dont un joueur a R+D d'atout. */
function computeBelote(hands: Card[][], mode: TrumpMode, beloteAtAT: boolean): [number, number] {
  const out: [number, number] = [0, 0];
  for (const suit of beloteSuits(mode, beloteAtAT)) {
    for (let p = 0; p < 4; p++) {
      const hasKing = hands[p].some((c) => c.suit === suit && c.rank === "K");
      const hasQueen = hands[p].some((c) => c.suit === suit && c.rank === "Q");
      if (hasKing && hasQueen) out[teamOf(p)] += 20;
    }
  }
  return out;
}

export function scoreDeal(
  contract: Contract,
  result: DealResult,
  opts: ScoreOptions = DEFAULT_SCORE_OPTIONS,
): ScoreBreakdown {
  const { mode } = contract;
  const takerTeam = teamOf(contract.taker);
  const defenseTeam = (1 - takerTeam) as Team;

  // Points cartes par équipe + 10 de der au gagnant du dernier pli.
  const cardPoints: [number, number] = [0, 0];
  result.tricks.forEach((trick, i) => {
    cardPoints[result.trickWinners[i]] += totalPoints(trick, mode);
  });
  const lastWinner = result.trickWinners[result.trickWinners.length - 1];
  cardPoints[lastWinner] += 10; // 10 de der

  // Capot : remporter tous les plis. Bonus de +90 (même non annoncé).
  const trickCount: [number, number] = [0, 0];
  result.trickWinners.forEach((t) => trickCount[t]++);
  const attackWonAll = trickCount[takerTeam] === 8;
  const defenseWonAll = trickCount[defenseTeam] === 8;
  if (attackWonAll) cardPoints[takerTeam] += 90;
  if (defenseWonAll) cardPoints[defenseTeam] += 90;

  const belote = computeBelote(result.hands, mode, opts.beloteAtToutAtout); // imprenable
  const realized: [number, number] = [
    cardPoints[0] + belote[0],
    cardPoints[1] + belote[1],
  ];

  // Générale : le preneur doit remporter TOUS les plis SEUL (500).
  if (contract.generale) {
    const players = result.trickWinnerPlayers ?? [];
    const solo = players.length === 8 && players.every((p) => p === contract.taker);
    const m = contract.coinche;
    const sc: [number, number] = [0, 0];
    const winner = solo ? takerTeam : defenseTeam;
    sc[winner] = 500 * m + belote[winner];
    sc[(1 - winner) as Team] = belote[(1 - winner) as Team];
    if (opts.roundToTen) {
      sc[0] = Math.round(sc[0] / 10) * 10;
      sc[1] = Math.round(sc[1] / 10) * 10;
    }
    return { cardPoints, belote, realized, made: solo, scores: sc, takerTeam };
  }

  // Réussite : capot annoncé => tous les plis ; sinon => au moins le contrat
  // ET (sauf option) strictement plus de points que la défense.
  // La belote ne compte dans ce test que si les options correspondantes sont actives.
  const attackForTest = cardPoints[takerTeam] + (opts.beloteCountsToSucceed ? belote[takerTeam] : 0);
  const defenseForTest = cardPoints[defenseTeam] + (opts.beloteCountsToFail ? belote[defenseTeam] : 0);
  const made = contract.capot
    ? attackWonAll
    : attackForTest >= contract.value &&
      (opts.contractCanSucceedIfDefenseMore || attackForTest > defenseForTest);

  const scores: [number, number] = [0, 0];
  const mult = contract.coinche;

  if (mult === 1) {
    if (made) {
      // L'attaque marque ses points (cartes + bonus capot éventuel) + la valeur du
      // contrat. Pour un capot annoncé : 252 (162 + 90) + 250 = 502.
      scores[takerTeam] = cardPoints[takerTeam] + contract.value + belote[takerTeam];
      scores[defenseTeam] = realized[defenseTeam];
    } else {
      // Chute : la défense marque 162 (252 si elle capote) + le contrat ; belote imprenable.
      const base = defenseWonAll ? 252 : 162;
      scores[defenseTeam] = base + contract.value + belote[defenseTeam];
      scores[takerTeam] = belote[takerTeam];
    }
  } else {
    // Coinche/Surcoinche : le gagnant marque 162 (252 si capot) + contrat × mult.
    const winner = made ? takerTeam : defenseTeam;
    const loser = (1 - winner) as Team;
    const winnerWonAll = winner === takerTeam ? attackWonAll : defenseWonAll;
    // 252 seulement si le gagnant a réellement fait tous les plis (capot annoncé
    // réussi => attackWonAll ; capot chuté où la défense ne rafle pas tout => 162).
    const base = winnerWonAll ? 252 : 162;
    scores[winner] = base + contract.value * mult + belote[winner];
    scores[loser] = belote[loser];
  }

  if (opts.roundToTen) {
    scores[0] = Math.round(scores[0] / 10) * 10;
    scores[1] = Math.round(scores[1] / 10) * 10;
  }

  return { cardPoints, belote, realized, made, scores, takerTeam };
}
