const PRESTART_START = new Date('2026-06-01T00:00:00Z');

function pad(value) {
  return String(Math.max(0, value)).padStart(2, '0');
}

function diffToParts(target) {
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const totalSeconds = Math.floor(diffMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: false,
  };
}

function updateCountdownEl(el, target) {
  const parts = diffToParts(target);
  const days = el.querySelector('[data-countdown-days]');
  const hours = el.querySelector('[data-countdown-hours]');
  const minutes = el.querySelector('[data-countdown-minutes]');
  const seconds = el.querySelector('[data-countdown-seconds]');
  if (days) days.textContent = pad(parts.days);
  if (hours) hours.textContent = pad(parts.hours);
  if (minutes) minutes.textContent = pad(parts.minutes);
  if (seconds) seconds.textContent = pad(parts.seconds);
}

function updateProgressBars() {
  const bars = document.querySelectorAll('[data-progress-fill]');
  if (!bars.length) return;
  const target = new Date('2026-08-01T00:00:00Z');
  const now = new Date();
  const total = target.getTime() - PRESTART_START.getTime();
  const elapsed = now.getTime() - PRESTART_START.getTime();
  const percent = Math.min(100, Math.max(0, (elapsed / total) * 100));
  bars.forEach((bar) => {
    bar.style.width = `${percent.toFixed(1)}%`;
    const wrap = bar.closest('[role="progressbar"]');
    if (wrap) wrap.setAttribute('aria-valuenow', percent.toFixed(0));
  });
}

function initCountdown() {
  const elements = Array.from(document.querySelectorAll('[data-countdown]'));
  if (!elements.length) return;

  const tick = () => {
    elements.forEach((el) => {
      const targetAttr = el.getAttribute('data-countdown-target');
      if (!targetAttr) return;
      updateCountdownEl(el, new Date(targetAttr));
    });
    updateProgressBars();
  };

  tick();
  setInterval(tick, 1000);
}
