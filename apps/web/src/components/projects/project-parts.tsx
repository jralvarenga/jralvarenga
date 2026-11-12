import * as stylex from '@stylexjs/stylex';
import { linkTarget } from '../../lib/links';
import type { ProjectPart } from '../../lib/projects/types';
import { colors, font, space, text, weight } from '../../styles/tokens.stylex';
import { Tag } from '../ui/tag';
import { LinkIcon } from './link-icon';

const styles = stylex.create({
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x1,
    paddingBlock: space.x4,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },
  top: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: space.x4,
    rowGap: space.x1,
    minHeight: '24px',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: space.x2,
    margin: 0,
    fontSize: text.md,
    fontWeight: weight.regular,
  },
  name: {
    fontWeight: weight.medium,
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.x1,
    color: colors.foreground,
    fontSize: text.sm,
    textDecorationLine: {
      default: 'none',
      ':hover': 'underline',
    },
    textUnderlineOffset: '3px',
  },
  summary: {
    color: colors.mutedForeground,
    lineHeight: 1.6,
    textWrap: 'pretty',
  },
  stack: {
    color: colors.mutedForeground,
    fontFamily: font.mono,
    fontSize: text.sm,
  },
});

interface Props {
  parts: ProjectPart[];
}

/**
 * The apps or sites a project is made of, as rows: name and status, an
 * optional link on the right, the summary, and the stack in mono.
 */
export function ProjectParts({ parts }: Props) {
  return (
    <ul {...stylex.props(styles.list)}>
      {parts.map((part) => (
        <li key={part.name} {...stylex.props(styles.item)}>
          <div {...stylex.props(styles.top)}>
            <h3 {...stylex.props(styles.title)}>
              <span {...stylex.props(styles.name)}>{part.name}</span>
              {part.status === 'building' && <Tag>In progress</Tag>}
            </h3>
            {part.site && (
              <a
                href={part.site.href}
                {...linkTarget(part.site.href)}
                {...stylex.props(styles.link)}
              >
                <LinkIcon href={part.site.href} />
                {part.site.label}
              </a>
            )}
          </div>
          <p {...stylex.props(styles.summary)}>{part.summary}</p>
          {part.stack.length > 0 && (
            <p {...stylex.props(styles.stack)}>{part.stack.join(' · ')}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
