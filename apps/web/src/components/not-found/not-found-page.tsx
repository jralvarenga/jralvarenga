import { localize } from '../../lib/i18n/translator';
import { PageLayout } from '../layout/page-layout';
import { Translation } from '../translation';

/** `/404`: shown for any path that has no page. */
export function NotFoundPage() {
  return (
    <PageLayout
      title={localize('notFound.title')}
      lead={<Translation value={localize('notFound.lead')} />}
      meta={[
        { label: localize('notFound.home'), href: '/' },
        { label: localize('nav.about'), href: '/about' },
        { label: localize('nav.projects'), href: '/projects' },
        { label: localize('nav.skills'), href: '/skills' },
      ]}
    >
      {null}
    </PageLayout>
  );
}
