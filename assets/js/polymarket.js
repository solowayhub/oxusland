document.addEventListener('DOMContentLoaded', () => {
  const showcase = document.querySelector('.polymarket-showcase');
  if (!showcase) return;

  const tabs = showcase.querySelectorAll('.pm-tab');
  const track = showcase.querySelector('.pm-slider-track');
  const cards = Array.from(showcase.querySelectorAll('.pm-card'));
  const dots = showcase.parentNode.querySelectorAll('.pm-dot');
  
  if (cards.length === 0) return;

  // Create duplicates for infinite slider looping
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);
  
  firstClone.classList.add('pm-card-clone');
  lastClone.classList.add('pm-card-clone');
  
  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  let currentIndex = 0; // 0 represents the first original card
  let isTransitioning = false;
  let autoplayTimer = null;
  const autoplayInterval = 5000; // 5 seconds per slide
  let isMobile = window.innerWidth < 1024;

  // Touch & Mouse Drag variables
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;
  let startTranslate = 0;
  const dragThreshold = 50; // pixels to trigger slide change

  function getSlideWidth() {
    const card = track.querySelector('.pm-card');
    return card ? card.getBoundingClientRect().width : 0;
  }

  function updateCursor() {
    if (isMobile) {
      track.style.cursor = 'grab';
    } else {
      track.style.cursor = 'default';
    }
  }

  function getGap() {
    if (!isMobile) return 0;
    const style = window.getComputedStyle(track);
    const gapVal = parseFloat(style.columnGap || style.gap) || 0;
    return gapVal;
  }

  function updatePosition(instantly = false) {
    if (isMobile) {
      const width = getSlideWidth();
      const gap = getGap();
      const targetTranslate = -(currentIndex + 1) * (width + gap);
      
      if (instantly) {
        track.style.transition = 'none';
      } else {
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      }
      
      track.style.transform = `translateX(${targetTranslate}px)`;
      currentTranslate = targetTranslate;
      prevTranslate = targetTranslate;
    } else {
      track.style.transition = 'none';
      track.style.transform = 'none';
      
      const allCards = track.querySelectorAll('.pm-card:not(.pm-card-clone)');
      allCards.forEach((card, idx) => {
        if (idx === currentIndex) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    }
    
    updateIndicators();
  }

  function updateIndicators() {
    let displayIndex = currentIndex;
    if (displayIndex < 0) {
      displayIndex = cards.length - 1;
    } else if (displayIndex >= cards.length) {
      displayIndex = 0;
    }

    tabs.forEach((tab, idx) => {
      if (idx === displayIndex) {
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === displayIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function handleTransitionEnd() {
    if (!isMobile) return;
    isTransitioning = false;
    
    // Handle infinite loop jumping
    if (currentIndex >= cards.length) {
      currentIndex = 0;
      updatePosition(true); // Jump instantly to start
    } else if (currentIndex < 0) {
      currentIndex = cards.length - 1;
      updatePosition(true); // Jump instantly to end
    }
  }

  track.addEventListener('transitionend', handleTransitionEnd);

  function goToSlide(index, instantly = false) {
    if (isMobile) {
      if (isTransitioning && !instantly) return;
      if (!instantly) isTransitioning = true;
      currentIndex = index;
      updatePosition(instantly);
    } else {
      isTransitioning = false;
      if (index >= cards.length) {
        currentIndex = 0;
      } else if (index < 0) {
        currentIndex = cards.length - 1;
      } else {
        currentIndex = index;
      }
      updatePosition(true);
    }
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, autoplayInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Helper to handle navigation click with autoplay safety
  function handleNavigationClick(action) {
    stopAutoplay();
    action();
    startAutoplay();
  }

  // Interactivity
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      handleNavigationClick(() => goToSlide(index));
    });
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      handleNavigationClick(() => goToSlide(index));
    });
  });

  // Touch and Drag handlers
  function touchStart(event) {
    if (!isMobile) return;
    stopAutoplay();
    if (isTransitioning) return;
    
    // Only drag with primary mouse click or touch
    if (event.type === 'mousedown' && event.button !== 0) return;

    isDragging = true;
    startX = getPositionX(event);
    startTranslate = currentTranslate;
    track.style.transition = 'none';
  }

  // Set drag target cursor
  updateCursor();
  track.addEventListener('mousedown', () => {
    if (isMobile) track.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', () => {
    updateCursor();
  });

  function touchMove(event) {
    if (!isDragging) return;
    const currentX = getPositionX(event);
    const diff = currentX - startX;
    
    currentTranslate = startTranslate + diff;
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  function touchEnd() {
    if (!isDragging) return;
    isDragging = false;
    
    const diff = currentTranslate - startTranslate;
    
    if (diff < -dragThreshold) {
      nextSlide();
    } else if (diff > dragThreshold) {
      prevSlide();
    } else {
      goToSlide(currentIndex);
    }
    
    if (isMobile) {
      startAutoplay();
    }
  }

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
  }

  // Mouse Drag Events
  track.addEventListener('mousedown', touchStart);
  window.addEventListener('mousemove', touchMove);
  window.addEventListener('mouseup', () => {
    if (isDragging) touchEnd();
  });

  // Touch Events for Mobile
  track.addEventListener('touchstart', touchStart, { passive: true });
  track.addEventListener('touchmove', touchMove, { passive: true });
  track.addEventListener('touchend', touchEnd);

  // Resize handling
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      isMobile = window.innerWidth < 1024;
      updatePosition(true);
      updateCursor();
    }, 100);
  });

  function setupButtonNavigation() {
    // Both original and cloned buttons (for mobile loop compatibility)
    const yesBtns = track.querySelectorAll('.pm-btn--yes');
    yesBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleNavigationClick(nextSlide);
      });
    });

    const noBtns = track.querySelectorAll('.pm-btn--no');
    noBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleNavigationClick(prevSlide);
      });
    });
  }

  // Init
  requestAnimationFrame(() => {
    updatePosition(true);
    startAutoplay();
    updateCursor();
    setupButtonNavigation();
  });
});
