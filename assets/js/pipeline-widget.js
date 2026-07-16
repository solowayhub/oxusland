/**
 * Onboarding Pipeline Widget - Card 3 Animation Controller
 *
 * Coordinates 5 horizontal circles and sliding text prompts below.
 * Step 1-5: Circles show numbers, active circle is green and scaled, completed circles turn gray with a checkmark (✓).
 * Step 6 (Final): Text "Все инструкции выполнены" slides in, pauses, then shows checkmark icon, then traces outline neon border, and slides out.
 * Reset: Circles reset to numbers, and loop restarts instantly.
 */

function initPipelineWidget() {
  const INTERVAL_MS = 2600; // total duration per standard slide (pause + slide time)
  const RESET_MS    = 600;  // duration after which exited slide is reset to 'ready'

  const widgetEl = document.getElementById('pipeline-widget');
  if (!widgetEl) return;

  const circles = Array.from(widgetEl.querySelectorAll('.pipeline-circle'));
  const slides  = Array.from(widgetEl.querySelectorAll('.pipeline-slide'));
  const finalBox = widgetEl.querySelector('.pipeline-final-box');

  if (circles.length !== 5 || slides.length !== 6 || !finalBox) return;

  let currentStep = 1; // ranges from 1 to 6
  let activeTimeout = null;
  let finalSequenceTimeouts = [];

  // Clear any active final slide timeouts when loop resets or runs
  function clearFinalTimeouts() {
    finalSequenceTimeouts.forEach(t => clearTimeout(t));
    finalSequenceTimeouts = [];
  }

  // Set initial DOM state before animation starts
  function setInitialState() {
    clearFinalTimeouts();
    circles.forEach((circle, idx) => {
      circle.textContent = (idx + 1).toString();
      circle.dataset.state = 'default';
    });
    slides.forEach((slide) => {
      slide.dataset.pos = 'ready';
    });
    finalBox.classList.remove('show-icon', 'draw-border');

    // Make step 1 active immediately
    circles[0].dataset.state = 'active';
    slides[0].dataset.pos = 'center';
    currentStep = 1;
  }

  function advance() {
    const prevStep = currentStep;
    currentStep = currentStep % 6 + 1; // cycle: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 1

    // 1. Handle sliding text transitions
    const prevSlideIdx = prevStep - 1; // 0 to 5
    const nextSlideIdx = currentStep - 1; // 0 to 5

    const prevSlide = slides[prevSlideIdx];
    const nextSlide = slides[nextSlideIdx];

    // Slide the current text out to the left
    prevSlide.dataset.pos = 'left';

    // Slide the next text in from the right to the center
    nextSlide.dataset.pos = 'center';

    // After animation completes, recycle the exited slide back to the right side (pos = 'ready')
    setTimeout(() => {
      if (prevSlide.dataset.pos === 'left') {
        prevSlide.dataset.pos = 'ready';
        // If it was the final slide, also reset its class styling states
        if (prevSlide.id === 'pipeline-slide-final') {
          finalBox.classList.remove('show-icon', 'draw-border');
        }
      }
    }, RESET_MS);

    // 2. Handle horizontal circles states and contents
    if (currentStep === 1) {
      // Loop restarted: reset all circles back to numbers instantly
      circles.forEach((circle, idx) => {
        circle.textContent = (idx + 1).toString();
        circle.dataset.state = 'default';
      });
      // Set first circle active
      circles[0].dataset.state = 'active';
    } else if (currentStep <= 5) {
      // Standard step advance:
      // - Mark previous step as completed: change text to checkmark (✓) and state to completed
      const prevCircle = circles[prevStep - 1];
      if (prevCircle) {
        prevCircle.dataset.state = 'completed';
        prevCircle.textContent = '✓';
      }
      // - Mark next step as active: state to active
      const nextCircle = circles[currentStep - 1];
      if (nextCircle) {
        nextCircle.dataset.state = 'active';
      }
    } else {
      // Step 6: "Все инструкции выполнены"
      // Mark circle 5 as completed (shows ✓)
      const prevCircle = circles[4];
      if (prevCircle) {
        prevCircle.dataset.state = 'completed';
        prevCircle.textContent = '✓';
      }

      // Play step 6 sub-sequence:
      clearFinalTimeouts();
      finalBox.classList.remove('show-icon', 'draw-border');

      // T1 (700ms): Show checkmark icon
      finalSequenceTimeouts.push(setTimeout(() => {
        finalBox.classList.add('show-icon');
      }, 700));

      // T2 (1200ms): Draw snake border
      finalSequenceTimeouts.push(setTimeout(() => {
        finalBox.classList.add('draw-border');
      }, 1200));
    }
  }

  // --- Dynamic timeout loop ---
  function tick() {
    advance();

    // Standard steps take INTERVAL_MS, final step 6 takes more time to finish its sequence
    const nextDelay = (currentStep === 6) ? 4000 : INTERVAL_MS;
    activeTimeout = setTimeout(tick, nextDelay);
  }

  // --- Start loop immediately on page load ---
  function startAnimation() {
    if (activeTimeout) return;
    setInitialState();
    activeTimeout = setTimeout(tick, INTERVAL_MS);
  }

  startAnimation();
}
