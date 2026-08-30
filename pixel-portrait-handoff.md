# Pixel portrait sprite — implementation handoff

Pre-flight collateral for replacing the About-page depth-parallax portrait with a
cursor-tracking pixel-art avatar. All assets are generated and build-verified;
only the frontend remains.

## Assets (ready, in `src/public/images/`, served from `/images/` via passthrough)

- `profile-pixel-sheet-96.png` — **recommended**. 480×96, five 96×96 frames, 17KB.
- `profile-pixel-96.png` — center frame alone (static fallback), 96×96.
- `profile-pixel-sheet.png` / `profile-pixel.png` — 64px variants (chunkier look), 11KB. Use only if the site owner prefers the coarser aesthetic.
- `sprites/` — original 1024px AI generations (source material, keep; not referenced by the site).
- All frames share one 24-color palette quantized from the center frame; heads are aligned across frames.

## Frame order in the sheet (left → right, x-offset = index × frame-size)

| index | facing (viewer's perspective) | show when cursor is |
|---|---|---|
| 0 | strong left (~45°) | far left of portrait center |
| 1 | slight left (~20°) | moderately left |
| 2 | center | near center |
| 3 | slight right (~20°) | moderately right |
| 4 | strong right (~45°) | far right |

The avatar looks TOWARD the cursor: cursor left of the portrait → frame 0/1.

## Current state to replace

- `src/about.njk` — `#portrait-section` / `#portrait-tilt` holds a circular-cropped
  `<img src="/images/profile.jpeg">` plus a script include for `/assets/js/portrait-tilt.js`.
- `src/assets/js/portrait-tilt.js` — currently a WebGL depth-parallax effect
  (uses `/images/profile-depth.jpeg`). To be replaced entirely by the sprite-swap logic.
- `profile.jpeg` / `profile-depth.jpeg` can stay in the repo (fallback / history).

## Implementation notes (decided in prior discussion)

- Render the avatar as a div with the sheet as `background-image`,
  `image-rendering: pixelated`, sized ~224px in the existing circular frame
  (or drop the circle for a square/rounded pixel-art frame — pixel art often
  looks better uncropped; implementer's call, keep the dark border style).
- JS: track `pointermove` on `window` (viewport-wide, like MetaMask), compute
  horizontal offset from portrait center, bucket into the 5 frames with
  hysteresis (~10% of the bucket width) so it doesn't flicker at boundaries.
  Set `background-position`. **No easing/rAF loop — the discrete snap is the
  intended retro aesthetic.**
- Feature gates as before: `matchMedia('(hover: hover) and (pointer: fine)')`
  and `prefers-reduced-motion: reduce` → static center frame. No JS → static
  center frame (make center the default background/img).
- Zero dependencies. Dev server: `npm run start` → localhost:8080.
  Verify with a one-off Playwright script (Playwright is in devDependencies;
  a scratch script must `require()` it by absolute path from `node_modules`).
