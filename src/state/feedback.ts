// Retour sensoriel léger : sons synthétisés (Web Audio, aucun asset) + haptique.
// Tolérant : ne fait rien si l'API n'est pas dispo ou si désactivé.

let ctx: AudioContext | null = null;
function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const Ctor =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
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

function vibrate(ms: number | number[]) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* ignore */
  }
}

export interface FeedbackPrefs {
  sound: boolean;
  haptics: boolean;
}

export const feedback = {
  cardPlay(p: FeedbackPrefs) {
    if (p.sound) tone(420, 60, "triangle", 0.035);
    if (p.haptics) vibrate(8);
  },
  trickWon(p: FeedbackPrefs) {
    if (p.sound) {
      tone(540, 70, "sine", 0.04);
      setTimeout(() => tone(720, 90, "sine", 0.04), 70);
    }
    if (p.haptics) vibrate(18);
  },
  dealWon(p: FeedbackPrefs) {
    if (p.sound) {
      [523, 659, 784].forEach((f, i) => setTimeout(() => tone(f, 140, "sine", 0.05), i * 110));
    }
    if (p.haptics) vibrate([20, 40, 20]);
  },
  dealLost(p: FeedbackPrefs) {
    if (p.sound) {
      tone(330, 160, "sawtooth", 0.035);
      setTimeout(() => tone(247, 220, "sawtooth", 0.035), 150);
    }
    if (p.haptics) vibrate(30);
  },
};
