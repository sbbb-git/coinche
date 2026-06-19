import { Component, ReactNode } from "react";

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
      return (
        <div className="safe-top safe-bottom grid h-full place-items-center p-6 text-center">
          <div className="max-w-sm">
            <div className="mb-3 text-5xl" aria-hidden>
              😬
            </div>
            <h1 className="text-xl font-bold">Oups, un souci est survenu</h1>
            <p className="mt-2 text-sm text-white/70">
              L'app a rencontré une erreur inattendue. Tes données sont sauvegardées.
            </p>
            <button
              onClick={() => location.reload()}
              className="mt-5 rounded-xl bg-yellow-400 px-5 py-2.5 font-bold text-emerald-950 hover:bg-yellow-300"
            >
              Recharger
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
