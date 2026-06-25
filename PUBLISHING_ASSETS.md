# Kit de publication — visuels & textes

> Tout ce qui peut être généré par le code est prêt. Le reste = comptes payants +
> captures d'écran (à faire sur appareil) + 2 infos d'identité. Textes : `STORE_LISTING.md`.

## ✅ Visuels GÉNÉRÉS (dans le dépôt)
- **Icône** (carrée, feutre vert + 2 cartes) :
  - `store-assets/icon-1024.png` → **App Store** (1024×1024).
  - `public/icon-512.png`, `public/icon-192.png`, `public/apple-touch-icon.png` (180),
    `public/icon-512-maskable.png` → app/PWA/Android (déjà câblés dans le manifest).
- **Bannière Google Play** : `store-assets/feature-graphic-1024x500.png` (1024×500).
- **Pages légales publiques** (exigées) : `…/privacy.html` et `…/terms.html` (en ligne).

> L'icône est un placeholder propre et cohérent ; remplaçable plus tard par un visuel pro.

## ✅ Textes PRÊTS — voir `STORE_LISTING.md`
Nom, sous-titre, descriptions FR (courte + longue), mots-clés, notes de version,
catégorie, classification. Réponses aux questionnaires : `SUBMISSION.md`.

## 📸 Captures d'écran — à PRODUIRE (sur appareil/navigateur)
Apple et Google exigent des captures. Comment faire simplement :
1. Ouvre le site **en mode application** (installé) ou dans Chrome → DevTools →
   mode appareil (iPhone 6.7″ = 1290×2796, 6.5″ = 1242×2688 ; Android 1080×1920).
2. Capture ces **6 écrans** (l'ordre = l'ordre d'affichage sur la fiche) :

| # | Écran | Légende à ajouter en haut |
|---|-------|---------------------------|
| 1 | Une partie en cours (table) | « Joue à la Coinche contre une IA sérieuse » |
| 2 | Coach en direct (bulle 💡) | « Un coach qui t'explique chaque coup » |
| 3 | Mes parties → précision % | « Analyse tes parties (façon game review) » |
| 4 | Progression (courbe + niveau) | « Progresse : niveau, série, courbe » |
| 5 | Défi du jour | « Le défi du jour, la même donne pour tous » |
| 6 | Compteur de points | « Compteur pour tes parties à la vraie carte » |

Astuce : garde un **bandeau de titre** court et lisible en haut de chaque capture
(fond vert, texte blanc), cohérent avec l'icône.

## 🙋 Ce qu'il te reste à faire (hors code)
1. **Comptes développeur** : Apple Developer (99 $/an) + Google Play Console (25 $).
2. **2 infos** à renseigner (puis je les mets partout) : **nom d'éditeur** + **email de
   contact** → remplacent les `[À COMPLÉTER]` de `privacy.html`/`terms.html`/`config.ts`.
3. **Packaging natif** (Capacitor) sur un Mac (iOS) + Android Studio → cf. `STORE.md`.
4. **Captures** (ci-dessus) + uploader icône/ bannière.
5. **Soumettre** en recopiant `STORE_LISTING.md` + `SUBMISSION.md`.

## Régénérer les visuels
Script : `/tmp/gen_icon.py` (Pillow). Pour changer couleurs/forme, édite-le et relance
`python3 /tmp/gen_icon.py`. (Je peux aussi l'intégrer au dépôt si tu veux le versionner.)
