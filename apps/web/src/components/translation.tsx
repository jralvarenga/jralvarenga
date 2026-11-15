import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import {
  defaultLocale,
  isInvariant,
  type Locale,
  locales,
  type Text,
} from '../lib/i18n/locales';

/**
 * `<html lang>` is set before paint, and `<body>` carries the default
 * marker, so each copy shows or hides from the page language with no
 * hydration. `display: contents` keeps the wrapper out of layout, and
 * `display: none` keeps the hidden copy away from screen readers.
 */
const styles = stylex.create({
  en: {
    display: {
      default: 'contents',
      [stylex.when.ancestor(':lang(es)')]: 'none',
    },
  },
  es: {
    display: {
      default: 'none',
      [stylex.when.ancestor(':lang(es)')]: 'contents',
    },
  },
});

const localeStyles: Record<Locale, stylex.StyleXStyles> = {
  en: styles.en,
  es: styles.es,
};

interface Props {
  /** A plain string, one string per locale, or markup per locale. */
  value: Text | Readonly<Record<Locale, ReactNode>>;
  /** Wrapper element. Use `div` around block content such as markdown. */
  as?: 'span' | 'div';
}

/**
 * Renders text in every locale and shows the one matching `<html lang>`.
 * Text that reads the same everywhere renders once, with no wrapper.
 */
export function Translation({ value, as: Element = 'span' }: Props) {
  if (typeof value === 'string') return value;
  if (
    locales.every((locale) => typeof value[locale] === 'string') &&
    isInvariant(value as Text)
  ) {
    return value[defaultLocale];
  }

  return locales.map((locale) => (
    <Element key={locale} lang={locale} {...stylex.props(localeStyles[locale])}>
      {value[locale]}
    </Element>
  ));
}
