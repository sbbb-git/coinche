import { useState } from "react";
import { ScreenShell } from "./ScreenShell";
import { useNav } from "./nav";
import { useGame } from "../state/store";
import { storage } from "../storage";
import { useT } from "../i18n";

export function AccountScreen() {
  const game = useGame((s) => s.game);
  const go = useNav((s) => s.go);
  const updateSettings = useGame((s) => s.updateSettings);
  const t = useT();
  const [name, setName] = useState(() => storage.loadProfile().name);

  // On ne persiste qu'au blur (sortie du champ) pour éviter de re-render toute la
  // partie à chaque frappe.
  const commitName = () => {
    const clean = name.trim() || "Vous";
    if (clean !== name) setName(clean);
    storage.saveProfile({ name: clean });
    const pn = game.settings.playerNames;
    updateSettings({ ...game.settings, playerNames: [clean, pn[1], pn[2], pn[3]] });
  };

  return (
    <ScreenShell title={t("account.title")}>
      <section className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
        <p className="mb-2 text-sm font-semibold text-white/80">{t("account.profile")}</p>
        <label className="text-xs text-white/60" htmlFor="pname">
          {t("account.displayName")}
        </label>
        <input
          id="pname"
          value={name}
          maxLength={16}
          placeholder={t("account.namePlaceholder")}
          onChange={(e) => setName(e.target.value)}
          onBlur={commitName}
          className="mt-1 w-full rounded-lg bg-white/90 px-3 py-2.5 font-semibold text-zinc-800 placeholder:text-zinc-400"
        />
      </section>

      {/* Pas de compte en v1 : 100% local. La synchro cloud est annoncée comme
          « à venir » sans bouton non fonctionnel (exigence de revue des stores). */}
      <section className="mt-4 rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
        <p className="text-sm font-semibold text-white/80">{t("account.cloudSync")}</p>
        <p className="mt-1 text-xs text-white/60">
          {t("account.cloudSyncDesc")}
        </p>
        <span className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/60">
          {t("account.comingSoon")}
        </span>
      </section>

      <button
        onClick={() => go("legal")}
        className="mt-4 w-full rounded-xl bg-white/5 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/10"
      >
        {t("account.legal")}
      </button>

      <p className="mt-3 text-center text-[11px] text-white/40">
        {t("account.localOnly")}
      </p>
    </ScreenShell>
  );
}
