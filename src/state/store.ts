// Store global : enveloppe le moteur pur et orchestre les tours des IA.

import { create } from "zustand";
import { Card, TrumpMode } from "../engine/cards";
import {
  GameState,
  Settings,
  applyBid,
  applyCoinche,
  canCoinche,
  applyPass,
  applyPlay,
  applySurcoinche,
  newGame,
  nextDeal as engineNextDeal,
  legalForCurrent,
  speedMs,
} from "../engine/game";
import { aiBid, aiPlay } from "../engine/ai";
import { coachBid, coachPlay, isPlayDecision } from "../engine/coach";
import { PlayedCard } from "../engine/rules";
import { loadInitialSettings, loadResumableGame, storage } from "../storage";
import { feedback } from "./feedback";
import { review } from "../review";
import { currentLang } from "../i18n";

export const HUMAN = 0; // le joueur humain est toujours le siège 0 (en bas)

interface Store {
  game: GameState;
  /** une IA est en train de réfléchir (pour le voyant "…") */
  thinking: boolean;
  /** pli complet figé à l'écran le temps qu'on le voie, avant résolution */
  overlayTrick: PlayedCard[] | null;
  /** conseil du coach en direct (carte suggérée + explication), à la demande */
  hint: { cardId: string | null; text: string } | null;
  /** le coach calcule un conseil (PIMC), pour désactiver le bouton + spinner */
  hintLoading: boolean;

  /** démarre l'orchestration des IA pour la partie déjà en cours (à appeler au montage) */
  init: () => void;
  /** stoppe l'orchestration (nettoyage au démontage) */
  stop: () => void;
  /** applique des réglages à la partie en cours sans la réinitialiser */
  updateSettings: (settings: Settings) => void;
  startNewGame: (settings?: Settings) => void;
  bid: (value: number, mode: TrumpMode, capot: boolean, generale?: boolean) => void;
  pass: () => void;
  coinche: () => void;
  surcoinche: () => void;
  play: (card: Card) => void;
  continueDeal: () => void;
  /** demande un conseil du coach pour la situation courante (humain) */
  askHint: () => void;
  clearHint: () => void;
}

// Timers au niveau module (hors du state React) pour piloter les IA.
let aiTimer: ReturnType<typeof setTimeout> | null = null;
// Timer distinct pour la pause d'affichage d'un pli complet : évite qu'un
// changement de partie/donne (startNewGame, continueDeal) laisse un callback
// d'overlay s'exécuter sur le nouvel état (race condition).
let overlayTimer: ReturnType<typeof setTimeout> | null = null;
// Timer du calcul de conseil (PIMC déféré) : annulé si la partie/donne change
// pour ne pas afficher un conseil parasite ni rester bloqué en « réflexion ».
let hintTimer: ReturnType<typeof setTimeout> | null = null;
function clearAiTimer() {
  if (aiTimer) {
    clearTimeout(aiTimer);
    aiTimer = null;
  }
  if (overlayTimer) {
    clearTimeout(overlayTimer);
    overlayTimer = null;
  }
  if (hintTimer) {
    clearTimeout(hintTimer);
    hintTimer = null;
  }
}

