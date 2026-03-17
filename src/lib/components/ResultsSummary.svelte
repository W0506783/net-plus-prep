<script>
  import { domains } from '$lib/data/questions.js';
  import { createEventDispatcher } from 'svelte';

  export let questions = [];
  export let answers = {};

  const dispatch = createEventDispatcher();

  $: total = questions.length;
  $: correct = questions.filter((q) => answers[q.id] === q.answer).length;
  $: pct = total ? Math.round((correct / total) * 100) : 0;
  $: passed = pct >= 72; // CompTIA passing score is ~720/900 (~72%)

  $: byDomain = domains.map((domain) => {
    const qs = questions.filter((q) => q.domain === domain);
    const c = qs.filter((q) => answers[q.id] === q.answer).length;
    return { domain, correct: c, total: qs.length, pct: qs.length ? Math.round((c / qs.length) * 100) : null };
  }).filter((d) => d.total > 0);
</script>

<div class="summary">
  <div class="hero card" class:pass={passed} class:fail={!passed}>
    <div class="score mono">{pct}%</div>
    <div class="verdict">{passed ? 'PASS' : 'FAIL'}</div>
    <div class="sub">{correct} of {total} correct · passing score ≥72%</div>
  </div>

  <div class="domains card">
    <h3 class="section-title mono">// by domain</h3>
    {#each byDomain as d}
      <div class="domain-row">
        <span class="domain-name">{d.domain}</span>
        <div class="bar-wrap">
          <div class="bar">
            <div
              class="fill"
              style="width: {d.pct ?? 0}%; background: {(d.pct ?? 0) >= 70 ? 'var(--correct)' : (d.pct ?? 0) >= 50 ? 'var(--warning)' : 'var(--incorrect)'}"
            ></div>
          </div>
          <span class="pct mono">{d.pct !== null ? d.pct + '%' : '—'}</span>
          <span class="counts">{d.correct}/{d.total}</span>
        </div>
      </div>
    {/each}
  </div>

  <div class="actions">
    <button class="btn btn-primary" on:click={() => dispatch('retry')}>Try Again</button>
    <button class="btn" on:click={() => dispatch('home')}>Home</button>
  </div>
</div>

<style>
  .summary {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .hero {
    text-align: center;
    padding: 2.5rem 1.5rem;
  }

  .hero.pass {
    border-color: var(--correct);
    background: rgba(63, 185, 80, 0.06);
  }

  .hero.fail {
    border-color: var(--incorrect);
    background: rgba(248, 81, 73, 0.06);
  }

  .score {
    font-family: var(--font-mono);
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .pass .score { color: var(--correct); }
  .fail .score { color: var(--incorrect); }

  .verdict {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }

  .sub {
    font-size: 0.875rem;
    color: var(--text-muted);
  }

  .domains {
    padding: 1.25rem;
  }

  .section-title {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
    margin-bottom: 1rem;
  }

  .domain-row {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    margin-bottom: 0.85rem;
  }

  .domain-name {
    font-size: 0.85rem;
    font-weight: 500;
  }

  .bar-wrap {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .bar {
    flex: 1;
    height: 6px;
    background: var(--border);
    border-radius: 3px;
    overflow: hidden;
  }

  .fill {
    height: 100%;
    border-radius: 3px;
  }

  .pct {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    min-width: 3.5ch;
    text-align: right;
    color: var(--text-muted);
  }

  .counts {
    font-size: 0.75rem;
    color: var(--text-muted);
    min-width: 4ch;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
  }
</style>
