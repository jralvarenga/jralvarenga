import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import { profile } from '../../lib/about/profile';
import { siteLicense, siteUpdated } from '../../lib/colophon';
import { layout } from '../../styles/layout';
import { colors, font, motion, space, text } from '../../styles/tokens.stylex';
import { ScrollEdge } from './scroll-edge';

const styles = stylex.create({
  footer: {
    marginTop: 'auto',
    paddingBottom: {
      default: space.x12,
      '@media (min-width: 640px)': space.x16,
    },
  },
  inner: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.x3,
    paddingTop: space.x6,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.border,
  },
  info: {
    fontSize: text.sm,
    lineHeight: 1.5,
    color: colors.mutedForeground,
  },
  copyright: {
    fontFamily: font.mono,
    fontVariantNumeric: 'tabular-nums',
  },
  link: {
    color: {
      default: colors.mutedForeground,
      ':hover': colors.foreground,
    },
    textDecoration: 'none',
    transitionProperty: 'color',
    transitionDuration: motion.fast,
    transitionTimingFunction: motion.easeOut,
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.ring}`,
    },
    outlineOffset: '2px',
    borderRadius: '2px',
  },
  // Pinned to the bottom of the screen, mirroring the header's edge.
  edge: {
    position: 'fixed',
    insetInline: 0,
    bottom: 0,
    zIndex: 10,
    height: space.x12,
    viewTransitionName: 'bottom-edge',
  },
});

interface Props {
  /** The interactive controls (language and theme), hydrated separately. */
  settings?: ReactNode;
}

/**
 * Site footer: the copyright and license, and the language and theme controls. A soft scroll edge along
 * the bottom of the screen mirrors the header's.
 */
export function Footer({ settings }: Props) {
  return (
    <>
      <footer {...stylex.props(layout.column, styles.footer)}>
        <div {...stylex.props(styles.inner)}>
          <p {...stylex.props(styles.info, styles.copyright)}>
            © {siteUpdated.getUTCFullYear()} {profile.name} ·{' '}
            <a
              href={siteLicense}
              target="_blank"
              rel="noreferrer"
              {...stylex.props(styles.link)}
            >
              MIT License
            </a>
          </p>
          {settings}
        </div>
      </footer>
      <ScrollEdge side="bottom" xstyle={styles.edge} />
    </>
  );
}
