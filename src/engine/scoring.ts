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

  const belote = computeBelote(result.hands, mode);
  const realized: [number, number] = [
    cardPoints[0] + belote[0],
    cardPoints[1] + belote[1],
  ];

  // Capot = remporter les 8 plis.
  const takerTrickCount = result.trickWinners.filter((t) => t === takerTeam).length;
  const made = contract.capot
    ? takerTrickCount === 8
    : realized[takerTeam] >= contract.value;

  const scores: [number, number] = [0, 0];
  const mult = contract.coinche;

  if (mult === 1) {
    if (made) {
      const base = contract.capot ? 250 : contract.value + cardPoints[takerTeam];
      scores[takerTeam] = base + belote[takerTeam];
      scores[defenseTeam] = contract.capot ? belote[defenseTeam] : realized[defenseTeam];
    } else {
      const base = contract.capot ? 250 : 160 + contract.value;
      scores[defenseTeam] = base + belote[defenseTeam];
      scores[takerTeam] = belote[takerTeam];
    }
  } else {
    // Coinché / surcoinché : enjeu forfaitaire (contrat + 160) × multiplicateur.
    const stake = (contract.capot ? 250 : contract.value + 160) * mult;
    const winner = made ? takerTeam : defenseTeam;
    const loser = (1 - winner) as Team;
    scores[winner] = stake + belote[winner];
    scores[loser] = belote[loser];
  }

  return { cardPoints, belote, realized, made, scores, takerTeam };
}
