import { localize } from '../../lib/i18n/translator';
import { PageLayout } from '../layout/page-layout';
import { Section } from '../page';
import { Translation } from '../translation';
import { ProjectList, type ProjectSummary } from './project-list';

interface Props {
  projects: ProjectSummary[];
}

/** `/projects`: every project as a row. */
export function ProjectsIndex({ projects }: Props) {
  return (
    <PageLayout
      title={localize('projects.title')}
      lead={<Translation value={localize('projects.lead')} />}
    >
      <Section label={localize('projects.all')}>
        <ProjectList projects={projects} />
      </Section>
    </PageLayout>
  );
}
