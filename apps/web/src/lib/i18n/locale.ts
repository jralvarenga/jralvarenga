/**
 * Language switching in the browser, without routes. Every page ships both
 * languages: visible text is rendered once per locale by `Translation`, and
 * the inactive copy is hidden from `<html lang>`. The inline script in
 * `Layout.astro` sets `lang` before paint from the stored choice, or from
 * the browser's languages when nothing is stored.
 */
import { fadeSwitch } from '../view-transition';
import { defaultLocale, isLocale, type Locale } from './locales';

/** Must match the key read by the inline script in `Layout.astro`. */
const STORAGE_KEY = 'locale';

/** Lets islands re-render their labels when the language changes. */
const LOCALE_CHANGE = 'localechange';

/** The language on screen, read from `<html lang>`. */
export function currentLocale(): Locale {
  const lang = document.documentElement.lang;
  return isLocale(lang) ? lang : defaultLocale;
}

/**
 * Subscribes to language changes from the footer menu.
 * Returns an unsubscribe function.
 */
export function subscribeLocale(listener: () => void): () => void {
  window.addEventListener(LOCALE_CHANGE, listener);
  return () => window.removeEventListener(LOCALE_CHANGE, listener);
}

/**
 * Points every attribute rendered by `localizedAttribute` at `locale`, such
 * as `aria-label` on the nav. Text content needs no script.
 */
export function localizeAttributes(locale: Locale): void {
  for (const element of document.querySelectorAll('[data-i18n-attr]')) {
    const name = element.getAttribute('data-i18n-attr');
    const value = element.getAttribute(`data-i18n-${locale}`);
    if (name && value !== null) element.setAttribute(name, value);
  }
}

/** Sets the tab title from `data-title-<locale>` on `<html>`, when present. */
function syncTitle(locale: Locale): void {
  const title = document.documentElement.getAttribute(`data-title-${locale}`);
  if (title) document.title = title;
}

function persistLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Storage can be blocked. The language still applies for this page.
  }
}

/**
 * Switches the page to `locale` in place: `<html lang>`, the tab title, and
 * localized attributes, cross-faded by `fadeSwitch`. The choice is stored
 * for the next page load, and islands are notified inside the transition.
 */
export function applyLocale(locale: Locale): void {
  fadeSwitch(() => {
    document.documentElement.lang = locale;
    syncTitle(locale);
    localizeAttributes(locale);
    persistLocale(locale);
    window.dispatchEvent(new Event(LOCALE_CHANGE));
  });
}
