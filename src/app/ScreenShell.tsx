import { useNav } from "./nav";

export function ScreenShell({ title, children }: { title: string; children: React.ReactNode }) {
  const go = useNav((s) => s.go);
  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col">
      <header className="safe-top flex items-center gap-2 px-3 pt-2 pb-2">
        <button
          onClick={() => go("home")}
          aria-label="Accueil"
          className="grid h-11 w-11 place-items-center rounded-full text-white/80 hover:bg-white/10"
        >
          ←
        </button>
        <h1 className="text-lg font-bold">{title}</h1>
      </header>
      <div className="safe-bottom min-h-0 flex-1 overflow-y-auto px-4 pb-4">{children}</div>
    </div>
  );
}
