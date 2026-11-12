import * as stylex from '@stylexjs/stylex';
import {
  installCommand,
  resolveSkillHref,
  sourceUrl,
} from '../../lib/skills/repo';
import { colors, space } from '../../styles/tokens.stylex';
import { GitHubIcon } from '../icons';
import { PageLayout } from '../layout/page-layout';
import { Markdown } from '../markdown';
import { Section } from '../page';
import { Command } from './command';

const styles = stylex.create({
  breadcrumbs: {
    marginBottom: space.x2,
  },
  summary: {
    color: colors.mutedForeground,
    lineHeight: 1.7,
    textWrap: 'pretty',
  },
});

interface Props {
  name: string;
  description: string;
  /** Path of the SKILL.md inside the repository. */
  path: string;
  /** SKILL.md without its frontmatter. */
  body: string;
}

/** `/skills/<name>`: install command, summary, and the full SKILL.md. */
export function SkillDetail({ name, description, path, body }: Props) {
  return (
    <PageLayout
      title={name}
      breadcrumbs={[
        { href: '/skills', label: 'skills' },
        { href: `/skills/${name}`, label: name },
      ]}
      meta={[
        {
          icon: <GitHubIcon size={14} />,
          label: 'Source',
          href: sourceUrl(path),
        },
      ]}
    >
      <Section label="INSTALLATION">
        <Command command={installCommand(name)} />
      </Section>

      <Section label="SUMMARY">
        <p {...stylex.props(styles.summary)}>{description}</p>
      </Section>

      <Section label="SKILL.md">
        <Markdown resolveHref={(href) => resolveSkillHref(href, path)}>
          {body}
        </Markdown>
      </Section>
    </PageLayout>
  );
}
