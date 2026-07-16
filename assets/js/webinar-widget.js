/**
 * Webinar Chat Ticker - Card 5 Controller
 *
 * Spawns 20 realistic MLM comments (strictly in Russian, no emojis) scrolling infinitely.
 * Performs a synchronized track translation where all comments slide up together.
 * The top comment fades out as it slides out of bounds, and the new comment fades in.
 * Begins running immediately on page load.
 */

function initWebinarWidget() {
  console.log('Webinar Widget: initWebinarWidget started.');

  const ADD_INTERVAL_MS = 2200; // spawn a new comment every 2.2 seconds
  const SLIDE_DURATION_MS = 600; // transition duration in ms
  const STEP_HEIGHT = 40; // Fixed height (34px) + Gap (6px)

  const COMMENTS = [
    { author: 'Алексей', text: 'Как запустить систему?' },
    { author: 'Ирина', text: 'Всё очень доступно объяснили.' },
    { author: 'Михаил', text: 'Спасибо за презентацию!' },
    { author: 'Светлана', text: 'А сколько стоит вход?' },
    { author: 'Даниил', text: 'Зарегистрировался в боте за минуту.' },
    { author: 'Ольга', text: 'Проект топ, я уже в деле.' },
    { author: 'Роман', text: 'Когда следующий созвон?' },
    { author: 'Анна', text: 'ИИ-переводчик просто космос.' },
    { author: 'Сергей', text: 'Начал получать пассивный доход.' },
    { author: 'Елена', text: 'Команда растет на глазах!' },
    { author: 'Иван', text: 'А вывод моментальный?' },
    { author: 'Юлия', text: 'Завтра подключаю двух партнеров.' },
    { author: 'Павел', text: 'Инструкции очень простые.' },
    { author: 'Мария', text: 'Вебинар супер, спасибо лидерам.' },
    { author: 'Дмитрий', text: 'Будет запись эфира?' },
    { author: 'Наталья', text: 'Продукт действительно нужный.' },
    { author: 'Андрей', text: 'Всё работает на полном автопилоте.' },
    { author: 'Виктория', text: 'Теперь строить сеть одно удовольствие.' },
    { author: 'Артем', text: 'Мои партнеры в восторге.' },
    { author: 'Татьяна', text: 'Поддерживаю, результаты отличные.' }
  ];

  const chatEl = document.getElementById('webinar-chat');
  const innerEl = document.getElementById('webinar-chat-inner');
  if (!chatEl || !innerEl) {
    console.warn('Webinar Widget: Chat elements not found.');
    return;
  }

  let commentIdx = 0;
  let chatTimer = null;

  // Add a single comment element to the inner track
  function addComment(comment, instant = false) {
    const msgEl = document.createElement('div');
    msgEl.className = 'webinar-chat-msg';
    msgEl.innerHTML = `
      <span class="webinar-msg-author">${comment.author}</span>
      <span class="webinar-msg-text">${comment.text}</span>
    `;

    if (instant) {
      msgEl.style.opacity = '1';
      innerEl.appendChild(msgEl);
    } else {
      msgEl.style.opacity = '0';
      innerEl.appendChild(msgEl);

      // Force layout calculation
      msgEl.offsetHeight;

      // 1. Setup smooth track translation upwards
      innerEl.style.transition = `transform ${SLIDE_DURATION_MS}ms cubic-bezier(0.25, 1, 0.5, 1)`;
      innerEl.style.transform = `translate3d(0, -${STEP_HEIGHT}px, 0)`;

      // 2. Fade in the new bottom message
      msgEl.style.opacity = '1';

      // 3. Fade out the oldest top message
      const oldestEl = innerEl.children[0];
      if (oldestEl) {
        oldestEl.style.opacity = '0';
      }

      // 4. After transition ends, remove old element and instantly reset track
      setTimeout(() => {
        if (oldestEl && oldestEl.parentNode === innerEl) {
          innerEl.removeChild(oldestEl);
        }
        innerEl.style.transition = 'none';
        innerEl.style.transform = 'translate3d(0, 0, 0)';
        // Force reflow
        innerEl.offsetHeight;
      }, SLIDE_DURATION_MS);
    }
  }

  // Pre-seed chat with 4 initial comments instantly so the viewport is populated
  function seedChat() {
    for (let i = 0; i < 4; i++) {
      addComment(COMMENTS[commentIdx], true);
      commentIdx = (commentIdx + 1) % COMMENTS.length;
    }
  }

  function tick() {
    addComment(COMMENTS[commentIdx]);
    commentIdx = (commentIdx + 1) % COMMENTS.length;
    chatTimer = setTimeout(tick, ADD_INTERVAL_MS);
  }

  function startChat() {
    if (chatTimer) return;
    seedChat();
    chatTimer = setTimeout(tick, ADD_INTERVAL_MS);
  }

  startChat();
}
