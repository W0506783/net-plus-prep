<script>
  import { notes } from '$lib/stores/notes.js';
  import { questionBank } from '$lib/stores/questionBank.js';
  import NoteInput from '$lib/components/NoteInput.svelte';
  import { marked } from 'marked';

  let expandedId = null;
  let domainFilter = 'All';

  // Questions that have a note written
  $: notedQuestions = $questionBank.filter((q) => {
    const note = $notes[q.id];
    return note && note.trim().length > 0;
  });

  $: filtered = domainFilter === 'All'
    ? notedQuestions
    : notedQuestions.filter((q) => q.domain === domainFilter);

  // Unique domains from noted questions
  $: activeDomains = [...new Set(notedQuestions.map((q) => q.domain))];

  function toggle(id) {
    expandedId = expandedId === id ? null : id;
  }
</script>

<svelte:head>
  <title>Notes · Net+ Prep</title>
</svelte:head>

<div class="page-header">
  <div>
    <h1>Notes</h1>
    <p class="sub">Questions you've annotated while drilling</p>
  </div>
  <span class="counter mono">{filtered.length} question{filtered.length !== 1 ? 's' : ''}</span>
</div>

{#if notedQuestions.length > 1}
  <div class="filter-bar">
    <span class="mono label">domain:</span>
    <div class="chips">
      <button class="chip" class:active={domainFilter === 'All'} on:click={() => (domainFilter = 'All')}>All</button>
      {#each activeDomains as d}
        <button class="chip" class:active={domainFilter === d} on:click={() => (domainFilter = d)}>{d}</button>
      {/each}
    </div>
  </div>
{/if}

{#if filtered.length === 0}
  <div class="card empty">
    <div class="empty-icon mono">//</div>
    <p>No notes yet.</p>
    <p class="hint">After answering a question in Drill Mode, a note box appears below it. Jot anything — "revisit this", "remember: DHCP snooping ≠ port security" — and it'll show up here.</p>
    <a href="/drill" class="btn">Go to Drill Mode →</a>
  </div>
{:else}
  <div class="note-list">
    {#each filtered as q (q.id)}
      {@const note = $notes[q.id]}
      <div class="note-card card" class:expanded={expandedId === q.id}>

        <!-- Header row -->
        <button class="note-row" on:click={() => toggle(q.id)}>
          <div class="note-meta">
            <span class="tag">{q.domain}</span>
            <span class="question-preview">{q.question}</span>
          </div>
          <span class="note-snippet mono">{note.slice(0, 60)}{note.length > 60 ? '…' : ''}</span>
          <span class="chevron mono">{expandedId === q.id ? '▲' : '▼'}</span>
        </button>

        {#if expandedId === q.id}
          <div class="expanded-body">
            <!-- The question -->
            <div class="q-text">{q.question}</div>

            <div class="options-mini">
              {#each q.options as opt}
                {@const letter = opt.charAt(0)}
                <div class="opt-mini" class:is-answer={letter === q.answer}>
                  <span class="mono letter">{letter}</span>
                  <span>{opt.slice(3)}</span>
                  {#if letter === q.answer}<span class="correct-mark">✓</span>{/if}
                </div>
              {/each}
            </div>

            <!-- Explanation toggle -->
            {#if q.explanation}
              <details class="explanation-details">
                <summary class="mono">show explanation</summary>
                <div class="explanation-body">
                  {@html marked.parse(q.explanation)}
                </div>
              </details>
            {/if}

            <!-- The note (editable inline) -->
            <NoteInput questionId={q.id} />
          </div>
        {/if}
      </div>
    {/each}
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
    font-size: 0.8rem;
    color: var(--text-muted);
    padding-top: 0.4rem;
  }

  /* Filter */
  .filter-bar {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 1.25rem;
  }

  .label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
    padding-top: 0.35rem;
    white-space: nowrap;
  }

  .chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }

  .chip {
    padding: 0.3rem 0.75rem;
    border-radius: 20px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-muted);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.15s;
  }

  .chip:hover { border-color: var(--accent); color: var(--text); }

  .chip.active {
    background: rgba(88, 166, 255, 0.15);
    border-color: var(--accent);
    color: var(--accent);
    font-weight: 500;
  }

  /* Empty state */
  .empty {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 2.5rem 2rem;
    color: var(--text-muted);
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .empty-icon {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    color: var(--border);
    margin-bottom: 0.25rem;
  }

  .hint { font-size: 0.82rem; }

  /* Note list */
  .note-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .note-card {
    padding: 0;
    overflow: hidden;
    transition: border-color 0.15s;
  }

  .note-card:hover {
    border-color: var(--warning);
  }

  .note-row {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: 1rem;
    padding: 0.85rem 1.1rem;
    background: none;
    border: none;
    color: var(--text);
    cursor: pointer;
    text-align: left;
  }

  .note-meta {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    min-width: 0;
  }

  .question-preview {
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-muted);
  }

  .note-snippet {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--warning);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  .chevron {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
  }

  /* Expanded body */
  .expanded-body {
    padding: 0 1.1rem 1.1rem;
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    padding-top: 1rem;
  }

  .q-text {
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .options-mini {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .opt-mini {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.82rem;
    color: var(--text-muted);
    padding: 0.3rem 0;
  }

  .opt-mini.is-answer {
    color: var(--correct);
  }

  .letter {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    min-width: 1rem;
  }

  .correct-mark {
    margin-left: auto;
    color: var(--correct);
    font-size: 0.8rem;
  }

  /* Explanation */
  .explanation-details {
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
  }

  .explanation-details summary {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
    padding: 0.5rem 0.85rem;
    cursor: pointer;
    background: rgba(88, 166, 255, 0.04);
    list-style: none;
  }

  .explanation-body {
    padding: 0.85rem 1rem;
    font-size: 0.85rem;
    line-height: 1.7;
    color: var(--text-muted);
  }

  .explanation-body :global(h2) {
    font-size: 0.85rem;
    font-family: var(--font-mono);
    color: var(--accent);
    margin: 0 0 0.4rem;
  }

  .explanation-body :global(p) { margin: 0.3rem 0; }
  .explanation-body :global(ul) { padding-left: 1.25rem; margin: 0.3rem 0; }
  .explanation-body :global(li) { margin: 0.15rem 0; }
  .explanation-body :global(strong) { color: var(--text); }
</style>
