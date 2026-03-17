<script>
  import { notes } from '$lib/stores/notes.js';

  export let questionId;

  let text = $notes[questionId] || '';
  let saved = false;
  let timer;

  function handleInput() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      notes.save(questionId, text);
      saved = true;
      setTimeout(() => (saved = false), 1500);
    }, 600); // debounce 600ms
  }

  function clear() {
    text = '';
    notes.delete(questionId);
  }

  // When question changes, load its note
  $: {
    questionId;
    text = $notes[questionId] || '';
  }
</script>

<div class="note-wrap">
  <div class="note-header">
    <span class="mono label">// your note</span>
    {#if saved}
      <span class="saved mono">saved ✓</span>
    {/if}
    {#if text}
      <button class="clear-btn" on:click={clear}>clear</button>
    {/if}
  </div>
  <textarea
    bind:value={text}
    on:input={handleInput}
    placeholder="Add a note — e.g. 'review STP states' or 'remember: DHCP snooping ≠ port security'"
    rows="3"
    class="note-textarea"
  ></textarea>
</div>

<style>
  .note-wrap {
    margin-top: 1rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    animation: fadeIn 0.15s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .note-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.4rem 0.85rem;
    background: rgba(210, 153, 34, 0.05);
    border-bottom: 1px solid var(--border);
  }

  .label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--warning);
    flex: 1;
  }

  .saved {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--correct);
  }

  .clear-btn {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-muted);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .clear-btn:hover {
    color: var(--incorrect);
  }

  .note-textarea {
    width: 100%;
    padding: 0.75rem 0.9rem;
    background: var(--bg);
    color: var(--text);
    border: none;
    outline: none;
    font-family: var(--font-mono);
    font-size: 0.82rem;
    line-height: 1.6;
    resize: vertical;
    min-height: 70px;
  }

  .note-textarea::placeholder {
    color: var(--text-muted);
  }
</style>
