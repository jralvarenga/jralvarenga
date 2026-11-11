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
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
];

const styles = stylex.create({
  header: {
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
    paddingBlock: space.x6,
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
 * Site header: the name on the left, nav links on the right. Static, flat,
 * and not sticky.
 */
export function Header({ pathname }: Props) {
  return (
    <>
      <a href="#content" {...stylex.props(styles.skip)}>
        Skip to content
      </a>
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
                    {...stylex.props(styles.link, isCurrent && styles.current)}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
}
