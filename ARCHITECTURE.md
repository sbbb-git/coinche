# Architecture backend (P3) — comptes & synchronisation

> Concrétise la phase P3 de `PRODUCT.md`. Choix : **Supabase** (Postgres + Auth +
> RLS + Realtime + Edge Functions). Principe : **local-first conservé** — le cloud
> sauvegarde/synchronise, il ne remplace pas le jeu hors-ligne.

## 1. Branchement côté client (zéro refonte)

Tout passe par l'interface `Storage` existante (`src/storage/index.ts`). On ajoute
une implémentation `CloudStorage` qui écrit en local ET pousse vers Supabase :

```ts
// src/storage/cloud.ts (à venir)
class CloudStorage implements Storage {
  // 1) délègue tout à LocalStorage (source de vérité hors-ligne)
  // 2) à chaque write : met en file une opération de sync
  // 3) à la connexion / au login : flush de la file + pull + merge
}
export const storage: Storage = session ? new CloudStorage(local) : local;
```

- File d'attente offline (déjà un indicateur online/offline en place).
- Auth via `@supabase/supabase-js` : Sign in with Apple / Google / email + magic link.
- Aucune clé secrète côté client : seulement l'`anon key` (publique), la sécurité
  vient des politiques **RLS**.

## 2. Schéma SQL (Postgres / Supabase)

```sql
-- Profil (1-1 avec auth.users)
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text not null default 'Joueur',
  country text,
  created_at timestamptz default now()
);

-- Niveau / Elo (par utilisateur ; "mode" pour découper global/bid/play plus tard)
create table ratings (
  user_id uuid references auth.users on delete cascade,
  mode text not null default 'global',
  rating int not null default 800,
  games int not null default 0,
  updated_at timestamptz default now(),
  primary key (user_id, mode)
);

-- Courbe de progression (un point par évolution)
create table rating_history (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete cascade,
  ts timestamptz default now(),
  rating int not null
);

-- Parties / donnes (= nos DealRecord)
create table games (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  played_at timestamptz default now(),
  contract jsonb not null,
  result jsonb not null,
  accuracy int,                 -- % de coups optimaux (Game Review)
  settings jsonb
);

-- Défi du jour : 1 donne déterministe partagée
create table challenges (
  day date primary key,
  seed text not null
);
create table challenge_runs (
  user_id uuid references auth.users on delete cascade,
  day date references challenges(day),
  success bool not null,
  ts timestamptz default now(),
  primary key (user_id, day)
);

-- Séries quotidiennes
create table streaks (
  user_id uuid primary key references auth.users on delete cascade,
  day_streak int not null default 0,
  last_active date
);

-- Amis (P4)
create table friendships (
  user_id uuid references auth.users on delete cascade,
  friend_id uuid references auth.users on delete cascade,
  status text not null default 'pending',  -- pending|accepted
  primary key (user_id, friend_id)
);
```

## 3. Sécurité — Row Level Security (obligatoire)

```sql
alter table profiles enable row level security;
alter table ratings enable row level security;
alter table games enable row level security;
alter table challenge_runs enable row level security;
alter table streaks enable row level security;

-- Chacun ne lit/écrit QUE ses lignes
create policy "own profile" on profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "own ratings" on ratings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own games" on games
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- (idem challenge_runs, streaks)

-- Classements : exposés via une VUE agrégée en lecture seule (pas la table brute)
create view leaderboard as
  select p.display_name, r.rating
  from ratings r join profiles p on p.id = r.user_id
  where r.mode = 'global'
  order by r.rating desc limit 100;
```

## 4. Anti-triche (clé)

Le client est **non fiable**. Donc :
- Le **rating** et les **scores du défi/classement** sont **recalculés/validés par une
  Edge Function** (entrée = la donne jouée + les coups ; sortie = score vérifié).
  Le client ne fait que proposer ; le serveur tranche et écrit.
- `challenges.seed` est généré **côté serveur** (cron Edge Function quotidien), pas
  par le client → tout le monde a la même donne, impossible de la pré-jouer.
- RLS empêche d'écrire dans les lignes d'autrui.

