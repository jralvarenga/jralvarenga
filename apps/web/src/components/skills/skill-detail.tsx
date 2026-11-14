import * as stylex from '@stylexjs/stylex';
import { localize } from '../../lib/i18n/translator';
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

/**
 * `/skills/<name>`: description, install command, and the full SKILL.md.
 * Skills come from GitHub in English only, so their text is marked
 * `lang="en"` for screen readers on the Spanish page.
 */
export function SkillDetail({ slug, name, description, path, body }: Props) {
  const { lead, rest } = splitSkillDescription(description);

  return (
    <PageLayout
      title={name}
      breadcrumbs={[
        { href: '/skills', label: localize('skills.crumb') },
        { href: `/skills/${slug}`, label: name },
      ]}
      lead={<span lang="en">{lead}</span>}
      meta={[
        {
          icon: <GitHubIcon size={14} />,
          label: localize('skills.source'),
          href: sourceUrl(path),
        },
      ]}
    >
      {rest ? (
        <p lang="en" {...stylex.props(styles.rest)}>
          {rest}
        </p>
      ) : null}
      <Section label={localize('skills.installation')}>
        <Command command={installCommand(slug)} />
      </Section>

      <Section label="SKILL.md">
        <div lang="en">
          <Markdown resolveHref={(href) => resolveSkillHref(href, path)}>
            {body}
          </Markdown>
        </div>
      </Section>
    </PageLayout>
  );
}
