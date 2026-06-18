# CLAUDE.md — Projet Coinche Trainer

App de Coinche/Contrée (PWA, desktop+mobile, iPhone) vs IA paramétrables,
qui devient une plateforme d'entraînement façon Chess.com. Voir `SPEC.md` pour
la vision, les décisions de cadrage et la roadmap complète.

## Stack
Vite + React + TypeScript + Tailwind v4 + Zustand · PWA (vite-plugin-pwa) · Vitest.

## Commandes
- `npm run dev` — serveur de dev
- `npm test` — tests unitaires (Vitest)
- `npm run build` — build de prod (typecheck + bundle)

## Principes d'architecture
- **Moteur pur** (`src/engine`) : règles/scoring/état, zéro dépendance UI, 100% testé.
- UI séparée de la logique ; textes centralisés (i18n-ready, FR).
- Persistance derrière une interface abstraite (`src/storage`) : IndexedDB en local,
  cloud branchable plus tard sans toucher au reste.
- IA et coach partagent le même moteur d'évaluation, paramétré par un `PlayProfile`.

## Règles de jeu (référence)
162 pts/donne (152 + 10 de der). Belote (R+D atout) = 20. Capot 250.
Valeurs atout : V20 9-14 A11 10-10 R4 D3. Couleur : A11 10-10 R4 D3 V2.
SA : As=19. TA : V14 9-9 A6 10-5 R3 D1. Détails et barème complet dans `SPEC.md` §4.

## Reviews récurrentes (OBLIGATOIRE à chaque fin de phase)
Lancer les 4 agents de revue (définis dans `.claude/agents/`) **en parallèle**
à la fin de chaque phase, et avant tout déploiement :
- `security-reviewer` — failles, dépendances, secrets, surface réseau.
- `reliability-reviewer` — exactitude règles/scoring, tests, déterminisme.
- `robustness-reviewer` — cas limites, crashs, perf, dette technique.
- `ux-ui-reviewer` — responsive, lisibilité, accessibilité, cohérence design.

Traiter les findings 🔴/🟠 avant de passer à la phase suivante.
