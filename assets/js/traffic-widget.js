/**
 * Traffic Overflow Simulation - Card 6 Controller
 *
 * Runs a dynamic SVG traffic overflow loop. Spawns dots from the top source
 * node and directs them to 3 bottom nodes. The active target node gradually
 * fills green and receives a black checkmark when full.
 *
 * Runs immediately on page load.
 */

function initTrafficWidget() {
  console.log('Traffic Widget: initTrafficWidget started.');

  const widgetEl = document.getElementById('traffic-widget');
  const particlesGroup = document.getElementById('traffic-particles');
  if (!widgetEl || !particlesGroup) {
    console.warn('Traffic Widget: elements not found.');
    return;
  }

  // Node DOM elements with exact coordinates
  const nodes = {
    left: {
      fill: document.querySelector('#tn-left .node-fill'),
      checkmark: document.querySelector('#tn-left .node-checkmark'),
      x: 90,
      y: 145
    },
    center: {
      fill: document.querySelector('#tn-center .node-fill'),
      checkmark: document.querySelector('#tn-center .node-checkmark'),
      x: 200,
      y: 145
    },
    right: {
      fill: document.querySelector('#tn-right .node-fill'),
      checkmark: document.querySelector('#tn-right .node-checkmark'),
      x: 310,
      y: 145
    }
  };

  const SOURCE_X = 200;
  const SOURCE_Y = 35;
  const PARTICLE_SPAWN_INTERVAL_MS = 240; // Spawn a dot every 240ms (1200ms / 5 = 5 dots simultaneously)
  const TRANSITION_DURATION_MS = 1200; // Particle flight time

  // Simulation state variables
  let activePhase = 1; // 1 = Left, 2 = Center, 3 = Right, 4 = Full & Resetting
  let sequenceIdx = 0; // index to cycle through target sequences
  let spawnTimer = null;
  let timelineTimeoutId = null;
  let subTimelineTimeoutId = null;

  // Target sequences of 5 items for each phase
  // Phase 1 (Target Left): 3 Left, 1 Center, 1 Right
  // Phase 2 (Target Center): 1 Left, 3 Center, 1 Right
  // Phase 3 (Target Right): 1 Left, 1 Center, 3 Right
  function getSequence() {
    switch (activePhase) {
      case 1:
        return ['left', 'center', 'left', 'right', 'left'];
      case 2:
        return ['center', 'left', 'center', 'right', 'center'];
      case 3:
        return ['right', 'left', 'right', 'center', 'right'];
      default:
        return ['left', 'center', 'right', 'left', 'center'];
    }
  }

  // Spawns a single particle dot and animates it to a target node
  function spawnParticle() {
    const seq = getSequence();
    const targetKey = seq[sequenceIdx % seq.length];
    sequenceIdx++;

    const targetNode = nodes[targetKey];

    // Create SVG circle particle centered at 0, 0
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('r', '2.5');
    dot.setAttribute('fill', 'var(--accent)');
    dot.className.baseVal = 'traffic-dot';

    // Position initially at source coordinates using SVG transform style
    dot.style.transform = `translate3d(${SOURCE_X}px, ${SOURCE_Y}px, 0)`;
    particlesGroup.appendChild(dot);

    // Force layout calculation/style reflow to guarantee the transition starts from the source
    dot.getBoundingClientRect();

    // Trigger flight transition immediately to target coordinates
    dot.style.transform = `translate3d(${targetNode.x}px, ${targetNode.y}px, 0)`;

    // Clean up particle once it reaches target
    setTimeout(() => {
      dot.style.opacity = '0';
      setTimeout(() => {
        if (dot.parentNode === particlesGroup) {
          particlesGroup.removeChild(dot);
        }
      }, 150);
    }, TRANSITION_DURATION_MS);
  }

  // Manages timeline phases and step-wise opacity updates
  function runTimeline() {
    // Clear any active sub-timeouts to prevent overlapping triggers
    if (subTimelineTimeoutId) clearTimeout(subTimelineTimeoutId);

    if (activePhase === 1) {
      console.log('Traffic Widget Phase 1: Left filling');
      
      // Seed initial opacities
      if (nodes.left.fill) nodes.left.fill.style.opacity = '0';
      if (nodes.left.checkmark) nodes.left.checkmark.style.opacity = '0';
      if (nodes.center.fill) nodes.center.fill.style.opacity = '0';
      if (nodes.center.checkmark) nodes.center.checkmark.style.opacity = '0';
      if (nodes.right.fill) nodes.right.fill.style.opacity = '0';
      if (nodes.right.checkmark) nodes.right.checkmark.style.opacity = '0';

      // Wave 1: Arrives at 1200ms -> opacity becomes 0.33
      subTimelineTimeoutId = setTimeout(() => {
        if (nodes.left.fill) nodes.left.fill.style.opacity = '0.33';

        // Wave 2: Arrives at 2400ms -> opacity becomes 0.66
        subTimelineTimeoutId = setTimeout(() => {
          if (nodes.left.fill) nodes.left.fill.style.opacity = '0.66';

          // Wave 3: Arrives at 3600ms -> opacity becomes 1.0, show checkmark
          subTimelineTimeoutId = setTimeout(() => {
            if (nodes.left.fill) nodes.left.fill.style.opacity = '1';
            if (nodes.left.checkmark) nodes.left.checkmark.style.opacity = '1';

            // Wait 600ms pause with full state showing, then transition
            subTimelineTimeoutId = setTimeout(() => {
              activePhase = 2;
              runTimeline();
            }, 600);
          }, 1200);
        }, 1200);
      }, 1200);
      
    } else if (activePhase === 2) {
      console.log('Traffic Widget Phase 2: Center filling');

      // Wave 1: Arrives at 1200ms -> opacity becomes 0.33
      subTimelineTimeoutId = setTimeout(() => {
        if (nodes.center.fill) nodes.center.fill.style.opacity = '0.33';

        // Wave 2: Arrives at 2400ms -> opacity becomes 0.66
        subTimelineTimeoutId = setTimeout(() => {
          if (nodes.center.fill) nodes.center.fill.style.opacity = '0.66';

          // Wave 3: Arrives at 3600ms -> opacity becomes 1.0, show checkmark
          subTimelineTimeoutId = setTimeout(() => {
            if (nodes.center.fill) nodes.center.fill.style.opacity = '1';
            if (nodes.center.checkmark) nodes.center.checkmark.style.opacity = '1';

            // Wait 600ms pause with full state showing, then transition
            subTimelineTimeoutId = setTimeout(() => {
              activePhase = 3;
              runTimeline();
            }, 600);
          }, 1200);
        }, 1200);
      }, 1200);

    } else if (activePhase === 3) {
      console.log('Traffic Widget Phase 3: Right filling');

      // Wave 1: Arrives at 1200ms -> opacity becomes 0.33
      subTimelineTimeoutId = setTimeout(() => {
        if (nodes.right.fill) nodes.right.fill.style.opacity = '0.33';

        // Wave 2: Arrives at 2400ms -> opacity becomes 0.66
        subTimelineTimeoutId = setTimeout(() => {
          if (nodes.right.fill) nodes.right.fill.style.opacity = '0.66';

          // Wave 3: Arrives at 3600ms -> opacity becomes 1.0, show checkmark
          subTimelineTimeoutId = setTimeout(() => {
            if (nodes.right.fill) nodes.right.fill.style.opacity = '1';
            if (nodes.right.checkmark) nodes.right.checkmark.style.opacity = '1';

            // Wait 2000ms pause with all 3 full states showing, then reset
            subTimelineTimeoutId = setTimeout(() => {
              activePhase = 4;
              runTimeline();
            }, 2000);
          }, 1200);
        }, 1200);
      }, 1200);

    } else if (activePhase === 4) {
      console.log('Traffic Widget Phase 4: Resetting state');
      
      // Fade out fills and checkmarks simultaneously over 500ms
      Object.keys(nodes).forEach(key => {
        if (nodes[key].fill) nodes[key].fill.style.opacity = '0';
        if (nodes[key].checkmark) nodes[key].checkmark.style.opacity = '0';
      });

      subTimelineTimeoutId = setTimeout(() => {
        // Return to Phase 1 and loop
        activePhase = 1;
        runTimeline();
      }, 600);
    }
  }

  // Initialize and run loops immediately
  spawnParticle(); // Spawn first particle instantly
  spawnTimer = setInterval(spawnParticle, PARTICLE_SPAWN_INTERVAL_MS);
  runTimeline();
}
