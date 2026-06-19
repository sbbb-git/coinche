# Questions de soumission — réponses prêtes (v1 : 100% local, sans compte ni pub, 4+)

> Périmètre v1 validé : **aucune collecte de données, aucun réseau, aucune pub, aucun
> compte**. C'est le profil le PLUS simple à faire passer en revue. Copie-colle ces
> réponses. Champs à personnaliser : **[À COMPLÉTER]**.

## 0. À personnaliser avant soumission
- Éditeur (nom/raison sociale) : **[À COMPLÉTER]**
- Email de contact / support : **[À COMPLÉTER]**
- URL politique de confidentialité : `https://<ton-domaine>/privacy.html`
  (déjà générée : `public/privacy.html` → publiée à la racine du site)
- URL conditions/mentions : `https://<ton-domaine>/terms.html`

---

## 1. Apple — App Store Connect

### App Privacy (« Data collection »)
- **Do you collect data from this app?** → **No** (aucune donnée n'est collectée
  ni transmise ; tout est stocké localement sur l'appareil).
  → Résultat : étiquette « **Data Not Collected** ».

### App Review / infos générales
- **Sign in with Apple requis ?** → **Non** (aucun login tiers en v1).
- **Suppression de compte in-app requise ?** → **Non** (aucun compte).
- **Compte de démonstration pour la revue ?** → **Non requis** (pas de login).
- **Contenu généré par les utilisateurs ?** → Non.
- **Achats intégrés / abonnements ?** → Non.
- **Publicité (IDFA / App Tracking Transparency) ?** → Non, pas de tracking.

### Export Compliance (chiffrement)
- **Utilise du chiffrement ?** → Seulement HTTPS standard du système → **Exempt**
  (réponse « No » à « algorithmes propriétaires/non-standard »).

### Classification d'âge (Age Rating)
- Jeu de cartes, **sans argent réel**, sans violence/contenu sensible → **4+**.
  - « Simulated Gambling » → **None** (pas d'argent, pas de mise réelle).
  - Toutes catégories de contenu → None/Infrequent selon le questionnaire → 4+.

### Fiche
- Catégorie : **Games > Card** (secondaire : Board/Entertainment).
- Captures requises : 6.7″, 6.5″, 5.5″, iPad (si univ.) ; icône 1024×1024.
- Politique de confidentialité : URL ci-dessus.

---

## 2. Google — Play Console

### Data safety (formulaire)
- **Collecte ou partage de données utilisateur ?** → **No**.
- **Données stockées uniquement sur l'appareil ?** → Oui (à signaler dans le texte).
- **Chiffrement en transit / suppression des données** → Non applicable (rien de
  collecté ; données locales effaçables dans l'app).

### Content rating (questionnaire IARC)
- Catégorie : jeu. Violence : aucune. Sexualité : aucune. Langage : aucun.
- **Jeux d'argent / gambling ?** → **Non** (cartes sans argent réel, pas de mise,
  pas d'achats de jetons). → Classification attendue : **PEGI 3 / Tout public**.

### Suppression de compte
- **Compte utilisateur ?** → Non → exigence de suppression de compte **non applicable**
  (ni in-app, ni URL web).

### Publicité
- **Contient des publicités ?** → **Non**.

### Fiche
- Politique de confidentialité (URL) : obligatoire, fournie.
- Icône 512×512, bannière 1024×500, captures, description FR.
- Public cible & contenu : « Tout public ». Pas conçu spécifiquement pour enfants
  (réponds « Non » à « Designed for Families/Children » sauf si tu veux ce programme).
- API cible : dernière requise par Play (gérée au packaging Capacitor/Android Studio).

---

## 3. Web (PWA)
- Déjà installable (manifest + service worker offline). Liens légaux publics
  (`/privacy.html`, `/terms.html`). Rien à déclarer (pas de collecte).

---

## 4. Si tu ajoutes des COMPTES plus tard (passe en « collecte de données »)
Bascule alors ces réponses et ajoute les fonctionnalités :
- Apple : **Sign in with Apple obligatoire** (si Google login proposé) +
  **suppression de compte in-app** + App Privacy à mettre à jour (identifiants,
  contenu utilisateur). Compte de démo pour la revue.
- Google : **Data safety** détaillé (ce qui est collecté/partagé, chiffrement en
  transit, demande de suppression) + **URL web de suppression de compte**.
- Mettre à jour `privacy.html` (données collectées, base légale, durée, sous-traitants).
- Voir `RELEASE_CHECKLIST.md` (section Comptes & Auth).