## 5. Sync & conflits

- Stratégie de départ : **dernier écrit gagne par champ** (timestamps).
- Les compteurs cumulatifs (rating, games) sont **dérivés serveur** (pas écrasés
  par le client) → pas de conflit destructeur.
- File d'attente offline rejouée à la reconnexion ; idempotence via clés
  naturelles (`games.id` généré client, upsert).

## 6. Realtime (P4/P5)

- `supabase.channel` pour : invitations d'amis, défis en direct, et plus tard le
  **multijoueur** (P5) — diffusion des coups via Realtime, l'`engine` pur reste
  l'arbitre côté serveur (Edge Function) pour empêcher la triche.

## 7. Impact stores

Activer les comptes = **bascule « collecte de données »** :
- iOS : Sign in with Apple obligatoire + suppression de compte in-app + App Privacy
  à mettre à jour. Android : Data safety détaillé + URL de suppression de compte.
- Voir `RELEASE_CHECKLIST.md` (section Comptes & Auth) et `SUBMISSION.md` (§4).

## 8. Hébergement & passage à l'échelle (objectif 1000+ joueurs simultanés)

**Point clé : le jeu en SOLO est 100% client.** Le moteur tourne sur l'appareil →
**0 charge serveur**, même avec 1000 (ou 1 million) de joueurs en solo en même temps.
Le serveur n'intervient QUE pour : comptes, sync, classements, défi du jour, multijoueur.
Donc « 1000 joueurs simultanés » est une charge **modeste** une fois bien architecturé.

### Front (statique)
- Bundle statique servi par un **CDN** (aujourd'hui GitHub Pages ; recommandé à terme :
  **Cloudflare Pages** ou Netlify/Vercel — CDN mondial, domaine custom, gratuit/peu cher).
- Un CDN encaisse des millions de requêtes sans effort. Le **défi du jour** étant
  identique pour tous, il est mis en cache au bord (edge) → 1 calcul, N lectures.

### Backend (managé) — Supabase
- **Postgres + Auth + Realtime + Edge Functions** managés. À 1000 utilisateurs actifs
  faisant de la sync/lecture occasionnelle = quelques requêtes/seconde → trivial
  (tier Pro ~25 $/mois largement suffisant).
- **Pooling de connexions** (Supavisor) obligatoire : on ne tient pas 1000 connexions
  Postgres directes ; le pooler multiplexe.
- **Index** sur les colonnes filtrées/triées ; **classements en vues matérialisées**
  rafraîchies périodiquement (pas recalculées à chaque lecture).
- **RLS** pour l'isolation ; **Edge Functions** pour valider rating/scores (anti-triche).

### Temps réel / multijoueur (P5) — le seul vrai sujet de charge
- 1000 joueurs ≈ **250 tables de 4** → ~1000 websockets, quelques messages par pli.
  Quelques **centaines de messages/seconde** au total : un seul nœud applicatif y suffit.
- Deux options : **Supabase Realtime** (simple) ou un **serveur de jeu autoritaire**
  léger (ex. Colyseus/Node sur **Fly.io** ou **Railway**) si la logique de salle est lourde.
  Le serveur reste **arbitre** (le moteur `engine` valide les coups) → anti-triche.
- Mise à l'échelle : **stateless** partout sauf les salles realtime ; sticky sessions
  par salle ; on ajoute des nœuds derrière un load-balancer (scale horizontal).

### Ordre de grandeur des coûts
- Solo only (aujourd'hui) : **~0 €** (CDN gratuit).
- 1000 actifs avec comptes/sync/classements : **quelques dizaines d'€/mois**.
- Multijoueur 1000 simultanés : ajouter 1 petite instance realtime (**~10-30 €/mois**).

### Plan de montée en charge
Vertical d'abord (tier plus gros) → **réplicas en lecture** pour les classements →
cache (CDN/Redis) sur les données chaudes → régionalisation si audience mondiale.
Toujours : **rate-limiting** (login/sync/score) + validation serveur.

> Revue dédiée : agent **`scalability-reviewer`** (à lancer dès l'arrivée du backend).
