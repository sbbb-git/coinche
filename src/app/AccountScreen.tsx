import { useState } from "react";
import { ScreenShell } from "./ScreenShell";
import { useNav } from "./nav";
import { useGame } from "../state/store";
import { storage } from "../storage";

export function AccountScreen() {
  const game = useGame((s) => s.game);
  const go = useNav((s) => s.go);
  const updateSettings = useGame((s) => s.updateSettings);
  const [name, setName] = useState(() => storage.loadProfile().name);

  const saveName = (n: string) => {
    setName(n);
    const clean = n.trim() || "Vous";
    storage.saveProfile({ name: clean });
    const pn = game.settings.playerNames;
    updateSettings({ ...game.settings, playerNames: [clean, pn[1], pn[2], pn[3]] });
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

      {/* Pas de compte en v1 : 100% local. La synchro cloud est annoncée comme
          « à venir » sans bouton non fonctionnel (exigence de revue des stores). */}
      <section className="mt-4 rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
        <p className="text-sm font-semibold text-white/80">Synchronisation cloud</p>
        <p className="mt-1 text-xs text-white/60">
          Bientôt : un compte optionnel pour synchroniser ta progression entre tes appareils. Pour
          l'instant, l'app fonctionne 100 % hors-ligne et tes données restent sur cet appareil.
        </p>
        <span className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/60">
          À venir
        </span>
      </section>

      <button
        onClick={() => go("legal")}
        className="mt-4 w-full rounded-xl bg-white/5 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/10"
      >
        Confidentialité · CGU · Mentions légales
      </button>

      <p className="mt-3 text-center text-[11px] text-white/40">
        Tes données restent 100 % sur cet appareil.
      </p>
    </ScreenShell>
  );
}
