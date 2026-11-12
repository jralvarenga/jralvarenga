import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import { layout } from '../../styles/layout';
import { Breadcrumbs, type Crumb, type MetaItem, PageHeader } from '../page';

interface Props {
  /** The page `h1`, set in Geist Pixel. */
  title: string;
  /** Path back to parent pages. The last item is the current page. */
  breadcrumbs?: Crumb[];
  /** Small facts or links under the title. */
  meta?: MetaItem[];
  /** Shown next to the title, such as a status tag. */
  badge?: ReactNode;
  /** Lead text under the header. */
  lead?: ReactNode;
  children: ReactNode;
}

/**
 * The shell for every inner page: the `<main>` landmark in the 640px
 * column, optional breadcrumbs, and the shared title header. Pages pass
 * their sections as children.
 */
export function PageLayout({
  title,
  breadcrumbs,
  meta,
  badge,
  lead,
  children,
}: Props) {
  return (
    <main id="content" {...stylex.props(layout.column, layout.page)}>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <PageHeader title={title} meta={meta} badge={badge}>
        {lead}
      </PageHeader>
      {children}
    </main>
  );
}
