import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import { colors, font, radius, space, text } from '../../styles/tokens.stylex';

const styles = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.x1,
    height: '24px',
    paddingInline: space.x2,
    borderRadius: radius.sm,
    backgroundColor: colors.muted,
    color: colors.mutedForeground,
    fontFamily: font.mono,
    fontSize: text.sm,
    lineHeight: 1,
    whiteSpace: 'nowrap',
  },
});

interface Props {
  children: ReactNode;
  /** StyleX overrides applied last. */
  xstyle?: stylex.StyleXStyles;
}

/**
 * A small flat label for a status or a technology. Static content, so it
 * has no elevation.
 */
export function Tag({ children, xstyle }: Props) {
  return <span {...stylex.props(styles.root, xstyle)}>{children}</span>;
}
