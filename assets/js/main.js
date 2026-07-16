function init() {
  initTheme();
  initLangSwitch();
  initCountdown();
  initCounters();
  initTabs();
  initAccordion();
  initCalculator();
  initModal();
  initReveal();
  initTxFeed();
  initHeaderScroll();
  initSystemDemo();
  initTranslationWidget();
  initPipelineWidget();
  initCrmWidget();
  initWebinarWidget();
  initTrafficWidget();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
