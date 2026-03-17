<script>
  import { onDestroy, createEventDispatcher } from 'svelte';
  import { timeRemaining } from '$lib/stores/quiz.js';

  const dispatch = createEventDispatcher();
  let interval;

  $: minutes = Math.floor($timeRemaining / 60);
  $: seconds = $timeRemaining % 60;
  $: display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  $: urgent = $timeRemaining <= 300; // last 5 minutes

  interval = setInterval(() => {
    timeRemaining.update((t) => {
      if (t <= 1) {
        clearInterval(interval);
        dispatch('timesup');
        return 0;
      }
      return t - 1;
    });
  }, 1000);

  onDestroy(() => clearInterval(interval));
</script>

<div class="timer" class:urgent>
  <span class="mono label">time</span>
  <span class="mono display">{display}</span>
</div>

<style>
  .timer {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.4rem 0.85rem;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--surface);
  }

  .timer.urgent {
    border-color: var(--warning);
    animation: pulse 1s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .display {
    font-family: var(--font-mono);
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text);
    min-width: 5ch;
    text-align: right;
  }

  .urgent .display {
    color: var(--warning);
  }
</style>
