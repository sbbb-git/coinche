# Publication stores (iOS / Android) & natif

> Tout est prêt côté web/PWA. Ce guide liste les étapes pour packager en natif
> (Capacitor) et publier sur l'App Store et Google Play, + Game Center.

## 1. Empaqueter avec Capacitor (un seul code)

Le `capacitor.config.json` est déjà présent (appId `com.coincheur.app`, webDir `dist`).

```bash
npm i -D @capacitor/cli
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i @capacitor/haptics @capacitor/splash-screen   # feature native (haptique iOS) + splash
npm run build            # génère dist/
npx cap add ios
npx cap add android
npx cap sync             # après chaque build
npx cap open ios         # Xcode (nécessite un Mac)
npx cap open android     # Android Studio
```

> `@capacitor/haptics` active le vrai moteur haptique iOS (le code l'utilise déjà
> automatiquement via `src/state/feedback.ts` ; sans le plugin, repli sur la
> vibration web). C'est aussi la **feature native** qui écarte le rejet Apple 4.2.
> `@capacitor/splash-screen` + `capacitor.config.json` (déjà configuré) évitent
> l'écran blanc au lancement.

> Réseau requis pour installer ces paquets : à lancer en local (pas dans le
> sandbox). L'app web ne change pas : Capacitor enveloppe `dist/`.

### Le projet Android est DÉJÀ généré ✅
Le dossier `android/` est dans le dépôt (plugins haptics + notifications + splash
déjà liés). Pour builder l'APK/AAB sur ta machine :
```bash
npm install            # récupère les deps (dont Capacitor)
npm run build && npx cap sync android
# Option A (simple) : ouvrir le dossier android/ dans Android Studio → Run / Build Bundle
npx cap open android
# Option B (ligne de commande, nécessite le SDK Android) :
cd android && ./gradlew assembleRelease   # APK   (ou bundleRelease pour l'AAB Play Store)
```
> Il te faut le **SDK Android** (fourni par Android Studio). Le code natif (haptique,
> rappels de notif, splash) est déjà câblé : rien à coder, juste builder + signer.

## 1bis. Où publier une app Android (au-delà de Google Play)
Le même fichier (APK/AAB) peut aller sur **plusieurs stores**, c'est du bonus de visibilité :
- **Google Play** : le principal (25 $ une fois). À faire en premier.
- **Amazon Appstore** : gratuit, couvre les tablettes Fire + Android. Même build, simple. ✅ recommandé.
- **Samsung Galaxy Store** : préinstallé sur les Samsung (gros parc en France). Gratuit.
- **Huawei AppGallery** : pour les Huawei (sans services Google). Notre jeu est offline donc OK,
  MAIS **AdMob ne marche pas sans Google Play Services** → là-bas, pas de pub (ou Huawei Ads).
- **Microsoft Store (Windows)** : on emballe la PWA en 5 min via **PWABuilder.com** (pas besoin de Capacitor).
- **Téléchargement direct** de l'APK depuis `coincheur.fr` (pour partager hors store).
- ❌ F-Droid : réservé à l'open-source, on passe.

> iOS : uniquement l'**App Store** (les marketplaces alternatives DMA en UE sont anecdotiques).
> Reco : **Google Play + Amazon Appstore** au lancement (effort quasi nul pour Amazon), le reste plus tard.

## 2. Game Center (Apple) & Google Play Games

Fonctionnalités natives → via un plugin Capacitor (ex. `@capacitor-community/game-connect`
ou un plugin dédié) ou un petit plugin natif maison. À prévoir :

- **Authentification** Game Center / Play Games (silencieuse au lancement).
- **Classements (leaderboards)** : niveau/Elo, nb de parties gagnées, plus longue série.
- **Succès (achievements)** : 1ʳᵉ victoire, capot réussi, série de 10 exos, etc.
- Le moteur expose déjà le rating (`src/state/stats.ts`) et les events de fin de
  partie — il suffira de pousser ces valeurs au service.

> Game Center n'existe pas sur le web : ces appels seront derrière une couche
> `platform` (no-op sur web, natif sur iOS/Android).

## 3. App Store — prérequis

- Compte **Apple Developer** (99 $/an).
- **Sign in with Apple** OBLIGATOIRE si on propose un login social (Google).
- Icône 1024×1024, captures (6.7", 6.5", 5.5", iPad), description FR, mots-clés.
- **URL de politique de confidentialité** (page `/legal` à exposer en URL publique).
- App Privacy « Nutrition Label » : déclarer qu'on ne collecte rien (local-first).
- Build signé via Xcode + TestFlight avant prod.

## 4. Google Play — prérequis

- Compte **Google Play Console** (25 $ une fois).
- AAB signé (clé de signature gérée par Play).
- Fiche : icône 512, bannière 1024×500, captures, description FR.
- **Politique de confidentialité** (URL), formulaire Data Safety (rien collecté).
- Classification de contenu (jeu de cartes, sans argent réel).

## 5. Freemium / pubs (plus tard)

- Abstraction prête : `src/state/entitlements.ts` (premium / adsEnabled).
- Achats in-app : `@capacitor/in-app-purchases` ou RevenueCat.
- Pubs : AdMob via plugin Capacitor, **uniquement si `adsEnabled`** et non-premium.
- Aujourd'hui : `premium = true`, `adsEnabled = false` → 100% gratuit sans pub.

## 6. Légal (déjà en place)

- Pages **Confidentialité / CGU / Mentions** dans l'app (`/legal`), lien en accueil.
- À COMPLÉTER avant publication : raison sociale, email de contact, hébergeur final.

## 7. Offline

- PWA offline-first : service worker (autoUpdate), précache du shell + assets,
  `navigateFallback` → index.html. Données 100% locales. Indicateur « hors-ligne »
  dans l'UI. En natif, le bundle est embarqué → offline par construction.
