# Tes next steps à TOI (ce que je ne peux pas faire à ta place)

> L'app, le moteur, l'IA, le coach, les visuels générés et tous les textes sont prêts.
> Il reste surtout de l'administratif et 2 infos. Suis l'ordre ci-dessous.
> Détails techniques dans : `STORE.md`, `SUBMISSION.md`, `STORE_LISTING.md`, `PUBLISHING_ASSETS.md`.

## Conformité stores — état (revue du 2026-06-24)

**Verdict actuel : NO-GO tant que les 2 bloquants 🔴 ne sont pas levés.**

Déjà corrigé par moi :
- ✅ Icône App Store régénérée **sans transparence** (rejet Apple garanti évité).
- ✅ Mot-clé « tarot » retiré (risque de rejet/recatégorisation).
- ✅ Classification d'âge clarifiée 4+/PEGI 3 (plus d'ambiguïté « 18+ »).
- ✅ `capacitor.config.json` pré-configuré : description de permission notifications
  (iOS) + splash screen (évite l'écran blanc = signe d'app non finie).
- ✅ Date précise dans la politique de confidentialité.

Reste 🔴 (bloquants) :
- [ ] **Mentions d'éditeur** : remplacer les `[À COMPLÉTER]` (nom + email) → me donner
  les 2 infos (Étape 1) et je câble les 4 emplacements d'un coup.
- [ ] **Packaging natif** (Capacitor sur Mac) — Étape 4.

Reste 🟠 (à faire au packaging) :
- ✅ **Feature native (haptique) codée** : `feedback.ts` appelle le moteur haptique
  natif iOS/Android via Capacitor Haptics (repli vibration web). Il suffit d'installer
  le plugin au packaging (`npm i @capacitor/haptics`, cf. `STORE.md`). Écarte le 4.2.
- [ ] Captures d'écran (Étape 5).

## Étape 0 — Vérifier le site en ligne (5 min)
- [ ] Ouvre **https://sbbb-git.github.io/coinche/** sur ton iPhone et ton ordi.
- [ ] Installe-la (iPhone : Safari → Partager → « Sur l'écran d'accueil »).
- [ ] Joue 1 partie + teste le bouton **💡 Conseil** (les nouveaux conseils chiffrés).

## Étape 1 — Me donner 2 infos (2 min)
Ces 2 infos remplacent les `[À COMPLÉTER]` dans les pages légales et la soumission :
- [ ] **Nom d'éditeur** (ton nom ou une raison sociale) : …………
- [ ] **Email de contact / support** : …………

→ Dis-les-moi, je les mets partout automatiquement.

## Étape 2 — Décider : PWA seule, ou stores ?
- **Option rapide (gratuite, déjà faite)** : tu partages juste le lien du site. Installable
  sur iPhone/Android, hors-ligne. **Rien à payer.** C'est le plus simple pour commencer.
- **Option stores (payant)** : présence App Store + Google Play. Nécessite les étapes 3-5.

## Étape 3 — Comptes développeur (si stores)
- [ ] **Apple Developer** : 99 $/an — https://developer.apple.com/programs/
- [ ] **Google Play Console** : 25 $ une fois — https://play.google.com/console/

## Étape 4 — Packaging natif (si stores) — nécessite un Mac pour iOS
Tout est prêté côté code (`capacitor.config.json`). Sur ta machine, en local :
```bash
npm i @capacitor/core @capacitor/ios @capacitor/android && npm i -D @capacitor/cli
npm run build && npx cap add ios && npx cap add android && npx cap sync
npx cap open ios       # Xcode (Mac requis)
npx cap open android   # Android Studio
```
(Guide complet : `STORE.md`.)

## Étape 5 — Captures d'écran + soumission (si stores)
- [ ] Faire **6 captures** (table, coach, review, progression, défi, compteur) —
      tailles + légendes dans `PUBLISHING_ASSETS.md`.
- [ ] Uploader l'icône `store-assets/icon-1024.png` + la bannière `feature-graphic-1024x500.png`.
- [ ] Copier-coller les textes de `STORE_LISTING.md` et les réponses de `SUBMISSION.md`.

---

## Ce dont TU n'as pas à t'occuper (déjà fait par moi)
- ✅ Jeu complet + IA forte (mesurée sur ~20 000 donnes simulées) + coach qui se justifie en %.
- ✅ Icône, bannière, manifest, PWA hors-ligne, pages légales (sauf les 2 infos).
- ✅ Tous les textes de fiche store (FR), questionnaires de soumission, mots-clés.
- ✅ Déploiement automatique du site à chaque mise à jour.
