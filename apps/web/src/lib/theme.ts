/**
 * Theme switching. The theme is forced through `data-theme` on `<html>` and
 * stored in `localStorage`, and the inline script in `Layout.astro` applies
 * it before paint. Without a stored choice the page follows the system.
 */

type Theme = 'light' | 'dark';

/** Must match the key read by the inline script in `Layout.astro`. */
const STORAGE_KEY = 'theme';

const HOTKEY = 'd';

/** The theme on screen, whether forced or from the system. */
function currentTheme(): Theme {
  const forced = document.documentElement.dataset.theme;
  if (forced === 'light' || forced === 'dark') return forced;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Turns off every transition for one frame, so the switch is instant
 * instead of animating each color, like `disableTransitionOnChange` in
 * next-themes.
 */
function withoutTransitions(change: () => void) {
  const style = document.createElement('style');
  style.textContent = '*,*::before,*::after{transition:none!important}';
  document.head.append(style);
  change();
  // Force a style recalc before the transitions come back.
  window.getComputedStyle(document.body).opacity;
  requestAnimationFrame(() => style.remove());
}

function setTheme(theme: Theme) {
  withoutTransitions(() => {
    document.documentElement.dataset.theme = theme;
  });

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked. The theme still applies for this page.
  }
}

export function toggleTheme() {
  setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
}

/** True when the key press belongs to a text field, not the page. */
function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  );
}

/** Toggles the theme when D is pressed outside text fields. */
export function bindThemeHotkey() {
  document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() !== HOTKEY) return;
    if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
    if (isTyping(event.target)) return;
    toggleTheme();
  });
}
