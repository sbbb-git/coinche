import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ErrorBoundary } from "./app/ErrorBoundary";
import { loadAds } from "./ads";
import { loadAnalytics } from "./analytics";
import { currentLang } from "./i18n";

// <html lang> aligné sur la langue détectée dès le chargement (SEO / a11y).
if (typeof document !== "undefined") document.documentElement.lang = currentLang();

// Visiteur déjà consentant lors d'une visite précédente : on (re)charge mesure
// d'audience et pub (no-op si pas de consentement ou pas configuré).
loadAnalytics();
loadAds();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
