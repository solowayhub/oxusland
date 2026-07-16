function initAccordion() {
  document.querySelectorAll('[data-accordion]').forEach((wrap) => {
    const triggers = Array.from(wrap.querySelectorAll('.accordion__trigger'));

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        const panel = document.getElementById(trigger.getAttribute('aria-controls'));
        trigger.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.setAttribute('data-open', String(!expanded));
      });
    });
  });
}
