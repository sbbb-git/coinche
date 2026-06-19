# Publication — Coincheur

Aujourd'hui l'app est une **PWA** (web installable). Voici comment la distribuer
maintenant, puis comment l'emballer pour l'**App Store** et **Google Play** le moment venu.

## 1. Maintenant — PWA (web, installable iPhone/Android)

```bash
npm run build      # génère dist/ (PWA : manifest + service worker)
```

Héberger `dist/` sur n'importe quel hébergeur statique HTTPS (Netlify, Vercel,
Cloudflare Pages, GitHub Pages…). L'app est alors :

- **installable** sur iPhone (Safari → Partager → « Sur l'écran d'accueil ») et Android
  (Chrome → « Installer l'application ») ;
- **hors-ligne** (service worker) ;
- en plein écran (`display: standalone`, orientations portrait + paysage).

## 2. Plus tard — App Store + Google Play (via Capacitor)

[Capacitor](https://capacitorjs.com) emballe le même code web en app native, sans réécriture.

### Mise en place (une fois)

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
npx cap init Coincheur com.coincheur.app --web-dir=dist
npm i @capacitor/ios @capacitor/android
npm run build
npx cap add ios
npx cap add android
```

À chaque mise à jour du web :

```bash
npm run build && npx cap sync
```

### iOS (App Store)

- Prérequis : un **Mac** + **Xcode** + compte **Apple Developer** (99 €/an).
- `npx cap open ios` → dans Xcode : régler le Bundle ID, l'équipe de signature,
  l'icône et le launch screen, puis Archive → distribuer vers App Store Connect.
- Remplir la fiche (captures, description, confidentialité), soumettre à la review.
- Catégorie « Jeux / Cartes ». Si l'app simule des jeux d'argent, prévoir la
  classification d'âge adéquate (l'app de référence est en 18+).

### Android (Google Play)

- Prérequis : **Android Studio** + compte **Google Play Console** (25 € une fois).
- `npx cap open android` → générer un **App Bundle (.aab)** signé.
- Créer la fiche Play, téléverser le `.aab`, remplir le questionnaire de contenu, publier.

### Comptes Google / Apple dans l'app

L'architecture est prête (`src/auth/`). Pour activer la connexion :

- **Firebase** (recommandé) : `npm i firebase`, activer Google + « Sign in with Apple »
  dans la console, implémenter `AuthService`/`SyncService` (Firestore) et remplacer les
  stubs exportés dans `src/auth/index.ts`.
- Sur iOS, « Sign in with Apple » est **obligatoire** dès qu'un autre login social est proposé
  (règle App Store) — Firebase le gère.

## 3. Icônes & assets stores

Les icônes PWA (`public/icon-*.png`) servent de base. Pour les stores, générer les
jeux d'icônes/splash via `@capacitor/assets` (`npx capacitor-assets generate`) à partir
d'un logo source haute résolution (1024×1024).
