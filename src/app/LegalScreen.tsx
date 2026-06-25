import { useState } from "react";
import { ScreenShell } from "./ScreenShell";

// Pages légales, indispensables pour la publication sur l'App Store / Google Play
// et pour les comptes. Textes FR génériques ; les champs [À COMPLÉTER] sont à
// renseigner avant publication (raison sociale, contact, etc.).

type Tab = "confidentialite" | "cgu" | "mentions";

const TABS: { id: Tab; label: string }[] = [
  { id: "confidentialite", label: "Confidentialité" },
  { id: "cgu", label: "CGU" },
  { id: "mentions", label: "Mentions" },
];

export function LegalScreen() {
  const [tab, setTab] = useState<Tab>("confidentialite");

  return (
    <ScreenShell title="Informations légales">
      <div role="tablist" className="mb-3 flex gap-1 rounded-lg bg-black/30 p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`legaltab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls="legal-panel"
            onClick={() => setTab(t.id)}
            className={[
              "min-h-11 flex-1 rounded-md py-2 text-sm font-semibold transition",
              tab === t.id ? "bg-yellow-400 text-emerald-950" : "text-white/80 hover:bg-white/10",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        key={tab}
        id="legal-panel"
        role="tabpanel"
        aria-labelledby={`legaltab-${tab}`}
        className="animate-pop space-y-3 text-sm leading-relaxed text-white/85"
      >
        {tab === "confidentialite" && <Privacy />}
        {tab === "cgu" && <Cgu />}
        {tab === "mentions" && <Mentions />}
      </div>
    </ScreenShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
      <h2 className="mb-1 font-bold text-white/90">{title}</h2>
      <div className="space-y-1.5">{children}</div>
    </section>
  );
}

function Privacy() {
  return (
    <>
      <p className="text-white/60">Dernière mise à jour : {new Date().getFullYear()}</p>
      <Section title="En bref">
        <p>
          Coincheur est <b>local-first</b> : par défaut, tes données (réglages, parties,
          progression) restent <b>sur ton appareil</b> et ne sont envoyées à personne. Aucune
          publicité, aucun traceur, aucune revente de données.
        </p>
      </Section>
      <Section title="Données stockées localement">
        <p>
          Nous utilisons le stockage de ton navigateur/appareil pour : tes réglages de jeu, ton
          historique de donnes (pour la review), tes statistiques et ton prénom d'affichage. Tu peux
          tout effacer en vidant les données du site ou via « Réinitialiser » dans l'app.
        </p>
      </Section>
      <Section title="Compte & synchronisation (optionnel)">
        <p>
          Si, à l'avenir, tu crées un compte (Google / Apple) pour synchroniser ta progression, nous
          ne stockerons que le strict nécessaire (identifiant du compte et tes données de jeu). La
          connexion via Apple/Google se fait chez ces fournisseurs ; nous ne voyons jamais ton mot de
          passe.
        </p>
      </Section>
      <Section title="Tes droits (RGPD)">
        <p>
          Tu peux accéder à tes données, les corriger ou les supprimer à tout moment. Pour toute
          demande : <b>contact@coincheur.fr</b>.
        </p>
      </Section>
    </>
  );
}

function Cgu() {
  return (
    <>
      <Section title="Objet">
        <p>
          Les présentes conditions régissent l'utilisation de l'application Coincheur (jeu de Coinche
          et outils d'entraînement). En utilisant l'app, tu acceptes ces conditions.
        </p>
      </Section>
      <Section title="Utilisation">
        <p>
          Coincheur est fourni pour un usage personnel et de loisir. Tu t'engages à ne pas en
          détourner le fonctionnement ni à porter atteinte au service.
        </p>
      </Section>
      <Section title="Propriété intellectuelle">
        <p>
          L'application, son code, ses textes et son design sont protégés. La Coinche est un jeu du
          domaine public ; les contenus pédagogiques restent la propriété de l'éditeur.
        </p>
      </Section>
      <Section title="Responsabilité">
        <p>
          L'app est fournie « en l'état », sans garantie d'absence d'erreurs. L'éditeur ne saurait
          être tenu responsable d'un dommage lié à son utilisation.
        </p>
      </Section>
      <Section title="Évolutions">
        <p>Ces conditions peuvent évoluer ; la version en vigueur est celle affichée dans l'app.</p>
      </Section>
    </>
  );
}

function Mentions() {
  return (
    <>
      <Section title="Éditeur">
        <p>
          Coincheur.
          <br />
          Contact : <b>contact@coincheur.fr</b>.
        </p>
      </Section>
      <Section title="Hébergement">
        <p>
          Site hébergé via GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco,
          CA 94107, USA). À mettre à jour si l'hébergeur change.
        </p>
      </Section>
      <Section title="Crédits">
        <p>Application web progressive (PWA). Règles de la Coinche : domaine public.</p>
      </Section>
    </>
  );
}
