import { PageLayout } from '../layout/page-layout';
import { Section } from '../page';
import { ProjectList, type ProjectSummary } from './project-list';

interface Props {
  projects: ProjectSummary[];
}

/** `/projects`: every project as a row. */
export function ProjectsIndex({ projects }: Props) {
  return (
    <PageLayout
      title="Projects"
      lead="Products, tools, and libraries I've built or am building."
    >
      <Section label="ALL PROJECTS">
        <ProjectList projects={projects} />
      </Section>
    </PageLayout>
  );
}
