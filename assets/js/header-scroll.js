function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  // Hysteresis gap must exceed the header's own height change (padding-block
  // shrinks by up to 32px when is-scrolled toggles), otherwise the resulting
  // layout shift flips scrollY back across a single threshold and the class
  // oscillates every frame.
  const ENTER_AT = 48;
  const EXIT_AT = 16;
  let scrolled = false;

  function update() {
    const y = window.scrollY;
    if (!scrolled && y > ENTER_AT) {
      scrolled = true;
      header.classList.add('is-scrolled');
    } else if (scrolled && y < EXIT_AT) {
      scrolled = false;
      header.classList.remove('is-scrolled');
    }
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
}
