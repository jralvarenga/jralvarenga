import * as stylex from '@stylexjs/stylex';
import type { ToolGroup } from '../../lib/about/about';
import {
  colors,
  radius,
  space,
  text,
  weight,
} from '../../styles/tokens.stylex';
import { ToolIcon } from './tool-icon';

const desktop = '@media (min-width: 640px)';

const styles = stylex.create({
  list: {
    margin: 0,
  },
  // One row per group, split by hairlines. On wide screens the group name
  // sits in a left column, level with the first line of pills, and the
  // pills start where the timeline's stories do (112px + dot + gaps).
  group: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr',
      [desktop]: '145px 1fr',
    },
    gap: {
      default: space.x3,
      [desktop]: space.x6,
    },
    paddingBlock: space.x4,
    borderTopWidth: {
      default: '1px',
      ':first-child': 0,
    },
    borderTopStyle: 'solid',
    borderTopColor: colors.border,
    paddingTop: {
      default: space.x4,
      ':first-child': 0,
    },
  },
  name: {
    color: colors.mutedForeground,
    fontSize: text.sm,
    lineHeight: 1.5,
    textWrap: 'balance',
    // Centers the first line on the 32px pills beside it.
    paddingTop: {
      default: 0,
      [desktop]: '5px',
    },
  },
  detail: {
    margin: 0,
  },
  pills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: space.x2,
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  // Static content, so the pill stays flat: a hairline and no elevation.
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.x2,
    height: '32px',
    paddingInlineStart: '10px',
    paddingInlineEnd: space.x3,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radius.full,
    color: colors.foreground,
    fontSize: text.sm,
    fontWeight: weight.medium,
    lineHeight: 1,
    whiteSpace: 'nowrap',
  },
  icon: {
    flexShrink: 0,
  },
});

/** Tools grouped by kind, each a pill with its brand mark. */
export function ToolList({ groups }: { groups: ToolGroup[] }) {
  return (
    <dl {...stylex.props(styles.list)}>
      {groups.map(({ group, tools }) => (
        <div key={group} {...stylex.props(styles.group)}>
          <dt {...stylex.props(styles.name)}>{group}</dt>
          <dd {...stylex.props(styles.detail)}>
            <ul {...stylex.props(styles.pills)}>
              {tools.map((tool) => (
                <li key={tool.name} {...stylex.props(styles.pill)}>
                  <ToolIcon
                    name={tool.icon}
                    size={16}
                    {...stylex.props(styles.icon)}
                  />
                  {tool.name}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
