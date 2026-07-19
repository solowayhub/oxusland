function initLangSwitch() {
  var COOKIE_KEY = 'oxustech_lang';
  var STORAGE_KEY = 'oxustech-lang';

  var wrap = document.querySelector('[data-lang-switch]');
  if (!wrap) return;

  var trigger = wrap.querySelector('[data-lang-trigger]');
  var menu = wrap.querySelector('[data-lang-menu]');
  var label = wrap.querySelector('[data-lang-label]');
  var flag = wrap.querySelector('[data-lang-flag] use');
  var options = Array.from(wrap.querySelectorAll('[data-lang-option]'));

  // Ensure current page language sets/refreshes cookie
  var currentLang = document.documentElement.getAttribute('lang') || 'ru';
  setLangCookie(currentLang);
  localStorage.setItem(STORAGE_KEY, currentLang);

  function getFlagIcon(code) {
    if (code === 'en') return '#icon-flag-gb';
    if (code === 'de') return '#icon-flag-de';
    return '#icon-flag-ru';
  }

  function setLangCookie(code) {
    document.cookie = COOKIE_KEY + '=' + code + '; path=/; max-age=31536000; SameSite=Lax';
  }

  // Move the menu out of the header so backdrop-filter works properly
  document.body.appendChild(menu);

  function positionMenu() {
    var rect = trigger.getBoundingClientRect();
    menu.style.top = Math.round(rect.bottom + 8) + 'px';
    menu.style.right = Math.round(window.innerWidth - rect.right) + 'px';
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

  trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (menu.hidden) openMenu();
    else closeMenu();
  });

  options.forEach(function (option) {
    option.addEventListener('click', function (e) {
      e.preventDefault();
      var targetLang = option.getAttribute('data-lang-option');
      if (targetLang) {
        setLangCookie(targetLang);
        localStorage.setItem(STORAGE_KEY, targetLang);
      }

      var targetUrl = option.getAttribute('href');
      if (!targetUrl) {
        targetUrl = '../' + targetLang + '/';
      }

      // Handle file:// protocol or explicit index.html URLs
      if (window.location.pathname.indexOf('.html') !== -1 && targetUrl.endsWith('/')) {
        targetUrl = targetUrl + 'index.html';
      }

      closeMenu();
      window.location.href = targetUrl;
    });
  });

  document.addEventListener('click', function (event) {
    if (!wrap.contains(event.target) && !menu.contains(event.target)) closeMenu();
  });

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
}
