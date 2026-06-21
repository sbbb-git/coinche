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
