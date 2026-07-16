const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function initModal() {
  const overlay = document.querySelector('[data-modal-overlay]');
  const modal = document.querySelector('[data-modal]');
  const form = document.querySelector('[data-registration-form]');
  const successPanel = document.querySelector('[data-form-success]');
  if (!overlay || !modal) return;

  let lastFocused = null;

  function trapFocus(event) {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(modal.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
      (el) => el.offsetParent !== null
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function onKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
    } else {
      trapFocus(event);
    }
  }

  function openModal(sourceButton) {
    lastFocused = sourceButton || document.activeElement;
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.setAttribute('data-open', 'true'));
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onKeydown);
    const firstField = modal.querySelector('#reg-email');
    if (firstField) firstField.focus();
  }

  function closeModal() {
    overlay.setAttribute('data-open', 'false');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onKeydown);
    setTimeout(() => {
      overlay.hidden = true;
      if (form) {
        form.hidden = false;
        form.reset();
      }
      if (successPanel) successPanel.setAttribute('data-visible', 'false');
    }, 260);
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(trigger));
  });

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      form.hidden = true;
      if (successPanel) successPanel.setAttribute('data-visible', 'true');
    });
  }
}
