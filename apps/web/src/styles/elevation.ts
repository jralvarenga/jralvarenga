import * as stylex from '@stylexjs/stylex';
import { colors, motion, radius, space, text } from './tokens.stylex';

/**
 * The elevation language shared by every control. Each layer of the
 * box-shadow has one job:
 * - an inset highlight on top for the lit edge,
 * - a 1px edge that defines the shape,
 * - a 4px translucent bezel ring around the control,
 * - a soft drop shadow under the bezel.
 *
 * Raised controls (buttons, switch thumb, checkbox) use the `raised*` styles.
 * Text fields use `recessed`, which flips the highlight into an inset shadow.
 */
export const elevation = stylex.create({
  raisedPrimary: {
    backgroundColor: colors.primary,
    backgroundImage: `linear-gradient(to bottom, ${colors.primaryTop}, ${colors.primary})`,
    color: colors.primaryForeground,
    boxShadow: `inset 0 1px 0 ${colors.primaryHighlight}, 0 0 0 1px ${colors.primaryEdge}, 0 0 0 4px ${colors.bezel}, 0 2px 4px 3px ${colors.drop}`,
  },
  raisedSurface: {
    backgroundColor: colors.surface,
    backgroundImage: `linear-gradient(to bottom, ${colors.surfaceTop}, ${colors.surface})`,
    color: colors.foreground,
    boxShadow: `inset 0 1px 0 ${colors.highlight}, 0 0 0 1px ${colors.edge}, 0 0 0 4px ${colors.bezel}, 0 2px 4px 3px ${colors.drop}`,
  },
  raisedDanger: {
    backgroundColor: colors.dangerSolid,
    backgroundImage: `linear-gradient(to bottom, ${colors.dangerTop}, ${colors.dangerSolid})`,
    color: colors.dangerForeground,
    boxShadow: `inset 0 1px 0 ${colors.primaryHighlight}, 0 0 0 1px ${colors.dangerEdge}, 0 0 0 4px ${colors.bezel}, 0 2px 4px 3px ${colors.drop}`,
  },
  recessed: {
    backgroundColor: colors.card,
    color: colors.foreground,
    boxShadow: {
      default: `inset 0 1px 2px ${colors.inset}, 0 0 0 1px ${colors.edge}, 0 0 0 4px ${colors.bezel}`,
      ':focus': `inset 0 1px 2px ${colors.inset}, 0 0 0 1px ${colors.ring}, 0 0 0 4px ${colors.bezelFocus}`,
    },
  },
  recessedInvalid: {
    boxShadow: {
      default: `inset 0 1px 2px ${colors.inset}, 0 0 0 1px ${colors.danger}, 0 0 0 4px ${colors.bezel}`,
      ':focus': `inset 0 1px 2px ${colors.inset}, 0 0 0 1px ${colors.danger}, 0 0 0 4px ${colors.bezelFocus}`,
    },
  },
});

/**
 * Base styles for text fields (input and textarea). They sit on top of
 * `elevation.recessed`.
 */
export const field = stylex.create({
  base: {
    width: '100%',
    minWidth: 0,
    borderWidth: 0,
    borderRadius: radius.md,
    paddingBlock: space.x2,
    paddingInline: space.x3,
    fontSize: text.md,
    lineHeight: 1.5,
    outline: 'none',
    transitionProperty: 'box-shadow',
    transitionDuration: motion.fast,
    transitionTimingFunction: motion.easeOut,
    '::placeholder': {
      color: colors.mutedForeground,
    },
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});
