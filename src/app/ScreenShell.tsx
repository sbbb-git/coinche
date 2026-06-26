import { useNav } from "./nav";
import { useT } from "../i18n";

export function ScreenShell({
  title,
  children,
  onBack,
}: {
  title: string;
  children: React.ReactNode;
  /** action du bouton retour ; par défaut, retour à l'accueil */
  onBack?: () => void;
}) {
  const navBack = useNav((s) => s.back);
  const back = onBack ?? navBack;
  const t = useT();
  return (
    <div className="safe-x mx-auto flex h-full w-full max-w-md flex-col">
      <header className="safe-top flex items-center gap-2 px-3 pt-2 pb-2">
        <button
          onClick={back}
          aria-label={t("shell.back")}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white/80 hover:bg-white/10"
        >
          ←
        </button>
        <h1 className="min-w-0 flex-1 truncate text-lg font-bold">{title}</h1>
      </header>
      <div className="safe-bottom min-h-0 flex-1 overflow-y-auto px-4 pb-4">{children}</div>
    </div>
  );
}
