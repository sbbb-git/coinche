# Produit & architecture cible — Coincheur

> Réflexion stratégique (pas du code). Aujourd'hui : app 100% locale, offline, sans
> compte ni pub. Ce document décrit comment on **retient les joueurs**, comment on
> **structure les données**, les **notifications**, et l'**architecture à terme** —
> par phases, sans casser le local-first actuel.

---

## 1. Notifications (rétention #1)

**Objectif** : ramener le joueur (le nerf de la guerre, façon streak Duolingo/Chess.com).

**Deux niveaux techniques :**
- **Notifications LOCALES** (dès le packaging natif Capacitor, AUCUN backend requis) :
  planifiées sur l'appareil. C'est 80% de la valeur, à faire en premier.
  - Plugin : `@capacitor/local-notifications`.
- **Notifications PUSH** (plus tard, nécessite backend) : FCM (Android) + APNs (iOS)
  via le backend ; pour des events serveur (défi du jour, un ami t'a défié, classement).

**Déclencheurs (à prioriser) :**
1. **Série en danger** : « 🔥 Ta série de N jours expire ce soir ! » (le + efficace).
2. **Défi du jour dispo** : rappel quotidien à heure choisie.
3. **Reprise** : J+3 d'inactivité « Une donne rapide ? », J+7, J+14 (dégressif).
4. **Fin d'analyse** : « Ton coach a analysé ta dernière partie » (si calcul différé).

**Règles d'or :**
- Demander la permission **au bon moment** (après une 1ʳᵉ victoire / 1ᵉʳ exo réussi,
  pas au lancement).
- **Anti-spam** : 1 notif/jour max par défaut, réglable, désactivable (écran Compte).
- Respecter le fuseau et une plage horaire (pas la nuit).
- Tout est **opt-in** et listé dans la politique de confidentialité.

---

## 2. Base de données (quand on passe au cloud)

**Choix recommandé : Supabase** (Postgres managé + Auth + Realtime + Row Level
Security + Edge Functions). Raisons : RLS = sécurité par défaut, SDK simple, gratuit
pour démarrer, s'aligne avec notre interface `storage` déjà abstraite.

**Principe : LOCAL-FIRST conservé.** Le device reste la source de vérité hors-ligne ;
le cloud sauvegarde/synchronise. Brancher derrière l'interface `src/storage` (un
`CloudStorage` qui implémente `Storage`), sans toucher au reste.

**Schéma (esquisse) :**
```
profiles        id (=auth uid), display_name, created_at, country, avatar
ratings         user_id, mode ('global'|'bid'|'play'), rating, games, updated_at
rating_history  user_id, ts, rating              -- la courbe (déjà locale)
games           id, user_id, played_at, contract(jsonb), result(jsonb),
                accuracy, settings(jsonb)         -- = nos DealRecord
deals_review    game_id, points(jsonb)            -- analyse coach (optionnel, cache)
challenges      day (date, PK), seed, contract    -- défi du jour déterministe
challenge_runs  user_id, day, score, accuracy, ts -- résultats + classement
streaks         user_id, day_streak, last_active
friendships     user_id, friend_id, status
```
**Intégrité / anti-triche** : le rating et les scores de classement doivent être
**recalculés/validés côté serveur** (Edge Function), jamais juste poussés par le
client. RLS : chaque user ne lit/écrit que ses lignes ; classements via vues agrégées.

**Sync** : par champ, « dernier écrit gagne » au début ; file d'attente offline qui
rejoue les écritures à la reconnexion (on a déjà l'indicateur online/offline).

---

## 3. Capter & retenir les utilisateurs

**Acquisition :**
- **ASO** (le gratuit le + rentable) : mots-clés « coinche, belote contrée, belote »,
  captures soignées, vidéo, bonne note. Fiche FR d'abord.
- **Partage viral** : « partager une donne » (image/texte du coup génial ou du coach)
  → ramène du trafic. Le **défi du jour partageable** (« j'ai fait 92% ») = boucle type
  Wordle.
- **Parrainage** (plus tard, avec comptes) : inviter un ami = bonus cosmétique.
- **Web** : la PWA est indexable ; une vraie landing + blog stratégie (SEO « comment
  jouer à la coinche ») amène du long-terme.

**Rétention (boucles) :**
- **Série quotidienne** (déjà en place) + **notif série en danger** = le combo clé.
- **Défi du jour** : rituel quotidien, même donne pour tous, classement amical.
- **Progression visible** : niveau/Elo + **courbe** (fait) → sentiment d'avancer.
- **Game Review** (fait) : « précision 87% » donne envie de rejouer pour mieux faire.
- **Objectifs/quêtes légères** : « 3 exos aujourd'hui » (sans surcharger l'UI).

**Métriques à suivre** (quand backend) : D1/D7/D30, DAU/MAU, longueur de série
moyenne, taux d'opt-in notifs, rétention par canal d'acquisition.

> ⚠️ Garde-fou produit (ta remarque) : **le jeu d'abord**. Ces leviers se branchent
> SANS multiplier les rubriques visibles — surtout via notifications, défi du jour et
> partage, pas via de nouveaux écrans.

---

## 4. Architecture globale à terme (par phases)

```
Client (PWA + Capacitor iOS/Android)
  └─ Moteur pur (engine) · UI · storage (interface)
        ├─ LocalStorage (aujourd'hui)
        └─ CloudStorage  ──► Supabase (Auth, Postgres+RLS, Realtime, Edge Fn)
                                   ├─ Edge Fn : validation rating/scores, défi du jour
                                   ├─ Push : FCM / APNs
                                   └─ Storage : avatars
```

**Phases (incrémentales, chacune livrable) :**
- **P1 — Aujourd'hui** : solo local, offline, coach, progression locale. *(fait)*
- **P2 — Engagement local** : packaging natif + **notifications locales** + **défi du
  jour** (déterministe par date, sans backend) + partage. *Aucune donnée serveur.*
- **P3 — Comptes & sync** : Supabase Auth (Apple/Google/email), `CloudStorage`,
  sauvegarde/synchro multi-appareils, suppression de compte. *(bascule store « collecte
  de données » → voir SUBMISSION.md / RELEASE_CHECKLIST.md)*
- **P4 — Social** : amis, **classements** (défi du jour, niveau), push serveur.
- **P5 — Multijoueur** temps réel (Realtime) : jouer à 4 humains / mixte IA. (gros morceau)

**Monétisation** : abstraction `entitlements.ts` déjà prête. Freemium plus tard
(ex. analyses illimitées / cosmétiques en premium ; pubs optionnelles non-premium).
Rien d'activé en v1.

---

### Lien avec les docs existants
- `RELEASE_CHECKLIST.md` — exigences stores + parcours comptes.
- `SUBMISSION.md` — réponses aux questionnaires (bascule si comptes ajoutés).
- `STORE.md` — packaging Capacitor, Game Center.
- `STRATEGY.md` — force de l'IA / coach.
