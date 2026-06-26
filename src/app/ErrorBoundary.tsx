import { Component, ReactNode } from "react";
import { translate, currentLang } from "../i18n";

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

/** Filet de sécurité : affiche un message au lieu d'un écran blanc si un composant plante. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      const t = (key: string) => translate(currentLang(), key);
      return (
        <div className="safe-top safe-bottom grid h-full place-items-center p-6 text-center">
          <div className="max-w-sm">
            <div className="mb-3 text-5xl" aria-hidden>
              😬
            </div>
            <h1 className="text-xl font-bold">{t("error.title")}</h1>
            <p className="mt-2 text-sm text-white/70">
              {t("error.desc")}
            </p>
            <button
              onClick={() => location.reload()}
              className="mt-5 rounded-xl bg-yellow-400 px-5 py-2.5 font-bold text-emerald-950 hover:bg-yellow-300"
            >
              {t("error.reload")}
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
