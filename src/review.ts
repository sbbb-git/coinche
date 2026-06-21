// Demande de notation « intelligente » (table stakes) : on ne sollicite qu'APRÈS
// quelques parties, UNE seule fois, et on filtre (les mécontents vont vers le
// feedback, pas vers une mauvaise note publique).

const KEY = "coincheur.review.v1";

interface ReviewState {
  plays: number; // parties terminées
  asked: boolean; // prompt déjà montré (ne pas reharceler)
  done: boolean; // a noté / a donné son avis
}

function load(): ReviewState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { plays: 0, asked: false, done: false };
    const p = JSON.parse(raw) as Partial<ReviewState>;
    return { plays: p.plays ?? 0, asked: !!p.asked, done: !!p.done };
  } catch {
    return { plays: 0, asked: false, done: false };
  }
}

function save(s: ReviewState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

export const review = {
  recordPlay() {
    const s = load();
    save({ ...s, plays: s.plays + 1 });
  },
  /** Doit-on proposer de noter ? (après 2 parties, jamais re-sollicité). */
  shouldAsk(): boolean {
    const s = load();
    return !s.asked && !s.done && s.plays >= 2;
  },
  markAsked() {
    save({ ...load(), asked: true });
  },
  markDone() {
    save({ ...load(), asked: true, done: true });
  },
};
