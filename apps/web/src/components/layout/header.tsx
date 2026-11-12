import * as stylex from '@stylexjs/stylex';
import {
  colors,
  motion,
  radius,
  space,
  text,
  weight,
} from '../../styles/tokens.stylex';

interface NavLink {
  href: string;
  label: string;
}

const links: NavLink[] = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
];

/** How far the fade reaches below the header, so the edge has no line. */
const FADE_OVERHANG = '32px';

/**
 * Progressive blur, like SwiftUI's soft scroll edge: each layer blurs more
 * and is masked to a shorter band at the top, so the blur builds toward the
 * top edge and dissolves into the page below.
 */
const blurLayers = [
  {
    blur: 'blur(1px)',
    mask: 'linear-gradient(to bottom, black 60%, transparent)',
  },
  {
    blur: 'blur(3px)',
    mask: 'linear-gradient(to bottom, black 40%, transparent 80%)',
  },
  {
    blur: 'blur(8px)',
    mask: 'linear-gradient(to bottom, black 20%, transparent 60%)',
  },
];

const styles = stylex.create({
  bar: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  backdrop: {
    position: 'absolute',
    insetInline: 0,
    top: 0,
    bottom: `calc(-1 * ${FADE_OVERHANG})`,
    pointerEvents: 'none',
    // A soft tint of the page color that fades out toward the bottom.
    backgroundImage: `linear-gradient(to bottom, color-mix(in oklch, ${colors.background} 92%, transparent), color-mix(in oklch, ${colors.background} 70%, transparent) 55%, transparent)`,
  },
  blur: (blur: string, mask: string) => ({
    position: 'absolute',
    inset: 0,
    backdropFilter: blur,
    WebkitBackdropFilter: blur,
    maskImage: mask,
    WebkitMaskImage: mask,
  }),
  header: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.x4,
    maxWidth: '640px',
    marginInline: 'auto',
    paddingInline: {
      default: space.x4,
      '@media (min-width: 640px)': space.x6,
    },
    paddingBlock: space.x4,
  },
  home: {
    color: colors.foreground,
    fontSize: text.md,
    fontWeight: weight.medium,
    letterSpacing: '-0.01em',
    textDecoration: 'none',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: space.x1,
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    minHeight: '40px',
    paddingInline: space.x3,
    borderRadius: radius.md,
    color: {
      default: colors.mutedForeground,
      ':hover': colors.foreground,
    },
    fontSize: text.sm,
    textDecoration: 'none',
    transitionProperty: 'background-color',
    transitionDuration: motion.fast,
    transitionTimingFunction: motion.easeOut,
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.muted,
    },
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.ring}`,
    },
    outlineOffset: '3px',
  },
  current: {
    color: colors.foreground,
  },
  skip: {
    position: 'absolute',
    zIndex: 11,
    insetInlineStart: space.x4,
    top: space.x4,
    paddingBlock: space.x2,
    paddingInline: space.x3,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    color: colors.primaryForeground,
    fontSize: text.sm,
    textDecoration: 'none',
    transform: {
      default: 'translateY(-200%)',
      ':focus-visible': 'translateY(0)',
    },
  },
});

interface Props {
  /** Current pathname, used to mark the active link. */
  pathname: string;
}

/**
 * Site header: the name on the left, nav links on the right. It sticks to
 * the top over a soft backdrop that tints and blurs the content scrolling
 * under it, fading out with no hard edge.
 */
export function Header({ pathname }: Props) {
  return (
    <>
      <a href="#content" {...stylex.props(styles.skip)}>
        Skip to content
      </a>
      <div {...stylex.props(styles.bar)}>
        <div aria-hidden="true" {...stylex.props(styles.backdrop)}>
          {blurLayers.map((layer) => (
            <div
              key={layer.blur}
              {...stylex.props(styles.blur(layer.blur, layer.mask))}
            />
          ))}
        </div>
        <header {...stylex.props(styles.header)}>
          <a href="/" {...stylex.props(styles.home)}>
            Rigo Alvarenga
          </a>
          <nav aria-label="Main">
            <ul {...stylex.props(styles.list)}>
              {links.map((link) => {
                const isCurrent = pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isCurrent ? 'page' : undefined}
                      {...stylex.props(
                        styles.link,
                        isCurrent && styles.current,
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>
      </div>
    </>
  );
}
