/**
 * Locales the site is offered in, and the text types shared by the server
 * render and the browser. This file is safe to import from islands: it does
 * not load the translator or the message files.
 */

export const locales = ['en', 'es'] as const;

export type Locale = (typeof locales)[number];

/** English is the default and the fallback for missing translations. */
export const defaultLocale: Locale = 'en';

/** One string per locale. */
export type Localized = Readonly<Record<Locale, string>>;

/** Text that is the same in every locale, or one string per locale. */
export type Text = string | Localized;

/** A language the footer menu offers, labeled in its own language. */
export type Language = {
  locale: Locale;
  label: string;
};

export const languages: readonly Language[] = [
  { locale: 'en', label: 'English' },
  { locale: 'es', label: 'Español' },
];

/**
 * The language names as one localized string, so the menu trigger can show
 * the active one without hydrating.
 */
export const languageNames: Localized = { en: 'English', es: 'Español' };

/** True when `value` is a supported locale code. */
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.some((code) => code === value);
}

/** Returns `text` in `locale`. A plain string is the same in every locale. */
export function textIn(text: Text, locale: Locale): string {
  return typeof text === 'string' ? text : text[locale];
}

/** True when `text` reads the same in every locale. */
export function isInvariant(text: Text): boolean {
  if (typeof text === 'string') return true;
  return locales.every((locale) => text[locale] === text[defaultLocale]);
}
