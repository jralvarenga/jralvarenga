import * as stylex from '@stylexjs/stylex';
import { layout } from '../../styles/layout';
import { colors, space, text } from '../../styles/tokens.stylex';
import { Section } from '../page';
import { ProjectList, type ProjectSummary } from '../projects/project-list';
import { Hero } from './hero';

const styles = stylex.create({
  main: {
    paddingBlock: {
      default: space.x16,
      '@media (min-width: 640px)': space.x24,
    },
  },
  section: {
    marginTop: {
      default: space.x16,
      '@media (min-width: 640px)': space.x24,
    },
  },
  more: {
    alignSelf: 'flex-start',
    color: {
      default: colors.mutedForeground,
      ':hover': colors.foreground,
    },
    fontSize: text.sm,
    textDecoration: 'none',
  },
});

interface Props {
  projects: ProjectSummary[];
}

/** `/`: the hero, then the projects. */
export function HomePage({ projects }: Props) {
  return (
    <main id="content" {...stylex.props(layout.column, styles.main)}>
      <Hero />
      <Section label="PROJECTS" xstyle={styles.section}>
        <ProjectList projects={projects} />
        <a href="/projects" {...stylex.props(styles.more)}>
          All projects →
        </a>
      </Section>
    </main>
  );
}
