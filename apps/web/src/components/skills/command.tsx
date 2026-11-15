import * as stylex from '@stylexjs/stylex';
import { localizedAttribute } from '../../lib/i18n/attributes';
import { type Localized, locales } from '../../lib/i18n/locales';
import { localize } from '../../lib/i18n/translator';
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
 * `data-<name>-<locale>` attributes with the label the button takes after a
 * copy, read by `bindCopyButtons` for the language on screen.
 */
function statusLabels(name: string, label: Localized): Record<string, string> {
  return Object.fromEntries(
    locales.map((locale) => [`data-${name}-${locale}`, label[locale]]),
  );
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
        data-copy={command}
        {...localizedAttribute('aria-label', localize('skills.copy'))}
        {...statusLabels('copied', localize('skills.copied'))}
        {...statusLabels('copy-failed', localize('skills.copyFailed'))}
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
