import type { Locale, Localized } from '../i18n/locales';

const monthFormats: Record<Locale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }),
  es: new Intl.DateTimeFormat('es', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }),
};

/** Formats a `YYYY-MM` month in every locale, as "Jun 2026" and "jun 2026". */
export function formatMonth(month: string): Localized {
  const date = new Date(`${month}-01T00:00:00Z`);
  return {
    en: monthFormats.en.format(date),
    es: monthFormats.es.format(date),
  };
}
