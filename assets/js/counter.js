function formatValue(value, decimals, prefix) {
  const fixed = value.toFixed(decimals);
  const [intPart, decPart] = fixed.split('.');
  const withSeparators = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${prefix}${withSeparators}${decPart ? `.${decPart}` : ''}`;
}

function animateCounter(el) {
  const to = parseFloat(el.getAttribute('data-counter-to') || '0');
  const decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);
  const prefix = el.getAttribute('data-counter-prefix') || '';
  const duration = parseInt(el.getAttribute('data-counter-duration') || '1800', 10);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    el.textContent = formatValue(to, decimals, prefix);
    return;
  }

  const start = performance.now();
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  function frame(now) {
    const elapsed = now - start;
    const progress = Math.min(1, elapsed / duration);
    const value = to * ease(progress);
    el.textContent = formatValue(value, decimals, prefix);
    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => observer.observe(counter));
}
