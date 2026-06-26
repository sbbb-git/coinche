# Publier sur l'App Store (iOS) — guide simple

> ⚠️ Prérequis incontournable (règle Apple) : un **compte Apple Developer (99 $/an)**.
> Sans lui, aucune app iOS ne peut être signée ni publiée. (Tu l'obtiens en
> « Organisation » avec ton DUNS pour publier sous « Coincheur ».)
>
> Bonne nouvelle : tu peux **tester** l'app sur le Simulateur de ton Mac **sans** ce compte.

## Option A — Sur ton Mac (le plus direct, tu as un Mac)

### 1. Installer les outils (une fois)
- **Xcode** : depuis le Mac App Store (gratuit, gros téléchargement).
- **Node** : https://nodejs.org (version LTS, installeur classique « Suivant »).
- **CocoaPods** : ouvre l'app **Terminal** et colle :
  ```
  sudo gem install cocoapods
  ```

### 2. Récupérer le projet + préparer iOS
Dans Terminal, colle ces lignes une par une :
```
git clone https://github.com/sbbb-git/coinche.git
cd coinche
npm install
npm run build
npx cap add ios
npx cap sync ios
npx cap open ios
```
→ Xcode s'ouvre sur le projet.

### 3. Voir l'app tourner (sans compte payant)
Dans Xcode, en haut, choisis un **iPhone Simulator** puis clique le **▶ (Run)**. L'app
Coincheur se lance dans un faux iPhone : tu vérifies que tout marche.

### 4. Publier (quand tu as le compte Apple Developer)
- Xcode → menu **Signing & Capabilities** → coche *Automatically manage signing* → choisis ton **équipe** (ton compte Apple Developer).
- Menu **Product → Archive** → quand c'est fini, **Distribute App → App Store Connect → Upload**.
- Puis sur **appstoreconnect.apple.com** : créer la fiche (textes prêts dans `STORE_LISTING.md`), ajouter captures, et **soumettre**.

## Option B — Sans toucher à Xcode : build cloud (Codemagic)
Le fichier `codemagic.yaml` est déjà prêt. Étapes :
1. Va sur **codemagic.io** → connecte-toi avec **GitHub** → ajoute le dépôt `coinche`.
2. Réglages → **App Store Connect** : ajoute une **clé API** (générée dans App Store Connect,
   nomme l'intégration `CoincheurAppStoreKey` comme dans le yaml).
3. Lance le workflow **« Coincheur — iOS »** → Codemagic compile sur SES Macs et
   envoie sur **TestFlight** automatiquement. **Aucun Mac requis de ton côté.**

> Là aussi : il faut le compte Apple Developer (99 $/an).

## En résumé
- L'app et la config sont **prêtes**.
- Le seul vrai prérequis qui manque = le **compte Apple Developer**.
- Avec un Mac : Option A (3 commandes + ▶). Sans Mac : Option B (Codemagic).
