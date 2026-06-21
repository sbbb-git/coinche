// Défi du jour : un exercice de jeu DÉTERMINISTE par date (le même pour tout le
// monde), sans backend. On sème Math.random le temps de la génération pour que le
// moteur (mélange du paquet) produise toujours la même donne pour une date donnée.

import { DEFAULT_SETTINGS } from "../engine/game";
import { genPlayExercise, PlayExercise } from "./exercises";

export function isoDay(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function seedFromKey(key: string): number {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Génère le défi d'une date (mêmes réglages pour tous → donne identique partout). */
export function genDailyChallenge(key: string = isoDay()): PlayExercise {
  const orig = Math.random;
  Math.random = mulberry32(seedFromKey(key));
  try {
    return genPlayExercise(DEFAULT_SETTINGS, "any");
  } finally {
    Math.random = orig;
  }
}
