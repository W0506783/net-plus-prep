<script>
  import QuestionCard from '$lib/components/QuestionCard.svelte';
  import DomainFilter from '$lib/components/DomainFilter.svelte';
  import NoteInput from '$lib/components/NoteInput.svelte';
  import { questionBank } from '$lib/stores/questionBank.js';
  import { generateQuestions } from '$lib/api/generateQuestions.js';
  import { progress } from '$lib/stores/progress.js';

  let domainFilter = 'All';
  let idx = 0;
  let sessionAnswers = {}; // { questionId: correct }
  let generating = false;
  let genError = '';
  let done = false;

  $: filtered = domainFilter === 'All'
    ? $questionBank
    : $questionBank.filter((q) => q.domain === domainFilter);

  $: question = filtered[idx] ?? null;
  $: hasNext = idx < filtered.length - 1;
  $: hasPrev = idx > 0;

  // Session stats for end screen
  $: sessionTotal = Object.keys(sessionAnswers).length;
  $: sessionCorrect = Object.values(sessionAnswers).filter(Boolean).length;
  $: sessionPct = sessionTotal ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;

  function handleAnswer(e) {
    const { questionId, correct } = e.detail;
    progress.record(questionId, correct);
    sessionAnswers = { ...sessionAnswers, [questionId]: correct };
  }

  function next() {
    if (hasNext) {
      idx++;
    } else {
      done = true; // reached end — show session summary
    }
  }

  function prev() {
    if (hasPrev) idx--;
  }

  function onFilterChange(e) {
    domainFilter = e.detail;
    idx = 0;
    done = false;
    sessionAnswers = {};
  }

  function restart() {
    idx = 0;
    done = false;
    sessionAnswers = {};
  }

  async function fetchMore() {
    genError = '';
    generating = true;
    try {
      const domain = domainFilter === 'All' ? 'Networking Concepts' : domainFilter;
      const newQs = await generateQuestions(domain, 5);
      if (newQs.length) {
        questionBank.addGenerated(newQs);
        done = false; // go back to drilling if we were at end
      } else {
        genError = 'No questions returned. Check your API key in the Progress page.';
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
    <p class="sub">Untimed · explanations enabled · notes auto-saved</p>
  </div>
  <div class="counter mono">{done ? '—' : idx + 1} / {filtered.length}</div>
</div>

<div class="filter-wrap">
  <DomainFilter selected={domainFilter} on:change={onFilterChange} />
</div>

{#if done}
  <!-- Session complete screen -->
  <div class="session-done card">
    <div class="done-eyebrow mono">// session complete</div>
    <div class="done-score mono">{sessionPct}%</div>
    <div class="done-sub">
      {sessionCorrect} of {sessionTotal} answered correctly
      {#if sessionTotal < filtered.length}
        · {filtered.length - sessionTotal} skipped
      {/if}
    </div>

    <div class="done-actions">
      <button class="btn btn-primary" on:click={restart}>Restart from #1</button>
      <button class="btn" on:click={fetchMore} disabled={generating}>
        {generating ? 'Generating...' : '+ Generate 5 more questions'}
      </button>
    </div>

    {#if genError}
      <div class="error-msg">{genError}</div>
    {/if}
  </div>

{:else if question}
  <QuestionCard {question} drillMode={true} on:answer={handleAnswer}>
    <div slot="actions" class="nav-actions">
      <button class="btn" on:click={prev} disabled={!hasPrev}>← Prev</button>
      <button class="btn" on:click={next}>
        {hasNext ? 'Next →' : 'Finish Session →'}
      </button>
    </div>
  </QuestionCard>

  <!-- Notes appear directly below the card, always accessible after answering -->
  <NoteInput questionId={question.id} />

{:else}
  <div class="card empty">No questions match this filter.</div>
{/if}

{#if !done}
  <div class="ai-section">
    <h3 class="mono section-label">// generate more questions</h3>
    <p class="hint">
      Questions are saved permanently to your local bank.
      Requires an Anthropic API key — set it on the
      <a href="/progress">Progress page</a>.
    </p>

    {#if genError}
      <div class="error-msg">{genError}</div>
    {/if}

    <button class="btn" on:click={fetchMore} disabled={generating}>
      {generating
        ? 'Generating...'
        : `Generate 5 more · ${domainFilter === 'All' ? 'Networking Concepts' : domainFilter}`}
    </button>

    <div class="bank-info mono">
      {$questionBank.length} questions in bank
      · {$questionBank.length - 15} generated
    </div>
  </div>
{/if}

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

  /* Session done */
  .session-done {
    text-align: center;
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .done-eyebrow {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
    letter-spacing: 0.05em;
  }

  .done-score {
    font-family: var(--font-mono);
    font-size: 3rem;
    font-weight: 700;
    color: var(--text);
    line-height: 1;
  }

  .done-sub {
    font-size: 0.875rem;
    color: var(--text-muted);
  }

  .done-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0.5rem;
  }

  /* AI section */
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
    line-height: 1.5;
  }

  .bank-info {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-muted);
    margin-top: -0.25rem;
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
