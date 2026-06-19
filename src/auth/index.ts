// Architecture d'authentification & de synchronisation cloud.
//
// L'app est local-first : tout fonctionne sans compte. Ces interfaces préparent
// le branchement d'un fournisseur (Firebase / Supabase) SANS toucher au reste :
// il suffira de fournir une implémentation de `AuthService` + `SyncService` et
// de remplacer les stubs ci-dessous.
//
// Pour brancher Firebase plus tard (exemple) :
//   1. `npm i firebase`
//   2. implémenter AuthService avec signInWithPopup(GoogleAuthProvider/OAuthProvider 'apple.com')
//   3. implémenter SyncService avec Firestore (collections settings/stats/history/profile)
//   4. exporter ces impls à la place de `stubAuth` / `stubSync`.

export type AuthProviderId = "google" | "apple";

export interface User {
  id: string;
  name: string;
  provider: AuthProviderId;
  email?: string;
}

export interface AuthService {
  /** Un fournisseur est-il branché ? (false tant qu'on est local-only) */
  isConfigured(): boolean;
  getUser(): User | null;
  signIn(provider: AuthProviderId): Promise<User>;
  signOut(): Promise<void>;
  onChange(cb: (u: User | null) => void): () => void;
}

/** Données synchronisables une fois connecté. */
export interface SyncService {
  isConfigured(): boolean;
  /** envoie l'état local vers le cloud */
  push(): Promise<void>;
  /** récupère l'état cloud vers le local */
  pull(): Promise<void>;
}

export class ProviderNotConfiguredError extends Error {
  constructor() {
    super("Connexion cloud bientôt disponible : l'architecture est prête, le fournisseur sera branché prochainement.");
    this.name = "ProviderNotConfiguredError";
  }
}

// --- Stubs local-only (aucun réseau) ---------------------------------------

export const stubAuth: AuthService = {
  isConfigured: () => false,
  getUser: () => null,
  async signIn() {
    throw new ProviderNotConfiguredError();
  },
  async signOut() {
    /* no-op */
  },
  onChange() {
    return () => {};
  },
};

export const stubSync: SyncService = {
  isConfigured: () => false,
  async push() {
    throw new ProviderNotConfiguredError();
  },
  async pull() {
    throw new ProviderNotConfiguredError();
  },
};

// Points de branchement uniques (à remplacer le jour où on ajoute Firebase/Supabase).
export const auth: AuthService = stubAuth;
export const sync: SyncService = stubSync;
