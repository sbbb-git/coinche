import { ScreenShell } from "./ScreenShell";
import { useNav } from "./nav";
import { APP_VERSION } from "../version";
import { CONTACT_EMAIL, SITE_URL } from "../config";
import { useT, translate, currentLang } from "../i18n";

async function shareApp() {
  const data = { title: "Coincheur", text: translate(currentLang(), "about.shareText"), url: SITE_URL };
  try {
    if (navigator.share) await navigator.share(data);
    else await navigator.clipboard.writeText(`${data.text} ${SITE_URL}`);
  } catch {
    /* annulé */
  }
}

export function AboutScreen() {
  const go = useNav((s) => s.go);
  const t = useT();
  return (
    <ScreenShell title={t("about.title")}>
      <div className="text-center">
        <div className="mx-auto mb-2 grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-4xl">
          🃏
        </div>
        <h2 className="text-2xl font-black">
          Coin<span className="text-yellow-400">cheur</span>
        </h2>
        <p className="text-sm text-white/60">{t("about.subtitle", { version: APP_VERSION })}</p>
      </div>

      <p className="mt-4 rounded-xl bg-white/5 p-3 text-sm text-white/80 ring-1 ring-white/10">
        {t("about.intro")}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <Badge>{t("about.badge.offline")}</Badge>
        <Badge>{t("about.badge.coach")}</Badge>
        <Badge>{t("about.badge.train")}</Badge>
      </div>

      <div className="mt-4 space-y-2">
        <Row onClick={() => go("lessons")}>{t("about.learn")}</Row>
        <Row onClick={() => go("guides")}>{t("about.guides")}</Row>
        <Row onClick={() => go("legal")}>{t("about.legal")}</Row>
        <Row href={SITE_URL} external ariaLabel={t("about.websiteAria")}>{t("about.website")}</Row>
      </div>

      <p className="mt-5 mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-white/60">
        {t("about.support")}
      </p>
      <div className="space-y-2">
        <Row onClick={shareApp}>{t("about.share")}</Row>
        {CONTACT_EMAIL && (
          <Row href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t("about.shareSubject"))}`}>
            {t("about.contact")}
          </Row>
        )}
      </div>

      <p className="mt-6 text-center text-[11px] text-white/40">
        {t("about.footer")}
      </p>
    </ScreenShell>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-white/5 py-2 font-semibold text-white/85 ring-1 ring-white/10">
      {children}
    </div>
  );
}

function Row({
  children,
  onClick,
  href,
  external,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  ariaLabel?: string;
}) {
  const cls =
    "flex min-h-11 w-full items-center rounded-xl bg-white/5 px-4 text-left text-sm font-semibold text-white/85 hover:bg-white/10";
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={external ? ariaLabel : undefined}
        className={cls}
      >
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
