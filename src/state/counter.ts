import { create } from "zustand";
import { CounterDeal, CounterState, storage } from "../storage";

interface CounterStore {
  state: CounterState;
  totals: () => [number, number];
  setName: (i: 0 | 1, name: string) => void;
  setTarget: (t: number) => void;
  addDeal: (d: CounterDeal) => void;
  undo: () => void;
  reset: () => void;
}

function persist(set: (s: { state: CounterState }) => void, state: CounterState) {
  storage.saveCounter(state);
  set({ state });
}

export const useCounter = create<CounterStore>((set, get) => ({
  state: storage.loadCounter(),
  totals: () => {
    const d = get().state.deals;
    return d.reduce<[number, number]>((acc, x) => [acc[0] + x.scores[0], acc[1] + x.scores[1]], [0, 0]);
  },
  setName: (i, name) => {
    const s = get().state;
    const names: [string, string] = [...s.names];
    names[i] = name;
    persist(set, { ...s, names });
  },
  setTarget: (target) => persist(set, { ...get().state, target }),
  addDeal: (d) => persist(set, { ...get().state, deals: [...get().state.deals, d] }),
  undo: () => persist(set, { ...get().state, deals: get().state.deals.slice(0, -1) }),
  reset: () => persist(set, { ...get().state, deals: [] }),
}));
