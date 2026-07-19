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

  // Move the menu out of the header so its own backdrop-filter never sits
  // inside the header's blurred stacking context (see components.css).
  document.body.appendChild(menu);

  function positionMenu() {
    var rect = trigger.getBoundingClientRect();
    menu.style.top = Math.round(rect.bottom + 8) + 'px';
    menu.style.right = Math.round(window.innerWidth - rect.right) + 'px';
  }

  function selectLang(code) {
    if (code !== 'ru' && code !== 'en' && code !== 'de') return;

    setLangCookie(code);
    localStorage.setItem(STORAGE_KEY, code);

    var currentPath = window.location.pathname;
    var langRegex = /\/(ru|en|de)(\/|$)/;

    if (langRegex.test(currentPath)) {
      var newPath = currentPath.replace(langRegex, '/' + code + '$2');
      if (newPath !== currentPath) {
        window.location.href = newPath;
        return;
      }
    } else {
      window.location.href = '../' + code + '/';
      return;
    }

    // Fallback UI update if path didn't change
    var option = options.find(function (o) {
      return o.getAttribute('data-lang-option') === code;
    });
    if (option) {
      label.textContent = option.getAttribute('data-lang-name');
      flag.setAttribute('href', getFlagIcon(code));
      document.documentElement.setAttribute('lang', code);
      options.forEach(function (o) {
        o.closest('li').setAttribute('aria-selected', String(o === option));
      });
    }
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
      var targetLang = option.getAttribute('data-lang-option');
      selectLang(targetLang);
      closeMenu();
      trigger.focus();
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

