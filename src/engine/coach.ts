// Coach : conseille le meilleur coup et l'explique. Déterministe (pour la
// review et les exercices). Distingue la phase d'enchères de la phase de jeu.
// Réutilise le moteur d'évaluation de l'IA, en mode "expert".

import { Card, TrumpMode, isTrump, strength, points, RANK_LABEL, RANK_SPOKEN, SUIT_SYMBOL } from "./cards";
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

// Type local : on n'importe PAS depuis l'UI pour garder le moteur sans
// dépendance UI runtime. (Identique au type Lang de src/i18n.)
type Lang = "fr" | "en";

/** Sélecteur de langue : renvoie le texte FR ou EN selon `lang`. */
function M(lang: Lang, fr: string, en: string): string {
  return lang === "fr" ? fr : en;
}

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

export function coachPlay(state: GameState, lang: Lang = "fr"): PlayAdvice {
  const cs = asCoach(state);
  // Analyse Monte-Carlo : le meilleur coup ET ses statistiques (déterministe).
  const { best, outcomes } = analyzePlay(cs, true);
  const reason =
    outcomes.length >= 2 ? playNarrative(cs, best, outcomes, lang) : playReason(cs, best, lang);
  return { best, reason };
}

// --- Récit chiffré du coup (façon « analyse » d'échecs) ---------------------

