# CHECKLIST — Coinche Trainer (roadmap actionnable)

> Vue d'ensemble de **tout ce qui reste à faire**, du jeu au business.
> Légende : ✅ fait · 🔜 prochain · ⏳ plus tard · 💤 optionnel.
> Objectif : avancer sans se rush, dans le bon ordre.

---

## 0. Bloquant immédiat
- [ ] **Activer le service du site** : Settings → Pages → Source = « Deploy from a branch » → `gh-pages` `/(root)`. *(le build/deploy est déjà vert)*
- [ ] Vérifier le site en ligne : https://sbbb-git.github.io/coinche/

---

## 1. Jeu / cœur (moteur + table)
- ✅ Moteur règles/scoring/état (162 pts, belote, capot, générale, coinche/surcoinche), 100% testé
- ✅ Table jouable responsive, enchères, fin de donne, PWA
- ✅ Clarté en jeu : qui tient/remporte le pli, points de la manche en live, détail des points en fin
- ✅ Voir la dernière main / review de manche complète
- 🔜 Mode **Contrée** (annonce couleur, contrat 82) en plus de la Coinche chiffrée
- 🔜 Animations gamifiées (distribution, badges, transitions) — passe « finition »
- 💤 Belote en défense réglable ; surcoinche à la volée ; annonces qui comptent pour le contrat

## 2. IA & Coach
- ✅ 4 niveaux (Facile/Moyen/Difficile/Expert PIMC), style paramétrable
- ✅ IA lit les annonces (enchères) + place les cartes selon les annonces (PIMC bid-aware)
- ✅ Soutien du partenaire (relance), garde-fous anti-cascade
- 🔜 Affiner le système Graux complet (clefs 110+, bascules, réponses) + plus de tests de force
- 🔜 Banc d'essai : générer N parties et mesurer la qualité après chaque changement d'IA
- ⏳ Difficulté adaptative (le coach s'ajuste au niveau estimé du joueur)

## 3. Plateforme d'entraînement
- ✅ Review de tes parties (coup par coup + donne complète) + **export de donnes**
- ✅ Review IA globale (simulateur massif)
- ✅ Exercices générés (enchères avec fausses enchères / jeu), streak
- ✅ Leçons visuelles + guides situationnels
- 🔜 Stats & progression enrichies (courbes, taux par mode, types d'erreurs récurrentes)
- ⏳ Parcours guidé « débutant → confirmé » avec déblocage progressif
- ⏳ Import d'une donne exportée pour l'analyser (coller le JSON)

## 4. Comptes & Cloud
- ✅ Persistance locale (interface Storage abstraite, prête pour le cloud)
- 🔜 Choix du backend : **Supabase** (ou Firebase) — auth + base
- 🔜 Connexion **Google / Apple** (Sign in with Apple obligatoire si login social sur iOS)
- 🔜 Sync : réglages, progression, historique, profil
- ⏳ **Multijoueur en ligne** (l'archi le prévoit ; gros chantier — à cadrer séparément)

## 5. Packaging & Distribution
- ✅ **Web / PWA** (installable iPhone & Android « sur l'écran d'accueil »)
- 🔜 Finition PWA : icônes toutes tailles, splash, offline complet, audit Lighthouse
- 🔜 **Capacitor** : scaffolding iOS + Android (un seul code)
- ⏳ **App Store** : compte Apple Developer (99 $/an), fiche, captures, build signé (Mac/CI)
- ⏳ **Google Play** : compte (25 $ une fois), fiche, captures, build signé
- ⏳ Notifications push / vibrations natives / achats in-app (via Capacitor) si besoin

## 6. SEO & Contenu (le levier « Chess.com »)
- 🔜 Domaine : choisir le nom (coincheur.fr ou un nom dispo en .com+.fr), l'acheter, le brancher (CNAME + DNS)
- 🔜 Fondations SEO : `<title>`/meta/OpenGraph par page, `sitemap.xml`, `robots.txt`, données structurées, landing page
- 🔜 Articles pré-rendus (HTML indexable) à partir des leçons/guides : règles, comptage des points,
      valeur des cartes, coinche vs contrée, annonces 80/90/100, glossaire, FAQ
- 🔜 Maillage interne : chaque article → bouton « entraîne-toi » vers la bonne section de l'app
- ⏳ Site de contenu dédié (Astro) si le volume grossit ; blog, mises à jour
- ⏳ Analytics respectueux (Plausible/Umami), Search Console

## 7. Infra / Ops / Qualité
- ✅ CI build + déploiement (gh-pages)
- ✅ Agents de revue (sécurité/fiabilité/robustesse/ux/règles) à chaque phase
- 🔜 CI : lancer typecheck + tests à chaque PR (bloquant)
- 🔜 Monitoring d'erreurs (Sentry) une fois des utilisateurs réels
- ⏳ Sauvegardes (quand backend), env de staging

## 8. Légal / Conformité
- 🔜 Mentions légales, politique de confidentialité, CGU (obligatoire avec comptes + stores)
- 🔜 Bandeau cookies/consentement si analytics
- ⏳ Conformité stores (âge, contenu, RGPD), Sign in with Apple

## 9. Monétisation (à trancher plus tard)
- 💤 Gratuit sans pub + **premium training** (exercices avancés, stats poussées) ?
- 💤 Abonnement ? achat unique ? à décider selon l'audience

---

## Ordre conseillé (sans se rush)
1. **Activer Pages** → site en ligne (5 min).
2. **Finition jeu + IA** (mode Contrée, Graux, animations) — le produit doit être excellent d'abord.
3. **Stats/progression** + parcours guidé — la valeur « training ».
4. **Domaine + fondations SEO + 5-6 articles** — capter du trafic tôt, ça met du temps à monter.
5. **Comptes + sync (Supabase)** — quand il y a des utilisateurs à fidéliser.
6. **Capacitor → stores** — quand le web tourne bien et qu'on veut la distribution native.
7. **Multijoueur** — chantier dédié, après tout le reste.
