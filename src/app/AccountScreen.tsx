import { useState } from "react";
import { ScreenShell } from "./ScreenShell";
import { useGame } from "../state/store";
import { storage } from "../storage";
import { auth, AuthProviderId, ProviderNotConfiguredError } from "../auth";

export function AccountScreen() {
  const game = useGame((s) => s.game);
  const updateSettings = useGame((s) => s.updateSettings);
  const [name, setName] = useState(() => storage.loadProfile().name);
  const [info, setInfo] = useState<string | null>(null);

  const saveName = (n: string) => {
    setName(n);
    const clean = n.trim() || "Vous";
    storage.saveProfile({ name: clean });
    const pn = game.settings.playerNames;
    updateSettings({ ...game.settings, playerNames: [clean, pn[1], pn[2], pn[3]] });
  };

  const signIn = async (provider: AuthProviderId) => {
    try {
      await auth.signIn(provider);
    } catch (e) {
      setInfo(
        e instanceof ProviderNotConfiguredError
          ? e.message
          : "Connexion impossible pour le moment.",
      );
    }
  };

  return (
    <ScreenShell title="Compte">
      <section className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
        <p className="mb-2 text-sm font-semibold text-white/80">Ton profil (sur cet appareil)</p>
        <label className="text-xs text-white/60" htmlFor="pname">
          Nom affiché à la table
        </label>
        <input
          id="pname"
          value={name}
          maxLength={16}
          onChange={(e) => saveName(e.target.value)}
          className="mt-1 w-full rounded-lg bg-white/90 px-3 py-2.5 font-semibold text-zinc-800"
        />
      </section>

      <section className="mt-4 rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
        <p className="text-sm font-semibold text-white/80">Compte cloud</p>
        <p className="mt-1 text-xs text-white/60">
          Connecte-toi pour synchroniser entre tes appareils : réglages, progression, historique de
          parties, et (à venir) profil & classement.
        </p>
        <div className="mt-3 flex flex-col gap-2">
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-zinc-800 hover:bg-zinc-100"
          >
            <span aria-hidden>🔵</span> Continuer avec Google
          </button>
          <button
            onClick={() => signIn("apple")}
            className="flex items-center justify-center gap-2 rounded-xl bg-black py-3 font-semibold text-white hover:bg-zinc-900"
          >
            <span aria-hidden></span> Continuer avec Apple
          </button>
        </div>
        {info && (
          <p className="animate-pop mt-3 rounded-lg bg-emerald-900/70 p-3 text-sm text-white/85 ring-1 ring-emerald-700">
            ℹ️ {info}
          </p>
        )}
        {!auth.isConfigured() && !info && (
          <p className="mt-3 text-center text-[11px] text-white/40">
            Architecture prête · synchronisation activée prochainement
          </p>
        )}
      </section>

      <p className="mt-4 text-center text-[11px] text-white/40">
        Aujourd'hui, tes données restent 100 % sur cet appareil.
      </p>
    </ScreenShell>
  );
}
