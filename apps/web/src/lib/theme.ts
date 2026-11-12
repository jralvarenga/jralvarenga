/**
 * Theme switching. The theme is forced through `data-theme` on `<html>` and
 * stored in `localStorage`, and the inline script in `Layout.astro` applies
 * it before paint. Without a stored choice the page follows the system.
 */

type Theme = 'light' | 'dark';

/** Stored preference, or `system` when nothing is stored. */
export type ThemePreference = Theme | 'system';

/** Must match the key read by the inline script in `Layout.astro`. */
const STORAGE_KEY = 'theme';

const HOTKEY = 'd';

/** Lets `/ui` keep its theme buttons in sync with the D hotkey. */
const THEME_CHANGE = 'themechange';

function notifyThemeChange() {
  window.dispatchEvent(new Event(THEME_CHANGE));
}

/**
 * Subscribes to theme changes from the hotkey or `applyPreference`.
 * Returns an unsubscribe function.
 */
export function subscribeTheme(listener: () => void) {
  window.addEventListener(THEME_CHANGE, listener);
  return () => window.removeEventListener(THEME_CHANGE, listener);
}

/** The stored preference, or `system` when none is stored. */
export function readPreference(): ThemePreference {
  try {
    const theme = localStorage.getItem(STORAGE_KEY);
    if (theme === 'light' || theme === 'dark') return theme;
  } catch {
    // Storage can be blocked. Fall through to the live theme on `<html>`.
  }
  const forced = document.documentElement.dataset.theme;
  if (forced === 'light' || forced === 'dark') return forced;
  return 'system';
}

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

function persistPreference(theme: ThemePreference) {
  try {
    if (theme === 'system') localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked. The theme still applies for this page.
  }
}

/**
 * Forces light or dark, or clears the force so the page follows the system.
 * The choice is stored, and `/ui` is notified so its selector stays in sync.
 */
export function applyPreference(theme: ThemePreference) {
  withoutTransitions(() => {
    if (theme === 'system') {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = theme;
    }
  });
  persistPreference(theme);
  notifyThemeChange();
}

export function toggleTheme() {
  applyPreference(currentTheme() === 'dark' ? 'light' : 'dark');
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
