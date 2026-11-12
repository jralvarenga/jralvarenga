import * as stylex from '@stylexjs/stylex';
import {
  colors,
  font,
  motion,
  space,
  text,
  weight,
} from '../../styles/tokens.stylex';
import { MetaList } from '../page';
import { socialLinks } from '../social-links';
import { PixelReveal } from './pixel-reveal';

const rise = stylex.keyframes({
  from: { opacity: 0, transform: 'translateY(8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const styles = stylex.create({
  hero: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x6,
    animationName: {
      default: rise,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationDuration: motion.slow,
    animationTimingFunction: motion.easeOut,
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x2,
  },
  greeting: {
    color: colors.mutedForeground,
    fontSize: text.md,
    fontWeight: weight.regular,
  },
  name: {
    alignSelf: 'flex-start',
    fontFamily: font.pixel,
    fontSize: text.hero,
    fontWeight: weight.medium,
    lineHeight: 1,
    letterSpacing: '-0.02em',
    textWrap: 'balance',
  },
  description: {
    maxWidth: '52ch',
    color: colors.mutedForeground,
    fontSize: text.md,
    lineHeight: 1.6,
    textWrap: 'pretty',
  },
});

/** Home intro: a greeting, the name in Geist Pixel, and a short bio. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" {...stylex.props(styles.hero)}>
      <h1 id="hero-title" {...stylex.props(styles.title)}>
        <span {...stylex.props(styles.greeting)}>Hi, I'm</span>
        <PixelReveal xstyle={styles.name}>Rigo Alvarenga</PixelReveal>
      </h1>
      <p {...stylex.props(styles.description)}>
        I'm a Tech lead engineer on the development team at Denzo Studios.
        Working on different projects like{' '}
        <a href="https://orviadx.com" target="_blank" rel="noopener noreferrer">
          Orvia
        </a>{' '}
        and many others.
      </p>
      <p {...stylex.props(styles.description)}>
        I also build my own projects on the side.
      </p>
      <MetaList items={socialLinks} />
    </section>
  );
}
