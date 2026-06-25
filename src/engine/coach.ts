// Coach : conseille le meilleur coup et l'explique. Déterministe (pour la
// review et les exercices). Distingue la phase d'enchères de la phase de jeu.
// Réutilise le moteur d'évaluation de l'IA, en mode "expert".

import { Card, TrumpMode, isTrump, strength, points, RANK_LABEL, SUIT_SYMBOL } from "./cards";
import {
  GameState,
  PlayProfile,
  availableModes,
  canBid,
  legalForCurrent,
} from "./game";
import {
  PlayOutcome,
  analyzePlay,
  bestContractAuction,
  estimateForMode,
  partnerSupportRaise,
  readAuction,
} from "./ai";
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
  // Analyse Monte-Carlo : le meilleur coup ET ses statistiques (déterministe).
  const { best, outcomes } = analyzePlay(cs, true);
  const reason = outcomes.length >= 2 ? playNarrative(cs, best, outcomes) : playReason(cs, best);
  return { best, reason };
}

// --- Récit chiffré du coup (façon « analyse » d'échecs) ---------------------

/** Libellé court d'une carte : « A♣ », « V♠ »… */
function cardLabel(c: Card): string {
  return `${RANK_LABEL[c.rank]}${SUIT_SYMBOL[c.suit]}`;
}

/** Arrondi à 5 % près : ~32 simulations ne justifient pas plus de précision. */
function pct(x: number): number {
  return Math.round(x * 20) * 5;
}

/** Le coup « tape-à-l'œil » qu'un débutant jouerait à la place du meilleur : celui
 *  qui rafle le pli le plus souvent, sinon la plus grosse carte. */
function pickTempting(best: Card, outcomes: PlayOutcome[], mode: TrumpMode): PlayOutcome | null {
  const others = outcomes.filter((o) => o.card.id !== best.id);
  if (others.length === 0) return null;
  return [...others].sort(
    (a, b) => b.trickWinPct - a.trickWinPct || points(b.card, mode) - points(a.card, mode),
  )[0];
}

/**
 * Explication scénarisée et chiffrée. Trois temps : le POURQUOI (concept), les
 * CHIFFRES du coup recommandé tirés des simulations (probabilité de gagner le pli /
 * la donne, points moyens), puis le SCÉNARIO comparé au coup tentant mais inférieur
 * (« si tu jouais X… »). Tous les nombres viennent du Monte-Carlo : aucun inventé.
 */
function playNarrative(state: GameState, best: Card, outcomes: PlayOutcome[]): string {
  const mode = state.contract!.mode;
  const bestO = outcomes.find((o) => o.card.id === best.id) ?? outcomes[0];
  const lines: string[] = [playReason(state, best)];

  // Ligne 2 : les chiffres du coup recommandé (compacts, % mis en valeur).
  const pts = bestO.trickPtsForUs >= 1 ? ` (~${Math.round(bestO.trickPtsForUs)} pts)` : "";
  if (bestO.trickWinPct >= 0.5) {
    lines.push(
      `**${cardLabel(best)}**, tu remportes ce pli **${pct(bestO.trickWinPct)}%** du temps${pts} · ` +
        `ton camp gagne la donne **~${pct(bestO.dealWinPct)}%**.`,
    );
  } else {
    lines.push(
      `**${cardLabel(best)}**, tu laisses filer ce pli (**${pct(bestO.trickWinPct)}%**) pour garder tes cartes · ` +
        `ton camp gagne la donne **~${pct(bestO.dealWinPct)}%**.`,
    );
  }

  // Ligne 3 : le scénario du coup tentant mais inférieur.
  const alt = pickTempting(best, outcomes, mode);
  if (alt) {
    const delta = bestO.scoreDiff - alt.scoreDiff;
    if (delta >= 4) {
      // Écart en points : au-delà d'une donne (~160), on ne montre pas un nombre
      // peu crédible mais une formule qualitative (le coup fait basculer la donne).
      const cost = delta >= 120 ? "**ferait probablement basculer la donne**" : `**~${Math.round(delta)} pts** plus bas`;
      if (alt.trickWinPct > bestO.trickWinPct + 0.15) {
        lines.push(
          `vs **${cardLabel(alt.card)}** : prendrait ce pli (**${pct(alt.trickWinPct)}%**) mais ton camp finirait ${cost}, ` +
            `garde-la, elle vaut plus tard.`,
        );
      } else {
        lines.push(
          `vs **${cardLabel(alt.card)}** : même pli, mais ton camp finirait ${cost}, ` +
            `garde-la pour un pli que tu peux rafler.`,
        );
      }
    }
  }
  return lines.join("\n");
}

