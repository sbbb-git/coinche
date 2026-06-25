import { ScreenShell } from "./ScreenShell";
import { useNav } from "./nav";
import { APP_VERSION } from "../version";
import { CONTACT_EMAIL, SITE_URL, storeUrl } from "../config";
import { notify } from "../notify";

function rateApp() {
  const url = storeUrl();
  if (url) window.open(url, "_blank", "noopener");
  else notify.show("Merci 💛", "Bientôt sur les stores, ta note comptera !");
}

async function shareApp() {
  const data = { title: "Coincheur", text: "Joue à la Coinche et progresse 🃏", url: SITE_URL };
  try {
    if (navigator.share) await navigator.share(data);
    else await navigator.clipboard.writeText(`${data.text} ${SITE_URL}`);
  } catch {
    /* annulé */
  }
}

export function AboutScreen() {
  const go = useNav((s) => s.go);
  return (
    <ScreenShell title="À propos">
      <div className="text-center">
        <div className="mx-auto mb-2 grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-4xl">
          🃏
        </div>
        <h2 className="text-2xl font-black">
          Coin<span className="text-yellow-400">cheur</span>
        </h2>
        <p className="text-sm text-white/60">Coinche & entraînement · version {APP_VERSION}</p>
      </div>

      <p className="mt-4 rounded-xl bg-white/5 p-3 text-sm text-white/80 ring-1 ring-white/10">
        Joue à la Coinche (Belote contrée) contre des IA paramétrables et progresse comme sur une
        plateforme d'échecs : coach en direct, exercices, analyse de tes parties et niveau estimé.
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <Badge>📴 Jouable hors-ligne</Badge>
        <Badge>💡 Coach intégré</Badge>
        <Badge>🎯 Entraînement</Badge>
      </div>

      <div className="mt-4 space-y-2">
        <Row onClick={() => go("lessons")}>🎓 Apprendre à jouer</Row>
        <Row onClick={() => go("guides")}>📖 Guides de stratégie</Row>
        <Row onClick={() => go("legal")}>📄 Confidentialité · CGU · Mentions</Row>
        <Row href={SITE_URL} external>🌐 Site web ↗</Row>
      </div>

      <p className="mt-5 mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-white/60">
        Soutenir l'app
      </p>
      <div className="space-y-2">
        <Row onClick={rateApp}>⭐ Noter l'app</Row>
        <Row onClick={shareApp}>📤 Partager Coincheur</Row>
        {CONTACT_EMAIL && (
          <Row href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Avis Coincheur")}`}>
            ✉️ Nous écrire
          </Row>
        )}
      </div>

      <p className="mt-6 text-center text-[11px] text-white/40">
        La Coinche est un jeu du domaine public. Fait avec ❤️ pour les amateurs de belote.
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
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
}) {
  const cls =
    "flex min-h-11 w-full items-center rounded-xl bg-white/5 px-4 text-left text-sm font-semibold text-white/85 hover:bg-white/10";
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={external ? "Site web Coincheur (nouvel onglet)" : undefined}
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
