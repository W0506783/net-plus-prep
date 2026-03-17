<script>
  import { marked } from 'marked';

  export let explanation = '';
  export let show = false;

  $: html = marked.parse(explanation || '');
</script>

{#if show}
  <div class="panel">
    <div class="panel-header">
      <span class="mono label">// explanation</span>
    </div>
    <div class="panel-body">
      {@html html}
    </div>
  </div>
{/if}

<style>
  .panel {
    margin-top: 1.25rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    animation: slideDown 0.2s ease;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .panel-header {
    background: rgba(88, 166, 255, 0.06);
    border-bottom: 1px solid var(--border);
    padding: 0.5rem 1rem;
  }

  .label {
    font-size: 0.75rem;
    color: var(--accent);
    font-family: var(--font-mono);
  }

  .panel-body {
    padding: 1rem 1.25rem;
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--text);
  }

  .panel-body :global(h2) {
    font-size: 0.95rem;
    font-family: var(--font-mono);
    color: var(--accent);
    margin: 0 0 0.5rem;
  }

  .panel-body :global(h3) {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin: 0.75rem 0 0.25rem;
  }

  .panel-body :global(p) {
    margin: 0.4rem 0;
  }

  .panel-body :global(ul) {
    padding-left: 1.25rem;
    margin: 0.4rem 0;
  }

  .panel-body :global(li) {
    margin: 0.2rem 0;
    color: var(--text-muted);
  }

  .panel-body :global(strong) {
    color: var(--text);
    font-weight: 600;
  }

  .panel-body :global(code) {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    background: rgba(255,255,255,0.06);
    padding: 0.1em 0.35em;
    border-radius: 3px;
  }
</style>