/** Libellé court d'une carte : « A♣ », « V♠ »… (abréviations FR, rangs parlés EN). */
function cardLabel(c: Card, lang: Lang): string {
  return `${lang === "en" ? RANK_SPOKEN["en"][c.rank] : RANK_LABEL[c.rank]}${SUIT_SYMBOL[c.suit]}`;
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
function playNarrative(state: GameState, best: Card, outcomes: PlayOutcome[], lang: Lang): string {
  const mode = state.contract!.mode;
  const bestO = outcomes.find((o) => o.card.id === best.id) ?? outcomes[0];
  const lines: string[] = [playReason(state, best, lang)];

  // Ligne 2 : les chiffres du coup recommandé (compacts, % mis en valeur).
  const pts =
    bestO.trickPtsForUs >= 1
      ? M(lang, ` (~${Math.round(bestO.trickPtsForUs)} pts)`, ` (~${Math.round(bestO.trickPtsForUs)} pts)`)
      : "";
  if (bestO.trickWinPct >= 0.5) {
    lines.push(
      M(
        lang,
        `**${cardLabel(best, lang)}**, tu remportes ce pli **${pct(bestO.trickWinPct)}%** du temps${pts} · ` +
          `ton camp gagne la donne **~${pct(bestO.dealWinPct)}%**.`,
        `**${cardLabel(best, lang)}**, you win this trick **${pct(bestO.trickWinPct)}%** of the time${pts} · ` +
          `your team wins the deal **~${pct(bestO.dealWinPct)}%**.`,
      ),
    );
  } else {
    lines.push(
      M(
        lang,
        `**${cardLabel(best, lang)}**, tu laisses filer ce pli (**${pct(bestO.trickWinPct)}%**) pour garder tes cartes · ` +
          `ton camp gagne la donne **~${pct(bestO.dealWinPct)}%**.`,
        `**${cardLabel(best, lang)}**, you let this trick go (**${pct(bestO.trickWinPct)}%**) to keep your cards · ` +
          `your team wins the deal **~${pct(bestO.dealWinPct)}%**.`,
      ),
    );
  }

  // Ligne 3 : le scénario du coup tentant mais inférieur.
  const alt = pickTempting(best, outcomes, mode);
  if (alt) {
    const delta = bestO.scoreDiff - alt.scoreDiff;
    if (delta >= 4) {
      // Écart en points : au-delà d'une donne (~160), on ne montre pas un nombre
      // peu crédible mais une formule qualitative (le coup fait basculer la donne).
      const cost =
        delta >= 120
          ? M(lang, "**ferait probablement basculer la donne**", "**would probably swing the deal**")
          : M(lang, `**~${Math.round(delta)} pts** plus bas`, `**~${Math.round(delta)} pts** lower`);
      if (alt.trickWinPct > bestO.trickWinPct + 0.15) {
        lines.push(
          M(
            lang,
            `vs **${cardLabel(alt.card, lang)}** : prendrait ce pli (**${pct(alt.trickWinPct)}%**) mais ton camp finirait ${cost}, ` +
              `garde-la, elle vaut plus tard.`,
            `vs **${cardLabel(alt.card, lang)}**: would take this trick (**${pct(alt.trickWinPct)}%**) but your team would end up ${cost}, ` +
              `keep it, it is worth more later.`,
          ),
        );
      } else {
        lines.push(
          M(
            lang,
            `vs **${cardLabel(alt.card, lang)}** : même pli, mais ton camp finirait ${cost}, ` +
              `garde-la pour un pli que tu peux rafler.`,
            `vs **${cardLabel(alt.card, lang)}**: same trick, but your team would end up ${cost}, ` +
              `keep it for a trick you can actually win.`,
          ),
        );
      }
    }
  }
  return lines.join("\n");
}

export function playReason(state: GameState, card: Card, lang: Lang = "fr"): string {
  const mode = state.contract!.mode;
  const trick = state.trick;
  const me = state.current;

  if (trick.length === 0) {
    const iAmTaker = teamOf(state.contract!.taker) === teamOf(me);
    if (iAmTaker && state.contract!.coinche > 1 && !isTrump(card, mode)) {
      return M(
        lang,
        "Tu as été coinché : on ne part JAMAIS à l'atout (le coincheur en a). Tu encaisses d'abord tes maîtres dans les couleurs.",
        "You have been coinched: NEVER lead trump (the coincher holds it). Cash your master cards in the side suits first.",
      );
    }
    if (isTrump(card, mode) && iAmTaker) {
      const high = card.rank === "J" || card.rank === "9";
      return high
        ? M(
            lang,
            "Tu es preneur : tu tires un gros atout pour faire tomber ceux des adversaires.",
            "You are the declarer: you play a high trump to draw out the opponents' trumps.",
          )
        : M(
            lang,
            "Tu es preneur : tu tires l'atout pour vider les adversaires avant d'encaisser tes couleurs.",
            "You are the declarer: you draw trumps to empty the opponents before cashing your side suits.",
          );
    }
    if (card.rank === "A" && !isTrump(card, mode)) {
      // « Pli sûr » UNIQUEMENT en Sans Atout : à l'atout, un adversaire coupé dans
      // la couleur peut couper ton As. On ne promet donc pas un pli garanti.
      return mode === "NT"
        ? M(
            lang,
            "Tu entames de ton As maître : un pli sûr (personne ne peut le couper), et tu gardes la main.",
            "You lead your master Ace: a safe trick (no one can ruff it), and you keep the lead.",
          )
        : M(
            lang,
            "Tu entames ton As : tu encaisses des points et gardes la main, à moins qu'un adversaire, coupé dans cette couleur, ne le coupe.",
            "You lead your Ace: you cash points and keep the lead, unless an opponent who is void in this suit ruffs it.",
          );
    }
    if (!iAmTaker) {
      return M(
        lang,
        "En défense : tu entames petit, sans ouvrir l'atout ni lâcher tes As, tu laisses le preneur se découvrir.",
        "On defence: you lead low, without opening trump or releasing your Aces, letting the declarer show his hand.",
      );
    }
    return M(
      lang,
      "Tu entames petit dans une couleur, sans gâcher tes cartes fortes.",
      "You lead low in a side suit, without wasting your strong cards.",
    );
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
        ? M(
            lang,
            "Ton partenaire remporte le pli : tu le « charges » au maximum de points (As, 10…).",
            "Your partner wins the trick: you load it with as many points as possible (Ace, 10…).",
          )
        : M(
            lang,
            "Ton partenaire tient le pli : tu le « charges » de points (un adversaire joue encore, mais le risque est faible).",
            "Your partner holds the trick: you load it with points (an opponent still plays, but the risk is low).",
          );
    }
    return M(
      lang,
      "Ton partenaire tient le pli : pas de gros points à donner ici, tu te défausses petit en gardant tes maîtres.",
      "Your partner holds the trick: no big points to give here, you discard low while keeping your masters.",
    );
  }

  const wins = beats(card, master, led, mode);

  // Coupe (atout sur une autre couleur).
  if (wins && isTrump(card, mode) && led !== mode && mode !== "AT") {
    return isLast
      ? M(
          lang,
          "Tu coupes pour remporter le pli que l'adversaire tenait.",
          "You ruff to win the trick the opponent was holding.",
        )
      : M(
          lang,
          "Tu coupes pour rafler ce pli à l'adversaire (et tu mets juste assez d'atout).",
          "You ruff to snatch this trick from the opponent (using just enough trump).",
        );
  }

  const pos = trick.length === 1 ? "2ᵉ" : "3ᵉ";
  const posEn = trick.length === 1 ? "2nd" : "3rd";

  if (wins) {
    if (isLast) {
      return M(
        lang,
        "Dernier à jouer : tu remportes le pli avec la plus petite carte qui suffit.",
        "Last to play: you win the trick with the smallest card that is enough.",
      );
    }
    // Pas le dernier : as-tu gardé une carte PLUS FORTE de la même couleur ?
    const sameKind = (c: Card) => isTrump(c, mode) === isTrump(card, mode) && c.suit === card.suit;
    const keptStronger = state.hands[me].some((c) => sameKind(c) && strength(c, mode) > strength(card, mode));
    if (keptStronger) {
      return M(
        lang,
        `Tu n'es que ${pos} à jouer : tu poses ta plus petite carte qui passe et tu GARDES ta ` +
          `maîtresse, le preneur joue après toi et pourrait la couper ou la surmonter (« deuxième main basse »).`,
        `You are only ${posEn} to play: you play your smallest card that wins and you KEEP your ` +
          `master, the declarer plays after you and could ruff or overtake it ("second hand low").`,
      );
    }
    return M(
      lang,
      `Tu prends, mais prudence : tu n'es que ${pos}, le preneur joue encore après toi.`,
      `You take it, but be careful: you are only ${posEn}, the declarer still plays after you.`,
    );
  }

  if (isTrump(card, mode) && led !== mode && mode !== "AT" && mode !== "NT") {
    // On met de l'atout sans dépasser le maître : soit on n'a pas assez gros,
    // soit on choisit de ne pas surcouper trop haut.
    return M(
      lang,
      "Tu es obligé de fournir de l'atout (tu n'as pas la couleur demandée), mais le maître reste devant : tu mets le plus petit.",
      "You are forced to play trump (you do not have the led suit), but the master stays ahead: you play the lowest.",
    );
  }

  // On ne prend pas : duck / défausse. Plusieurs cas distincts à expliquer.
  const followingSuit = card.suit === led && !isTrump(card, mode);
  if (followingSuit) {
    // On fournit la couleur demandée sans pouvoir (ou vouloir) prendre.
    const duckedMaster = state.hands[me].some(
      (c) => c.suit === led && (c.rank === "A" || c.rank === "10"),
    );
    if (duckedMaster) {
      return M(
        lang,
        "Tu laisses filer ce petit pli et tu GARDES ton As/10 de la couleur pour un pli qui comptera vraiment.",
        "You let this small trick go and you KEEP your Ace/10 of the suit for a trick that will really matter.",
      );
    }
    return M(
      lang,
      "Tu fournis la couleur demandée avec ta plus petite carte : impossible de prendre, autant économiser.",
      "You follow the led suit with your smallest card: you cannot take it, so you save your cards.",
    );
  }

  // En Tout Atout, tout est atout : on ne « coupe » pas, on se défausse simplement.
  if (mode === "AT") {
    return M(
      lang,
      "Tu ne peux pas suivre la couleur demandée : tu te défausses de ta plus petite carte en gardant tes maîtres.",
      "You cannot follow the led suit: you discard your smallest card while keeping your masters.",
    );
  }

  // Défausse hors couleur (et sans couper). Pourquoi ne pas couper ?
  const hasTrump = state.hands[me].some((c) => isTrump(c, mode));
  const trickHasPoints = trick.some((t) => t.card.rank === "A" || t.card.rank === "10");
  if (hasTrump && mode !== "NT") {
    // On a de l'atout mais on garde : le pli ne vaut pas qu'on dépense un atout.
    return trickHasPoints
      ? M(
          lang,
          "Tu ne peux pas suivre et le maître est déjà adverse : ici tu préfères garder tes atouts plutôt que de couper un pli risqué.",
          "You cannot follow and the master is already with the opponents: here you prefer to keep your trumps rather than ruff a risky trick.",
        )
      : M(
          lang,
          "Tu te défausses sans couper : ce petit pli ne vaut pas un atout, tu gardes tes coupes pour les gros plis.",
          "You discard without ruffing: this small trick is not worth a trump, you save your ruffs for the big tricks.",
        );
  }
  // Pas d'atout (ou Sans-Atout) : pure défausse.
  return M(
    lang,
    "Tu ne peux ni suivre ni couper : tu te débarrasses d'une carte inutile en gardant tes maîtresses.",
    "You can neither follow nor ruff: you get rid of a useless card while keeping your masters.",
  );
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
export function coachBid(state: GameState, player: number, lang: Lang = "fr"): BidAdvice {
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
  const auctionHint = readHint(read, mode, standingIsPartner, state.standing?.value ?? 0, lang);

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
        reason: M(
          lang,
          `Ton partenaire a ouvert à 80 ${modeLabelText(tr, lang)} et tu as le Valet ET le 9 de sa ` +
            `couleur : relance à 100 (« 100 fort »), c'est un soutien décisif.`,
          `Your partner opened at 80 ${modeLabelText(tr, lang)} and you have the Jack AND the 9 of his ` +
            `suit: raise to 100 ("strong 100"), it is a decisive support.`,
        ),
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
        reason: M(
          lang,
          `Ton partenaire a pris à ${modeLabelText(tr, lang)} et tu as de quoi le soutenir ` +
            `(atouts et/ou As) : relance à ${tgt} plutôt que de passer.`,
          `Your partner took the bid at ${modeLabelText(tr, lang)} and you have enough to support him ` +
            `(trumps and/or Aces): raise to ${tgt} rather than passing.`,
        ),
      };
    }
  }

  if (est >= 80 && target >= minToBid && target <= 160 && !state.standing?.capot) {
    return {
      action: { action: "bid", value: target, mode },
      estimate,
      mode,
      reason: M(
        lang,
        `Ta main vaut ~${estimate} points à ${modeLabelText(mode, lang)} : tu peux annoncer ` +
          `${target}. ${strengthHint(hand, mode, lang)}${auctionHint}`,
        `Your hand is worth ~${estimate} points at ${modeLabelText(mode, lang)}: you can bid ` +
          `${target}. ${strengthHint(hand, mode, lang)}${auctionHint}`,
      ),
    };
  }
  return {
    action: { action: "pass" },
    estimate,
    mode,
    reason: M(
      lang,
      `Au mieux ta main ne vaut que ~${estimate} points (${modeLabelText(mode, lang)})` +
        `${auctionHint} : insuffisant pour ${state.standing ? "surenchérir" : "annoncer 80"}, tu passes.`,
      `At best your hand is worth only ~${estimate} points (${modeLabelText(mode, lang)})` +
        `${auctionHint}: not enough to ${state.standing ? "overbid" : "bid 80"}, you pass.`,
    ),
  };
}

