<script>
  import '../app.css';
</script>

<nav>
  <div class="container nav-inner">
    <a class="brand mono" href="/">net+ prep</a>
    <div class="nav-links">
      <a href="/drill">Drill</a>
      <a href="/exam">Exam</a>
      <a href="/notes">Notes</a>
      <a href="/progress">Progress</a>
    </div>
  </div>
</nav>

<main class="container">
  <slot />
</main>

<style>
  nav {
    border-bottom: 1px solid var(--border);
    padding: 0.75rem 0;
    background: var(--surface);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .brand {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: -0.02em;
  }

  .brand:hover { text-decoration: none; opacity: 0.85; }

  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  .nav-links a {
    font-size: 0.875rem;
    color: var(--text-muted);
    transition: color 0.15s;
  }

  .nav-links a:hover {
    color: var(--text);
    text-decoration: none;
  }

  main {
    padding-top: 2.5rem;
    padding-bottom: 4rem;
  }
</style>
