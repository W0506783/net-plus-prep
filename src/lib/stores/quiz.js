import { writable, derived } from 'svelte/store';

export const mode = writable(null); // 'drill' | 'exam'
export const questions = writable([]);
export const currentIndex = writable(0);
export const answers = writable({}); // { questionId: 'A' }
export const timeRemaining = writable(5400); // 90 min in seconds

export const currentQuestion = derived(
  [questions, currentIndex],
  ([$questions, $currentIndex]) => $questions[$currentIndex] ?? null
);

export const score = derived([questions, answers], ([$questions, $answers]) => {
  const total = $questions.length;
  const correct = $questions.filter((q) => $answers[q.id] === q.answer).length;
  return { correct, total, pct: total ? Math.round((correct / total) * 100) : 0 };
});

export function resetQuiz() {
  questions.set([]);
  currentIndex.set(0);
  answers.set({});
  timeRemaining.set(5400);
}
