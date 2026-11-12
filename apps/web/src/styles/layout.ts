import * as stylex from '@stylexjs/stylex';
import { space } from './tokens.stylex';

/** The master layout: one centered 640px column with a responsive gutter. */
export const layout = stylex.create({
  column: {
    maxWidth: '640px',
    marginInline: 'auto',
    paddingInline: {
      default: space.x4,
      '@media (min-width: 640px)': space.x6,
    },
  },
  /** Vertical rhythm for a page's `<main>` under the header. */
  page: {
    paddingTop: {
      default: space.x12,
      '@media (min-width: 640px)': space.x16,
    },
    paddingBottom: {
      default: space.x16,
      '@media (min-width: 640px)': space.x24,
    },
  },
});
