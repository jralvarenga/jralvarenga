import * as stylex from '@stylexjs/stylex';
import { colors, font, text } from './tokens.stylex';

const styles = stylex.create({
  body: {
    backgroundColor: colors.background,
    color: colors.foreground,
    fontFamily: font.sans,
    fontSize: text.md,
    lineHeight: 1.6,
  },
});

/**
 * Class name for `<body>`. Astro files can't compile StyleX, so the layout
 * imports this precompiled class instead.
 */
export const bodyClass: string = stylex.props(styles.body).className ?? '';
