// Cursor-tracking pixel-art portrait.
// Sprite sheet: 7 frames of 96×96 — 0–4 horizontal (strong left, slight
// left, center, slight right, strong right — viewer's perspective),
// 5 looking up, 6 looking down. The avatar looks toward the cursor by
// snapping between frames; no easing by design.
(function () {
  'use strict';

  var el = document.getElementById('pixel-portrait');
  if (!el) return;

  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var CENTER_FRAME = 2;
  var UP_FRAME = 5;
  var DOWN_FRAME = 6;
  var currentFrame = CENTER_FRAME;
  // Hysteresis: cursor must move past a boundary by this fraction of the
  // bucket width before the frame switches, so it doesn't flicker there.
  var HYSTERESIS = 0.1;
  // Vertical takes over when the cursor is this many portrait-heights
  // above/below center AND more vertical than horizontal.
  var VERTICAL_THRESHOLD = 0.75;

  function setFrame(frame) {
    if (frame === currentFrame) return;
    currentFrame = frame;
    // background-size is 700% 100%, so frames sit at i × 100/6 %.
    el.style.backgroundPosition = (frame * 100 / 6) + '% 0';
  }

  function horizontalFrame(dx, w, from) {
    var bounds = [-1.5 * w, -0.5 * w, 0.5 * w, 1.5 * w];
    var h = HYSTERESIS * w;
    var candidate = 0;
    while (candidate < 4 && dx > bounds[candidate]) candidate++;

    // Hysteresis only applies when moving between horizontal frames.
    if (from >= 0 && from <= 4 && candidate !== from) {
      if (candidate > from && dx < bounds[candidate - 1] + h) return from;
      if (candidate < from && dx > bounds[candidate] - h) return from;
    }
    return candidate;
  }

  function onPointerMove(e) {
    if (reducedMotion.matches) return;
    var rect = el.getBoundingClientRect();
    var dx = e.clientX - (rect.left + rect.width / 2);
    var dy = e.clientY - (rect.top + rect.height / 2);
    var w = rect.width || 1;
    var h = rect.height || 1;

    // Entering a vertical frame requires clearing the threshold plus
    // hysteresis; leaving one requires dropping below it minus hysteresis.
    var inVertical = currentFrame === UP_FRAME || currentFrame === DOWN_FRAME;
    var margin = (inVertical ? -HYSTERESIS : HYSTERESIS) * h;
    var vertical = Math.abs(dy) > VERTICAL_THRESHOLD * h + margin &&
                   Math.abs(dy) > Math.abs(dx);

    if (vertical) {
      setFrame(dy < 0 ? UP_FRAME : DOWN_FRAME);
    } else {
      setFrame(horizontalFrame(dx, w, currentFrame));
    }
  }

  function enable() {
    window.addEventListener('pointermove', onPointerMove);
  }

  function disable() {
    window.removeEventListener('pointermove', onPointerMove);
    setFrame(CENTER_FRAME);
  }

  function sync() {
    if (fine.matches && !reducedMotion.matches) {
      enable();
    } else {
      disable();
    }
  }

  var onChange = function () { disable(); sync(); };
  if (fine.addEventListener) {
    fine.addEventListener('change', onChange);
    reducedMotion.addEventListener('change', onChange);
  }

  sync();
})();
