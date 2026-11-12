import {
  installCommand,
  resolveSkillHref,
  sourceUrl,
} from '../../lib/skills/repo';
import { GitHubIcon } from '../icons';
import { PageLayout } from '../layout/page-layout';
import { Markdown } from '../markdown';
import { Section } from '../page';
import { Command } from './command';

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
  return (
    <PageLayout
      title={name}
      breadcrumbs={[
        { href: '/skills', label: 'skills' },
        { href: `/skills/${slug}`, label: name },
      ]}
      lead={description}
      meta={[
        {
          icon: <GitHubIcon size={14} />,
          label: 'Source',
          href: sourceUrl(path),
        },
      ]}
    >
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
