// Génération d'exercices d'entraînement, à l'infini, via le moteur + le coach.
// Deux familles bien distinctes : ENCHÈRES et JEU DE LA CARTE.

import { Card, SUIT_SYMBOL, TrumpMode } from "../engine/cards";
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

function modeLabel(mode: TrumpMode): string {
  if (mode === "NT") return "Sans Atout";
  if (mode === "AT") return "Tout Atout";
  return SUIT_SYMBOL[mode];
}

function bidLabel(value: number, mode: TrumpMode): string {
  return `${value} ${modeLabel(mode)}`;
}

// --- Exercice d'enchères ----------------------------------------------------

export interface BidExercise {
  kind: "bid";
  hand: Card[];
  options: string[];
  correctIndex: number;
  reason: string;
  estimates: { mode: TrumpMode; est: number }[];
}

export function genBidExercise(settings: Settings): BidExercise {
  const g = newGame(settings);
  const hand = g.hands[0];
  const advice = coachBid(g, 0);
  const estimates = handEstimates(hand, g);

  const opts: string[] = [];
  if (advice.action.action === "bid") {
    const { value, mode } = advice.action;
    const second = estimates.filter((e) => e.mode !== mode).sort((a, b) => b.est - a.est)[0];
    opts.push(bidLabel(value, mode)); // correct
    opts.push("Passer"); // trop prudent
    opts.push(bidLabel(Math.min(160, value + 20), mode)); // trop gourmand
    if (second) opts.push(bidLabel(value, second.mode)); // mauvaise couleur
  } else {
    const best = estimates.slice().sort((a, b) => b.est - a.est)[0];
    const second = estimates.filter((e) => e.mode !== best.mode).sort((a, b) => b.est - a.est)[0];
    opts.push("Passer"); // correct
    opts.push(bidLabel(80, best.mode)); // trop optimiste
    opts.push(bidLabel(90, best.mode));
    if (second) opts.push(bidLabel(80, second.mode));
  }

  // Dédoublonne et complète à 4 options si besoin.
  const uniq = Array.from(new Set(opts)).slice(0, 4);
  const correct = uniq[0];
  const shuffled = shuffle(uniq);
  return {
    kind: "bid",
    hand,
    options: shuffled,
    correctIndex: shuffled.indexOf(correct),
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
    if (d.action === "bid") g = applyBid(g, d.value, d.mode, d.capot);
    else if (d.action === "coinche") g = applyCoinche(g);
    else if (d.action === "surcoinche") g = applySurcoinche(g);
    else g = applyPass(g);
  }
  return g;
}

export function genPlayExercise(userSettings: Settings): PlayExercise {
  // Remplissage des IA en "hard" (rapide) même si l'utilisateur joue en Expert
  // (l'Expert/PIMC est coûteux) ; le coach, lui, évalue toujours en expert.
  const settings: Settings = { ...userSettings, aiLevel: "hard" };
  // À défaut d'un vrai choix, on garde le premier coup (même forcé) rencontré,
  // pour toujours renvoyer une situation valide (jamais de contrat nul).
  let fallback: PlayExercise | null = null;

  for (let attempt = 0; attempt < 80; attempt++) {
    let g = runBidding(newGame(settings));
    if (g.phase !== "playing") continue;

    let s = 0;
    while (g.phase === "playing" && s++ < 60) {
      if (g.current === 0) {
        const legal = legalForCurrent(g);
        if (legal.length === 0) break;
        const { best, reason } = coachPlay(g);
        const exo: PlayExercise = { kind: "play", state: g, legal, correctId: best.id, reason };
        if (legal.length > 1) return exo; // vrai choix : on le renvoie
        if (!fallback) fallback = exo; // coup forcé : repli éventuel
        g = applyPlay(g, legal[0]);
      } else {
        g = applyPlay(g, aiPlay(g));
      }
    }
    if (fallback) return fallback; // on a au moins une situation jouable valide
  }
  if (fallback) return fallback;
  // Garantie absolue : on force une donne qui atteint la phase de jeu.
  for (let attempt = 0; attempt < 200; attempt++) {
    let g = runBidding(newGame(settings));
    if (g.phase !== "playing") continue;
    let s = 0;
    while (g.phase === "playing" && s++ < 60) {
      if (g.current === 0) {
        const legal = legalForCurrent(g);
        if (legal.length === 0) break;
        const { best, reason } = coachPlay(g);
        return { kind: "play", state: g, legal, correctId: best.id, reason };
      }
      g = applyPlay(g, aiPlay(g));
    }
  }
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
