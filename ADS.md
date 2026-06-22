# Mettre des pubs sur l'app — guide (à terme)

> Décision : pubs **plus tard**, en mode freemium. Rien d'activé aujourd'hui
> (`entitlements.ts` : `adsEnabled = false`, `premium = true`). Voici le « comment ».

## En une phrase
On s'inscrit à une **régie publicitaire** (réseau de pub), on installe son **SDK**,
on crée des **emplacements** (formats de pub), on les **affiche** aux joueurs gratuits,
et la régie nous **paie** selon les affichages/clics.

## 1. Choisir la régie
- **Google AdMob** = le standard pour les apps mobiles (le plus simple, gros volume).
- Alternatives / mediation (pour maximiser le revenu) : AppLovin MAX, Unity Ads,
  ironSource, Meta Audience Network. On peut commencer **AdMob seul**, ajouter la
  « mediation » plus tard.

## 2. Les formats de pub (et où on les met)
- **Bannière** : petit bandeau (haut/bas), discret. → écrans hors-jeu (accueil, listes).
- **Interstitiel** : plein écran entre deux actions. → **entre deux parties / donnes**,
  JAMAIS au milieu d'un pli. Avec **plafond de fréquence** (ex. 1 / 3-4 donnes).
- **Récompensé (rewarded)** : l'utilisateur **choisit** de regarder une vidéo pour un
  bonus (ex. « voir l'analyse coach », « indice »). Le plus rentable et le mieux toléré.

> Leçon des avis du concurrent : c'est la pub **forcée et trop fréquente** qui fait fuir.
> On privilégie **rewarded + interstitiel espacé**, jamais en pleine donne.

## 3. Intégration technique (app native via Capacitor)
1. Compte AdMob → créer l'app → créer les **ad units** (on obtient des identifiants).
2. Installer le plugin : `npm i @capacitor-community/admob` puis `npx cap sync`.
3. Initialiser au démarrage, puis afficher selon le format. Tout passe **derrière notre
   abstraction** `entitlements.ts` : on n'affiche QUE si `adsEnabled && !premium`.
4. **Consentement (obligatoire)** :
   - iOS : **App Tracking Transparency** (pop-up « Autoriser le suivi ? ») pour la pub
     personnalisée ; sinon pub non-personnalisée.
   - Europe (RGPD) : **CMP/UMP** (formulaire de consentement Google) au 1er lancement.
   - Déclarer la collecte pub dans App Privacy / Data Safety (ça change notre étiquette
     « aucune donnée » → voir `SUBMISSION.md`, et retirer « sans pub » des fiches).
5. **Tester avec les identifiants de test** d'AdMob (sinon risque de bannissement), puis
   passer en réel pour la publication.

## 4. Le modèle « freemium » (recommandé)
- **Gratuit** : pubs discrètes (rewarded + interstitiel espacé).
- **Premium** : achat in-app **« Retirer les pubs »** (une fois) et/ou petit abonnement,
  qui met `premium = true` → plus aucune pub + bonus éventuels.
- Achats : `@capacitor/in-app-purchases` ou **RevenueCat** (gère iOS+Android).

## 5. Combien ça rapporte (ordre de grandeur)
Très variable : la pub se mesure en **eCPM** (revenu pour 1000 affichages), souvent
**2–8 €** en FR pour de l'interstitiel/rewarded. Le gros du revenu vient du **rewarded**
et du **premium**, pas de la bannière. À 1000 joueurs actifs/jour, on parle de quelques
€ à quelques dizaines d'€/jour selon l'engagement — d'où l'importance de la rétention.

## 6. Ce qui est déjà prêt côté code
- `src/state/entitlements.ts` : `premium` / `adsEnabled` / `canUse`.
- Le jour J : créer un composant `<AdBanner>` (no-op si `!adsEnabled`), brancher le SDK,
  ajouter l'achat premium. **Aucune refonte** — on « allume l'interrupteur ».
