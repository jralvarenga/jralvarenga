/**
 * Pixel reveal for text set in Geist Pixel. Each glyph is sampled on the
 * font's own pixel grid, then its pixels pop in on a canvas that sits exactly
 * over the text, in batches on a slow clock, left to right. Then the real
 * text replaces the canvas.
 */

/** Geist Pixel draws every glyph from squares of 38 units on a 1000 unit em. */
const PIXEL_EM = 0.038;

/** Time for the sweep to cross the whole text. */
const SWEEP_MS = 800;
/** Extra delay for each wrapped line. */
const LINE_MS = 160;
/** Random spread per pixel, so each step fills a ragged patch. */
const JITTER_MS = 240;
/**
 * The canvas only redraws on this clock, so pixels land in visible batches
 * with a pause between each one, like a low frame rate.
 */
const STEP_MS = 80;

interface Cell {
  x: number;
  y: number;
  start: number;
}

interface Glyph {
  char: string;
  left: number;
  baseline: number;
  line: number;
}

/** Reads one character rect per glyph, relative to `root`, skipping spaces. */
function measureGlyphs(text: HTMLElement, root: DOMRect, ascent: number) {
  const glyphs: Glyph[] = [];
  const range = document.createRange();
  const walker = document.createTreeWalker(text, NodeFilter.SHOW_TEXT);
  let lineTop = Number.NEGATIVE_INFINITY;
  let line = -1;

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const value = node.textContent ?? '';

    for (let index = 0; index < value.length; index++) {
      const char = value.charAt(index);
      if (char.trim() === '') continue;

      range.setStart(node, index);
      range.setEnd(node, index + 1);
      const rect = range.getBoundingClientRect();

      if (rect.top > lineTop + 1) {
        lineTop = rect.top;
        line++;
      }

      glyphs.push({
        char,
        left: rect.left - root.left,
        baseline: rect.top - root.top + ascent,
        line,
      });
    }
  }

  return glyphs;
}

/** Returns the grid cells a glyph fills, as offsets from its origin. */
function sampleGlyph(
  context: CanvasRenderingContext2D,
  font: string,
  char: string,
  pixel: number,
  ascent: number,
  descent: number,
) {
  const width = Math.ceil(context.measureText(char).width + pixel * 2);
  const height = Math.ceil(ascent + descent);
  context.canvas.width = width;
  context.canvas.height = height;
  // Resizing the canvas resets its state, so set the font again.
  context.font = font;
  context.clearRect(0, 0, width, height);
  context.fillText(char, 0, ascent);

  const { data } = context.getImageData(0, 0, width, height);
  const filled: { column: number; row: number }[] = [];
  const columns = Math.floor(width / pixel);
  const above = Math.floor(ascent / pixel);
  const below = Math.floor(descent / pixel);

  for (let column = 0; column < columns; column++) {
    for (let row = -above; row < below; row++) {
      const x = Math.floor((column + 0.5) * pixel);
      const y = Math.floor(ascent + (row + 0.5) * pixel);
      if (y < 0 || y >= height) continue;
      if ((data[(y * width + x) * 4 + 3] ?? 0) > 127) {
        filled.push({ column, row });
      }
    }
  }

  return filled;
}

/** Builds every pixel of the text with the time it appears. */
function buildCells(text: HTMLElement, root: DOMRect, font: string) {
  const fontSize = Number.parseFloat(getComputedStyle(text).fontSize);
  const pixel = fontSize * PIXEL_EM;
  const context = document
    .createElement('canvas')
    .getContext('2d', { willReadFrequently: true });
  if (!context) return { cells: [], pixel };

  context.font = font;
  const metrics = context.measureText('Hg');
  const ascent = metrics.fontBoundingBoxAscent;
  const descent = metrics.fontBoundingBoxDescent;
  const glyphs = measureGlyphs(text, root, ascent);
  const cells: Cell[] = [];

  for (const glyph of glyphs) {
    const filled = sampleGlyph(
      context,
      font,
      glyph.char,
      pixel,
      ascent,
      descent,
    );
    for (const { column, row } of filled) {
      const x = glyph.left + column * pixel;
      const sweep = (x / root.width) * SWEEP_MS + glyph.line * LINE_MS;
      cells.push({
        x,
        y: glyph.baseline + row * pixel,
        start: sweep + Math.random() * JITTER_MS,
      });
    }
  }

  return { cells, pixel };
}

/** Shows the real text and removes the canvas. */
function finish(text: HTMLElement, canvas?: HTMLCanvasElement) {
  text.style.animation = 'none';
  text.style.opacity = '1';
  canvas?.remove();
}

/** Runs the reveal on one `[data-pixel-reveal]` element. */
export async function revealPixels(root: HTMLElement) {
  const text = root.querySelector<HTMLElement>('[data-pixel-reveal-text]');
  if (!text) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finish(text);
    return;
  }

  // Stop the CSS fallback from showing the text while the font loads.
  text.style.animation = 'none';

  const style = getComputedStyle(text);
  const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

  try {
    await document.fonts.load(font, text.textContent ?? '');
  } catch {
    finish(text);
    return;
  }

  const bounds = root.getBoundingClientRect();
  const { cells, pixel } = buildCells(text, bounds, font);
  if (cells.length === 0) {
    finish(text);
    return;
  }

  // The canvas overhangs the box, since glyphs extend past a line height of 1.
  const overhang = Math.ceil(pixel * 8);
  const ratio = window.devicePixelRatio || 1;
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.width = Math.ceil((bounds.width + overhang * 2) * ratio);
  canvas.height = Math.ceil((bounds.height + overhang * 2) * ratio);
  Object.assign(canvas.style, {
    position: 'absolute',
    left: `${-overhang}px`,
    top: `${-overhang}px`,
    width: `${bounds.width + overhang * 2}px`,
    height: `${bounds.height + overhang * 2}px`,
    pointerEvents: 'none',
  });
  root.append(canvas);

  const context = canvas.getContext('2d');
  if (!context) {
    finish(text, canvas);
    return;
  }

  context.scale(ratio, ratio);
  context.translate(overhang, overhang);
  context.fillStyle = style.color;

  // Hold the finished word for one step before swapping in the text.
  const end = Math.max(...cells.map((cell) => cell.start)) + STEP_MS;
  const size = pixel + 0.5 / ratio;
  let origin: number | undefined;
  let lastFrame = -1;

  const abort = () => finish(text, canvas);
  window.addEventListener('resize', abort, { once: true });

  const draw = (now: number) => {
    origin ??= now;
    const time = now - origin;
    const frame = Math.floor(time / STEP_MS);

    if (time >= end) {
      window.removeEventListener('resize', abort);
      finish(text, canvas);
      return;
    }

    if (frame !== lastFrame) {
      lastFrame = frame;
      const stepped = frame * STEP_MS;
      context.clearRect(-overhang, -overhang, canvas.width, canvas.height);

      for (const cell of cells) {
        if (cell.start > stepped) continue;
        context.fillRect(cell.x, cell.y, size, size);
      }
    }

    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
}
