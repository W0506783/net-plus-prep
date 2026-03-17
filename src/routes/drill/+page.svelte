<script>
  import QuestionCard from '$lib/components/QuestionCard.svelte';
  import DomainFilter from '$lib/components/DomainFilter.svelte';
  import { seedQuestions } from '$lib/data/questions.js';
  import { generateQuestions } from '$lib/api/generateQuestions.js';
  import { progress } from '$lib/stores/progress.js';

  let domainFilter = 'All';
  let questions = [...seedQuestions];
  let idx = 0;
  let generating = false;
  let genError = '';

  $: filtered = domainFilter === 'All'
    ? questions
    : questions.filter((q) => q.domain === domainFilter);

  $: question = filtered[idx] ?? null;
  $: hasNext = idx < filtered.length - 1;
  $: hasPrev = idx > 0;

  function handleAnswer(e) {
    progress.record(e.detail.questionId, e.detail.correct);
  }

  function next() {
    if (hasNext) idx++;
  }

  function prev() {
    if (hasPrev) idx--;
  }

  function onFilterChange(e) {
    domainFilter = e.detail;
    idx = 0;
  }

  async function fetchMore() {
    genError = '';
    generating = true;
    try {
      const domain = domainFilter === 'All' ? 'Networking Concepts' : domainFilter;
      const newQs = await generateQuestions(domain, 5);
      if (newQs.length) {
        questions = [...questions, ...newQs];
      } else {
        genError = 'No questions returned. Check your API key.';
      }
    } catch (err) {
      genError = err.message;
    } finally {
      generating = false;
    }
  }
</script>

<svelte:head>
  <title>Drill Mode · Net+ Prep</title>
</svelte:head>

<div class="page-header">
  <div>
    <h1>Drill Mode</h1>
    <p class="sub">Untimed practice · explanations enabled</p>
  </div>
  <div class="counter mono">{idx + 1} / {filtered.length}</div>
</div>

<div class="filter-wrap">
  <DomainFilter selected={domainFilter} on:change={onFilterChange} />
</div>

{#if question}
  <QuestionCard {question} drillMode={true} on:answer={handleAnswer}>
    <div slot="actions" class="nav-actions">
      <button class="btn" on:click={prev} disabled={!hasPrev}>← Prev</button>
      <button class="btn" on:click={next} disabled={!hasNext}>Next →</button>
    </div>
  </QuestionCard>
{:else}
  <div class="card empty">No questions match this filter.</div>
{/if}

<div class="ai-section">
  <h3 class="mono section-label">// generate more questions</h3>
  <p class="hint">Uses Claude API to generate new questions for the selected domain. Requires an Anthropic API key.</p>

  {#if genError}
    <div class="error-msg">{genError}</div>
  {/if}

  <button class="btn" on:click={fetchMore} disabled={generating}>
    {generating ? 'Generating...' : `Generate 5 more · ${domainFilter === 'All' ? 'Networking Concepts' : domainFilter}`}
  </button>
</div>

<style>
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }

  h1 { font-size: 1.6rem; margin-bottom: 0.15rem; }

  .sub {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .counter {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--text-muted);
    padding-top: 0.4rem;
  }

  .filter-wrap {
    margin-bottom: 1.25rem;
  }

  .nav-actions {
    display: flex;
    gap: 0.5rem;
  }

  .empty {
    text-align: center;
    color: var(--text-muted);
    padding: 2rem;
  }

  .ai-section {
    margin-top: 2.5rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .section-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
  }

  .hint {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .error-msg {
    font-size: 0.82rem;
    color: var(--incorrect);
    border: 1px solid var(--incorrect);
    padding: 0.5rem 0.75rem;
    border-radius: 5px;
    background: rgba(248, 81, 73, 0.06);
  }
</style>
