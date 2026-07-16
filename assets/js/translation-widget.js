/**
 * Translation Widget — Classic 3D Queue Stack with 4 Cards
 *
 * 3 cards always visible in a stacked queue peeking from the TOP:
 *   - back  (y=0,  scale 0.88): darkest,  tiny 10px strip at top
 *   - mid   (y=10, scale 0.94): medium,   10px strip above front
 *   - front (y=20, scale 1.00): lightest, 58px fully visible at bottom
 *   - ready (y=0,  scale 0.88, opacity 0): spare card behind, waiting to fade in
 *
 * On each tick:
 *   1. front → exit: slides DOWN and fades out (duration 0.38s).
 *      z-index:4 ensures it stays on top of all other cards during exit.
 *   2. mid   → front: moves down + scales up + color transitions to front color.
 *   3. back  → mid:   moves down + scales up + color transitions to mid color.
 *   4. ready → back:  fades in synchronously at the back position.
 *   5. Exited card teleports to ready (instant, no transition) and receives the next text.
 *   6. Flag crossfades in sync.
 */

function initTranslationWidget() {
  const LANGS = [
    { flag: 'assets/images/flags/gb.svg', alt: 'English',    text: 'Hello, are you ready to invest?' },
    { flag: 'assets/images/flags/es.svg', alt: 'Spanish',    text: 'Hola, ¿estás listo para invertir?' },
    { flag: 'assets/images/flags/br.svg', alt: 'Portuguese', text: 'Olá, você está pronto para investir?' },
    { flag: 'assets/images/flags/fr.svg', alt: 'French',     text: 'Salut, êtes-vous prêt à investir?' },
    { flag: 'assets/images/flags/cn.svg', alt: 'Chinese',    text: '你好，你准备好投资了吗？' },
    { flag: 'assets/images/flags/ru.svg', alt: 'Russian',    text: 'Привет, вы готовы инвестировать?' },
    { flag: 'assets/images/flags/kr.svg', alt: 'Korean',     text: '안녕하세요, 투자할 준비가 되셨나요?' },
    { flag: 'assets/images/flags/ar.svg', alt: 'Arabic',     text: 'مرحباً، هل أنت مستعد للاستثمار؟' },
    { flag: 'assets/images/flags/it.svg', alt: 'Italian',    text: 'Ciao, sei pronto a investire?' },
    { flag: 'assets/images/flags/de.svg', alt: 'German',     text: 'Hallo, bist du bereit zu investieren?' },
    { flag: 'assets/images/flags/jp.svg', alt: 'Japanese',   text: 'こんにちは、投資する準備はできていますか？' },
    { flag: 'assets/images/flags/uk.svg', alt: 'Ukrainian',  text: 'Привіт, ви готові інвестувати?' },
  ];

  const N           = LANGS.length;
  const INTERVAL_MS = 2800; // display time per language
  const EXIT_MS     = 380;  // matches @keyframes tw-card-exit duration (0.38s)

  const flagEl = document.getElementById('tw-flag');
  const domCards = [
    document.getElementById('tw-card-0'), // initially: front
    document.getElementById('tw-card-1'), // initially: mid
    document.getElementById('tw-card-2'), // initially: back
    document.getElementById('tw-card-3'), // initially: ready
  ];

  if (!flagEl || domCards.some(c => !c)) return;

  // --- Initial setup ---
  // cards[i] points to DOM elements in order [front, mid, back, ready]
  // We rotate this array each tick.
  let cards = [domCards[0], domCards[1], domCards[2], domCards[3]];
  let frontIdx = 0; // index into LANGS for the current front card

  function lang(offset) {
    return LANGS[(frontIdx + offset + N * 10) % N];
  }

  // Populate initial content
  cards[0].textContent = lang(0).text;
  cards[1].textContent = lang(1).text;
  cards[2].textContent = lang(2).text;
  cards[3].textContent = lang(3).text;

  cards[0].dataset.pos = 'front';
  cards[1].dataset.pos = 'mid';
  cards[2].dataset.pos = 'back';
  cards[3].dataset.pos = 'ready';

  flagEl.src = lang(0).flag;
  flagEl.alt = lang(0).alt;

  // --- Advance one step ---
  function advance() {
    // 1. Exit the front card (slides down + fades, stays on top via z-index:4)
    cards[0].dataset.pos = 'exit';

    // 2. Promote cards: mid → front, back → mid, ready → back
    //    All transition classes will trigger synchronously
    cards[1].dataset.pos = 'front';
    cards[2].dataset.pos = 'mid';
    cards[3].dataset.pos = 'back';

    // 3. Crossfade the flag — capture next flag data NOW before frontIdx changes
    const nextFlag = LANGS[(frontIdx + 1) % N];
    flagEl.classList.remove('tw-flag-enter');
    flagEl.classList.add('tw-flag-exit');
    setTimeout(() => {
      flagEl.classList.remove('tw-flag-exit');
      flagEl.src = nextFlag.flag;
      flagEl.alt = nextFlag.alt;
      void flagEl.offsetWidth; // force reflow to restart enter animation
      flagEl.classList.add('tw-flag-enter');
    }, 180);

    // 4. After exit animation completes, recycle exited card as the new ready card.
    //    Capture indices NOW (before frontIdx advances).
    //    The new ready card text will be frontIdx + 4.
    const newReadyText = LANGS[(frontIdx + 4) % N].text;
    const exitedCard   = cards[0];
    setTimeout(() => {
      exitedCard.style.transition = 'none'; // disable transitions inline
      exitedCard.dataset.pos = 'ready';     // snap teleport to top
      exitedCard.textContent = newReadyText; // swap text
      
      // Request next frame to safely restore transition styles, preventing merge bugs
      requestAnimationFrame(() => {
        exitedCard.style.transition = '';
      });
    }, EXIT_MS);

    // 5. Rotate cards array: [front, mid, back, ready] → [mid, back, ready, exited-as-new-ready]
    cards = [cards[1], cards[2], cards[3], cards[0]];
    frontIdx = (frontIdx + 1) % N;
  }

  // --- Start loop immediately on page load ---
  let timer = null;

  function startLoop() {
    if (timer) return;
    timer = setInterval(advance, INTERVAL_MS);
  }

  startLoop();
}
