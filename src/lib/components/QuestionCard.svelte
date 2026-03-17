<script>
  import ExplanationPanel from './ExplanationPanel.svelte';
  import { createEventDispatcher } from 'svelte';

  export let question;
  export let drillMode = false; // enables reveal explanation button

  const dispatch = createEventDispatcher();

  let selected = null;
  let explanationVisible = false;

  $: answered = selected !== null;
  $: correct = answered && selected === question.answer;

  function selectOption(letter) {
    if (answered) return;
    selected = letter;
    dispatch('answer', { questionId: question.id, selected, correct: selected === question.answer });
  }

  function optionClass(letter) {
    if (!answered) return 'option';
    if (letter === question.answer) return 'option correct';
    if (letter === selected) return 'option incorrect';
    return 'option dim';
  }

  function letterOf(opt) {
    return opt.charAt(0); // "A" from "A. Foo"
  }

  // Reset state when question changes
  $: if (question) {
    selected = null;
    explanationVisible = false;
  }
</script>

<div class="card question-card">
  <div class="meta">
    <span class="tag">{question.domain}</span>
  </div>

  <p class="question-text">{question.question}</p>

  <div class="options">
    {#each question.options as opt}
      {@const letter = letterOf(opt)}
      <button
        class={optionClass(letter)}
        on:click={() => selectOption(letter)}
        disabled={answered && letter !== selected && letter !== question.answer}
      >
        <span class="letter mono">{letter}</span>
        <span class="option-text">{opt.slice(3)}</span>
        {#if answered && letter === question.answer}
          <span class="badge correct-badge">✓</span>
        {:else if answered && letter === selected && letter !== question.answer}
          <span class="badge incorrect-badge">✗</span>
        {/if}
      </button>
    {/each}
  </div>

  {#if answered}
    <div class="post-answer">
      {#if drillMode}
        <button
          class="btn reveal-btn"
          on:click={() => (explanationVisible = !explanationVisible)}
        >
          {explanationVisible ? 'Hide' : 'Reveal'} Explanation
        </button>
      {/if}

      <slot name="actions" />
    </div>

    {#if drillMode}
      <ExplanationPanel explanation={question.explanation} show={explanationVisible} />
    {/if}
  {/if}
</div>

<style>
  .question-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.75rem;
  }

  .meta {
    margin-bottom: 1rem;
  }

  .question-text {
    font-size: 1.05rem;
    line-height: 1.65;
    margin-bottom: 1.5rem;
    color: var(--text);
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text);
    text-align: left;
    font-size: 0.9rem;
    transition: border-color 0.15s, background 0.15s;
    cursor: pointer;
    position: relative;
  }

  .option:hover:not(:disabled) {
    border-color: var(--accent);
    background: rgba(88, 166, 255, 0.06);
  }

  .option:disabled {
    cursor: default;
  }

  .option.correct {
    border-color: var(--correct);
    background: rgba(63, 185, 80, 0.1);
  }

  .option.incorrect {
    border-color: var(--incorrect);
    background: rgba(248, 81, 73, 0.1);
  }

  .option.dim {
    opacity: 0.45;
  }

  .letter {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 600;
    min-width: 1.25rem;
    color: var(--text-muted);
  }

  .option-text {
    flex: 1;
  }

  .badge {
    margin-left: auto;
    font-size: 0.85rem;
    font-weight: 700;
    font-family: var(--font-mono);
  }

  .correct-badge {
    color: var(--correct);
  }

  .incorrect-badge {
    color: var(--incorrect);
  }

  .post-answer {
    margin-top: 1.25rem;
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .reveal-btn {
    font-size: 0.8rem;
    padding: 0.45rem 0.9rem;
    border-color: var(--accent);
    color: var(--accent);
  }

  .reveal-btn:hover {
    background: rgba(88, 166, 255, 0.1);
  }

  .mono {
    font-family: var(--font-mono);
  }
</style>
