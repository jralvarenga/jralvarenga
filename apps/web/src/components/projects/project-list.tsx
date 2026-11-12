import * as stylex from '@stylexjs/stylex';
import { formatMonth } from '../../lib/projects/format';
import { colors, font, space, text, weight } from '../../styles/tokens.stylex';
import { Tag } from '../ui/tag';

export interface ProjectSummary {
  slug: string;
  name: string;
  summary: string;
  started: string;
  status: 'live' | 'building';
  /** Names of the apps or sites the project is made of. */
  parts: string[];
}

const styles = stylex.create({
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
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.x4,
    minHeight: '24px',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: space.x2,
    minWidth: 0,
  },
  name: {
    fontWeight: weight.medium,
    textDecorationLine: {
      default: 'none',
      [stylex.when.ancestor(':hover')]: 'underline',
    },
    textUnderlineOffset: '3px',
  },
  date: {
    flexShrink: 0,
    color: colors.mutedForeground,
    fontFamily: font.mono,
    fontSize: text.sm,
    fontVariantNumeric: 'tabular-nums',
  },
  parts: {
    color: colors.mutedForeground,
    fontFamily: font.mono,
    fontSize: text.sm,
  },
  summary: {
    maxWidth: '56ch',
    color: colors.mutedForeground,
    lineHeight: 1.6,
    textWrap: 'pretty',
  },
});

interface Props {
  projects: ProjectSummary[];
}

/**
 * Full-width project rows: name and status on the left, start month on the
 * right in mono, and the summary underneath. Each row opens the project.
 */
export function ProjectList({ projects }: Props) {
  return (
    <ul {...stylex.props(styles.list)}>
      {projects.map((project) => (
        <li key={project.slug} {...stylex.props(styles.item)}>
          <a
            href={`/projects/${project.slug}`}
            {...stylex.props(styles.row, stylex.defaultMarker())}
          >
            <span {...stylex.props(styles.top)}>
              <span {...stylex.props(styles.title)}>
                <span {...stylex.props(styles.name)}>{project.name}</span>
                {project.status === 'building' && <Tag>In progress</Tag>}
              </span>
              <time dateTime={project.started} {...stylex.props(styles.date)}>
                {formatMonth(project.started)}
              </time>
            </span>
            <span {...stylex.props(styles.summary)}>{project.summary}</span>
            {project.parts.length > 0 && (
              <span {...stylex.props(styles.parts)}>
                {project.parts.join(' · ')}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
