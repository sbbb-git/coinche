# Coinche Trainer — Spécification & Roadmap

> App de **Coinche/Contrée** jouable desktop + mobile (PWA installable iPhone),
> contre des **IA paramétrables**, qui devient une **plateforme d'entraînement
> façon Chess.com** : review de parties, exercices, stats, leçons.

---

## 1. Vision

Recoder la meilleure app de Coinche, puis aller plus loin : en faire un **outil
de training** où l'on progresse réellement (analyse de ses coups, exercices
ciblés, coach qui explique). 100 % offline-first, sans pub, IA forte et
**cohérente** (surtout le partenaire), conventions de jeu configurables.

## 2. Références (à exploiter à fond)

| Source | Ce qu'on en tire |
|---|---|
| **App Eryod Soft** (App Store, 4,1★, 2700 avis) | Le standard à dépasser : features, UX, réglages. |
| **PDF Damien Graux — « La Coinche : vers un système efficace »** | Le **cerveau** : système d'enchères (80/90 fort/système des clefs), jeu de la carte, comptage. Sert à l'IA **et** au curriculum d'entraînement. |
| **Vincent Brévart — parties préparées d'initiation** | Modèle de leçons guidées rejouables. |
| **belote.com — quiz situations** | Format des exercices. |
| **Wikipédia — Belote contrée** | Règles & barème (validés). |

## 3. Analyse concurrentielle (Eryod) → nos différenciateurs

**Forces Eryod** : 4 niveaux IA, multijoueur (Game Center/local), appels
directs/indirects configurables, style du partenaire, revoir les plis, rejouer
une donne, stats, aide en partie, 2 thèmes HD.

**Faiblesses citées par les utilisateurs = nos opportunités** :
- IA **partenaire** faible/incohérente (ignore annonces & couleurs révélées) → **IA cohérente, partenaire fiable**.
- En TA/SA l'IA « joue ses maîtres en premier » → **meilleur plan de jeu**.
- Cartes **retirées trop vite** du tapis → **option « garder le pli affiché »** + rythme réglable.
- **Pubs** → **zéro pub**.
- Annonces partenaire « trop ambitieuses » → **style paramétrable et lisible**.

**Notre vrai avantage** : le **training** (review/analyse, exercices générés,
coach Graux), absent ou minimal ailleurs.

## 4. Règles implémentées (moteur, ✅ testé)

- 32 cartes, 4 joueurs / 2 équipes (0&2 vs 1&3), distribution 3-2-3, 4 passes → redonne.
- **Valeurs/ordres** :
  - Atout : V20 9-14 A11 10-10 R4 D3 8-0 7-0 — ordre V>9>A>10>R>D>8>7.
  - Couleur : A11 10-10 R4 D3 V2 9-0 8-0 7-0 — ordre A>10>R>D>V>9>8>7.
  - Sans Atout : tout en couleur mais **A=19** (suit = 38, total 152).
  - Tout Atout : V14 9-9 A6 10-5 R3 D1 (suit = 38, total 152).
- **162 pts/donne** (152 + **10 de der**). **Belote** (R+D d'atout) = 20.
- Jeu : fournir, **couper**, **monter à l'atout**, droit de **pisser**.
- Barème : contrat réussi = `contrat + points réalisés` ; chute = défense `160 + contrat` ;
  coinche ×2 / surcoinche ×4 sur l'enjeu `(contrat + 160)` ; **capot 250**, capot beloté 270, générale 200.

### Variantes (toggles)
- **Mode d'enchères** : **Coinche** (chiffrée 80→160, défaut) / **Contrée** (annonce couleur, contrat 82).
- Tout Atout / Sans Atout : **désactivés par défaut** (Sacha joue sans).
- Coinche/Surcoinche ; score cible (1000/1500/2000) ; « la coinche fait gagner la partie ».
- À venir : belote en défense (off par défaut, cf. Graux), annonces comptent pour le contrat, pisser obligatoire.

## 5. Décisions de cadrage (validées)

| Sujet | Décision |
|---|---|
| Plateforme | **PWA** (desktop+mobile), installable iPhone ; App Store via Capacitor plus tard. |
| Mode par défaut | **Coinche, sans TA ni SA**. |
| IA | **3 niveaux** (Facile/Moyen/Difficile) **+ style paramétrable**. |
| Conventions paramétrables | **Toutes** : appels & signalisation (directs/indirects, pair-impair), jeu aux as/entames, style prudent↔offensif, conventions d'enchères (système Graux). |
| Données | **Local-first** (IndexedDB), comptes/sync cloud **plus tard** (archi prête). |
| Multijoueur en ligne | **Plus tard**, mais l'archi le prévoit. |
| Design | **Moderne épuré + gamifié** (dark mode, animations, badges/progression). |
| Exercices | **100 % générés par l'IA** (situations infinies, meilleur coup calculé). |
| Public | **Tous niveaux** (débutant → confirmé, coach adaptatif). |
| Langue | **FR** uniquement (textes centralisés, i18n-ready). |
| Training (ordre de priorité) | 1) **Review de parties** 2) **Exercices** 3) **Stats & progression** 4) **Leçons guidées**. |

## 6. Architecture technique

- **Stack** : Vite + React + TypeScript + Tailwind v4 + Zustand ; PWA (vite-plugin-pwa) ; Vitest.
- **Principes** : moteur **pur** (zéro dépendance UI, testable, réutilisable côté multijoueur),
  UI séparée de la logique, textes centralisés (i18n-ready), persistance derrière une interface
  abstraite (`storage/`) pour brancher un backend plus tard sans toucher au reste.

