import { writable, get } from 'svelte/store';
import { seedQuestions } from '$lib/data/questions.js';

const STORAGE_KEY = 'netplus_question_bank';

function createQuestionBank() {
  // Load from localStorage, fall back to seed questions
  function load() {
    if (typeof localStorage === 'undefined') return seedQuestions;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedQuestions;
    try {
      const saved = JSON.parse(raw);
      // Merge: always include seed questions (by id), append any generated ones
      const seedIds = new Set(seedQuestions.map((q) => q.id));
      const generated = saved.filter((q) => !seedIds.has(q.id));
      return [...seedQuestions, ...generated];
    } catch {
      return seedQuestions;
    }
  }

  const { subscribe, set, update } = writable(load());

  function persist(questions) {
    if (typeof localStorage !== 'undefined') {
      // Only persist generated questions — seeds come from source
      const seedIds = new Set(seedQuestions.map((q) => q.id));
      const generated = questions.filter((q) => !seedIds.has(q.id));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(generated));
    }
  }

  return {
    subscribe,
    addGenerated(newQuestions) {
      update((current) => {
        const existingIds = new Set(current.map((q) => q.id));
        const toAdd = newQuestions.filter((q) => !existingIds.has(q.id));
        const next = [...current, ...toAdd];
        persist(next);
        return next;
      });
    },
    getByDomain(domain) {
      const all = get({ subscribe });
      return domain === 'All' ? all : all.filter((q) => q.domain === domain);
    },
    clearGenerated() {
      localStorage.removeItem(STORAGE_KEY);
      set([...seedQuestions]);
    }
  };
}

export const questionBank = createQuestionBank();
