<script>
  import { progress } from '$lib/stores/progress.js';
  import { seedQuestions, domains } from '$lib/data/questions.js';

  $: stats = domains.map((domain) => {
    const qs = seedQuestions.filter((q) => q.domain === domain);
    let correct = 0, incorrect = 0, seen = 0;
    for (const q of qs) {
      const entry = $progress[q.id];
      if (entry) {
        correct += entry.correct;
        incorrect += entry.incorrect;
        seen++;
      }
    }
    const attempts = correct + incorrect;
    const pct = attempts ? Math.round((correct / attempts) * 100) : null;
    return { domain, correct, incorrect, seen, total: qs.length, pct };
  });

  $: totalCorrect = stats.reduce((s, d) => s + d.correct, 0);
  $: totalIncorrect = stats.reduce((s, d) => s + d.incorrect, 0);
  $: totalAttempts = totalCorrect + totalIncorrect;
  $: overallPct = totalAttempts ? Math.round((totalCorrect / totalAttempts) * 100) : null;
</script>

<div class="dashboard">
  <div class="overview card">
    <div class="overview-stat">
      <span class="val mono">{totalAttempts}</span>
      <span class="lbl">attempts</span>
    </div>
    <div class="overview-stat">
      <span class="val mono correct-text">{totalCorrect}</span>
      <span class="lbl">correct</span>
    </div>
    <div class="overview-stat">
      <span class="val mono incorrect-text">{totalIncorrect}</span>
      <span class="lbl">incorrect</span>
    </div>
    <div class="overview-stat">
      <span class="val mono accent-text">{overallPct !== null ? overallPct + '%' : '—'}</span>
      <span class="lbl">accuracy</span>
    </div>
  </div>

  <div class="domain-rows">
    {#each stats as s}
      <div class="domain-row card">
        <div class="domain-name">{s.domain}</div>
        <div class="domain-bar-wrap">
          <div class="domain-bar">
            {#if s.pct !== null}
              <div class="fill" style="width: {s.pct}%; background: {s.pct >= 70 ? 'var(--correct)' : s.pct >= 50 ? 'var(--warning)' : 'var(--incorrect)'}"></div>
            {/if}
          </div>
          <span class="pct mono">{s.pct !== null ? s.pct + '%' : '—'}</span>
        </div>
        <div class="domain-meta">
          <span class="mono">{s.correct}✓ {s.incorrect}✗</span>
          <span class="seen">{s.seen}/{s.total} questions seen</span>
        </div>
      </div>
    {/each}
  </div>

  <button class="btn btn-danger" on:click={() => progress.reset()}>Reset All Progress</button>
</div>

<style>
  .dashboard {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .overview {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    text-align: center;
  }

  @media (max-width: 500px) {
    .overview { grid-template-columns: repeat(2, 1fr); }
  }

  .overview-stat {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .val {
    font-size: 1.6rem;
    font-weight: 600;
    font-family: var(--font-mono);
  }

  .lbl {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .correct-text { color: var(--correct); }
  .incorrect-text { color: var(--incorrect); }
  .accent-text { color: var(--accent); }

  .domain-rows {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .domain-row {
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .domain-name {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .domain-bar-wrap {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .domain-bar {
    flex: 1;
    height: 6px;
    background: var(--border);
    border-radius: 3px;
    overflow: hidden;
  }

  .fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.4s ease;
  }

  .pct {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    min-width: 3.5ch;
    text-align: right;
    color: var(--text-muted);
  }

  .domain-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
    color: var(--text-muted);
  }
</style>