```
src/
  engine/        # règles, scoring, machine d'état, IA (pur TS, testé) ✅
  ai/            # niveaux + conventions paramétrables (style, appels, enchères Graux)
  state/         # store Zustand : orchestration des tours, timers IA
  storage/       # persistance abstraite (IndexedDB local ; cloud plus tard)
  components/    # UI : table, cartes, enchères, HUD, réglages
  training/      # review, exercices, stats, leçons
  i18n/          # textes FR centralisés
  app/           # pages / navigation (Jouer, Entraînement, Réglages, Stats)
```

## 7. IA & Coach (modèle commun)

L'IA et le coach partagent le **même moteur d'évaluation**, paramétré par un
**profil de jeu** :

```ts
interface PlayProfile {
  level: "easy" | "medium" | "hard";
  aggressiveness: number;      // 0 (petit jeu prudent) → 1 (offensif)
  appels: "directs" | "indirects" | "aucun";
  jeuAuxAs: boolean;           // privilégier la sortie des as
  systemeEncheres: "simple" | "graux"; // 90 fort, système des clefs…
}
```

- **Coach** = l'IA en mode « difficile » qui, au lieu de jouer, **évalue chaque coup
  possible** et explique le meilleur (réutilisé par Review + Exercices).
- Système Graux encodé progressivement : ouvertures (80/90 fort/100/110+ clefs),
  réponses, bascules TA/SA, signalisation, comptage des cartes tombées.

## 8. Roadmap

- **Phase 0 ✅** Moteur (règles, scoring, machine d'état) + IA 3 niveaux + 14 tests. *(commité)*
- **Phase 1 — Table jouable** : store/orchestration, UI table responsive (cartes, pli, mains),
  phase d'enchères (Coinche), tour des IA animés, fin de donne + scores, PWA. **← en cours**
- **Phase 2 — Réglages & variantes** : Coinche/Contrée, TA/SA, niveau & profil IA, score cible.
- **Phase 3 — Training** :
  1. **Review** : rejeu coup par coup d'une partie, le coach pointe les erreurs (Δ vs meilleur coup).
  2. **Exercices** générés (« que jouer ? » / « quelle enchère ? ») avec correction.
  3. **Stats & progression** (taux de contrats réussis, points faibles, niveau).
  4. **Leçons guidées** (parcours Graux/Brévart).
- **Phase 4 — iPhone** : finition PWA (icônes, offline) → option App Store (Capacitor).

## 9. Modèle de données (local-first)

- `games` : parties jouées (donnes, enchères, coups) → rejouables en Review.
- `profile` : niveau estimé, préférences, profil IA, conventions.
- `stats` : agrégats (contrats pris/réussis, par mode, erreurs types).
- `settings` : règles & variantes actives.
- Accès via interface `Storage` (impl. IndexedDB ; impl. cloud ajoutable).

## 10. Questions ouvertes (à trancher en avançant)

- Belote comptée **en défense** ? (défaut : non, cf. Graux)
- Les **annonces comptent-elles** pour réussir le contrat ? perdues si chute ?
- **Capot beloté** (270) / **générale** (200) dans les enchères ?
- **Sens de jeu** configurable (horaire/anti-horaire) ?
- Monétisation à terme (gratuit sans pub ? premium training ?).

## 11. Options de référence à reproduire (app « la Coinche », d'après captures)

Liste complète des réglages de l'app de référence, à implémenter (Phase 2). Les
**valeurs par défaut observées** chez Sacha correspondent à notre barème actuel.

**Interface** : vitesse de jeu · sens de jeu (anti-horaire/horaire) · rangement
des cartes (droitier/gaucher) · réorganiser les cartes après chaque carte jouée ·
animer la distribution · jeu automatique · ramasser les plis automatiquement ·
ramasser les annonces automatiquement · présélectionner les cartes jouables ·
afficher les scores en cours de donne.

**Jeu** : nombre de points/partie (slider, jusqu'à 2000) · jouer avec annonces ·
autoriser Sans Atout · autoriser Tout Atout · belote/rebelote à Tout Atout ·
**obligation de pisser à l'atout** · forcer le jeu Atout · autoriser la Générale (500) ·
autoriser la Surcoinche.

**IA** : niveau (Débutant/Intermédiaire/Avancé/Expert) · appels du partenaire
(directs/indirects, expert) · appel à la belote/rebelote (expert) · style de jeu du
partenaire (auto/…) · « annoncer 100 après un 80 si on a Valet+9 » · « le partenaire IA
entame toujours atout avec le valet s'il l'a ».

**Comptage des points** : arrondir les scores à la dizaine · « un contrat peut être
réussi même si la défense fait plus » (défaut OFF = il faut faire **plus** que la défense) ·
les annonces comptent pour réussir/chuter · la belote compte pour réussir · la belote
compte pour chuter · annonces perdues si chute/capot · marquer uniquement le contrat ·
marquer uniquement le contrat (160 si chute) · marquer uniquement les points ·
doubler tous les points en cas de coinche.

> Notre **barème implémenté** = ces options à leurs **valeurs par défaut** :
> belote imprenable & comptée, pas d'annonces, > défense requis, chute 162 + contrat,
> coinche 162 (+252 capot) + contrat×mult, capot +90. ✅
