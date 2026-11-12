import { TextMorph } from 'torph';

/** The previous page's title, kept per browser tab. */
const STORAGE_KEY = 'page-title';

function readPrevious() {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function remember(title: string | null) {
  try {
    if (title) sessionStorage.setItem(STORAGE_KEY, title);
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage can be blocked. The title just won't morph on the next page.
  }
}

/**
 * Morphs the `[data-page-title]` heading from the previous page's title
 * into this page's, so moving between pages reads as one title changing.
 * Pages without a title clear the memory, so the next titled page doesn't
 * morph from a title two pages back. TextMorph skips the animation under
 * reduced motion and keeps the final text available to screen readers.
 */
export async function morphPageTitle() {
  const heading = document.querySelector<HTMLElement>('[data-page-title]');
  const title = heading?.textContent?.trim() || null;
  const previous = readPrevious();
  remember(title);

  // bfcache restores skip this script. Re-record the title so the next
  // navigation morphs from this page, not from the page we left.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) remember(title);
  });

  if (!heading || !title || !previous || previous === title) return;

  // TextMorph measures glyph widths, so measuring before Geist Pixel loads
  // gives fallback-font widths that the real text then overflows.
  const style = getComputedStyle(heading);
  try {
    await document.fonts.load(
      `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`,
      `${previous}${title}`,
    );
  } catch {
    return;
  }

  // TextMorph animates the heading's width from the old title to the new
  // one, so a longer title would wrap mid-morph. Keep it on one line while
  // it runs, then let long titles wrap again on narrow screens.
  const release = () => {
    heading.style.whiteSpace = '';
  };
  const morph = new TextMorph({
    element: heading,
    onAnimationComplete: release,
    onAnimationCancel: release,
  });

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  // The first update renders without animating; the second morphs.
  morph.update(previous);
  requestAnimationFrame(() => {
    heading.style.whiteSpace = 'nowrap';
    morph.update(title);
    // TextMorph skips its callbacks under reduced motion, so nowrap would
    // stick and long titles would overflow on small screens.
    if (reducedMotion) release();
  });
}