/** Enregistre la donne qui vient d'être décomptée (pour la review). */
function recordDeal(g: GameState) {
  if (!g.contract) return;
  storage.saveDeal({
    ts: Date.now(),
    dealtHands: g.dealtHands,
    dealer: g.dealer,
    settings: g.settings,
    bids: g.bidHistory,
    plays: g.completedTricks.flatMap((t) => t.played.map((p) => ({ player: p.player, cardId: p.card.id }))),
    contract: g.contract,
    result: g.lastResult,
  });
}

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
      // Jeu automatique : une seule carte jouable -> on la joue après un court délai.
      if (g.phase === "playing" && g.settings.autoPlaySingle) {
        const legal = legalForCurrent(g);
        if (legal.length === 1) {
          aiTimer = setTimeout(() => {
            const cur = get().game;
            if (cur.current === HUMAN && cur.phase === "playing" && !get().overlayTrick) {
              doPlay(legal[0]);
            }
          }, speedMs(g.settings).ai);
        }
      }
      return;
    }
    set({ thinking: true });
    const delay = speedMs(g.settings).ai + Math.random() * 300;
    aiTimer = setTimeout(() => {
      const game = get().game;
      if (game.current === HUMAN) {
        set({ thinking: false });
        return;
      }
      if (game.phase === "bidding") {
        const d = aiBid(game, game.current);
        let next: GameState;
        if (d.action === "bid") next = applyBid(game, d.value, d.mode, d.capot, d.generale);
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
    const prefs = { sound: game.settings.sound, haptics: game.settings.haptics };
    feedback.cardPlay(prefs);
    const completing = game.trick.length === 3;
    if (completing) {
      const overlay: PlayedCard[] = [...game.trick, { card, player: game.current }];
      set({ overlayTrick: overlay, thinking: false });
      clearAiTimer();
      overlayTimer = setTimeout(() => {
        overlayTimer = null;
        // Si la partie/donne a changé entre-temps, on n'applique pas l'ancien pli.
        if (get().overlayTrick !== overlay) return;
        const next = applyPlay(get().game, card);
        set({ game: next, overlayTrick: null });
        if (next.phase === "dealScored" || next.phase === "gameOver") {
          recordDeal(next);
          if (next.phase === "gameOver") review.recordPlay(); // pour la demande de note
          const r = next.lastResult;
          if (r) (r.scores[0] >= r.scores[1] ? feedback.dealWon : feedback.dealLost)(prefs);
        } else {
          feedback.trickWon(prefs);
        }
        if (next.phase === "playing") scheduleAI();
      }, speedMs(game.settings).trick);
    } else {
      set({ game: applyPlay(game, card) });
      scheduleAI();
    }
  }

  return {
    // Reprise : on restaure la partie en cours si une donne n'était pas finie.
    game: loadResumableGame() ?? newGame(loadInitialSettings()),
    thinking: false,
    overlayTrick: null,
    hint: null,
    hintLoading: false,

    startNewGame: (settings) => {
      clearAiTimer();
      const s = settings ?? get().game.settings;
      storage.saveSettings(s); // persiste les réglages choisis
      set({ game: newGame(s), overlayTrick: null, hint: null, hintLoading: false });
      scheduleAI();
    },

    bid: (value, mode, capot, generale = false) => {
      if (get().game.current !== HUMAN) return;
      set({ game: applyBid(get().game, value, mode, capot, generale), hint: null });
      scheduleAI();
    },
    pass: () => {
      if (get().game.current !== HUMAN) return;
      set({ game: applyPass(get().game), hint: null });
      scheduleAI();
    },
    init: () => {
      scheduleAI();
    },
    stop: () => {
      clearAiTimer();
    },
    updateSettings: (settings) => {
      storage.saveSettings(settings); // on mémorise le choix complet de l'utilisateur
      const cur = get().game;
      // En cours de donne, on ne change pas le sens de jeu (casserait l'ordre du tour).
      const midDeal = cur.phase === "playing" || cur.phase === "bidding";
      const applied = midDeal ? { ...settings, sensHoraire: cur.settings.sensHoraire } : settings;
      set({ game: { ...cur, settings: applied } });
      // Ne pas perturber un pli en cours de résolution (overlay) : son timer reprendra la main.
      if (!get().overlayTrick) scheduleAI();
    },
    coinche: () => {
      // Coinche « à la volée » : autorisée même si ce n'est pas le tour de l'humain.
      if (get().overlayTrick || !canCoinche(get().game, HUMAN)) return;
      clearAiTimer();
      set({ game: applyCoinche(get().game, HUMAN), hint: null });
      scheduleAI();
    },
    surcoinche: () => {
      if (get().game.current !== HUMAN) return;
      set({ game: applySurcoinche(get().game), hint: null });
      scheduleAI();
    },

    play: (card) => {
      const g = get().game;
      if (g.current !== HUMAN || g.phase !== "playing" || get().overlayTrick) return;
      set({ hint: null });
      doPlay(card);
    },

    continueDeal: () => {
      clearAiTimer();
      set({ game: engineNextDeal(get().game), overlayTrick: null, hint: null, hintLoading: false });
      scheduleAI();
    },

    askHint: () => {
      const g = get().game;
      if (g.current !== HUMAN || get().overlayTrick || get().hintLoading) return;
      // Coup forcé (une seule carte jouable) : pas de PIMC, réponse immédiate.
      if (g.phase === "playing" && !isPlayDecision(g)) {
        const only = legalForCurrent(g)[0];
        set({ hint: { cardId: only?.id ?? null, text: "Tu n'as qu'une seule carte jouable ici." } });
        return;
      }
      // Calcul PIMC déféré : on laisse l'UI peindre l'état « … » avant de geler.
      set({ hintLoading: true });
      hintTimer = setTimeout(() => {
        hintTimer = null;
        const gg = get().game;
        if (gg.current !== HUMAN || get().overlayTrick) {
          set({ hintLoading: false });
          return;
        }
        if (gg.phase === "playing") {
          const { best, reason } = coachPlay(gg, currentLang());
          set({ hint: { cardId: best.id, text: reason }, hintLoading: false });
        } else if (gg.phase === "bidding") {
          const a = coachBid(gg, HUMAN, currentLang());
          set({ hint: { cardId: null, text: a.reason }, hintLoading: false });
        } else {
          set({ hintLoading: false });
        }
      }, 0);
    },
    clearHint: () => set({ hint: null }),
  };
});

// Sauvegarde de la partie en cours (reprise après fermeture). On n'écrit que
// lorsque l'objet `game` change réellement (pas à chaque voyant « réflexion »).
let lastSavedGame: GameState | null = null;
useGame.subscribe((s) => {
  if (s.game !== lastSavedGame) {
    lastSavedGame = s.game;
    storage.saveGame(s.game);
  }
});