/** Phrase d'explication sur la lecture des annonces (vide si aucune annonce). */
function readHint(
  read: ReturnType<typeof readAuction>,
  mode: TrumpMode,
  standingIsPartner: boolean,
  standingVal: number,
  lang: Lang,
): string {
  const bits: string[] = [];
  const oppInMode = read.oppBestInSuit[mode] ?? 0;
  if (oppInMode > 0) {
    bits.push(
      M(
        lang,
        `un adversaire a déjà pris à ${modeLabelText(mode, lang)} (il tient les gros atouts)`,
        `an opponent has already bid ${modeLabelText(mode, lang)} (he holds the high trumps)`,
      ),
    );
  } else if (read.oppBestAny > 0) {
    bits.push(
      M(
        lang,
        `les adversaires ont annoncé jusqu'à ${read.oppBestAny} (moins de points pour ton camp)`,
        `the opponents have bid up to ${read.oppBestAny} (fewer points for your team)`,
      ),
    );
  }
  if (standingIsPartner && standingVal > 0) {
    bits.push(
      M(
        lang,
        `c'est ton partenaire qui tient l'enchère à ${standingVal} : ne le surenchéris que si tu apportes vraiment`,
        `your partner holds the bid at ${standingVal}: only overbid him if you really add something`,
      ),
    );
  } else if (read.partnerSuit && read.partnerSuit === mode) {
    bits.push(
      M(
        lang,
        `ton partenaire soutient ${modeLabelText(mode, lang)}`,
        `your partner supports ${modeLabelText(mode, lang)}`,
      ),
    );
  }
  return bits.length
    ? M(
        lang,
        ` À la lecture des enchères : ${bits.join(" ; ")}.`,
        ` Reading the auction: ${bits.join(" ; ")}.`,
      )
    : "";
}

