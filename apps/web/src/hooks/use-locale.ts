import { useSyncExternalStore } from 'react';
import { currentLocale, subscribeLocale } from '../lib/i18n/locale';
import { defaultLocale, type Locale } from '../lib/i18n/locales';

function serverLocale(): Locale {
  return defaultLocale;
}

/**
 * The language on screen, for islands that build attributes such as
 * `aria-label`. Hydrates as English to match the static HTML, then follows
 * `<html lang>` and the footer menu.
 */
export function useLocale(): Locale {
  return useSyncExternalStore(subscribeLocale, currentLocale, serverLocale);
}
