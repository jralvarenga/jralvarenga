import * as stylex from '@stylexjs/stylex';
import { type Chapter, formatYears } from '../../lib/about/about';
import { colors, font, space, text, weight } from '../../styles/tokens.stylex';
import { InlineLogo } from './inline-logo';

const DOT = '9px';
/** Space between chapters, which the rail has to bridge. */
const GAP = space.x8;

const styles = stylex.create({
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  // Years | rail | story on wide screens; the years move above on mobile.
  item: {
    display: 'grid',
    gridTemplateColumns: {
      default: `${DOT} 1fr`,
      '@media (min-width: 640px)': `112px ${DOT} 1fr`,
    },
    gridTemplateAreas: {
      default: '"rail years" "rail story"',
      '@media (min-width: 640px)': '"years rail story"',
    },
    columnGap: space.x6,
    rowGap: space.x1,
    paddingBottom: GAP,
  },
  years: {
    gridArea: 'years',
    color: colors.mutedForeground,
    fontFamily: font.mono,
    fontSize: text.sm,
    fontVariantNumeric: 'tabular-nums',
    lineHeight: '24px',
    whiteSpace: 'nowrap',
  },
  rail: {
    gridArea: 'rail',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  dot: {
    width: DOT,
    height: DOT,
    marginTop: '8px',
    borderRadius: '50%',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.ring,
    backgroundColor: colors.background,
  },
  current: {
    borderColor: colors.foreground,
    backgroundColor: colors.foreground,
  },
  line: {
    position: 'absolute',
    top: '22px',
    bottom: `calc(-1 * ${GAP} + 4px)`,
    width: '1px',
    backgroundColor: colors.border,
  },
  story: {
    gridArea: 'story',
    display: 'flex',
    flexDirection: 'column',
    gap: space.x1,
    minWidth: 0,
  },
  heading: {
    margin: 0,
    fontSize: text.md,
    fontWeight: weight.medium,
    lineHeight: 1.5,
    textWrap: 'pretty',
  },
  at: {
    color: colors.mutedForeground,
    fontWeight: weight.regular,
  },
  text: {
    color: colors.mutedForeground,
    lineHeight: 1.6,
    textWrap: 'pretty',
  },
});

interface Props {
  chapters: Chapter[];
}

/**
 * The story so far, newest first: years on the left, a hairline rail with a
 * dot per chapter (filled while it's still going), and a short story with
 * the role and organization written as a sentence.
 */
export function Timeline({ chapters }: Props) {
  return (
    <ol {...stylex.props(styles.list)}>
      {chapters.map((chapter, index) => {
        const isLast = index === chapters.length - 1;
        const isCurrent = chapter.end === undefined;

        return (
          <li
            key={`${chapter.role}-${chapter.start}`}
            {...stylex.props(styles.item)}
          >
            <span {...stylex.props(styles.years)}>{formatYears(chapter)}</span>
            <div aria-hidden="true" {...stylex.props(styles.rail)}>
              <span
                {...stylex.props(styles.dot, isCurrent && styles.current)}
              />
              {!isLast && <span {...stylex.props(styles.line)} />}
            </div>
            <div {...stylex.props(styles.story)}>
              <h3 {...stylex.props(styles.heading)}>
                {chapter.role} <span {...stylex.props(styles.at)}>at</span>{' '}
                <InlineLogo organization={chapter.organization} />{' '}
                {chapter.organization.name}
              </h3>
              <p {...stylex.props(styles.text)}>{chapter.story}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
