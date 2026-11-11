import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { elevation } from '../../styles/elevation';
import { colors, motion, radius } from '../../styles/tokens.stylex';

interface Props
  extends Omit<
    ComponentProps<typeof BaseCheckbox.Root>,
    'className' | 'style'
  > {
  /** StyleX overrides applied last. */
  xstyle?: stylex.StyleXStyles;
}

const styles = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '20px',
    height: '20px',
    padding: 0,
    borderWidth: 0,
    borderRadius: radius.sm,
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    transform: {
      default: 'scale(1)',
      ':active': 'scale(0.94)',
    },
    transitionProperty: 'transform, box-shadow, background-color',
    transitionDuration: motion.fast,
    transitionTimingFunction: motion.easeOut,
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.ring}`,
    },
    outlineOffset: '6px',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    transform: {
      default: 'scale(1)',
      ':active': 'scale(1)',
    },
  },
  indicator: {
    display: 'flex',
    color: colors.primaryForeground,
  },
});

/**
 * A checkbox with the raised surface elevation. When checked it switches to
 * the primary elevation and shows a check mark. Supports the indeterminate
 * state through the `indeterminate` prop.
 */
export function Checkbox({ xstyle, ...props }: Props) {
  return (
    <BaseCheckbox.Root
      {...props}
      className={(state) =>
        stylex.props(
          styles.root,
          state.checked || state.indeterminate
            ? elevation.raisedPrimary
            : elevation.raisedSurface,
          state.disabled && styles.disabled,
          xstyle,
        ).className ?? ''
      }
    >
      <BaseCheckbox.Indicator {...stylex.props(styles.indicator)}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d={props.indeterminate ? 'M2.5 6h7' : 'M2.5 6.25 5 8.5l4.5-5'}
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
