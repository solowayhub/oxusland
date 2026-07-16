function initLangSwitch() {
  var STORAGE_KEY = 'oxustech-lang';

  var wrap = document.querySelector('[data-lang-switch]');
  if (!wrap) return;

  var trigger = wrap.querySelector('[data-lang-trigger]');
  var menu = wrap.querySelector('[data-lang-menu]');
  var label = wrap.querySelector('[data-lang-label]');
  var flag = wrap.querySelector('[data-lang-flag] use');
  var options = Array.from(wrap.querySelectorAll('[data-lang-option]'));

  // Move the menu out of the header so its own backdrop-filter never sits
  // inside the header's blurred stacking context (see components.css).
  document.body.appendChild(menu);

  function positionMenu() {
    var rect = trigger.getBoundingClientRect();
    // Anchor by `right` (not `left` + width) so this works even while the
    // menu is still `hidden` and has no measurable offsetWidth yet.
    menu.style.top = Math.round(rect.bottom + 8) + 'px';
    menu.style.right = Math.round(window.innerWidth - rect.right) + 'px';
  }

  function selectLang(code, opts) {
    var persist = !opts || opts.persist !== false;
    var option = options.find(function (o) {
      return o.getAttribute('data-lang-option') === code;
    });
    if (!option) return;

    label.textContent = option.getAttribute('data-lang-name');
    flag.setAttribute('href', '#icon-flag-' + (code === 'en' ? 'gb' : 'ru'));
    document.documentElement.setAttribute('lang', code === 'en' ? 'en' : 'ru');

    options.forEach(function (o) {
      o.closest('li').setAttribute('aria-selected', String(o === option));
    });

    if (persist) localStorage.setItem(STORAGE_KEY, code);
  }

  function openMenu() {
    positionMenu();
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', function () {
    if (menu.hidden) openMenu();
    else closeMenu();
  });

  options.forEach(function (option) {
    option.addEventListener('click', function () {
      selectLang(option.getAttribute('data-lang-option'));
      closeMenu();
      trigger.focus();
    });
  });

  document.addEventListener('click', function (event) {
    if (!wrap.contains(event.target) && !menu.contains(event.target)) closeMenu();
  });

  // The menu is now a fixed-position portal, not inline content — reposition
  // while open instead of letting it drift out of place on scroll/resize.
  window.addEventListener('scroll', function () {
    if (!menu.hidden) positionMenu();
  }, { passive: true });

  window.addEventListener('resize', function () {
    if (!menu.hidden) positionMenu();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !menu.hidden) {
      closeMenu();
      trigger.focus();
    }
  });

  var stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'ru') {
    selectLang(stored, { persist: false });
  }
}
