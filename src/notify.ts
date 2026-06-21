// Couche de notifications, branchable. Aujourd'hui : Web Notifications (permission
// + affichage quand l'app est ouverte). Le RAPPEL PLANIFIÉ quand l'app est fermée
// (« ta série expire ce soir ») nécessite le build natif : on remplacera alors
// `enable`/`schedule` par @capacitor/local-notifications, sans changer les appelants.
// Voir PRODUCT.md §1.

const OPTIN_KEY = "coincheur.notify.optin.v1";

function supported(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}

export const notify = {
  supported,
  optedIn(): boolean {
    try {
      return localStorage.getItem(OPTIN_KEY) === "1";
    } catch {
      return false;
    }
  },
  permission(): NotificationPermission | "unsupported" {
    return supported() ? Notification.permission : "unsupported";
  },
  /** Demande la permission et mémorise l'opt-in. Retourne true si accordé. */
  async enable(): Promise<boolean> {
    if (!supported()) return false;
    let p = Notification.permission;
    if (p === "default") p = await Notification.requestPermission();
    const ok = p === "granted";
    try {
      if (ok) localStorage.setItem(OPTIN_KEY, "1");
    } catch {
      /* ignore */
    }
    return ok;
  },
  disable(): void {
    try {
      localStorage.removeItem(OPTIN_KEY);
    } catch {
      /* ignore */
    }
  },
  /** Affiche une notification immédiate (si permission accordée). */
  show(title: string, body: string): void {
    if (supported() && Notification.permission === "granted") {
      try {
        new Notification(title, { body, icon: "icon-192.png" });
      } catch {
        /* ignore */
      }
    }
  },
};

/**
 * Programme un rappel quotidien NATIF (« ta série t'attend ») — ne fonctionne
 * qu'en build Capacitor. Sur le web, no-op (le navigateur ne peut pas planifier
 * une notif quand l'app est fermée). L'import est dynamique et ignoré par Vite
 * pour ne pas casser le build web tant que le plugin n'est pas installé.
 */
export async function scheduleDailyReminder(hour = 19): Promise<boolean> {
  const cap = (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor;
  if (!cap?.isNativePlatform?.()) return false;
  try {
    const mod = "@capacitor/local-notifications";
    const { LocalNotifications } = await import(/* @vite-ignore */ mod);
    const perm = await LocalNotifications.requestPermissions();
    if (perm.display !== "granted") return false;
    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1001,
          title: "🔥 Défi du jour",
          body: "Ta série t'attend — une donne rapide ?",
          schedule: { on: { hour, minute: 0 }, repeats: true },
        },
      ],
    });
    return true;
  } catch {
    return false;
  }
}