export function playReason(state: GameState, card: Card): string {
  const mode = state.contract!.mode;
  const trick = state.trick;
  const me = state.current;

  if (trick.length === 0) {
    const iAmTaker = teamOf(state.contract!.taker) === teamOf(me);
    if (iAmTaker && state.contract!.coinche > 1 && !isTrump(card, mode)) {
      return "Tu as été coinché : on ne part JAMAIS à l'atout (le coincheur en a). Tu encaisses d'abord tes maîtres dans les couleurs.";
    }
    if (isTrump(card, mode) && iAmTaker) {
      const high = card.rank === "J" || card.rank === "9";
      return high
        ? "Tu es preneur : tu tires un gros atout pour faire tomber ceux des adversaires."
        : "Tu es preneur : tu tires l'atout pour vider les adversaires avant d'encaisser tes couleurs.";
    }
    if (card.rank === "A" && !isTrump(card, mode)) {
      // « Pli sûr » UNIQUEMENT en Sans Atout : à l'atout, un adversaire coupé dans
      // la couleur peut couper ton As. On ne promet donc pas un pli garanti.
      return mode === "NT"
        ? "Tu entames de ton As maître : un pli sûr (personne ne peut le couper), et tu gardes la main."
        : "Tu entames ton As : tu encaisses des points et gardes la main, à moins qu'un adversaire, coupé dans cette couleur, ne le coupe.";
    }
    if (!iAmTaker) {
      return "En défense : tu entames petit, sans ouvrir l'atout ni lâcher tes As, tu laisses le preneur se découvrir.";
    }
    return "Tu entames petit dans une couleur, sans gâcher tes cartes fortes.";
  }

  const led = trick[0].card.suit;
  const wIdx = winningIndex(trick, mode);
  const master = trick[wIdx].card;
  const partnerMaster = partnerIsWinning(trick, me, mode);
  const isLast = trick.length === 3; // dernier à jouer => prise garantie

  if (partnerMaster) {
    const charge = points(card, mode) >= 4; // A/10/R (et V/9 d'atout) = points à donner
    if (charge) {
      return isLast
        ? "Ton partenaire remporte le pli : tu le « charges » au maximum de points (As, 10…)."
        : "Ton partenaire tient le pli : tu le « charges » de points (un adversaire joue encore, mais le risque est faible).";
    }
    return "Ton partenaire tient le pli : pas de gros points à donner ici, tu te défausses petit en gardant tes maîtres.";
  }

  const wins = beats(card, master, led, mode);

  // Coupe (atout sur une autre couleur).
  if (wins && isTrump(card, mode) && led !== mode && mode !== "AT") {
    return isLast
      ? "Tu coupes pour remporter le pli que l'adversaire tenait."
      : "Tu coupes pour rafler ce pli à l'adversaire (et tu mets juste assez d'atout).";
  }

  const pos = trick.length === 1 ? "2ᵉ" : "3ᵉ";

  if (wins) {
    if (isLast) {
      return "Dernier à jouer : tu remportes le pli avec la plus petite carte qui suffit.";
    }
    // Pas le dernier : as-tu gardé une carte PLUS FORTE de la même couleur ?
    const sameKind = (c: Card) => isTrump(c, mode) === isTrump(card, mode) && c.suit === card.suit;
    const keptStronger = state.hands[me].some((c) => sameKind(c) && strength(c, mode) > strength(card, mode));
    if (keptStronger) {
      return (
        `Tu n'es que ${pos} à jouer : tu poses ta plus petite carte qui passe et tu GARDES ta ` +
        `maîtresse, le preneur joue après toi et pourrait la couper ou la surmonter (« deuxième main basse »).`
      );
    }
    return `Tu prends, mais prudence : tu n'es que ${pos}, le preneur joue encore après toi.`;
  }

  if (isTrump(card, mode) && led !== mode && mode !== "AT" && mode !== "NT") {
    // On met de l'atout sans dépasser le maître : soit on n'a pas assez gros,
    // soit on choisit de ne pas surcouper trop haut.
    return "Tu es obligé de fournir de l'atout (tu n'as pas la couleur demandée), mais le maître reste devant : tu mets le plus petit.";
  }

  // On ne prend pas : duck / défausse. Plusieurs cas distincts à expliquer.
  const followingSuit = card.suit === led && !isTrump(card, mode);
  if (followingSuit) {
    // On fournit la couleur demandée sans pouvoir (ou vouloir) prendre.
    const duckedMaster = state.hands[me].some(
      (c) => c.suit === led && (c.rank === "A" || c.rank === "10"),
    );
    if (duckedMaster) {
      return "Tu laisses filer ce petit pli et tu GARDES ton As/10 de la couleur pour un pli qui comptera vraiment.";
    }
    return "Tu fournis la couleur demandée avec ta plus petite carte : impossible de prendre, autant économiser.";
  }

  // En Tout Atout, tout est atout : on ne « coupe » pas, on se défausse simplement.
  if (mode === "AT") {
    return "Tu ne peux pas suivre la couleur demandée : tu te défausses de ta plus petite carte en gardant tes maîtres.";
  }

  // Défausse hors couleur (et sans couper). Pourquoi ne pas couper ?
  const hasTrump = state.hands[me].some((c) => isTrump(c, mode));
  const trickHasPoints = trick.some((t) => t.card.rank === "A" || t.card.rank === "10");
  if (hasTrump && mode !== "NT") {
    // On a de l'atout mais on garde : le pli ne vaut pas qu'on dépense un atout.
    return trickHasPoints
      ? "Tu ne peux pas suivre et le maître est déjà adverse : ici tu préfères garder tes atouts plutôt que de couper un pli risqué."
      : "Tu te défausses sans couper : ce petit pli ne vaut pas un atout, tu gardes tes coupes pour les gros plis.";
  }
  // Pas d'atout (ou Sans-Atout) : pure défausse.
  return "Tu ne peux ni suivre ni couper : tu te débarrasses d'une carte inutile en gardant tes maîtresses.";
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
