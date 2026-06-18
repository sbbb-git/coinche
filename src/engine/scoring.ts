// Décompte d'une donne : réalisation du contrat, chute, coinche, belote.

import { Card, Suit, TrumpMode, totalPoints } from "./cards";

export type Team = 0 | 1; // équipe 0 = joueurs 0 & 2, équipe 1 = joueurs 1 & 3

export function teamOf(player: number): Team {
  return (player % 2) as Team;
}

export interface Contract {
  value: number; // 80..160, ou 250 pour un capot
  mode: TrumpMode;
  taker: number; // joueur preneur (0..3)
  capot: boolean;
  coinche: 1 | 2 | 4; // 1 = normal, 2 = coinché, 4 = surcoinché
}

export interface DealResult {
  /** plis remportés, chacun = liste de cartes + équipe gagnante */
  trickWinners: Team[];
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

/** Couleurs concernées par la belote (R+D) selon le mode. */
function beloteSuits(mode: TrumpMode): Suit[] {
  if (mode === "NT") return [];
  if (mode === "AT") return ["S", "H", "D", "C"];
  return [mode];
}

/** Détecte la belote/rebelote : 20 pts à l'équipe dont un joueur a R+D d'atout. */
function computeBelote(hands: Card[][], mode: TrumpMode): [number, number] {
  const out: [number, number] = [0, 0];
  for (const suit of beloteSuits(mode)) {
    for (let p = 0; p < 4; p++) {
      const hasKing = hands[p].some((c) => c.suit === suit && c.rank === "K");
      const hasQueen = hands[p].some((c) => c.suit === suit && c.rank === "Q");
      if (hasKing && hasQueen) out[teamOf(p)] += 20;
    }
  }
  return out;
}

export function scoreDeal(contract: Contract, result: DealResult): ScoreBreakdown {
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

  const belote = computeBelote(result.hands, mode); // imprenable
  const realized: [number, number] = [
    cardPoints[0] + belote[0],
    cardPoints[1] + belote[1],
  ];

  // Réussite : capot annoncé => tous les plis ; sinon => au moins le contrat
  // ET strictement plus de points que la défense.
  const made = contract.capot
    ? attackWonAll
    : realized[takerTeam] >= contract.value && realized[takerTeam] > realized[defenseTeam];

  const scores: [number, number] = [0, 0];
  const mult = contract.coinche;

  if (mult === 1) {
    if (made) {
      if (contract.capot) {
        scores[takerTeam] = 250 + belote[takerTeam];
        scores[defenseTeam] = belote[defenseTeam];
      } else {
        // L'attaque marque ses points (cartes + belote) + la valeur du contrat.
        scores[takerTeam] = cardPoints[takerTeam] + contract.value + belote[takerTeam];
        scores[defenseTeam] = realized[defenseTeam];
      }
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
    const base = winnerWonAll || contract.capot ? 252 : 162;
    scores[winner] = base + contract.value * mult + belote[winner];
    scores[loser] = belote[loser];
  }

  return { cardPoints, belote, realized, made, scores, takerTeam };
}
