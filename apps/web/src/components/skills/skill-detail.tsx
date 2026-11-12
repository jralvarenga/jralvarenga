import * as stylex from '@stylexjs/stylex';
import { splitSkillDescription } from '../../lib/skills/description';
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
  rest: {
    marginTop: space.x6,
    color: colors.mutedForeground,
    lineHeight: 1.6,
    textWrap: 'pretty',
  },
});

interface Props {
  /** Directory name, used as the `/skills/<name>` slug. */
  slug: string;
  name: string;
  description: string;
  /** Path of the SKILL.md inside the repository. */
  path: string;
  /** SKILL.md without its frontmatter. */
  body: string;
}

/** `/skills/<name>`: description, install command, and the full SKILL.md. */
export function SkillDetail({ slug, name, description, path, body }: Props) {
  const { lead, rest } = splitSkillDescription(description);

  return (
    <PageLayout
      title={name}
      breadcrumbs={[
        { href: '/skills', label: 'skills' },
        { href: `/skills/${slug}`, label: name },
      ]}
      lead={lead}
      meta={[
        {
          icon: <GitHubIcon size={14} />,
          label: 'Source',
          href: sourceUrl(path),
        },
      ]}
    >
      {rest ? <p {...stylex.props(styles.rest)}>{rest}</p> : null}
      <Section label="INSTALLATION">
        <Command command={installCommand(slug)} />
      </Section>

      <Section label="SKILL.md">
        <Markdown resolveHref={(href) => resolveSkillHref(href, path)}>
          {body}
        </Markdown>
      </Section>
    </PageLayout>
  );
}
