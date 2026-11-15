import * as stylex from '@stylexjs/stylex';
import { localize } from '../../lib/i18n/translator';
import { installCommand, SKILLS_REPO_URL } from '../../lib/skills/repo';
import { colors, font, space, text, weight } from '../../styles/tokens.stylex';
import { BoxIcon, GitHubIcon } from '../icons';
import { PageLayout } from '../layout/page-layout';
import { Section } from '../page';
import { Translation } from '../translation';
import { Command } from './command';

export interface SkillSummary {
  /** Directory name, used as the `/skills/<name>` slug. */
  slug: string;
  name: string;
  description: string;
}

const styles = stylex.create({
  intro: {
    marginTop: space.x6,
    color: colors.mutedForeground,
    lineHeight: 1.6,
    textWrap: 'pretty',
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  item: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x1,
    paddingBlock: space.x4,
    color: colors.foreground,
    textDecoration: 'none',
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.ring}`,
    },
    outlineOffset: '3px',
  },
  name: {
    fontWeight: weight.medium,
    textDecorationLine: {
      default: 'none',
      [stylex.when.ancestor(':hover')]: 'underline',
    },
    textUnderlineOffset: '3px',
  },
  description: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: colors.mutedForeground,
    fontFamily: font.mono,
    fontSize: text.sm,
  },
  empty: {
    paddingBlock: space.x4,
    color: colors.mutedForeground,
  },
});

interface Props {
  skills: SkillSummary[];
}

/** `/skills`: the install command and one row per skill. */
export function SkillsIndex({ skills }: Props) {
  const count = localize(
    skills.length === 1 ? 'skills.countOne' : 'skills.countOther',
    { count: skills.length },
  );

  return (
    <PageLayout
      title={localize('skills.title')}
      lead={<Translation value={localize('skills.lead')} />}
      meta={[
        { icon: <BoxIcon size={14} />, label: count },
        {
          icon: <GitHubIcon size={14} />,
          label: 'GitHub',
          href: SKILLS_REPO_URL,
        },
      ]}
    >
      <p {...stylex.props(styles.intro)}>
        <Translation value={localize('skills.intro')} />
      </p>

      <Section label={localize('skills.installation')}>
        <Command command={installCommand()} />
      </Section>

      <Section label={localize('skills.list')}>
        {skills.length === 0 ? (
          <p {...stylex.props(styles.empty)}>
            <Translation value={localize('skills.empty')} />
          </p>
        ) : (
          <ul {...stylex.props(styles.list)}>
            {skills.map((skill) => (
              <li key={skill.name} {...stylex.props(styles.item)}>
                <a
                  href={`/skills/${skill.slug}`}
                  {...stylex.props(styles.row, stylex.defaultMarker())}
                >
                  <span {...stylex.props(styles.name)}>{skill.name}</span>
                  {/* Skills come from GitHub in English only. */}
                  <span lang="en" {...stylex.props(styles.description)}>
                    {skill.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </PageLayout>
  );
}
