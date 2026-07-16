/**
 * CRM Investor Slider Widget - Card 4 Animation Controller
 *
 * Cycles through 3 contact profiles (Alex, John, Olivia) inside a slider track.
 * Employs a 4-card layout (cloned Card 0 at index 3) to achieve a seamless,
 * infinite single-direction slide (always right-to-left).
 * Delayed resets prevent elements from fading out during the sliding motion.
 */

function initCrmWidget() {
  console.log('CRM Widget: initCrmWidget function started.');

  const SLIDE_INTERVAL_MS = 5500; // total time active card is shown
  const TRANSITION_DURATION = 650; // track slide transition duration in ms

  const container = document.getElementById('crm-slider-container');
  const track = document.getElementById('crm-slider-track');
  if (!container || !track) {
    console.warn('CRM Widget: Container or track elements not found.');
    return;
  }

  const cards = Array.from(track.querySelectorAll('.crm-card'));
  console.log('CRM Widget: found card elements count:', cards.length);

  if (cards.length !== 4) {
    console.warn('CRM Widget: Cards count is not 4. Returning early.');
    return;
  }

  let currentIdx = 0;
  let activeTimeout = null;
  let sequenceTimeouts = [];
  let resetTimeouts = [];

  function clearSequenceTimeouts() {
    sequenceTimeouts.forEach(t => clearTimeout(t));
    sequenceTimeouts = [];
  }

  function clearAllTimeouts() {
    clearSequenceTimeouts();
    resetTimeouts.forEach(t => clearTimeout(t));
    resetTimeouts = [];
  }

  // Prepares/Resets a single card state back to hidden values
  function resetCard(idx) {
    const card = cards[idx];
    if (!card) return;

    const tags = Array.from(card.querySelectorAll('.crm-inv-tag'));
    const score = card.querySelector('.crm-inv-score');
    const circleFill = card.querySelector('.score-circle-fill');
    const scoreText = card.querySelector('.crm-inv-score-text');
    const analysis = card.querySelector('.crm-inv-analysis');

    tags.forEach(tag => tag.classList.remove('show'));
    if (score) score.classList.remove('show');
    if (analysis) analysis.classList.remove('show');

    if (score && circleFill && scoreText) {
      const startVal = parseInt(score.dataset.start) || 0;
      circleFill.style.strokeDasharray = '0, 100';
      scoreText.textContent = startVal + '%';
    }
  }

  function resetAllCards() {
    cards.forEach((_, idx) => resetCard(idx));
  }

  // Copy animated visual state from card index A to card index B instantly
  function copyCardState(fromIdx, toIdx) {
    const fromCard = cards[fromIdx];
    const toCard = cards[toIdx];
    if (!fromCard || !toCard) return;

    const fromTags = Array.from(fromCard.querySelectorAll('.crm-inv-tag'));
    const toTags = Array.from(toCard.querySelectorAll('.crm-inv-tag'));
    const fromScore = fromCard.querySelector('.crm-inv-score');
    const toScore = toCard.querySelector('.crm-inv-score');
    const fromCircleFill = fromCard.querySelector('.score-circle-fill');
    const toCircleFill = toCard.querySelector('.score-circle-fill');
    const fromScoreText = fromCard.querySelector('.crm-inv-score-text');
    const toScoreText = toCard.querySelector('.crm-inv-score-text');
    const fromAnalysis = fromCard.querySelector('.crm-inv-analysis');
    const toAnalysis = toCard.querySelector('.crm-inv-analysis');

    // Copy tags
    fromTags.forEach((tag, i) => {
      if (tag.classList.contains('show') && toTags[i]) {
        toTags[i].classList.add('show');
      } else if (toTags[i]) {
        toTags[i].classList.remove('show');
      }
    });

    // Copy score
    if (fromScore && toScore) {
      if (fromScore.classList.contains('show')) {
        toScore.classList.add('show');
      } else {
        toScore.classList.remove('show');
      }
    }

    // Copy circle fill and text
    if (fromCircleFill && toCircleFill) {
      toCircleFill.style.strokeDasharray = fromCircleFill.style.strokeDasharray;
    }
    if (fromScoreText && toScoreText) {
      toScoreText.textContent = fromScoreText.textContent;
    }

    // Copy analysis bubble
    if (fromAnalysis && toAnalysis) {
      if (fromAnalysis.classList.contains('show')) {
        toAnalysis.classList.add('show');
      } else {
        toAnalysis.classList.remove('show');
      }
    }
  }

  // Animates percentage text count up with a smooth ease-out curve
  function animateCounter(textEl, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(start + (end - start) * easeProgress);

      textEl.textContent = currentVal + '%';

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Plays the step-by-step element reveal sequence for the active card
  function playCardSequence(idx) {
    console.log('CRM Widget: playCardSequence triggered for index:', idx);
    clearSequenceTimeouts();

    const activeCard = cards[idx];
    const tags = Array.from(activeCard.querySelectorAll('.crm-inv-tag'));
    const score = activeCard.querySelector('.crm-inv-score');
    const circleFill = activeCard.querySelector('.score-circle-fill');
    const scoreText = activeCard.querySelector('.crm-inv-score-text');
    const analysis = activeCard.querySelector('.crm-inv-analysis');

    // T1 (400ms): Show Tag 1
    if (tags[0]) {
      sequenceTimeouts.push(setTimeout(() => {
        tags[0].classList.add('show');
      }, 400));
    }

    // T2 (700ms): Show Tag 2
    if (tags[1]) {
      sequenceTimeouts.push(setTimeout(() => {
        tags[1].classList.add('show');
      }, 700));
    }

    // T3 (1000ms): Reveal Score circle and animate progress + text counter
    if (score && circleFill && scoreText) {
      sequenceTimeouts.push(setTimeout(() => {
        score.classList.add('show');
        const startVal = parseInt(score.dataset.start) || 0;
        const targetVal = parseInt(score.dataset.target) || 100;

        circleFill.style.strokeDasharray = targetVal + ', 100';
        animateCounter(scoreText, startVal, targetVal, 1000);
      }, 1000));
    }

    // T4 (2100ms): Reveal AI Insight Bubble
    if (analysis) {
      sequenceTimeouts.push(setTimeout(() => {
        analysis.classList.add('show');
      }, 2100));
    }
  }

  function advance() {
    const prevIdx = currentIdx;

    if (currentIdx === 3) {
      // Loop ends: we are currently showing the cloned Alex card (index 3).
      // We must teleport back to index 0 instantly, and then slide to index 1!
      console.log('CRM Widget: looping from clone (3) to original (0) and advancing to 1');
      
      // 1. Copy Card 3 animated state to Card 0
      copyCardState(3, 0);

      // 2. Teleport track back to index 0
      track.style.transition = 'none';
      track.style.transform = 'translate3d(0, 0, 0)';

      // 3. Force reflow to register instant teleportation
      track.offsetHeight;

      // 4. Restore transition settings
      track.style.transition = 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)';

      // 5. Advance to card 1
      currentIdx = 1;
    } else {
      currentIdx = currentIdx + 1;
    }

    console.log('CRM Widget: advancing slide to index:', currentIdx);

    // Slide Carousel Track to the current card index (gap 24px handled inside calc)
    track.style.transform = `translate3d(calc(${-currentIdx * 100}% - ${currentIdx * 24}px), 0, 0)`;

    // Play active card sequential reveal timeline
    playCardSequence(currentIdx);

    // Reset previous card's styles ONLY AFTER it slides offscreen (TRANSITION_DURATION)
    const cardToReset = prevIdx;
    resetTimeouts.push(setTimeout(() => {
      resetCard(cardToReset);
      if (cardToReset === 3) {
        resetCard(0); // If we jumped 3 -> 1, make sure both Card 3 and original Card 0 are clean
      }
    }, TRANSITION_DURATION + 50));

    // Schedule next slide
    activeTimeout = setTimeout(advance, SLIDE_INTERVAL_MS);
  }

  // --- Start loop immediately on page load ---
  function startAnimation() {
    console.log('CRM Widget: startAnimation called. Initializing loop.');
    if (activeTimeout) return;
    resetAllCards();
    playCardSequence(0);
    activeTimeout = setTimeout(advance, SLIDE_INTERVAL_MS);
  }

  startAnimation();
}
