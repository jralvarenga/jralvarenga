import * as stylex from '@stylexjs/stylex';
import type { Localized } from '../../lib/i18n/locales';
import { localize } from '../../lib/i18n/translator';
import type {
  LocalizedProjectLink,
  LocalizedProjectPart,
} from '../../lib/projects/collection';
import { formatMonth } from '../../lib/projects/format';
import type { ProjectStatus } from '../../lib/projects/types';
import { space } from '../../styles/tokens.stylex';
import { PageLayout } from '../layout/page-layout';
import { Markdown } from '../markdown';
import { type MetaItem, Section } from '../page';
import { Translation } from '../translation';
import { Tag } from '../ui/tag';
import { LinkIcon } from './link-icon';
import { ProjectParts } from './project-parts';

const styles = stylex.create({
  stack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: space.x2,
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
});

interface Props {
  slug: string;
  name: string;
  summary: Localized;
  started: string;
  status: ProjectStatus;
  stack: string[];
  links: LocalizedProjectLink[];
  parts: LocalizedProjectPart[];
  /** The markdown write-up, per locale. */
  body: Localized;
}

/** `/projects/<slug>`: summary, links, the write-up, parts, and stack. */
export function ProjectDetail({
  slug,
  name,
  summary,
  started,
  status,
  stack,
  links,
  parts,
  body,
}: Props) {
  const meta: MetaItem[] = [
    { label: localize('projects.started', { month: formatMonth(started) }) },
    ...links.map((link) => ({
      icon: <LinkIcon href={link.href} />,
      label: link.label,
      href: link.href,
    })),
  ];

  return (
    <PageLayout
      title={name}
      breadcrumbs={[
        { href: '/projects', label: localize('projects.crumb') },
        { href: `/projects/${slug}`, label: name },
      ]}
      meta={meta}
      badge={
        status === 'building' && (
          <Tag>
            <Translation value={localize('common.inProgress')} />
          </Tag>
        )
      }
      lead={<Translation value={summary} />}
    >
      <Section label={localize('projects.about')}>
        {body.es === body.en ? (
          <Markdown>{body.en}</Markdown>
        ) : (
          <Translation
            as="div"
            value={{
              en: <Markdown>{body.en}</Markdown>,
              es: <Markdown>{body.es}</Markdown>,
            }}
          />
        )}
      </Section>

      {parts.length > 0 && (
        <Section label={localize('projects.parts')}>
          <ProjectParts parts={parts} />
        </Section>
      )}

      {stack.length > 0 && (
        <Section label={localize('projects.stack')}>
          <ul {...stylex.props(styles.stack)}>
            {stack.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </PageLayout>
  );
}
