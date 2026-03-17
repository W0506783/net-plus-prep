import { writable } from 'svelte/store';

const STORAGE_KEY = 'netplus_progress';

function createProgressStore() {
  const saved =
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      : {};

  const { subscribe, update } = writable(saved);

  return {
    subscribe,
    record(questionId, correct) {
      update((state) => {
        const entry = state[questionId] || { correct: 0, incorrect: 0 };
        const updated = {
          ...state,
          [questionId]: {
            correct: entry.correct + (correct ? 1 : 0),
            incorrect: entry.incorrect + (correct ? 0 : 1),
            lastSeen: Date.now()
          }
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    reset() {
      localStorage.removeItem(STORAGE_KEY);
      update(() => ({}));
    }
  };
}

export const progress = createProgressStore();
