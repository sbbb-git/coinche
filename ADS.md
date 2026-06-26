# Mettre des pubs sur Coincheur (web / AdSense)

Coincheur est diffusé comme **site web** (PWA). La régie web standard est
**Google AdSense**. Tout est **déjà câblé** : il ne reste qu'une étape externe
(ouvrir un compte AdSense et le faire valider), puis coller un identifiant.

## En une phrase
On s'inscrit à **Google AdSense**, Google valide le site, on récupère un
identifiant éditeur **`ca-pub-XXXXXXXXXXXXXXXX`**, on le met dans une variable, et
les pubs apparaissent — **uniquement après le consentement** du visiteur (RGPD).

## Ce qui est déjà fait (code)
- `src/config.ts` : `ADSENSE_CLIENT` lu depuis l'env `VITE_ADSENSE_CLIENT` (vide par défaut).
- `src/ads.ts` : chargement **idempotent** d'AdSense, **uniquement** si configuré ET consenti.
- `src/components/AdSlot.tsx` : emplacement réutilisable. Pubs posées sur l'**accueil**
  et la **progression** (jamais en pleine donne). Rien ne s'affiche tant que ce n'est pas configuré.
- `src/components/ConsentBanner.tsx` : la pub ne se charge qu'au clic **« Accepter »**.
- **Pages SEO statiques** (`scripts/gen-seo.mjs`) : si `ADSENSE_CLIENT` est défini au build,
  chaque page reçoit le loader AdSense **+ un mini-bandeau de consentement** (même clé
  `cookie-consent` que l'app). C'est là que se trouve le gros du trafic de recherche.
- `.github/workflows/deploy-pages.yml` : lit la variable de dépôt `ADSENSE_CLIENT`.

## Activer les pubs (étape par étape)
1. Crée un compte sur **adsense.google.com** et ajoute le site **coincheur.fr**.
2. Colle le bout de code de vérification d'AdSense (ou vérifie via le DNS / Search Console),
   puis **attends la validation** (Google revoie le site : de quelques jours à 2 semaines).
3. Une fois validé, récupère ton identifiant **`ca-pub-XXXXXXXXXXXXXXXX`**.
4. Sur GitHub : **Settings → Secrets and variables → Actions → Variables → New variable**
   - Nom : `ADSENSE_CLIENT` · Valeur : `ca-pub-XXXXXXXXXXXXXXXX`
   - (optionnel) `ADSENSE_SLOT_HOME`, `ADSENSE_SLOT_STATS`, `ADSENSE_SLOT_EXERCISES` si tu
     crées des emplacements manuels ; sinon laisse les **Auto ads** d'AdSense placer la pub.
5. Relance le déploiement (un push ou « Run workflow »). Les pubs apparaissent après consentement.

## RGPD / EEA — important
- Par défaut, **aucune pub ne se charge avant le clic « Accepter »** (privacy-first, défendable).
- Pour **maximiser le revenu en Europe** avec de la pub personnalisée, Google demande un
  **CMP certifié**. Le plus simple : activer le **message RGPD** d'AdSense
  (console AdSense → **Confidentialité et messages**), qui est un CMP certifié et gère le
  consentement pub sur toutes les pages. À ce moment-là, on peut retirer le mini-bandeau maison.
- Penser à garder la page **Confidentialité** à jour (elle mentionne déjà Google AdSense).

## Bonnes pratiques (rétention)
- Jamais de pub en pleine donne ; emplacements calmes (accueil, stats, listes).
- Plus tard : achat **« Retirer les pubs »** (`entitlements.premium = true`) via une régie
  d'achat web, ou rester 100 % gratuit + pub. Le code `showAds()` est déjà prêt pour ça.
