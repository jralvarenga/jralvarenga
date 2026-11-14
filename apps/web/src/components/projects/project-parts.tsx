import * as stylex from '@stylexjs/stylex';
import { localize } from '../../lib/i18n/translator';
import { linkTarget } from '../../lib/links';
import type { LocalizedProjectPart } from '../../lib/projects/collection';
import { colors, font, space, text, weight } from '../../styles/tokens.stylex';
import { Translation } from '../translation';
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
  parts: LocalizedProjectPart[];
}

/**
 * The apps or sites a project is made of, as rows: name and status, an
 * optional link on the right, the summary, and the stack in mono.
 */
export function ProjectParts({ parts }: Props) {
  return (
    <ul {...stylex.props(styles.list)}>
      {parts.map((part) => (
        <li key={part.name.en} {...stylex.props(styles.item)}>
          <div {...stylex.props(styles.top)}>
            <h3 {...stylex.props(styles.title)}>
              <span {...stylex.props(styles.name)}>
                <Translation value={part.name} />
              </span>
              {part.status === 'building' && (
                <Tag>
                  <Translation value={localize('common.inProgress')} />
                </Tag>
              )}
            </h3>
            {part.site && (
              <a
                href={part.site.href}
                {...linkTarget(part.site.href)}
                {...stylex.props(styles.link)}
              >
                <LinkIcon href={part.site.href} />
                <Translation value={part.site.label} />
              </a>
            )}
          </div>
          <p {...stylex.props(styles.summary)}>
            <Translation value={part.summary} />
          </p>
          {part.stack.length > 0 && (
            <p {...stylex.props(styles.stack)}>{part.stack.join(' · ')}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
