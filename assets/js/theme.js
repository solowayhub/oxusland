function initTheme() {
  var STORAGE_KEY = 'oxustech-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(theme === 'light'));
      var icon = toggle.querySelector('use');
      if (icon) {
        icon.setAttribute('href', '#icon-' + (theme === 'light' ? 'sun' : 'moon'));
      }
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'light' ? '#F7F9FC' : '#0F172A');
    }
  }

  var stored = localStorage.getItem(STORAGE_KEY);
  var initial = stored === 'light' || stored === 'dark' ? stored : 'dark';
  applyTheme(initial);

  var toggle = document.querySelector('[data-theme-toggle]');
  if (!toggle) return;

  toggle.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    var next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}
