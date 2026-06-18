# Coincheur 🃏

App de **Coinche** (belote contrée) pour **jouer contre des IA paramétrables** et
**progresser** façon Chess.com : exercices, review de parties, leçons, stats.
PWA installable sur iPhone, 100 % hors-ligne, sans pub, vos données restent sur l'appareil.

## Fonctionnalités

- **Jouer** : partie contre 3 IA (Facile / Moyen / Difficile / Expert), enchères
  (annonce, passe, coinche, surcoinche), jeu des plis avec pause d'affichage.
- **Réglages complets** (mirroir de l'app de référence) : Interface, Jeu, IA, Comptage
  — variantes (Sans/Tout Atout, pisser, surcoinche…), barème, profil d'IA (agressivité,
  appels directs/indirects, conventions d'enchères), 4 couleurs, sons, vibrations.
- **S'entraîner** : exercices générés à l'infini, **enchères** et **jeu** séparés,
  correction + explication, série (streak).
- **Mes parties** : review coup par coup centrée sur **tes décisions** (les coups forcés
  sont sautés), le coach explique carte jouée vs meilleur coup.
- **Review IA** : simulateur massif IA vs IA (niveaux opposables) → stats agrégées de stratégie.
- **Leçons** guidées (parcours progressif) + **Guides** situationnels.
- **Progression** : statistiques d'entraînement.

## Stack

Vite · React · TypeScript · Tailwind v4 · Zustand · PWA (vite-plugin-pwa) · Vitest.

## Architecture

```
src/
  engine/    # moteur PUR (règles, scoring, machine d'état, IA, coach) — 100% testé
  state/     # store Zustand (orchestration des tours), stats, feedback sensoriel
  storage/   # persistance abstraite (localStorage ; cloud branchable plus tard)
  components/# UI de la table de jeu
  training/  # exercices, simulation, review, leçons, guides
  app/       # navigation + écrans
```

Le **moteur** ne dépend d'aucune UI : il est réutilisable côté multijoueur/serveur.
Le **coach** est l'IA en mode expert qui évalue et explique (réutilisé par review + exercices).

## Commandes

```bash
npm install
npm run dev      # serveur de dev
npm test         # tests unitaires (Vitest)
npm run build    # typecheck + build de prod (PWA)
```

## Règles implémentées

162 pts/donne (152 + 10 de der). Valeurs atout V20/9-14/A11/10-10/R4/D3 ; couleur
A11/10-10/R4/D3/V2 ; Sans Atout As=19 ; Tout Atout V14/9-9/A6/10-5/R3/D1. Belote (R+D
d'atout) = 20, imprenable. Capot 250. Barème aligné sur l'app « la Coinche » (chute
162 + contrat ; coinche 162/252 + contrat ×2/×4 ; réussite si ≥ contrat ET > défense ;
capot non annoncé +90). Détails et roadmap dans [`SPEC.md`](./SPEC.md).

## Qualité

Revue à chaque phase par 5 agents (`.claude/agents/`) : sécurité, fiabilité,
robustesse, UX/UI, **cohérence des règles**. Voir `CLAUDE.md`.
