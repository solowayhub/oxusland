function initReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('.card, .income-card, .pipeline__step, .v-pipeline__step, .lottery-frame, .callout, .metric');

  if (prefersReducedMotion || !targets.length) return;

  // Make the 6 cards in the #ai-crm section animate immediately on load
  const systemCards = document.querySelectorAll('#ai-crm .card-grid .card');
  systemCards.forEach((el) => {
    el.classList.add('is-visible');
  });

  // Filter out the 6 system cards from targets so they don't wait for scroll intersection
  const otherTargets = Array.from(targets).filter(el => !Array.from(systemCards).includes(el));

  otherTargets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  otherTargets.forEach((el) => observer.observe(el));
}
