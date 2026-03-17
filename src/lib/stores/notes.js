import { writable } from 'svelte/store';

const STORAGE_KEY = 'netplus_notes';

function createNotesStore() {
  const saved =
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      : {};

  const { subscribe, update } = writable(saved);

  return {
    subscribe,
    save(questionId, text) {
      update((state) => {
        const next = { ...state, [questionId]: text };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    delete(questionId) {
      update((state) => {
        const next = { ...state };
        delete next[questionId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    get(questionId) {
      if (typeof localStorage === 'undefined') return '';
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return '';
      try {
        return JSON.parse(raw)[questionId] || '';
      } catch {
        return '';
      }
    }
  };
}

export const notes = createNotesStore();
