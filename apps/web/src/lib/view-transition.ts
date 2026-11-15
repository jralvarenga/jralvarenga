/**
 * Cross-fades the whole page through a same-document view transition when a
 * setting changes, such as the theme or the language. While it runs,
 * `<html>` carries `data-view-switch`, so global.css can turn every layer,
 * including the named header ones, into one plain crossfade instead of the
 * page-navigation motion.
 */

/** Must match the attribute global.css reads. */
const SWITCH_ATTRIBUTE = 'data-view-switch';

/** The transition that owns `data-view-switch` right now. */
let active: ViewTransition | undefined;

/** True when the user asked for less motion. */
function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Runs `update` inside a view transition, so the old page fades into the
 * new one. Without the API, or under reduced motion, it runs `update` at
 * once. `update` must change the DOM synchronously.
 */
export function fadeSwitch(update: () => void): void {
  if (!document.startViewTransition || prefersReducedMotion()) {
    update();
    return;
  }

  const root = document.documentElement;
  root.setAttribute(SWITCH_ATTRIBUTE, '');
  const transition = document.startViewTransition(update);
  active = transition;

  // A newer switch skips this one; only the latest clears the attribute.
  function clear() {
    if (active !== transition) return;
    active = undefined;
    root.removeAttribute(SWITCH_ATTRIBUTE);
  }
  transition.finished.then(clear, clear);
}
