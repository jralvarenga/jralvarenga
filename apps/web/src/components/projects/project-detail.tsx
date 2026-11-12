import * as stylex from '@stylexjs/stylex';
import { formatMonth } from '../../lib/projects/format';
import type {
  ProjectLink,
  ProjectPart,
  ProjectStatus,
} from '../../lib/projects/types';
import { space } from '../../styles/tokens.stylex';
import { PageLayout } from '../layout/page-layout';
import { Markdown } from '../markdown';
import { type MetaItem, Section } from '../page';
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
  summary: string;
  started: string;
  status: ProjectStatus;
  stack: string[];
  links: ProjectLink[];
  parts: ProjectPart[];
  /** The markdown write-up. */
  body: string;
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
    { label: `Started ${formatMonth(started)}` },
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
        { href: '/projects', label: 'projects' },
        { href: `/projects/${slug}`, label: name },
      ]}
      meta={meta}
      badge={status === 'building' && <Tag>In progress</Tag>}
      lead={summary}
    >
      <Section label="ABOUT">
        <Markdown>{body}</Markdown>
      </Section>

      {parts.length > 0 && (
        <Section label="PARTS">
          <ProjectParts parts={parts} />
        </Section>
      )}

      {stack.length > 0 && (
        <Section label="STACK">
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
