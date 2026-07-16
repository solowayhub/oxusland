function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach((wrap) => {
    const tabs = Array.from(wrap.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    const panelFor = (tab) => document.getElementById(tab.getAttribute('aria-controls'));

    function selectTab(tab) {
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
        const panel = panelFor(t);
        if (panel) panel.hidden = !selected;
      });
      tab.focus();
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(tab));
      tab.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          const nextIndex = event.key === 'ArrowRight'
            ? (index + 1) % tabs.length
            : (index - 1 + tabs.length) % tabs.length;
          selectTab(tabs[nextIndex]);
        }
      });
    });
  });
}
