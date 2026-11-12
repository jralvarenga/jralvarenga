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
    fontSize: '0.36em',
    fontWeight: weight.regular,
    letterSpacing: 0,
    lineHeight: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

interface Props {
  organization: Organization;
  /** StyleX overrides, such as a fixed size outside running text. */
  xstyle?: stylex.StyleXStyles;
}

/**
 * A rounded logo tile that sits inline with text and scales with its font
 * size. Shows the organization's initials until it has a logo. The name
 * is always written next to it, so the tile is hidden from screen readers.
 */
export function InlineLogo({ organization, xstyle }: Props) {
  return (
    <span
      aria-hidden="true"
      {...stylex.props(
        styles.tile,
        !organization.logo && styles.placeholder,
        xstyle,
      )}
    >
      {organization.logo ? (
        <img src={organization.logo} alt="" {...stylex.props(styles.image)} />
      ) : (
        <span {...stylex.props(styles.initials)}>{organization.initials}</span>
      )}
    </span>
  );
}
