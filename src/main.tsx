import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ErrorBoundary } from "./app/ErrorBoundary";
import { loadAds } from "./ads";

// Visiteur déjà consentant lors d'une visite précédente : on (re)charge la pub.
loadAds();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
