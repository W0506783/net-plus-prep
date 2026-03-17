<script>
  import { domains } from '$lib/data/questions.js';
  import { createEventDispatcher } from 'svelte';

  export let selected = 'All';

  const dispatch = createEventDispatcher();
  const options = ['All', ...domains];

  function pick(domain) {
    selected = domain;
    dispatch('change', domain);
  }
</script>

<div class="filter-bar">
  <span class="label mono">domain:</span>
  <div class="chips">
    {#each options as d}
      <button
        class="chip"
        class:active={selected === d}
        on:click={() => pick(d)}
      >
        {d}
      </button>
    {/each}
  </div>
</div>

<style>
  .filter-bar {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
    padding-top: 0.35rem;
    white-space: nowrap;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

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

  .chip:hover {
    border-color: var(--accent);
    color: var(--text);
  }

  .chip.active {
    background: rgba(88, 166, 255, 0.15);
    border-color: var(--accent);
    color: var(--accent);
    font-weight: 500;
  }
</style>
