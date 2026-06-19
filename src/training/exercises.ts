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
import { coachBid, coachPlay, handEstimates } from "../engine/coach";
import { teamOf } from "../engine/scoring";

export type PlayFocus = "any" | "attack" | "defense";

// --- Exercice d'enchères ----------------------------------------------------

export type BidOption = { kind: "pass" } | { kind: "bid"; value: number; mode: TrumpMode };

export interface BidExercise {
  kind: "bid";
  hand: Card[];
  options: BidOption[];
  correctIndex: number;
  reason: string;
  estimates: { mode: TrumpMode; est: number }[];
}

const optKey = (o: BidOption) => (o.kind === "pass" ? "pass" : `${o.value}${o.mode}`);

export function genBidExercise(settings: Settings): BidExercise {
  const g = newGame(settings);
  const hand = g.hands[0];
  const advice = coachBid(g, 0);
  const estimates = handEstimates(hand, g);

  const opts: BidOption[] = [];
  if (advice.action.action === "bid") {
    const { value, mode } = advice.action;
    const second = estimates.filter((e) => e.mode !== mode).sort((a, b) => b.est - a.est)[0];
    opts.push({ kind: "bid", value, mode }); // correct
    opts.push({ kind: "pass" }); // trop prudent
    opts.push({ kind: "bid", value: Math.min(160, value + 20), mode }); // trop gourmand
    if (second) opts.push({ kind: "bid", value, mode: second.mode }); // mauvaise couleur
  } else {
    const best = estimates.slice().sort((a, b) => b.est - a.est)[0];
    const second = estimates.filter((e) => e.mode !== best.mode).sort((a, b) => b.est - a.est)[0];
    opts.push({ kind: "pass" }); // correct
    opts.push({ kind: "bid", value: 80, mode: best.mode }); // trop optimiste
    opts.push({ kind: "bid", value: 90, mode: best.mode });
    if (second) opts.push({ kind: "bid", value: 80, mode: second.mode });
  }

  // Dédoublonne et complète à 4 options si besoin.
  const seen = new Set<string>();
  const uniq = opts.filter((o) => (seen.has(optKey(o)) ? false : seen.add(optKey(o)))).slice(0, 4);
  const correctKey = optKey(uniq[0]);
  const shuffled = shuffle(uniq);
  return {
    kind: "bid",
    hand,
    options: shuffled,
    correctIndex: shuffled.findIndex((o) => optKey(o) === correctKey),
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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
