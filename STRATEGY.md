# Stratégie de l'IA & du coach — état et feuille de route

> But : un coach de **niveau expert mondial** qui sait précisément quoi jouer/annoncer.
> Source de référence : **Damien Graux, « La Coinche : vers un système efficace »**
> (système d'enchères + jeu de la carte) + pratiques expertes corroborées en ligne.

## ✅ Règles déjà encodées

### Enchères (`estimateSuit` / `estimateWithAuction` / `aiBid` / `coachBid`)
- Évaluation calibrée sur ce qu'on RÉALISE (mesuré : ~106 de moyenne, réussite ~70%,
  vrais contrats 130–160 + capots). Test de régression `strength.analysis.test.ts`.
- Valeurs : Valet 20, 9 14/10, As 11, 10, longueur d'atout (+9/atout au-delà de 2,
  +14 à 5, +10 à 6), Belote +20, As/10/Rois de côté, coupes (8–12).
- Apport partenaire (~28) — on joue en équipe.
- **Lecture des annonces** : on dévalue une couleur déjà prise par un adversaire
  (il tient V/9), on tempère si adversaires forts, on revalorise si le partenaire
  soutient notre couleur.
- **Soutien du partenaire** : relance dans sa couleur avec fit (atouts, V/9) ou As
  extérieurs (garde-fous anti-surenchère).
- **Convention « 100 fort »** : partenaire 80 + on a V+9 → 100.
- **Forme bicolore** (Graux §5.14) : bonus pour une 2ᵉ couleur longue.
- Le niveau d'annonce suit la force de jeu (Facile/Moyen plus prudents).

### Jeu de la carte (`heuristicPlay` / `leadCard` / `expertPlay`)
- **Preneur** : tire l'atout pour vider les adversaires, **puis bascule** sur ses
  couleurs maîtresses quand les adversaires n'ont plus d'atout (`opponentsMayHaveTrump`).
- **RÈGLE TACITE — preneur CONTRÉ → on ne part JAMAIS à l'atout** (le contreur en a) :
  on encaisse d'abord ses maîtres en couleur.
- N'ouvre pas une couleur où un adversaire est **connu coupé** (`opponentVoidInSuit`).
- **Appels** directs/indirects (signal au partenaire sur la défausse), lecture de
  l'appel du partenaire.
- **Charge du partenaire** quand il tient le pli ; prise « au moins cher ».
- **Comptage des cartes** (atouts tombés, cartes maîtresses) au niveau fort.
- **Expert = PIMC** (Monte-Carlo info imparfaite) : échantillonne les mains adverses
  (coupes + annonces respectées), simule la fin de donne (rollout « fort »), choisit
  le meilleur coup. Le coach = expert déterministe (RNG seedé).

### Échelle de force (mesurée)
Facile (aléatoire) ≪ Moyen (heuristique) ≪ Difficile (mini-PIMC) ≈ Expert (PIMC +
rollout fort, = le coach). expert/medium ≈ 32-8, hard/medium ≈ 24-16.

## 🔜 Règles avancées à encoder (issues de Graux — prochaine itération)

- **Convention « 90 fort »** (§5.4) et réponses sur 90 (§5.5).
- **Système des clefs** pour 110+ (§5.7-5.8) : compter ses « clefs » (A/V/9…).
- **Signaux d'As aux enchères** : « 10 dans le jeu » (1 As), « 20 dans le jeu » (2 As).
- **Bicolores détaillés** selon la position/partance (§5.14.1-4) ; **tricolores**.
- **As troisième d'atout** : quand l'annoncer (§5.24).
- **Second tour d'enchères**, **montée au capot** (§5.16-5.17), **Générale** (§5.18).
- **Bascule couleur → Tout-Atout / Sans-Atout** (§5.11-5.12).
- **Jeu de la carte avancé** : signalisation pair/impair, impasses, fausse coupe,
  garder la bonne carte pour le 10 de der, défausse défensive optimale.
- **Coinche/défense** : seuils de coinche affinés selon l'écoute des annonces (§5.21-5.22).

## 🧪 Méthode
Boucle **étudier → encoder → mesurer → garder si ça améliore**. Harnais :
`src/engine/strength.analysis.test.ts` (mesures en `describe.skip`, à activer à la
demande) : distribution des contrats, taux de réussite, écart réalisé/contrat,
têtes-de-série (marges de victoire entre niveaux).
