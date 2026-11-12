import { PageLayout } from '../layout/page-layout';

/** `/404`: shown for any path that has no page. */
export function NotFoundPage() {
  return (
    <PageLayout
      title="Not found"
      lead="There's no page at this address. It may have moved, or the link has a typo."
      meta={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Projects', href: '/projects' },
        { label: 'Skills', href: '/skills' },
      ]}
    >
      {null}
    </PageLayout>
  );
}
