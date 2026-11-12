import { Button as BaseButton } from '@base-ui/react/button';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { elevation } from '../../styles/elevation';
import {
  colors,
  motion,
  radius,
  space,
  text,
  weight,
} from '../../styles/tokens.stylex';
import { Spinner } from './spinner';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg' | 'icon';

interface Props
  extends Omit<ComponentProps<typeof BaseButton>, 'className' | 'style'> {
  variant?: Variant;
  size?: Size;
  /** Shows a spinner, keeps the button width and blocks interaction. */
  loading?: boolean;
  /** StyleX overrides applied last. */
  xstyle?: stylex.StyleXStyles;
}

const styles = stylex.create({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.x2,
    flexShrink: 0,
    borderWidth: 0,
    borderRadius: radius.md,
    fontFamily: 'inherit',
    fontWeight: weight.medium,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    opacity: {
      default: 1,
      ':hover': 0.9,
    },
    transform: {
      default: 'scale(1)',
      ':active': 'scale(0.97)',
    },
    transitionProperty: 'transform, opacity, box-shadow, background-color',
    transitionDuration: motion.fast,
    transitionTimingFunction: motion.easeOut,
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.ring}`,
    },
    outlineOffset: '3px',
  },
  ghost: {
    backgroundColor: {
      default: 'transparent',
      ':hover': colors.muted,
    },
    color: colors.foreground,
    opacity: 1,
  },
  // Compact like shadcn: 14px labels at every size.
  sm: {
    height: '28px',
    gap: '6px',
    paddingInline: '10px',
    fontSize: text.sm,
  },
  md: {
    height: '32px',
    paddingInline: space.x3,
    fontSize: text.sm,
  },
  lg: {
    height: '36px',
    paddingInline: space.x4,
    fontSize: text.sm,
  },
  icon: {
    width: '32px',
    height: '32px',
    paddingInline: 0,
  },
  disabled: {
    opacity: {
      default: 0.5,
      ':hover': 0.5,
    },
    transform: {
      default: 'scale(1)',
      ':active': 'scale(1)',
    },
    cursor: 'not-allowed',
  },
  loading: {
    cursor: 'progress',
  },
  label: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.x2,
  },
  hidden: {
    visibility: 'hidden',
  },
  spinner: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * Buttons drop the 4px bezel ring of the shared elevation and keep the
 * highlight, the 1px edge and a tighter drop shadow.
 */
const ringless = stylex.create({
  primary: {
    boxShadow: `inset 0 1px 0 ${colors.primaryHighlight}, 0 0 0 1px ${colors.primaryEdge}, 0 1px 3px ${colors.drop}`,
  },
  secondary: {
    boxShadow: `inset 0 1px 0 ${colors.highlight}, 0 0 0 1px ${colors.edge}, 0 1px 3px ${colors.drop}`,
  },
  danger: {
    boxShadow: `inset 0 1px 0 ${colors.primaryHighlight}, 0 0 0 1px ${colors.dangerEdge}, 0 1px 3px ${colors.drop}`,
  },
});

const variants = {
  primary: [elevation.raisedPrimary, ringless.primary],
  secondary: [elevation.raisedSurface, ringless.secondary],
  danger: [elevation.raisedDanger, ringless.danger],
  ghost: styles.ghost,
} satisfies Record<Variant, stylex.StyleXStyles>;

/**
 * The base button. Raised variants (`primary`, `secondary`, `danger`) use the
 * shared elevation: a lit top edge, a 1px edge, and a 4px bezel ring. Use
 * `ghost` for low emphasis actions such as toolbars and icon buttons.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  xstyle,
  children,
  ...props
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <BaseButton
      {...props}
      {...stylex.props(
        styles.base,
        variants[variant],
        styles[size],
        isDisabled && styles.disabled,
        loading && styles.loading,
        xstyle,
      )}
      disabled={isDisabled}
      focusableWhenDisabled={loading}
      aria-busy={loading || undefined}
    >
      <span {...stylex.props(styles.label, loading && styles.hidden)}>
        {children}
      </span>
      {loading && (
        <span {...stylex.props(styles.spinner)}>
          <Spinner />
        </span>
      )}
    </BaseButton>
  );
}
