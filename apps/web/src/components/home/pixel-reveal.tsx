import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';

const show = stylex.keyframes({
  to: { opacity: 1 },
});

const styles = stylex.create({
  root: {
    position: 'relative',
    display: 'block',
  },
  text: {
    opacity: {
      default: 0,
      '@media (prefers-reduced-motion: reduce)': 1,
    },
    // Fallback: if the reveal script never runs, show the text anyway.
    animationName: {
      default: show,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationDuration: '0s',
    animationDelay: '2.5s',
    animationFillMode: 'forwards',
  },
});

interface Props {
  children: ReactNode;
  /** StyleX overrides for the wrapper, such as the font. */
  xstyle?: stylex.StyleXStyles;
}

/**
 * Text that builds itself out of its own pixels on load. This only renders
 * the markup: the animation runs from `revealPixels` in
 * `lib/home/pixel-reveal.ts`, started by the page. The text stays in the DOM
 * the whole time, so screen readers and search engines read it as is.
 */
export function PixelReveal({ children, xstyle }: Props) {
  return (
    <span data-pixel-reveal="" {...stylex.props(styles.root, xstyle)}>
      <span data-pixel-reveal-text="" {...stylex.props(styles.text)}>
        {children}
      </span>
    </span>
  );
}
