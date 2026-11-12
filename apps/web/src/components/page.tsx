import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import { linkTarget } from '../lib/links';
import {
  colors,
  font,
  motion,
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
  title: {
    fontSize: {
      default: '32px',
      '@media (min-width: 640px)': text.display,
    },
    fontWeight: weight.medium,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
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
  label: string;
  href?: string;
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
        <h1 {...stylex.props(styles.title)}>{title}</h1>
        {badge}
      </div>
      {meta.length > 0 && (
        <ul {...stylex.props(styles.meta)}>
          {meta.map((item) => (
            <li key={item.label}>
              {item.href ? (
                <a
                  href={item.href}
                  {...linkTarget(item.href)}
                  {...stylex.props(styles.metaItem, styles.metaLink)}
                >
                  {item.icon}
                  {item.label}
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
      )}
      {children && <p {...stylex.props(styles.lead)}>{children}</p>}
    </header>
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
