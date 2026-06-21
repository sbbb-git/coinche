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

## 🛠️ Spec d'implémentation prête (prochain cycle)

> Chaque règle = où l'implémenter + condition concrète + comment la mesurer.
> On garde uniquement ce qui améliore la mesure (têtes-de-série / calibration).

### Enchères
- **Signaux d'As (« 10/20 dans le jeu »)** — `aiBid`/`readAuction`.
  - Quand le partenaire a ouvert et que je relance/soutiens, encoder le sens : une
    relance « économique » (≈ +10/+20 sur sa couleur) ≈ « j'ai 1 ou 2 As de côté ».
  - Côté évaluation : si le partenaire a signalé des As, revaloriser nos plis de
    couleur (réduire le risque de coupe). MESURE : make-rate des contrats soutenus.
- **90 fort** (Graux §5.4) — `aiBid`.
  - Après un 80 du partenaire, avec V+9 d'atout OU 3 atouts dont le Valet + 1 As de
    côté → annoncer **90** (et non 100). Distinguer 90-fort (force) du 90-pari.
- **Système des clefs ≥110** (§5.7) — nouvelle fn `countKeys(hand, mode)`.
  - Clefs = maîtres immédiats : V d'atout (1), 9 d'atout si V présent (1), chaque As
    de côté (1), 10 de côté gardé par As (½). 110 = ~5 clefs, 120 = ~6, etc.
  - Remplacer/affiner le seuil de `bestContractAuction` pour les hautes annonces.
- **Bicolore par position** (§5.14.1-4) — affiner le bonus de forme déjà posé selon
  partance à nous / au partenaire / 2e-4e position.

### Jeu de la carte (priorité : améliorer `heuristicPlay`, c'est le rollout)
> ⚠️ Discipline : mes tentatives « malines » passées ont DÉGRADÉ le jeu en mesure.
> N'encoder une règle que si A/B (à bidding égal) la valide (> +3 sur 100 donnes).
- **Tierce main forte / 2de main faible** : en 2e position sur une entame adverse,
  fournir petit (sauf prise utile) ; en 3e, monter pour tenir le pli.
- **10 de der** : au dernier pli, prioriser le gain du pli (vaut 10).
- **Garde des maîtres** : ne pas défausser une carte qui devient maîtresse (compter).
- **Couper utile** : couper seulement si le pli a des points OU pour prendre la main ;
  sous-couper si on est déjà maître par le partenaire = gaspillage.
- **Défense** : ne pas entamer atout (sauf raison) ; ouvrir l'As maître ou la couleur
  appelée par le partenaire ; jouer la couleur courte pour faire couper le partenaire.

### Méthodo de mesure d'une règle de jeu
Réintroduire temporairement un flag `smart` dans `heuristicPlay`, pitter deux équipes
(smart vs basique) **à bidding égal** (même `levelBias`) sur ≥150 donnes, garder la
règle seulement si le delta de victoires est nettement positif et stable.

## 📊 Bilan mesuré du jeu de la carte (#4) — IMPORTANT

Tentatives d'amélioration de l'heuristique, **toutes testées en A/B à enchères
égales** (équipe « smart » vs « basique », ~40-200 donnes) :

| Règle ajoutée | Résultat A/B (smart vs basique) | Décision |
|---|---|---|
| As « sûr » (évite couleur coupée) + arrêt du tirage d'atout | 16-24 ❌ | retiré |
| Charge du partenaire (`partnerSurelyWins`) | ~neutre/négatif | non retenu |
| Rollout « fort » pour l'Expert | ≈ égal (19-21) | rollout = basique |
| Défense : entame d'un singleton (créer une coupe) | 18-22 ❌ | retiré |
| + de simulations (Expert 40 vs Difficile 4) | 21-19 (nul) | les sims saturent |

**Conclusion honnête** : sur ce moteur (PIMC + rollout heuristique), les **règles
écrites à la main n'améliorent pas** le jeu en auto-affrontement (elles le dégradent
souvent), et **le nombre de simulations sature**. La calibration des **enchères**,
elle, a apporté un gain énorme (contrat 90→106, vrais 130-160) — c'est là qu'était le
ROI, et c'est fait.

**Vrai chemin vers un niveau « expert mondial »** (effort de recherche, pas un tweak) :
1. **ISMCTS** (Information Set Monte-Carlo Tree Search) au lieu du PIMC plat : arbre
   partagé entre échantillons, sélection UCB → exploite vraiment la profondeur.
2. **Politique/évaluation apprise** par self-play (poids optimisés, voire petit réseau)
   plutôt que des heuristiques figées.
3. **Déterminisation + alpha-beta** par monde échantillonné pour la fin de donne
   (peu de cartes restantes = résolution quasi exacte).
4. Garder la **méthode A/B stricte** : ne mériter le titre « plus fort » que mesuré.

> En clair : l'IA actuelle est **forte et bien calibrée** (bonne adversaire + coach
> fiable), mais franchir le palier « expert » demande un **changement d'algorithme**
> (ISMCTS/apprentissage), pas d'ajouter des règles — celles-ci ont été mesurées comme
> contre-productives.

## 🧪 Méthode
Boucle **étudier → encoder → mesurer → garder si ça améliore**. Harnais :
`src/engine/strength.analysis.test.ts` (mesures en `describe.skip`, à activer à la
demande) : distribution des contrats, taux de réussite, écart réalisé/contrat,
têtes-de-série (marges de victoire entre niveaux).
