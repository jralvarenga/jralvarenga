import * as stylex from '@stylexjs/stylex';
import avatar from '../../assets/avatar.jpg';
import {
  colors,
  motion,
  radius,
  space,
  text,
} from '../../styles/tokens.stylex';
import { ScrollEdge } from './scroll-edge';

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

const styles = stylex.create({
  bar: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    // Its own view transition group, so page fades don't touch the header.
    viewTransitionName: 'site-header',
  },
  backdrop: {
    insetInline: 0,
    top: 0,
    bottom: `calc(-1 * ${FADE_OVERHANG})`,
  },
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
  // A 40px touch target around the 32px avatar. The negative margin keeps
  // the avatar's left edge on the column edge.
  home: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    margin: '-4px',
    borderRadius: radius.full,
    opacity: {
      default: 1,
      ':hover': 0.9,
    },
    transitionProperty: 'opacity',
    transitionDuration: motion.fast,
    transitionTimingFunction: motion.easeOut,
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.ring}`,
    },
    outlineOffset: '1px',
  },
  avatar: {
    display: 'block',
    width: '32px',
    height: '32px',
    borderRadius: radius.full,
    objectFit: 'cover',
    // A hairline ring so the dark photo keeps its edge on a dark page.
    boxShadow: `0 0 0 1px ${colors.border}`,
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
 * Site header: my photo on the left, linking home, and nav links on the
 * right. It sticks to
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
        <ScrollEdge side="top" xstyle={styles.backdrop} />
        <header {...stylex.props(styles.header)}>
          <a
            href="/"
            aria-label="Rigo Alvarenga, home"
            {...stylex.props(styles.home)}
          >
            <img
              src={avatar.src}
              alt=""
              width={32}
              height={32}
              {...stylex.props(styles.avatar)}
            />
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
