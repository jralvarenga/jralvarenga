import { Switch as BaseSwitch } from '@base-ui/react/switch';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { elevation } from '../../styles/elevation';
import { colors, motion, radius } from '../../styles/tokens.stylex';

interface Props
  extends Omit<ComponentProps<typeof BaseSwitch.Root>, 'className' | 'style'> {
  /** StyleX overrides applied last to the track. */
  xstyle?: stylex.StyleXStyles;
}

const styles = stylex.create({
  track: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    width: '40px',
    height: '24px',
    padding: '3px',
    borderRadius: radius.full,
    backgroundColor: colors.muted,
    boxShadow: `inset 0 1px 2px ${colors.inset}, 0 0 0 1px ${colors.edge}, 0 0 0 4px ${colors.bezel}`,
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    transitionProperty: 'background-color, box-shadow',
    transitionDuration: motion.base,
    transitionTimingFunction: motion.easeOut,
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.ring}`,
    },
    outlineOffset: '6px',
  },
  trackChecked: {
    backgroundColor: colors.primary,
    boxShadow: `inset 0 1px 2px ${colors.inset}, 0 0 0 1px ${colors.primaryEdge}, 0 0 0 4px ${colors.bezel}`,
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  thumb: {
    display: 'block',
    width: '18px',
    height: '18px',
    borderRadius: radius.full,
    transform: 'translateX(0)',
    transitionProperty: 'transform',
    transitionDuration: {
      default: motion.base,
      '@media (prefers-reduced-motion: reduce)': '0ms',
    },
    transitionTimingFunction: motion.easeInOut,
  },
  thumbChecked: {
    transform: 'translateX(16px)',
  },
  thumbShadow: {
    boxShadow: `inset 0 1px 0 ${colors.highlight}, 0 0 0 1px ${colors.edge}, 0 1px 2px ${colors.drop}`,
  },
});

/**
 * An on/off toggle. The track is recessed and the thumb is raised, using the
 * same elevation as buttons.
 */
export function Switch({ xstyle, ...props }: Props) {
  return (
    <BaseSwitch.Root
      {...props}
      className={(state) =>
        stylex.props(
          styles.track,
          state.checked && styles.trackChecked,
          state.disabled && styles.disabled,
          xstyle,
        ).className ?? ''
      }
    >
      <BaseSwitch.Thumb
        className={(state) =>
          stylex.props(
            elevation.raisedSurface,
            styles.thumb,
            styles.thumbShadow,
            state.checked && styles.thumbChecked,
          ).className ?? ''
        }
      />
    </BaseSwitch.Root>
  );
}
