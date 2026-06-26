import { useEntitlements } from "../state/entitlements";
import { useT } from "../i18n";

// Emplacement publicitaire. Le vrai réseau (Google AdMob en natif, ou AdSense en
// web) se branche ICI au packaging, cf. ADS.md. Tant que le SDK n'est pas câblé,
// on n'affiche RIEN en production (pas de faux encart, déconseillé par les stores),
// mais on matérialise l'emplacement en dev pour valider la mise en page.
// Règle d'or : JAMAIS au milieu d'une donne, uniquement écrans hors-jeu / inter-parties.

const env = (import.meta as unknown as { env?: { DEV?: boolean } }).env;
const IS_DEV = env?.DEV === true;

export function AdSlot({ placement, className = "" }: { placement: string; className?: string }) {
  const t = useT();
  const showAds = useEntitlements((s) => s.showAds());
  if (!showAds) return null; // premium ou pubs désactivées
  if (!IS_DEV) return null; // prod : rien tant que le réseau pub n'est pas branché
  return (
    <div
      role="complementary"
      aria-label={t("ad.aria")}
      data-ad-placement={placement}
      className={
        "flex items-center justify-center rounded-xl border border-dashed border-white/20 bg-black/20 py-3 text-[11px] uppercase tracking-wide text-white/40 " +
        className
      }
    >
      {t("ad.label", { placement })}
    </div>
  );
}
