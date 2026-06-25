// Génération d'exercices d'entraînement, à l'infini, via le moteur + le coach.
// Deux familles bien distinctes : ENCHÈRES et JEU DE LA CARTE.

import { Card, TrumpMode } from "../engine/cards";
import {
  GameState,
  Settings,
  applyBid,
  applyCoinche,
  applyPass,
  applyPlay,
  applySurcoinche,
  legalForCurrent,
  newGame,
} from "../engine/game";
import { aiBid, aiPlay } from "../engine/ai";
import { coachBid, coachPlay, handEstimates, BidAdviceAction } from "../engine/coach";
import { teamOf } from "../engine/scoring";

export type PlayFocus = "any" | "attack" | "defense";

// --- Exercice d'enchères ----------------------------------------------------

export type BidOption = { kind: "pass" } | { kind: "bid"; value: number; mode: TrumpMode };

/** Une ligne d'enchère déjà prononcée, pour le rappel de séquence à l'écran. */
export interface AuctionLine {
  name: string;
  value: string; // "80", "passe", "Capot", "coinche"…
  mode: TrumpMode | null;
  partner: boolean; // annonce du partenaire (siège 2) ?
}

export interface BidExercise {
  kind: "bid";
  hand: Card[];
  auction: AuctionLine[]; // annonces faites avant ton tour (vide si tu ouvres)
  /** Réponse idéale du coach (passer, ou annoncer valeur+couleur). */
  ideal: BidAdviceAction;
  /** Plancher d'annonce légal (il faut dépasser l'enchère en cours). */
  minValue: number;
  reason: string;
  estimates: { mode: TrumpMode; est: number }[];
}

function modeText(mode: TrumpMode): string {
  if (mode === "NT") return "Sans Atout";
  if (mode === "AT") return "Tout Atout";
  return { S: "Pique", H: "Cœur", D: "Carreau", C: "Trèfle" }[mode];
}

export interface BidGrade {
  stars: 0 | 1 | 2 | 3;
  title: string;
}

/** Note NUANCÉE de l'enchère du joueur vs l'idéal (pas un simple vrai/faux). */
export function gradeBid(player: BidOption, ideal: BidAdviceAction): BidGrade {
  if (ideal.action === "pass") {
    return player.kind === "pass"
      ? { stars: 3, title: "Parfait : ici, il fallait passer." }
      : { stars: 1, title: "Un peu trop optimiste : passer était plus sage." };
  }
  const idealTxt = `${ideal.value} ${modeText(ideal.mode)}`;
  if (player.kind === "pass") {
    return { stars: 1, title: `Trop prudent : tu pouvais annoncer ${idealTxt}.` };
  }
  const sameMode = player.mode === ideal.mode;
  const diff = Math.abs(player.value - ideal.value);
  if (sameMode && diff === 0) return { stars: 3, title: "Parfait !" };
  if (sameMode && diff <= 10)
    return { stars: 2, title: `Pas mal ! L'idéal était ${idealTxt} (à 10 près).` };
  if (sameMode)
    return {
      stars: 1,
      title: `Bonne couleur, mais ${player.value > ideal.value ? "trop haut" : "trop bas"} : vise ${idealTxt}.`,
    };
  return { stars: 1, title: `La couleur idéale était plutôt ${modeText(ideal.mode)} (${idealTxt}).` };
}

/** Met en place une séquence d'enchères : les autres joueurs parlent jusqu'à ce
 *  que ce soit (enfin) au tour du siège 0, parfois après un ou plusieurs
 *  contrats adverses/partenaire (« fausses enchères »). */
