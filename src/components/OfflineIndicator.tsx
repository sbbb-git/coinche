import { useEffect, useState } from "react";

/** Petit badge « hors-ligne » : l'app reste 100% jouable sans réseau (PWA +
 *  données locales), on rassure juste l'utilisateur sur l'état de la connexion. */
export function OfflineIndicator() {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (!offline) return null;
  return (
    <div className="pointer-events-none fixed bottom-2 left-1/2 z-40 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white/90 shadow">
      ✈️ Hors-ligne · tout reste jouable
    </div>
  );
}
