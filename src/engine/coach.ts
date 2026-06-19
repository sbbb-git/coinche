// Coach : conseille le meilleur coup et l'explique. Déterministe (pour la
// review et les exercices). Distingue la phase d'enchères de la phase de jeu.
// Réutilise le moteur d'évaluation de l'IA, en mode "expert".

import { Card, TrumpMode, isTrump } from "./cards";
import {
  GameState,
  PlayProfile,
  availableModes,
  legalForCurrent,
} from "./game";
import { aiPlay, bestContract, estimateForMode } from "./ai";
import { beats, partnerIsWinning, winningIndex } from "./rules";
import { teamOf } from "./scoring";
import { SUIT_LABEL } from "./cards";

const COACH_PROFILE: PlayProfile = {
  aggressiveness: 0.5,
  appels: "directs",
  jeuAuxAs: true,
  entameAtoutValet: false,
  appelBelote: true,
  systemeEncheres: "graux",
  conventionAnnonce100: true,
};

/** Force le mode "expert" + profil coach pour une évaluation forte et stable. */
function asCoach(state: GameState): GameState {
  return { ...state, settings: { ...state.settings, aiLevel: "expert", profile: COACH_PROFILE } };
}

// --- Phase de jeu : y a-t-il un vrai choix ? --------------------------------

/** Un coup est "à choix" s'il y a au moins 2 cartes jouables (sinon forcé). */
export function isPlayDecision(state: GameState): boolean {
  return state.phase === "playing" && legalForCurrent(state).length > 1;
}

export interface PlayAdvice {
  best: Card;
  reason: string;
}

export function coachPlay(state: GameState): PlayAdvice {
  const cs = asCoach(state);
  const best = aiPlay(cs, true); // déterministe : même conseil pour un même état
  return { best, reason: playReason(cs, best) };
}

function playReason(state: GameState, card: Card): string {
  const mode = state.contract!.mode;
  const trick = state.trick;
  const me = state.current;

  if (trick.length === 0) {
    if (isTrump(card, mode) && teamOf(state.contract!.taker) === teamOf(me)) {
      return "Tu es preneur : tu tires l'atout pour faire tomber ceux des adversaires.";
    }
    if (card.rank === "A" && !isTrump(card, mode)) {
      return "Tu entames de ton As maître : un pli sûr, et tu gardes la main.";
    }
    return "Tu entames petit dans une couleur, sans gâcher tes cartes fortes.";
  }

  const led = trick[0].card.suit;
  const wIdx = winningIndex(trick, mode);
  const master = trick[wIdx].card;
  const partnerMaster = partnerIsWinning(trick, me, mode);

  if (partnerMaster) {
    if (card.rank === "A" || card.rank === "10" || (isTrump(card, mode) && card.rank === "J")) {
      return "Ton partenaire tient le pli : tu le « charges » en lui donnant un maximum de points.";
    }
    return "Ton partenaire est maître : tu te défausses sans gâcher de carte forte.";
  }

  const wins = beats(card, master, led, mode);
  if (wins) {
    if (isTrump(card, mode) && led !== mode && mode !== "AT") {
      return "Tu coupes pour remporter le pli que l'adversaire tenait.";
    }
    return "Tu prends le pli avec une carte juste assez forte pour gagner.";
  }

  if (isTrump(card, mode) && led !== mode && mode !== "AT" && mode !== "NT") {
    return "Tu es obligé de mettre de l'atout (tu n'as pas la couleur demandée).";
  }
  return "Tu ne peux pas prendre : tu te défausses d'une petite carte sans valeur.";
}

// --- Phase d'enchères -------------------------------------------------------

export type BidAdviceAction =
  | { action: "pass" }
  | { action: "bid"; value: number; mode: TrumpMode };

export interface BidAdvice {
  action: BidAdviceAction;
  /** estimation de points de la main pour le meilleur contrat */
  estimate: number;
  mode: TrumpMode;
  reason: string;
}

/** Conseil d'enchère déterministe pour la main du joueur. */
export function coachBid(state: GameState, player: number): BidAdvice {
  const hand = state.hands[player];
  const modes = availableModes(state.settings);
  const { mode, est } = bestContract(hand, modes);
  const estimate = Math.round(est);

  const standingVal = state.standing?.value ?? 0;
  const standingIsPartner = state.standing
    ? teamOf(state.standing.player) === teamOf(player)
    : false;
  const minToBid = standingIsPartner ? standingVal + 20 : standingVal + 10;

  let target = Math.max(80, Math.min(160, Math.round(est / 10) * 10));

  if (est >= 80 && target >= minToBid && !state.standing?.capot) {
    return {
      action: { action: "bid", value: target, mode },
      estimate,
      mode,
      reason:
        `Ta main vaut ~${estimate} points à ${modeLabelText(mode)} : tu peux annoncer ` +
        `${target}. ${strengthHint(hand, mode)}`,
    };
  }
  return {
    action: { action: "pass" },
    estimate,
    mode,
    reason:
      `Ta meilleure couleur (${modeLabelText(mode)}) ne vaut que ~${estimate} points : ` +
      `c'est insuffisant pour annoncer 80, tu passes.`,
  };
}

function modeLabelText(mode: TrumpMode): string {
  if (mode === "NT") return "Sans Atout";
  if (mode === "AT") return "Tout Atout";
  return SUIT_LABEL[mode];
}

function strengthHint(hand: Card[], mode: TrumpMode): string {
  if (mode === "NT" || mode === "AT") return "Beaucoup de cartes maîtresses.";
  const trumps = hand.filter((c) => c.suit === mode);
  const bits: string[] = [];
  if (trumps.some((c) => c.rank === "J")) bits.push("Valet d'atout");
  if (trumps.some((c) => c.rank === "9")) bits.push("9 d'atout");
  bits.push(`${trumps.length} atouts`);
  return "Atouts : " + bits.join(", ") + ".";
}

/** Estimation par mode, pour afficher le détail au joueur. */
export function handEstimates(hand: Card[], state: GameState): { mode: TrumpMode; est: number }[] {
  return availableModes(state.settings).map((mode) => ({
    mode,
    est: Math.round(estimateForMode(hand, mode)),
  }));
}