function setupBidScenario(settings: Settings): GameState {
  // Les meneurs d'enchères jouent « difficile » : des annonces réalistes et variées.
  const fillerSettings: Settings = { ...settings, aiLevel: "hard" };
  for (let attempt = 0; attempt < 30; attempt++) {
    let g = newGame(fillerSettings);
    let guard = 0;
    while (g.phase === "bidding" && g.current !== 0 && guard++ < 12) {
      const d = aiBid(g, g.current);
      if (d.action === "bid") g = applyBid(g, d.value, d.mode, d.capot, d.generale);
      else if (d.action === "coinche") g = applyCoinche(g);
      else if (d.action === "surcoinche") g = applySurcoinche(g);
      else g = applyPass(g);
    }
    // On n'accepte que les situations VALIDES : c'est au siège 0 de parler,
    // toujours en phase d'enchères (une redonne / surcoinche est rejetée).
    if (g.phase === "bidding" && g.current === 0) {
      // On rend la main au profil de l'utilisateur (le coach évalue en expert).
      return { ...g, settings };
    }
  }
  // Repli garanti (cas rarissime) : tu ouvres, sans annonce préalable.
  const g = newGame(settings);
  return { ...g, current: 0, trickLeader: 0, bidHistory: [], standing: null, passStreak: 0 };
}

function auctionLines(g: GameState): AuctionLine[] {
  return g.bidHistory.map((e) => {
    const name = g.settings.playerNames[e.player];
    const partner = e.player === 2;
    if (e.kind === "pass") return { name, value: "passe", mode: null, partner };
    if (e.kind === "coinche") return { name, value: "coinche", mode: null, partner };
    if (e.kind === "surcoinche") return { name, value: "surcoinche", mode: null, partner };
    const value = e.generale ? "Générale" : e.capot ? "Capot" : `${e.value}`;
    return { name, value, mode: e.mode ?? null, partner };
  });
}

export function genBidExercise(settings: Settings): BidExercise {
  const g = setupBidScenario(settings);
  const hand = g.hands[0];
  const advice = coachBid(g, 0);
  const estimates = handEstimates(hand, g);
  // Plancher d'annonce légal : il faut dépasser l'enchère en cours.
  const minValue = g.standing ? g.standing.value + 10 : 80;
  return {
    kind: "bid",
    hand,
    auction: auctionLines(g),
    ideal: advice.action,
    minValue,
    reason: advice.reason,
    estimates,
  };
}

// --- Exercice de jeu de la carte --------------------------------------------

export interface PlayExercise {
  kind: "play";
  state: GameState; // situation : à seat 0 de jouer, avec un vrai choix
  legal: Card[];
  correctId: string;
  reason: string;
}

/** Avance les enchères avec l'IA jusqu'à la phase de jeu. */
function runBidding(g: GameState): GameState {
  let s = 0;
  while (g.phase === "bidding" && s++ < 300) {
    const d = aiBid(g, g.current);
    if (d.action === "bid") g = applyBid(g, d.value, d.mode, d.capot, d.generale);
    else if (d.action === "coinche") g = applyCoinche(g);
    else if (d.action === "surcoinche") g = applySurcoinche(g);
    else g = applyPass(g);
  }
  return g;
}

export function genPlayExercise(userSettings: Settings, focus: PlayFocus = "any"): PlayExercise {
  // Remplissage des IA en "medium" (heuristique, rapide) : Difficile/Expert font
  // du PIMC coûteux. Le coach, lui, évalue toujours en expert.
  const settings: Settings = { ...userSettings, aiLevel: "medium" };
  let anyDecision: PlayExercise | null = null; // repli si le focus n'est jamais satisfait

  const matchesFocus = (g: GameState): boolean => {
    if (focus === "any") return true;
    const attack = teamOf(0) === teamOf(g.contract!.taker);
    return focus === "attack" ? attack : !attack;
  };

  for (let attempt = 0; attempt < 120; attempt++) {
    let g = runBidding(newGame(settings));
    if (g.phase !== "playing") continue;

    let s = 0;
    while (g.phase === "playing" && s++ < 60) {
      if (g.current === 0) {
        const legal = legalForCurrent(g);
        if (legal.length === 0) break;
        if (legal.length > 1) {
          const { best, reason } = coachPlay(g);
          const exo: PlayExercise = { kind: "play", state: g, legal, correctId: best.id, reason };
          if (matchesFocus(g)) return exo; // bon thème : on le renvoie
          if (!anyDecision) anyDecision = exo; // sinon on le garde en repli
        }
      }
      g = applyPlay(g, aiPlay(g));
    }
  }
  if (anyDecision) return anyDecision; // jamais trouvé le thème exact : on renvoie autre chose
  throw new Error("Impossible de générer un exercice de jeu avec ces réglages.");
}
