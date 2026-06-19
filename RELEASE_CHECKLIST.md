# Checklist de publication (App Store / Play Store / Web)

> Tout ce qu'il faut câbler/vérifier avant de publier. Coche au fur et à mesure.
> Légende : ✅ fait · 🔜 à faire · ⏳ plus tard.
>
> **Décision v1 : 100% LOCAL, sans compte ni pub, tout public 4+.** C'est le profil
> le plus simple à faire valider. Les réponses de soumission prêtes sont dans
> **`SUBMISSION.md`**. Toute la section « Comptes & Auth » ci-dessous devient ⏳
> (reportée après la v1).

## Comptes & Authentification (parcours utilisateur)
- ✅ Mode invité : jouer SANS compte (local-first) — déjà le cas.
- 🔜 Création de compte : **email + mot de passe** et/ou **Google** / **Apple**.
- 🔜 **Sign in with Apple** (OBLIGATOIRE sur iOS dès qu'on propose Google).
- 🔜 Connexion / déconnexion.
- 🔜 **Mot de passe oublié** → email de réinitialisation (lien sécurisé, expiration).
- 🔜 **Vérification d'email** (lien de confirmation) avant sync.
- 🔜 Modifier l'email / le mot de passe depuis le profil.
- 🔜 **Suppression de compte in-app** + suppression effective des données
  (EXIGÉ par Apple ET Google) + une URL web de suppression (Google).
- 🔜 Migration **invité → compte** (on garde la progression locale en se connectant).
- 🔜 Gestion d'erreurs claire : email déjà utilisé, mauvais mot de passe, hors-ligne,
  compte non vérifié, token expiré.
- 🔜 Persistance de session (rester connecté) + rafraîchissement de token.
- 🔜 Renvoyer l'email de vérification / de réinitialisation (anti-spam, throttle).

## Synchronisation cloud
- ✅ Persistance locale derrière une interface abstraite (`storage/`), prête à brancher.
- 🔜 Sync réglages / progression / historique / profil.
- 🔜 **Fusion offline-first** + résolution de conflits (dernier écrit / par champ).
- 🔜 Recalcul du niveau/Elo côté serveur (ne pas faire confiance au client).

## Sécurité (déléguée au provider : Supabase / Firebase)
- 🔜 Mots de passe **hashés côté serveur** (jamais stockés en clair).
- 🔜 Rate-limiting / anti-bruteforce sur login & reset.
- 🔜 Tokens stockés proprement (httpOnly si possible ; éviter le refresh token en localStorage).
- 🔜 Validation/échappement des entrées (le provider gère l'auth).

## RGPD / Légal
- ✅ Pages **Confidentialité / CGU / Mentions** in-app (`/legal`).
- 🔜 Remplir les champs **[À COMPLÉTER]** (raison sociale, email de contact, hébergeur).
- 🔜 **Export de mes données** + **suppression** (droits RGPD).
- 🔜 Politique de confidentialité accessible par **URL publique** (exigée par les stores).
- 🔜 Bandeau de consentement si analytics ajoutés.

## App Store (iOS)
- 🔜 Compte Apple Developer (99 $/an).
- 🔜 Sign in with Apple + **suppression de compte in-app**.
- 🔜 **App Privacy “nutrition labels”** (déclarer : rien collecté en mode local).
- 🔜 Icône 1024×1024, captures (6.7″/6.5″/5.5″/iPad), description FR, mots-clés.
- 🔜 Classification d'âge, build signé, **TestFlight** avant prod.

## Google Play (Android)
- 🔜 Compte Play Console (25 $ une fois).
- 🔜 **Data safety form** + URL de politique de confidentialité.
- 🔜 **Suppression de compte** (in-app + URL web).
- 🔜 AAB signé, icône 512, bannière 1024×500, captures, fiche FR.
- 🔜 Questionnaire de classification du contenu (jeu de cartes, sans argent réel).

## Polish app (qualité avant soumission)
- ✅ ErrorBoundary (pas d'écran blanc), offline-first + indicateur.
- ✅ Onboarding 1er lancement, cibles tactiles 44px, safe-area (encoches).
- 🔜 États de chargement / erreurs réseau sur les écrans cloud.
- 🔜 Écran « À propos » + numéro de version + lien support.
- 🔜 Icônes & splash toutes tailles (PWA + natif).
- 🔜 Revue accessibilité finale (contrastes, VoiceOver/TalkBack, Dynamic Type).
- 🔜 Page de destination web (SEO minimal) + liens stores quand publiés.

## Technique / packaging
- ✅ PWA installable + `capacitor.config.json` + `STORE.md`.
- 🔜 `npx cap add ios/android`, build signé, Game Center / Play Games (cf. STORE.md).
- 🔜 Monitoring d'erreurs (Sentry) une fois en prod.
- 🔜 Mettre à jour les dépendances dev vulnérables (vitest/vite) — sans impact prod.
