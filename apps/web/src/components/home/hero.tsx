import * as stylex from '@stylexjs/stylex';
import { profile } from '../../lib/about/profile';
import {
  colors,
  font,
  motion,
  space,
  text,
  weight,
} from '../../styles/tokens.stylex';
import { MetaList } from '../page';
import { PixelReveal } from '../pixel-reveal';
import { socialLinks } from '../social-links';

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
        <span {...stylex.props(styles.greeting)}>{profile.greeting}</span>
        <PixelReveal xstyle={styles.name}>{profile.name}</PixelReveal>
      </h1>
      <p {...stylex.props(styles.description)}>
        {profile.headline} {profile.featuredWorkIntro}{' '}
        <a
          href={profile.featuredWork.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {profile.featuredWork.name}
        </a>{' '}
        {profile.featuredWorkOutro}
      </p>
      <p {...stylex.props(styles.description)}>{profile.sideNote}</p>
      <MetaList items={socialLinks} />
    </section>
  );
}
