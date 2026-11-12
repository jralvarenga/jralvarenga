import * as stylex from '@stylexjs/stylex';
import { profile } from '../../lib/about/profile';
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
  brief: {
    maxWidth: '56ch',
    color: colors.mutedForeground,
    lineHeight: 1.6,
    textWrap: 'pretty',
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

/** `/`: the hero, a short about with a link to `/about`, then projects. */
export function HomePage({ projects }: Props) {
  return (
    <main id="content" {...stylex.props(layout.column, styles.main)}>
      <Hero />
      <Section label="ABOUT" xstyle={styles.section}>
        <p {...stylex.props(styles.brief)}>{profile.summary}</p>
        <a href="/about" {...stylex.props(styles.more)}>
          Read more about me →
        </a>
      </Section>
      <Section label="PROJECTS" xstyle={styles.section}>
        <ProjectList projects={projects} />
        <a href="/projects" {...stylex.props(styles.more)}>
          All projects →
        </a>
      </Section>
    </main>
  );
}
