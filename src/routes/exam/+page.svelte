<script>
  import { goto } from '$app/navigation';
  import QuestionCard from '$lib/components/QuestionCard.svelte';
  import Timer from '$lib/components/Timer.svelte';
  import ResultsSummary from '$lib/components/ResultsSummary.svelte';
  import { seedQuestions } from '$lib/data/questions.js';
  import { progress } from '$lib/stores/progress.js';
  import { answers, timeRemaining, resetQuiz } from '$lib/stores/quiz.js';

  // Shuffle helper
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Exam uses seed questions (up to 90; we have 15 for now)
  let examQuestions = shuffle(seedQuestions);
  let idx = 0;
  let examAnswers = {};
  let done = false;

  resetQuiz();
  timeRemaining.set(5400); // 90 min

  $: question = examQuestions[idx] ?? null;
  $: hasNext = idx < examQuestions.length - 1;
  $: hasPrev = idx > 0;
  $: answeredCount = Object.keys(examAnswers).length;

  function handleAnswer(e) {
    examAnswers = { ...examAnswers, [e.detail.questionId]: e.detail.selected };
    progress.record(e.detail.questionId, e.detail.correct);
  }

  function next() { if (hasNext) idx++; }
  function prev() { if (hasPrev) idx--; }

  function submit() { done = true; }

  function timesUp() { done = true; }

  function retry() {
    examQuestions = shuffle(seedQuestions);
    idx = 0;
    examAnswers = {};
    done = false;
    timeRemaining.set(5400);
  }
</script>

<svelte:head>
  <title>Exam Mode · Net+ Prep</title>
</svelte:head>

{#if done}
  <ResultsSummary
    questions={examQuestions}
    answers={examAnswers}
    on:retry={retry}
    on:home={() => goto('/')}
  />
{:else}
  <div class="exam-header">
    <div>
      <h1>Exam Mode</h1>
      <p class="sub mono">{idx + 1} / {examQuestions.length} · {answeredCount} answered</p>
    </div>
    <Timer on:timesup={timesUp} />
  </div>

  {#if question}
    <QuestionCard {question} drillMode={false} on:answer={handleAnswer}>
      <div slot="actions" class="nav-actions">
        <button class="btn" on:click={prev} disabled={!hasPrev}>← Prev</button>
        <button class="btn" on:click={next} disabled={!hasNext}>Next →</button>
      </div>
    </QuestionCard>
  {/if}

  <div class="exam-footer">
    <span class="mono hint">{examQuestions.length - answeredCount} unanswered</span>
    <button class="btn btn-primary" on:click={submit}>
      Submit Exam
    </button>
  </div>
{/if}

<style>
  .exam-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.75rem;
  }

  h1 { font-size: 1.6rem; margin-bottom: 0.15rem; }

  .sub {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .nav-actions {
    display: flex;
    gap: 0.5rem;
  }

  .exam-footer {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1.25rem;
  }

  .hint {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-muted);
  }
</style>
