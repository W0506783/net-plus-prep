<script>
  import { domains } from '$lib/data/questions.js';
</script>

<svelte:head>
  <title>Net+ Prep</title>
</svelte:head>

<section class="hero">
  <div class="eyebrow mono">CompTIA Network+ (N10-009)</div>
  <h1>Net+ Prep</h1>
  <p class="subtitle">Two modes. 15 seed questions. Claude-powered question generation.</p>
</section>

<div class="mode-grid">
  <a href="/drill" class="mode-card card">
    <div class="mode-icon mono">[D]</div>
    <h2>Drill Mode</h2>
    <p>Untimed practice with explanations. Filter by domain. See why you got it wrong.</p>
    <span class="btn btn-primary mode-btn">Start Drilling →</span>
  </a>

  <a href="/exam" class="mode-card card">
    <div class="mode-icon mono">[E]</div>
    <h2>Exam Mode</h2>
    <p>90 minutes. 90 questions. No hints. Score breakdown by domain at the end.</p>
    <span class="btn mode-btn">Start Exam →</span>
  </a>
</div>

<div class="domains-section">
  <h3 class="section-label mono">// 5 exam domains</h3>
  <div class="domain-list">
    {#each domains as domain, i}
      <div class="domain-item">
        <span class="mono muted">{String(i + 1).padStart(2, '0')}</span>
        <span>{domain}</span>
      </div>
    {/each}
  </div>
</div>

<div class="footer-links">
  <a href="/progress">View Progress →</a>
</div>

<style>
  .hero {
    margin-bottom: 3rem;
  }

  .eyebrow {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: 0.5rem;
    color: var(--text);
  }

  .subtitle {
    color: var(--text-muted);
    font-size: 1rem;
  }

  .mode-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 600px) {
    .mode-grid { grid-template-columns: 1fr; }
  }

  .mode-card {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 1.5rem;
    color: var(--text);
    transition: border-color 0.15s;
    text-decoration: none;
  }

  .mode-card:hover {
    border-color: var(--accent);
    text-decoration: none;
  }

  .mode-icon {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--accent);
    margin-bottom: 0.25rem;
  }

  .mode-card h2 {
    font-size: 1.2rem;
    margin: 0;
  }

  .mode-card p {
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.5;
    flex: 1;
  }

  .mode-btn {
    align-self: flex-start;
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }

  .domains-section {
    margin-bottom: 2rem;
  }

  .section-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-bottom: 0.75rem;
  }

  .domain-list {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .domain-item {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
  }

  .muted {
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  .footer-links {
    font-size: 0.875rem;
  }
</style>
