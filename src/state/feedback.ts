// Retour sensoriel léger : sons synthétisés (Web Audio, aucun asset) + haptique.
// Tolérant : ne fait rien si l'API n'est pas dispo ou si désactivé.
// Haptique : utilise le plugin natif Capacitor Haptics (vrai moteur haptique iOS,
// que la Web Vibration API ne couvre PAS sur iOS), avec repli sur navigator.vibrate
// pour le web/Android. Détection au runtime via le global Capacitor : aucune
// dépendance au build, le repli reste propre si le plugin n'est pas installé.

let ctx: AudioContext | null = null;
function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const Ctor =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    if (ctx && ctx.state === "closed") ctx = null; // contexte mort : on le recrée
    if (!ctx) ctx = new Ctor();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, durMs: number, type: OscillatorType = "sine", gain = 0.05) {
  const ac = audio();
  if (!ac) return;
  try {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.value = gain;
    osc.connect(g);
    g.connect(ac.destination);
    const t = ac.currentTime;
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + durMs / 1000);
    osc.start(t);
    osc.stop(t + durMs / 1000);
  } catch {
    /* ignore */
  }
}

type ImpactStyle = "LIGHT" | "MEDIUM" | "HEAVY";
type NotifyType = "SUCCESS" | "WARNING" | "ERROR";

interface HapticsPlugin {
  impact?: (o: { style: ImpactStyle }) => void;
  notification?: (o: { type: NotifyType }) => void;
}

/** Plugin natif Capacitor Haptics s'il est présent (build natif). */
function nativeHaptics(): HapticsPlugin | null {
  const cap = (window as unknown as { Capacitor?: { Plugins?: { Haptics?: HapticsPlugin } } }).Capacitor;
  return cap?.Plugins?.Haptics ?? null;
}

/** Impact haptique : natif (iOS/Android) si dispo, sinon Web Vibration (Android/web). */
function impact(style: ImpactStyle, fallbackMs: number | number[]) {
  const h = nativeHaptics();
  try {
    if (h?.impact) {
      h.impact({ style });
      return;
    }
  } catch {
    /* ignore, on retombe sur la vibration web */
  }
  try {
    navigator.vibrate?.(fallbackMs);
  } catch {
    /* ignore */
  }
}

/** Notification haptique (succès/échec) : natif si dispo, sinon Web Vibration. */
function notify(type: NotifyType, fallbackMs: number | number[]) {
  const h = nativeHaptics();
  try {
    if (h?.notification) {
      h.notification({ type });
      return;
    }
  } catch {
    /* ignore */
  }
  try {
    navigator.vibrate?.(fallbackMs);
  } catch {
    /* ignore */
  }
}

export interface FeedbackPrefs {
  sound: boolean;
  haptics: boolean;
}

/** Débloque l'audio iOS : à appeler dans un geste utilisateur (1er tap). */
export function unlockAudio() {
  const ac = audio();
  if (ac && ac.state === "suspended") void ac.resume();
}

export const feedback = {
  cardPlay(p: FeedbackPrefs) {
    if (p.sound) tone(420, 60, "triangle", 0.035);
    if (p.haptics) impact("LIGHT", 8);
  },
  trickWon(p: FeedbackPrefs) {
    if (p.sound) {
      tone(540, 70, "sine", 0.04);
      setTimeout(() => tone(720, 90, "sine", 0.04), 70);
    }
    if (p.haptics) impact("MEDIUM", 18);
  },
  dealWon(p: FeedbackPrefs) {
    if (p.sound) {
      [523, 659, 784].forEach((f, i) => setTimeout(() => tone(f, 140, "sine", 0.05), i * 110));
    }
    if (p.haptics) notify("SUCCESS", [20, 40, 20]);
  },
  dealLost(p: FeedbackPrefs) {
    if (p.sound) {
      tone(330, 160, "sawtooth", 0.035);
      setTimeout(() => tone(247, 220, "sawtooth", 0.035), 150);
    }
    if (p.haptics) notify("WARNING", 30);
  },
};
