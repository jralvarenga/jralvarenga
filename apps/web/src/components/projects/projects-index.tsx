import * as stylex from '@stylexjs/stylex';
import { layout } from '../../styles/layout';
import { PageHeader, Section } from '../page';
import { ProjectList, type ProjectSummary } from './project-list';

interface Props {
  projects: ProjectSummary[];
}

/** `/projects`: every project as a row. */
export function ProjectsIndex({ projects }: Props) {
  return (
    <main id="content" {...stylex.props(layout.column, layout.page)}>
      <PageHeader title="Projects">
        Products, tools, and libraries I've built or am building.
      </PageHeader>

      <Section label="ALL PROJECTS">
        <ProjectList projects={projects} />
      </Section>
    </main>
  );
}
