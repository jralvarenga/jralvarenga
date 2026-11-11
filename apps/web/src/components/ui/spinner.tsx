import * as stylex from '@stylexjs/stylex';

interface Props {
  /** Accessible label read by screen readers. */
  label?: string;
  size?: number;
}

const spin = stylex.keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

const styles = stylex.create({
  root: {
    display: 'inline-block',
    flexShrink: 0,
    animationName: spin,
    animationDuration: '700ms',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationPlayState: {
      default: 'running',
      '@media (prefers-reduced-motion: reduce)': 'paused',
    },
  },
});

/**
 * A small spinner that inherits `currentColor`. Use it for loading states
 * that the user triggered, such as a submitting button.
 */
export function Spinner({ label = 'Loading', size = 16 }: Props) {
  return (
    <svg
      {...stylex.props(styles.root)}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      role="status"
      aria-label={label}
    >
      <circle
        cx="8"
        cy="8"
        r="6.5"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <path
        d="M14.5 8A6.5 6.5 0 0 0 8 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
