import * as stylex from '@stylexjs/stylex';
import { localize } from '../../lib/i18n/translator';
import { layout } from '../../styles/layout';
import { colors, space, text } from '../../styles/tokens.stylex';
import { Section } from '../page';
import { ProjectList, type ProjectSummary } from '../projects/project-list';
import { Translation } from '../translation';
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
      <Section label={localize('home.about')} xstyle={styles.section}>
        <p {...stylex.props(styles.brief)}>
          <Translation value={localize('profile.summary')} />
        </p>
        <a href="/about" {...stylex.props(styles.more)}>
          <Translation value={localize('home.readMore')} />
        </a>
      </Section>
      <Section label={localize('home.projects')} xstyle={styles.section}>
        <ProjectList projects={projects} />
        <a href="/projects" {...stylex.props(styles.more)}>
          <Translation value={localize('home.allProjects')} />
        </a>
      </Section>
    </main>
  );
}
