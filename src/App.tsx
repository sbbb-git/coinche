import { useEffect } from "react";
import { useNav } from "./app/nav";
import { WelcomeScreen } from "./app/WelcomeScreen";
import { Home } from "./app/Home";
import { PlayScreen } from "./app/PlayScreen";
import { ExercisesScreen } from "./training/ExercisesScreen";
import { ReviewMyGamesScreen } from "./training/ReviewMyGamesScreen";
import { ReviewGlobalScreen } from "./training/ReviewGlobalScreen";
import { LessonsScreen } from "./training/LessonsScreen";
import { GuidesScreen } from "./training/GuidesScreen";
import { StatsScreen } from "./training/StatsScreen";
import { AccountScreen } from "./app/AccountScreen";
import { LegalScreen } from "./app/LegalScreen";
import { AboutScreen } from "./app/AboutScreen";
import { DailyScreen } from "./training/DailyScreen";
import { CompteurScreen } from "./training/CompteurScreen";
import { InstallBanner } from "./components/InstallBanner";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { RatePrompt } from "./components/RatePrompt";
import { WhatsNew } from "./components/WhatsNew";
import { unlockAudio } from "./state/feedback";

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
    case "review":
      return <ReviewGlobalScreen />;
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
        <CurrentView />
      </div>
      <OfflineIndicator />
      {view === "home" && <RatePrompt />}
      <WhatsNew />
    </div>
  );
}
