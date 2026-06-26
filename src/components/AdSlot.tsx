import { useEffect, useRef, useState } from "react";
import { useEntitlements } from "../state/entitlements";
import { useT } from "../i18n";
import { ADS_ENABLED, ADSENSE_CLIENT, ADSENSE_SLOTS, adsConfigured } from "../config";
import { hasAdsConsent, pushAd, useAdsStore } from "../ads";

// Emplacement publicitaire (Google AdSense, web).
//  - Si AdSense n'est pas configuré (pas d'identifiant éditeur) : rien en prod,
//    un placeholder en dev pour valider la mise en page.
//  - Si configuré ET consentement donné : une vraie unité AdSense (responsive).
// Règle d'or : JAMAIS au milieu d'une donne, uniquement écrans hors-jeu.

const env = (import.meta as unknown as { env?: { DEV?: boolean } }).env;
const IS_DEV = env?.DEV === true;

export function AdSlot({ placement, className = "" }: { placement: string; className?: string }) {
  const t = useT();
  const showAds = useEntitlements((s) => s.showAds());
  const adsReady = useAdsStore((s) => s.ready); // re-render quand la pub devient prête

  if (!ADS_ENABLED) return null; // interrupteur maître : pubs coupées pour l'instant
  if (!showAds) return null; // premium ou pubs désactivées

  // AdSense configuré + consenti + script chargé → vraie unité.
  if (adsConfigured() && hasAdsConsent() && adsReady) {
    return <RealAd placement={placement} className={className} label={t("ad.aria")} />;
  }

  // Non configuré : placeholder en dev, rien en prod.
  if (!IS_DEV || adsConfigured()) return null;
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

function RealAd({
  placement,
  className,
  label,
}: {
  placement: string;
  className: string;
  label: string;
}) {
  const ref = useRef<HTMLModElement>(null);
  const [pushed, setPushed] = useState(false);
  const slot = ADSENSE_SLOTS[placement] || "";

  useEffect(() => {
    if (!pushed) {
      pushAd();
      setPushed(true);
    }
  }, [pushed]);

  return (
    <div role="complementary" aria-label={label} data-ad-placement={placement} className={className}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client={ADSENSE_CLIENT}
        {...(slot ? { "data-ad-slot": slot } : {})}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
