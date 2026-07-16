const MAX_ITEMS = 3;
const TICK_MS = 2800;
const ROW_TRANSITION_MS = 520;
const GAP_PX = 8;

const AMOUNT_MIN = 0.5;
const AMOUNT_MAX = 9.5;

function txRandomAmount() {
  return Math.random() * (AMOUNT_MAX - AMOUNT_MIN) + AMOUNT_MIN;
}

function buildTxItem(amount, transition) {
  const li = document.createElement('li');
  li.className = 'phone__feed-item';
  li.style.transition = transition;
  li.style.opacity = '0';
  li.style.transform = 'translateY(-100%)';
  li.innerHTML = `
    <span class="phone__feed-icon"><svg width="16" height="16"><use href="#icon-arrow-down-left"></use></svg></span>
    <span class="phone__feed-copy">
      <strong>Арбитраж</strong>
      <em>Только что</em>
    </span>
    <span class="phone__feed-amount">+$${amount.toFixed(2)}</span>
  `;
  return li;
}

function layoutTxItems(track) {
  let offset = 0;
  Array.from(track.children).forEach((item) => {
    item.style.transform = `translateY(${offset}px)`;
    item.style.opacity = '1';
    offset += item.offsetHeight + GAP_PX;
  });
  track.style.height = `${Math.max(0, offset - GAP_PX)}px`;
}

function animateBalance(el, from, to) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    el.textContent = formatValue(to, 2, '$');
    return;
  }
  const duration = 700;
  const start = performance.now();
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  function frame(now) {
    const progress = Math.min(1, (now - start) / duration);
    el.textContent = formatValue(from + (to - from) * ease(progress), 2, '$');
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function initTxFeed() {
  const track = document.querySelector('[data-tx-feed]');
  const balanceEl = document.querySelector('[data-counter]');
  if (!track) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const transition = prefersReducedMotion
    ? 'none'
    : `transform ${ROW_TRANSITION_MS}ms var(--ease-out), opacity ${ROW_TRANSITION_MS}ms var(--ease-out)`;

  let balance = balanceEl ? parseFloat(balanceEl.getAttribute('data-counter-to') || '0') : 0;

  Array.from(track.children).forEach((item) => {
    item.style.transition = 'none';
  });
  layoutTxItems(track);
  void track.offsetHeight;
  Array.from(track.children).forEach((item) => {
    item.style.transition = transition;
  });

  function tick() {
    const amount = txRandomAmount();
    const item = buildTxItem(amount, transition);
    track.insertBefore(item, track.firstChild);
    // Force the browser to commit the item's initial (hidden) state before
    // the transition target is set below — otherwise both writes can land
    // in the same frame and the slide-in never paints.
    void item.offsetHeight;

    if (balanceEl) {
      const nextBalance = balance + amount;
      animateBalance(balanceEl, balance, nextBalance);
      balance = nextBalance;
    }

    requestAnimationFrame(() => {
      layoutTxItems(track);
    });

    setTimeout(() => {
      while (track.children.length > MAX_ITEMS) {
        track.removeChild(track.lastElementChild);
      }
    }, ROW_TRANSITION_MS + 40);
  }

  if (prefersReducedMotion) return;

  setInterval(tick, TICK_MS);
}
