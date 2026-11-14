import {
  defaultLocale,
  isInvariant,
  locales,
  type Text,
  textIn,
} from './locales';

/** Props for one localized attribute. */
export type LocalizedAttribute = Record<string, string>;

/**
 * Props that render an attribute, such as `aria-label`, in English and
 * carry every translation in `data-i18n-<locale>`. `localizeAttributes` in
 * `locale.ts` swaps the value in the browser. Text that reads the same in
 * every locale renders the plain attribute only. One per element.
 */
export function localizedAttribute(
  name: string,
  text: Text,
): LocalizedAttribute {
  const value = textIn(text, defaultLocale);
  if (isInvariant(text)) return { [name]: value };

  const attributes: LocalizedAttribute = {
    [name]: value,
    'data-i18n-attr': name,
  };
  for (const locale of locales) {
    attributes[`data-i18n-${locale}`] = textIn(text, locale);
  }
  return attributes;
}
