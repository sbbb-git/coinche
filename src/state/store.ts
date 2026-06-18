// Store global : enveloppe le moteur pur et orchestre les tours des IA.

import { create } from "zustand";
import { Card, TrumpMode } from "../engine/cards";
import {
  DEFAULT_SETTINGS,
  GameState,
  Settings,
  applyBid,
  applyCoinche,
  applyPass,
  applyPlay,
  applySurcoinche,
  newGame,
  nextDeal as engineNextDeal,
} from "../engine/game";
import { aiBid, aiPlay } from "../engine/ai";
import { PlayedCard } from "../engine/rules";

export const HUMAN = 0; // le joueur humain est toujours le siège 0 (en bas)

interface Store {
  game: GameState;
  /** une IA est en train de réfléchir (pour le voyant "…") */
  thinking: boolean;
  /** pli complet figé à l'écran le temps qu'on le voie, avant résolution */
  overlayTrick: PlayedCard[] | null;

  startNewGame: (settings?: Settings) => void;
  bid: (value: number, mode: TrumpMode, capot: boolean) => void;
  pass: () => void;
  coinche: () => void;
  surcoinche: () => void;
  play: (card: Card) => void;
  continueDeal: () => void;
}

// Timers au niveau module (hors du state React) pour piloter les IA.
let aiTimer: ReturnType<typeof setTimeout> | null = null;
function clearAiTimer() {
  if (aiTimer) {
    clearTimeout(aiTimer);
    aiTimer = null;
  }
}

const TRICK_PAUSE_MS = 1300; // temps d'affichage d'un pli complet

export const useGame = create<Store>((set, get) => {
  /** Programme le prochain coup d'IA si c'est à une IA de jouer. */
  function scheduleAI() {
    clearAiTimer();
    const g = get().game;
    if (g.phase !== "bidding" && g.phase !== "playing") {
      set({ thinking: false });
      return;
    }
    if (g.current === HUMAN) {
      set({ thinking: false });
      return;
    }
    set({ thinking: true });
    const delay = 550 + Math.random() * 500;
    aiTimer = setTimeout(() => {
      const game = get().game;
      if (game.current === HUMAN) {
        set({ thinking: false });
        return;
      }
      if (game.phase === "bidding") {
        const d = aiBid(game, game.current);
        let next: GameState;
        if (d.action === "bid") next = applyBid(game, d.value, d.mode, d.capot);
        else if (d.action === "coinche") next = applyCoinche(game);
        else if (d.action === "surcoinche") next = applySurcoinche(game);
        else next = applyPass(game);
        set({ game: next });
        scheduleAI();
      } else {
        doPlay(aiPlay(game));
      }
    }, delay);
  }

  /** Joue une carte (humain ou IA) avec pause d'affichage si le pli se termine. */
  function doPlay(card: Card) {
    const game = get().game;
    const completing = game.trick.length === 3;
    if (completing) {
      const overlay: PlayedCard[] = [...game.trick, { card, player: game.current }];
      set({ overlayTrick: overlay, thinking: false });
      clearAiTimer();
      aiTimer = setTimeout(() => {
        const next = applyPlay(get().game, card);
        set({ game: next, overlayTrick: null });
        if (next.phase === "playing") scheduleAI();
      }, TRICK_PAUSE_MS);
    } else {
      set({ game: applyPlay(game, card) });
      scheduleAI();
    }
  }

  return {
    game: newGame(DEFAULT_SETTINGS),
    thinking: false,
    overlayTrick: null,

    startNewGame: (settings) => {
      clearAiTimer();
      set({ game: newGame(settings ?? get().game.settings), overlayTrick: null });
      scheduleAI();
    },

    bid: (value, mode, capot) => {
      if (get().game.current !== HUMAN) return;
      set({ game: applyBid(get().game, value, mode, capot) });
      scheduleAI();
    },
    pass: () => {
      if (get().game.current !== HUMAN) return;
      set({ game: applyPass(get().game) });
      scheduleAI();
    },
    coinche: () => {
      set({ game: applyCoinche(get().game) });
      scheduleAI();
    },
    surcoinche: () => {
      set({ game: applySurcoinche(get().game) });
      scheduleAI();
    },

    play: (card) => {
      const g = get().game;
      if (g.current !== HUMAN || g.phase !== "playing" || get().overlayTrick) return;
      doPlay(card);
    },

    continueDeal: () => {
      clearAiTimer();
      set({ game: engineNextDeal(get().game), overlayTrick: null });
      scheduleAI();
    },
  };
});

// Démarre l'orchestration dès le chargement (si une IA ouvre les enchères).
setTimeout(() => {
  const g = useGame.getState().game;
  if (g.current !== HUMAN) useGame.getState().startNewGame(g.settings);
}, 300);
