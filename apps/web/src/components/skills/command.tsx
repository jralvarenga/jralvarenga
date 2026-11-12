import * as stylex from '@stylexjs/stylex';
import { colors, font, radius, space, text } from '../../styles/tokens.stylex';
import { CheckIcon, CopyIcon } from '../icons';
import { Button } from '../ui/button';

const styles = stylex.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: space.x2,
    paddingInlineStart: space.x4,
    paddingInlineEnd: space.x1,
    paddingBlock: space.x1,
    borderRadius: radius.md,
    backgroundColor: colors.muted,
  },
  code: {
    flexGrow: 1,
    minWidth: 0,
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    fontFamily: font.mono,
    fontSize: text.sm,
    scrollbarWidth: 'none',
  },
  prompt: {
    color: colors.mutedForeground,
    userSelect: 'none',
  },
});

interface Props {
  command: string;
}

/**
 * A shell command with a copy button. The button is wired up by
 * `bindCopyButtons` in `lib/copy.ts`, so it needs no hydration.
 */
export function Command({ command }: Props) {
  return (
    <div {...stylex.props(styles.root)}>
      <code {...stylex.props(styles.code)}>
        <span {...stylex.props(styles.prompt)}>$ </span>
        {command}
      </code>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Copy command"
        data-copy={command}
      >
        {/* No display style on these spans, so `hidden` can hide them. */}
        <span data-copy-idle="">
          <CopyIcon />
        </span>
        <span data-copy-done="" hidden>
          <CheckIcon />
        </span>
      </Button>
    </div>
  );
}
