import {
  configureTranslations,
  type TranslationKey,
  type TranslationPlaceholderNames,
} from '@better-translate/core';
import { defaultLocale, type Localized, locales, type Text } from './locales';
import { en } from './messages/en';
import { es } from './messages/es';

/**
 * The site's better-translate instance. Server-only: it holds every message
 * file, so islands get their copy as props instead of importing this.
 */
export const translator = await configureTranslations({
  availableLocales: locales,
  defaultLocale,
  fallbackLocale: defaultLocale,
  messages: { en, es },
});

type Messages = typeof en;

/** Every message key, as a dotted path such as `nav.about`. */
export type MessageKey = TranslationKey<Messages>;

/** Placeholder values for a key, each the same or per locale. */
type ParamsFor<TKey extends MessageKey> = [
  TranslationPlaceholderNames<Messages, TKey>,
] extends [never]
  ? []
  : [
      params: Record<
        TranslationPlaceholderNames<Messages, TKey>,
        Text | number
      >,
    ];

/**
 * English copy for a key. Used where the site stays English: the MCP
 * server, `/llms.txt`, SEO metadata, and social images.
 */
export const t = translator.t;

/**
 * Resolves a key in every locale. Params may themselves be localized, so a
 * translated role can sit inside a translated sentence.
 */
export function localize<TKey extends MessageKey>(
  key: TKey,
  ...args: ParamsFor<TKey>
): Localized {
  const [params] = args as [Record<string, Text | number>?];

  function resolve(locale: (typeof locales)[number]): string {
    const values = params
      ? Object.fromEntries(
          Object.entries(params).map(([name, value]) => [
            name,
            typeof value === 'object' ? value[locale] : value,
          ]),
        )
      : undefined;
    // The generic key and params are checked by `localize`'s signature.
    return (translator.t as (key: string, options: object) => string)(key, {
      locale,
      params: values,
    });
  }

  return { en: resolve('en'), es: resolve('es') };
}
