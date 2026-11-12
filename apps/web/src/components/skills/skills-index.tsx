import * as stylex from '@stylexjs/stylex';
import { installCommand, SKILLS_REPO_URL } from '../../lib/skills/repo';
import { layout } from '../../styles/layout';
import { colors, font, space, text, weight } from '../../styles/tokens.stylex';
import { BoxIcon, GitHubIcon } from '../icons';
import { PageHeader, Section } from '../page';
import { Command } from './command';

export interface SkillSummary {
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
  const count = `${skills.length} ${skills.length === 1 ? 'skill' : 'skills'}`;

  return (
    <main id="content" {...stylex.props(layout.column, layout.page)}>
      <PageHeader
        title="Skills"
        meta={[
          { icon: <BoxIcon size={14} />, label: count },
          {
            icon: <GitHubIcon size={14} />,
            label: 'GitHub',
            href: SKILLS_REPO_URL,
          },
        ]}
      />
      <p {...stylex.props(styles.intro)}>
        This are the rules I give coding agents, from how to write code to how
        to review it. They work with Claude Code, Codex, Cursor, and any agent
        that supports the Agent Skills format.
      </p>

      <Section label="INSTALLATION">
        <Command command={installCommand()} />
      </Section>

      <Section label="SKILLS">
        {skills.length === 0 ? (
          <p {...stylex.props(styles.empty)}>No skills yet.</p>
        ) : (
          <ul {...stylex.props(styles.list)}>
            {skills.map((skill) => (
              <li key={skill.name} {...stylex.props(styles.item)}>
                <a
                  href={`/skills/${skill.name}`}
                  {...stylex.props(styles.row, stylex.defaultMarker())}
                >
                  <span {...stylex.props(styles.name)}>{skill.name}</span>
                  <span {...stylex.props(styles.description)}>
                    {skill.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </main>
  );
}
