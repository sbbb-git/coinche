// Coach : conseille le meilleur coup et l'explique. Déterministe (pour la
// review et les exercices). Distingue la phase d'enchères de la phase de jeu.
// Réutilise le moteur d'évaluation de l'IA, en mode "expert".

import { Card, TrumpMode, isTrump } from "./cards";
import {
  GameState,
  PlayProfile,
  availableModes,
  canBid,
  legalForCurrent,
} from "./game";
import { aiPlay, bestContractAuction, estimateForMode, partnerSupportRaise, readAuction } from "./ai";
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
    const iAmTaker = teamOf(state.contract!.taker) === teamOf(me);
    if (iAmTaker && state.contract!.coinche > 1 && !isTrump(card, mode)) {
      return "Tu as été contré : on ne part JAMAIS à l'atout (le contreur en a). Tu encaisses d'abord tes maîtres dans les couleurs.";
    }
    if (isTrump(card, mode) && iAmTaker) {
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
  // Évaluation qui LIT les annonces déjà faites (dévalue la couleur prise par
  // l'adversaire, tient compte d'un partenaire fort, etc.).
  const { mode, est } = bestContractAuction(state, player, modes);
  const read = readAuction(state, player);
  const estimate = Math.round(est);

  const standingVal = state.standing?.value ?? 0;
  const standingIsPartner = state.standing
    ? teamOf(state.standing.player) === teamOf(player)
    : false;
  const minToBid = standingIsPartner ? standingVal + 20 : standingVal + 10;

  // Indices de lecture des enchères, ajoutés à l'explication.
  const auctionHint = readHint(read, mode, standingIsPartner, state.standing?.value ?? 0);

  let target = Math.max(80, Math.min(160, Math.round(est / 10) * 10));
  if (target < minToBid) target = minToBid; // pour annoncer il faut dépasser l'enchère en cours

  // Convention « 100 fort » : le partenaire a ouvert à 80 dans une couleur, et on
  // a Valet + 9 de cette couleur → on relance à 100 (si c'est légalement annonçable).
  const tr = state.standing?.mode;
  if (
    state.standing &&
    !state.standing.capot &&
    state.standing.value === 80 &&
    standingIsPartner &&
    (tr === "S" || tr === "H" || tr === "D" || tr === "C") &&
    canBid(state, 100, false)
  ) {
    const hasJ = hand.some((c) => c.suit === tr && c.rank === "J");
    const has9 = hand.some((c) => c.suit === tr && c.rank === "9");
    if (hasJ && has9) {
      return {
        action: { action: "bid", value: 100, mode: tr },
        estimate,
        mode: tr,
        reason:
          `Ton partenaire a ouvert à 80 ${modeLabelText(tr)} et tu as le Valet ET le 9 de sa ` +
          `couleur : relance à 100 (« 100 fort »), c'est un soutien décisif.`,
      };
    }
  }

  // Soutien du partenaire : il a pris, et on a du jeu dans sa couleur / des As.
  // (Pas de re-relance en boucle : seulement si l'on n'a pas déjà annoncé.)
  const iHaveBid = state.bidHistory.some((e) => e.player === player && e.kind === "bid");
  if (
    state.standing &&
    !state.standing.capot &&
    !state.standing.generale &&
    standingIsPartner &&
    !iHaveBid &&
    state.standing.value <= 120 &&
    (tr === "S" || tr === "H" || tr === "D" || tr === "C")
  ) {
    const inc = partnerSupportRaise(hand, tr);
    const tgt = Math.min(160, state.standing.value + inc);
    if (inc > 0 && canBid(state, tgt, false)) {
      return {
        action: { action: "bid", value: tgt, mode: tr },
        estimate,
        mode: tr,
        reason:
          `Ton partenaire a pris à ${modeLabelText(tr)} et tu as de quoi le soutenir ` +
          `(atouts et/ou As) : relance à ${tgt} plutôt que de passer.`,
      };
    }
  }

  if (est >= 80 && target >= minToBid && target <= 160 && !state.standing?.capot) {
    return {
      action: { action: "bid", value: target, mode },
      estimate,
      mode,
      reason:
        `Ta main vaut ~${estimate} points à ${modeLabelText(mode)} : tu peux annoncer ` +
        `${target}. ${strengthHint(hand, mode)}${auctionHint}`,
    };
  }
  return {
    action: { action: "pass" },
    estimate,
    mode,
    reason:
      `Au mieux ta main ne vaut que ~${estimate} points (${modeLabelText(mode)})` +
      `${auctionHint} : insuffisant pour ${state.standing ? "surenchérir" : "annoncer 80"}, tu passes.`,
  };
}

/** Phrase d'explication sur la lecture des annonces (vide si aucune annonce). */
function readHint(
  read: ReturnType<typeof readAuction>,
  mode: TrumpMode,
  standingIsPartner: boolean,
  standingVal: number,
): string {
  const bits: string[] = [];
  const oppInMode = read.oppBestInSuit[mode] ?? 0;
  if (oppInMode > 0) {
    bits.push(`un adversaire a déjà pris à ${modeLabelText(mode)} (il tient les gros atouts)`);
  } else if (read.oppBestAny > 0) {
    bits.push(`les adversaires ont annoncé jusqu'à ${read.oppBestAny} (moins de points pour ton camp)`);
  }
  if (standingIsPartner && standingVal > 0) {
    bits.push(`c'est ton partenaire qui tient l'enchère à ${standingVal} : ne le surenchéris que si tu apportes vraiment`);
  } else if (read.partnerSuit && read.partnerSuit === mode) {
    bits.push(`ton partenaire soutient ${modeLabelText(mode)}`);
  }
  return bits.length ? ` À la lecture des enchères : ${bits.join(" ; ")}.` : "";
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
