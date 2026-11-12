import * as stylex from '@stylexjs/stylex';
import type { Organization } from '../../lib/about/about';
import { colors, font, weight } from '../../styles/tokens.stylex';

const styles = stylex.create({
  tile: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '1em',
    height: '1em',
    marginInline: '0.08em',
    overflow: 'hidden',
    borderRadius: '0.26em',
    // Center on the text, not on the initials' baseline.
    verticalAlign: 'middle',
  },
  placeholder: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.muted,
  },
  initials: {
    color: colors.mutedForeground,
    fontFamily: font.mono,
    fontSize: '0.5em',
    fontWeight: weight.regular,
    letterSpacing: 0,
    lineHeight: 1,
  },
  // Flags are emoji, drawn by the system font at the text's size.
  emoji: {
    fontSize: '1em',
    lineHeight: 1,
  },
  // Logos keep their own shape inside the tile, with no fill or border.
  logo: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
});

interface Props {
  organization: Organization;
  /** StyleX overrides, such as a fixed size outside running text. */
  xstyle?: stylex.StyleXStyles;
}

/**
 * A rounded logo tile that sits inline with text and scales with its font
 * size. Shows a country's flag emoji, an organization's SVG logo, or its
 * initials until it has one. The name
 * is always written next to it, so the tile is hidden from screen readers.
 */
export function InlineLogo({ organization, xstyle }: Props) {
  const Logo = organization.logo;

  return (
    <span
      aria-hidden="true"
      {...stylex.props(
        styles.tile,
        !organization.logo && !organization.emoji && styles.placeholder,
        xstyle,
      )}
    >
      {organization.emoji ? (
        <span {...stylex.props(styles.emoji)}>{organization.emoji}</span>
      ) : Logo ? (
        <Logo {...stylex.props(styles.logo)} />
      ) : (
        <span {...stylex.props(styles.initials)}>{organization.initials}</span>
      )}
    </span>
  );
}
