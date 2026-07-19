document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('honeycomb-grid');
  const panel = document.getElementById('honeycomb-panel');
  const toggleBtn = document.getElementById('panel-toggle');
  
  if (!container) return;

  // Configuration default values
  const config = {
    cols: 17,
    rows: 7,
    depth: 2,
    stepSpan: 2,
    cellSize: 90,
    gap: 10,
    roundness: 10,
    verticalFade: 0.7,
    horizontalFade: 0.1,
    minOpacity: 0.1
  };

  // Bind panel inputs
  const inputs = {
    cols: document.getElementById('control-cols'),
    rows: document.getElementById('control-rows'),
    depth: document.getElementById('control-depth'),
    stepSpan: document.getElementById('control-stepSpan'),
    size: document.getElementById('control-size'),
    gap: document.getElementById('control-gap'),
    roundness: document.getElementById('control-roundness'),
    vfade: document.getElementById('control-vfade'),
    hfade: document.getElementById('control-hfade')
  };

  const valDisplays = {
    cols: document.getElementById('val-cols'),
    rows: document.getElementById('val-rows'),
    depth: document.getElementById('val-depth'),
    stepSpan: document.getElementById('val-stepSpan'),
    size: document.getElementById('val-size'),
    gap: document.getElementById('val-gap'),
    roundness: document.getElementById('val-roundness'),
    vfade: document.getElementById('val-vfade'),
    hfade: document.getElementById('val-hfade')
  };

  // Toggle collapsible control panel
  if (toggleBtn && panel) {
    toggleBtn.addEventListener('click', () => {
      panel.classList.toggle('collapsed');
    });
  }

  // Setup input listeners
  Object.keys(inputs).forEach((key) => {
    const input = inputs[key];
    if (!input) return;

    input.addEventListener('input', (e) => {
      let val = parseFloat(e.target.value);
      
      // Update config object
      if (key === 'size') {
        config.cellSize = val;
        if (valDisplays.size) valDisplays.size.textContent = `${val}px`;
      } else if (key === 'gap') {
        config.gap = val;
        if (valDisplays.gap) valDisplays.gap.textContent = `${val}px`;
      } else if (key === 'roundness') {
        config.roundness = val;
        if (valDisplays.roundness) valDisplays.roundness.textContent = `${val}%`;
        updateClipPath();
      } else if (key === 'vfade') {
        config.verticalFade = val;
        if (valDisplays.vfade) valDisplays.vfade.textContent = val.toFixed(2);
      } else if (key === 'hfade') {
        config.horizontalFade = val;
        if (valDisplays.hfade) valDisplays.hfade.textContent = val.toFixed(2);
      } else {
        config[key] = val;
        if (valDisplays[key]) valDisplays[key].textContent = val;
      }
      
      // Re-render
      renderHoneycomb();
    });
  });

  // Generate hex clip-path SVG `d` attribute with variable corner roundness
  function updateClipPath() {
    const r = config.roundness / 100; // 0 to 0.5
    // Hex vertices in objectBoundingBox coordinates (flat-top)
    const V = [
      [0.75, 0],     // upper-right
      [1,   0.5],    // right
      [0.75, 1],     // lower-right
      [0.25, 1],     // lower-left
      [0,   0.5],    // left
      [0.25, 0]      // upper-left
    ];
    const n = V.length;
    let d = '';

    for (let i = 0; i < n; i++) {
      const prev = V[(i - 1 + n) % n];
      const curr = V[i];
      const next = V[(i + 1) % n];

      // Point before corner: lerp from curr toward prev by r
      const bx = curr[0] + (prev[0] - curr[0]) * r;
      const by = curr[1] + (prev[1] - curr[1]) * r;

      // Point after corner: lerp from curr toward next by r
      const ax = curr[0] + (next[0] - curr[0]) * r;
      const ay = curr[1] + (next[1] - curr[1]) * r;

      if (i === 0) {
        d += `M ${bx.toFixed(4)},${by.toFixed(4)} `;
      } else {
        d += `L ${bx.toFixed(4)},${by.toFixed(4)} `;
      }
      d += `Q ${curr[0].toFixed(4)},${curr[1].toFixed(4)} ${ax.toFixed(4)},${ay.toFixed(4)} `;
    }
    d += 'Z';

    const pathEl = document.querySelector('#hex-clip path');
    if (pathEl) pathEl.setAttribute('d', d);
  }

  // Main rendering function
  function renderHoneycomb() {
    container.innerHTML = '';

    const isMobile = window.innerWidth < 768;
    // Scale cell size and gap on mobile devices
    const size = isMobile ? config.cellSize * 0.6 : config.cellSize;
    const gap = isMobile ? config.gap * 0.6 : config.gap;

    // Equilateral flat-topped hexagon dimensions
    // Height = size, Width = size * 2 / sqrt(3)
    const cellHeight = size;
    const cellWidth = size * (2 / Math.sqrt(3));

    // For flat-topped hexagons with a uniform gap `gap` between all adjacent edges:
    // Center-to-center vertical step inside a column:
    const vStep = size + gap;
    // Vertical shift for alternate columns:
    const vOffset = vStep / 2;
    // Horizontal step between adjacent columns:
    const hStep = vStep * (Math.sqrt(3) / 2);

    const c_mid = (config.cols - 1) / 2;

    // Track max Y for container height
    let maxY = 0;

    // Loop through columns and rows
    for (let c = 0; c < config.cols; c++) {
      // Distance from closest edge column
      const distFromEdge = Math.min(c, config.cols - 1 - c);

      // Saddle shape: edges have full height, center columns are shorter
      // Every stepSpan columns inward from the edge, cut 1 more row top & bottom
      const stepsFromEdge = Math.floor(distFromEdge / config.stepSpan);
      const cutCount = Math.min(config.depth, stepsFromEdge);

      const topCutoff = cutCount;
      const bottomCutoff = (config.rows - 1) - cutCount;

      // Chess-like stagger: odd columns shift down by vOffset
      const isShifted = c % 2 !== 0;
      const colShift = isShifted ? vOffset : 0;

      for (let r = 0; r < config.rows; r++) {
        // Render only cells within the saddle boundaries
        if (r >= topCutoff && r <= bottomCutoff) {
          const x = c * hStep;
          const y = r * vStep + colShift;

          // Calculate opacity fading toward edges
          const colHeight = bottomCutoff - topCutoff;
          const colCenter = topCutoff + colHeight / 2;
          const distRow = colHeight > 0 ? Math.abs(r - colCenter) / (colHeight / 2) : 0;
          const distCol = c_mid > 0 ? Math.abs(c - c_mid) / c_mid : 0;

          const opacity = (1 - distCol * (1 - config.horizontalFade)) * (1 - distRow * (1 - config.verticalFade));
          const finalOpacity = Math.max(config.minOpacity, Math.min(1, opacity));

          // Create cell
          const cell = document.createElement('div');
          cell.className = 'honeycomb-cell';
          cell.style.width = `${cellWidth}px`;
          cell.style.height = `${cellHeight}px`;
          cell.style.left = `${x}px`;
          cell.style.top = `${y}px`;
          cell.style.opacity = finalOpacity;

          // Track max bottom edge
          if (y + cellHeight > maxY) maxY = y + cellHeight;

          // Stable avatar face image based on coordinate index (1 to 86) from local assets
          const imgId = ((c * 7 + r * 13) % 86) + 1;
          const img = document.createElement('img');
          img.src = `../assets/images/all/ava/lead-${imgId}.webp`;
          img.alt = `Partner cell ${c}-${r}`;
          img.loading = 'lazy';

          cell.appendChild(img);
          container.appendChild(cell);
        }
      }
    }

    // Set dimensions of the absolute container
    const containerWidth = (config.cols - 1) * hStep + cellWidth;
    const containerHeight = maxY;

    container.style.width = `${containerWidth}px`;
    container.style.height = `${containerHeight}px`;
  }

  // Initial clip-path and draw
  updateClipPath();
  renderHoneycomb();

  // Watch resize events with simple throttle
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(renderHoneycomb, 100);
  });
});
