import { useEffect, lazy, Suspense } from "react";
import { useNav } from "./app/nav";
import { WelcomeScreen } from "./app/WelcomeScreen";
import { Home } from "./app/Home";
import { PlayScreen } from "./app/PlayScreen";
import { InstallBanner } from "./components/InstallBanner";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { RatePrompt } from "./components/RatePrompt";
import { WhatsNew } from "./components/WhatsNew";
import { ConsentBanner } from "./components/ConsentBanner";
import { unlockAudio } from "./state/feedback";

// Écrans secondaires en chargement différé (code-splitting) : le bundle initial
// ne contient que l'accueil + la partie ; le reste se charge à la demande, et
// reste dispo hors-ligne une fois mis en cache par le service worker.
const ExercisesScreen = lazy(() =>
  import("./training/ExercisesScreen").then((m) => ({ default: m.ExercisesScreen })),
);
const ReviewMyGamesScreen = lazy(() =>
  import("./training/ReviewMyGamesScreen").then((m) => ({ default: m.ReviewMyGamesScreen })),
);
const LessonsScreen = lazy(() =>
  import("./training/LessonsScreen").then((m) => ({ default: m.LessonsScreen })),
);
const GuidesScreen = lazy(() =>
  import("./training/GuidesScreen").then((m) => ({ default: m.GuidesScreen })),
);
const StatsScreen = lazy(() =>
  import("./training/StatsScreen").then((m) => ({ default: m.StatsScreen })),
);
const AccountScreen = lazy(() =>
  import("./app/AccountScreen").then((m) => ({ default: m.AccountScreen })),
);
const LegalScreen = lazy(() =>
  import("./app/LegalScreen").then((m) => ({ default: m.LegalScreen })),
);
const AboutScreen = lazy(() =>
  import("./app/AboutScreen").then((m) => ({ default: m.AboutScreen })),
);
const DailyScreen = lazy(() =>
  import("./training/DailyScreen").then((m) => ({ default: m.DailyScreen })),
);
const CompteurScreen = lazy(() =>
  import("./training/CompteurScreen").then((m) => ({ default: m.CompteurScreen })),
);

function CurrentView() {
  const view = useNav((s) => s.view);

  switch (view) {
    case "welcome":
      return <WelcomeScreen />;
    case "play":
      return <PlayScreen />;
    case "exercises":
      return <ExercisesScreen />;
    case "mygames":
      return <ReviewMyGamesScreen />;
    case "lessons":
      return <LessonsScreen />;
    case "guides":
      return <GuidesScreen />;
    case "stats":
      return <StatsScreen />;
    case "account":
      return <AccountScreen />;
    case "legal":
      return <LegalScreen />;
    case "about":
      return <AboutScreen />;
    case "daily":
      return <DailyScreen />;
    case "compteur":
      return <CompteurScreen />;
    default:
      return <Home />;
  }
}

export default function App() {
  const view = useNav((s) => s.view);
  // Pas de bannière d'install pendant l'onboarding ni en pleine partie.
  const showInstall = view !== "welcome" && view !== "play";

  // Débloque l'audio iOS au tout premier geste de l'utilisateur.
  useEffect(() => {
    const unlock = () => unlockAudio();
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
  }, []);

  return (
    <div className="flex h-full flex-col">
      {showInstall && <InstallBanner />}
      <div className="min-h-0 flex-1">
        <Suspense fallback={<div className="grid h-full place-items-center text-white/40">…</div>}>
          <CurrentView />
        </Suspense>
      </div>
      <OfflineIndicator />
      {view === "home" && <RatePrompt />}
      <WhatsNew />
      <ConsentBanner />
    </div>
  );
}
