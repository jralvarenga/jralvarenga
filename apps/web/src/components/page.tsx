import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import { linkTarget } from '../lib/links';
import {
  colors,
  font,
  motion,
  radius,
  space,
  text,
  weight,
} from '../styles/tokens.stylex';

const styles = stylex.create({
  crumbs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: space.x2,
    margin: 0,
    padding: 0,
    listStyle: 'none',
    color: colors.mutedForeground,
    fontSize: text.sm,
  },
  crumb: {
    display: 'flex',
    gap: space.x2,
  },
  crumbLink: {
    color: {
      default: colors.mutedForeground,
      ':hover': colors.foreground,
    },
    textDecoration: 'none',
    transitionProperty: 'color',
    transitionDuration: motion.fast,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x3,
    marginTop: space.x4,
  },
  titleRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: space.x3,
  },
  // Page titles share the hero's Geist Pixel, at normal tracking so the
  // pixel grid stays even.
  title: {
    fontFamily: font.pixel,
    fontSize: {
      default: '32px',
      '@media (min-width: 640px)': text.display,
    },
    fontWeight: weight.medium,
    lineHeight: 1.1,
    overflowWrap: 'anywhere',
    textWrap: 'balance',
  },
  meta: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    alignItems: 'center',
    columnGap: space.x4,
    rowGap: space.x1,
    fontSize: text.sm,
  },
  metaItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.x1,
    color: colors.foreground,
    textDecoration: 'none',
  },
  // A 40px touch target around a 16px logo. The negative margin keeps the
  // row's spacing as if only the icon were there.
  iconOnly: {
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    margin: '-12px',
    borderRadius: radius.md,
    opacity: {
      default: 1,
      ':hover': 0.7,
    },
    transitionProperty: 'opacity',
    transitionDuration: motion.fast,
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.ring}`,
    },
  },
  metaText: {
    color: colors.mutedForeground,
  },
  lead: {
    marginTop: space.x3,
    color: colors.mutedForeground,
    fontSize: text.lg,
    lineHeight: 1.6,
    textWrap: 'pretty',
  },
  metaLink: {
    textDecorationLine: {
      default: 'none',
      ':hover': 'underline',
    },
    textUnderlineOffset: '3px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x4,
    marginTop: space.x12,
  },
  label: {
    paddingBottom: space.x3,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    fontFamily: font.mono,
    fontSize: text.sm,
    fontWeight: weight.regular,
  },
});

export interface Crumb {
  href: string;
  label: string;
}

/** Path back to the parent pages. The last item is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol {...stylex.props(styles.crumbs)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} {...stylex.props(styles.crumb)}>
              {isLast ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <>
                  <a href={item.href} {...stylex.props(styles.crumbLink)}>
                    {item.label}
                  </a>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export interface MetaItem {
  icon?: ReactNode;
  /** Visible text, or the accessible name when `iconOnly` is set. */
  label: string;
  href?: string;
  /** Show only the icon, for well-known logos like LinkedIn or X. */
  iconOnly?: boolean;
}

interface PageHeaderProps {
  title: string;
  meta?: MetaItem[];
  /** Shown next to the title, such as a status tag. */
  badge?: ReactNode;
  /** Lead text under the meta row. */
  children?: ReactNode;
}

/** The page title with a row of small facts or links under it. */
export function PageHeader({
  title,
  meta = [],
  badge,
  children,
}: PageHeaderProps) {
  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.titleRow)}>
        <h1 data-page-title="" {...stylex.props(styles.title)}>
          {title}
        </h1>
        {badge}
      </div>
      {meta.length > 0 && <MetaList items={meta} />}
      {children && <p {...stylex.props(styles.lead)}>{children}</p>}
    </header>
  );
}

/**
 * A row of small facts and links with icons. Links are in `foreground`,
 * plain facts in `mutedForeground`, and external links open a new tab.
 */
export function MetaList({ items }: { items: MetaItem[] }) {
  return (
    <ul {...stylex.props(styles.meta)}>
      {items.map((item) => (
        <li key={item.label}>
          {item.href ? (
            <a
              href={item.href}
              aria-label={item.iconOnly ? item.label : undefined}
              {...linkTarget(item.href)}
              {...stylex.props(
                styles.metaItem,
                styles.metaLink,
                item.iconOnly && styles.iconOnly,
              )}
            >
              {item.icon}
              {!item.iconOnly && item.label}
            </a>
          ) : (
            <span {...stylex.props(styles.metaItem, styles.metaText)}>
              {item.icon}
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/** A titled block with a mono label over a hairline. */
export function Section({
  label,
  children,
  xstyle,
}: {
  label: string;
  children: ReactNode;
  /** StyleX overrides, such as a larger top margin between page sections. */
  xstyle?: stylex.StyleXStyles;
}) {
  const id = `section-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <section aria-labelledby={id} {...stylex.props(styles.section, xstyle)}>
      <h2 id={id} {...stylex.props(styles.label)}>
        {label}
      </h2>
      {children}
    </section>
  );
}
