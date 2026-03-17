<script>
  import ProgressDashboard from '$lib/components/ProgressDashboard.svelte';
  import { getApiKey, setApiKey } from '$lib/api/generateQuestions.js';
  import { browser } from '$app/environment';

  let apiKey = browser ? getApiKey() : '';
  let saved = false;

  function saveKey() {
    setApiKey(apiKey);
    saved = true;
    setTimeout(() => (saved = false), 2000);
  }
</script>

<svelte:head>
  <title>Progress · Net+ Prep</title>
</svelte:head>

<div class="page-header">
  <h1>Progress</h1>
  <p class="sub">Accuracy breakdown by domain</p>
</div>

<ProgressDashboard />

<div class="settings card">
  <h3 class="mono section-label">// anthropic api key</h3>
  <p class="hint">Required for AI question generation in Drill mode. Stored in localStorage, never sent anywhere except the Anthropic API.</p>
  <div class="key-row">
    <input
      type="password"
      bind:value={apiKey}
      placeholder="sk-ant-..."
      class="key-input mono"
    />
    <button class="btn btn-primary" on:click={saveKey}>
      {saved ? 'Saved ✓' : 'Save Key'}
    </button>
  </div>
</div>

<style>
  .page-header {
    margin-bottom: 2rem;
  }

  h1 { font-size: 1.6rem; margin-bottom: 0.15rem; }

  .sub {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .settings {
    margin-top: 2rem;
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

  .key-row {
    display: flex;
    gap: 0.6rem;
  }

  .key-input {
    flex: 1;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 0.55rem 0.85rem;
    color: var(--text);
    outline: none;
    transition: border-color 0.15s;
  }

  .key-input:focus {
    border-color: var(--accent);
  }

  .key-input::placeholder {
    color: var(--text-muted);
  }
</style>