function modeLabelText(mode: TrumpMode, lang: Lang): string {
  if (mode === "NT") return M(lang, "Sans Atout", "No Trump");
  if (mode === "AT") return M(lang, "Tout Atout", "All Trump");
  if (lang === "en") {
    const EN_SUIT: Record<"S" | "H" | "D" | "C", string> = {
      S: "Spades",
      H: "Hearts",
      D: "Diamonds",
      C: "Clubs",
    };
    return EN_SUIT[mode];
  }
  return SUIT_LABEL[mode];
}

function strengthHint(hand: Card[], mode: TrumpMode, lang: Lang): string {
  if (mode === "NT" || mode === "AT")
    return M(lang, "Beaucoup de cartes maîtresses.", "Plenty of master cards.");
  const trumps = hand.filter((c) => c.suit === mode);
  const bits: string[] = [];
  if (trumps.some((c) => c.rank === "J")) bits.push(M(lang, "Valet d'atout", "trump Jack"));
  if (trumps.some((c) => c.rank === "9")) bits.push(M(lang, "9 d'atout", "trump 9"));
  bits.push(M(lang, `${trumps.length} atouts`, `${trumps.length} trumps`));
  return M(lang, "Atouts : " + bits.join(", ") + ".", "Trumps: " + bits.join(", ") + ".");
}

/** Estimation par mode, pour afficher le détail au joueur. */
export function handEstimates(hand: Card[], state: GameState): { mode: TrumpMode; est: number }[] {
  return availableModes(state.settings).map((mode) => ({
    mode,
    est: Math.round(estimateForMode(hand, mode)),
  }));
}
