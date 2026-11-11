import * as stylex from '@stylexjs/stylex';

/**
 * Semantic color tokens. Every value uses `light-dark()`, so the active
 * theme follows `color-scheme` on `<html>` (system, or forced through
 * `data-theme` in global.css). This is the only file that may contain raw
 * color values.
 */
export const colors = stylex.defineVars({
  background: 'light-dark(oklch(1 0 0), oklch(0.145 0 0))',
  foreground: 'light-dark(oklch(0.145 0 0), oklch(0.985 0 0))',
  card: 'light-dark(oklch(1 0 0), oklch(0.205 0 0))',
  cardForeground: 'light-dark(oklch(0.145 0 0), oklch(0.985 0 0))',
  primary: 'light-dark(oklch(0.205 0 0), oklch(0.922 0 0))',
  primaryTop: 'light-dark(oklch(0.34 0 0), oklch(1 0 0))',
  primaryEdge: 'light-dark(oklch(0.1 0 0), oklch(0.72 0 0))',
  primaryHighlight: 'light-dark(oklch(1 0 0 / 0.2), oklch(1 0 0 / 0.9))',
  primaryForeground: 'light-dark(oklch(0.985 0 0), oklch(0.205 0 0))',
  muted: 'light-dark(oklch(0.97 0 0), oklch(0.269 0 0))',
  mutedForeground: 'light-dark(oklch(0.556 0 0), oklch(0.708 0 0))',
  border: 'light-dark(oklch(0.922 0 0), oklch(0.32 0 0))',
  ring: 'light-dark(oklch(0.556 0 0), oklch(0.708 0 0))',
  surface: 'light-dark(oklch(0.965 0 0), oklch(0.235 0 0))',
  surfaceTop: 'light-dark(oklch(1 0 0), oklch(0.29 0 0))',
  edge: 'light-dark(oklch(0 0 0 / 0.14), oklch(1 0 0 / 0.12))',
  highlight: 'light-dark(oklch(1 0 0), oklch(1 0 0 / 0.08))',
  bezel: 'light-dark(oklch(0 0 0 / 0.06), oklch(1 0 0 / 0.07))',
  bezelFocus: 'light-dark(oklch(0 0 0 / 0.12), oklch(1 0 0 / 0.16))',
  drop: 'light-dark(oklch(0 0 0 / 0.08), oklch(0 0 0 / 0.5))',
  inset: 'light-dark(oklch(0 0 0 / 0.06), oklch(0 0 0 / 0.35))',
  success: 'light-dark(oklch(0.205 0 0), oklch(0.922 0 0))',
  warning: 'light-dark(oklch(0.62 0.15 70), oklch(0.82 0.14 80))',
  danger: 'light-dark(oklch(0.577 0.245 27.325), oklch(0.704 0.191 22.216))',
  dangerSolid: 'light-dark(oklch(0.577 0.245 27.325), oklch(0.56 0.22 25))',
  dangerTop: 'light-dark(oklch(0.64 0.22 27), oklch(0.63 0.2 25))',
  dangerEdge: 'light-dark(oklch(0.46 0.2 27), oklch(0.45 0.18 25))',
  dangerForeground: 'oklch(0.985 0 0)',
});

/** Spacing scale on a 4px grid. */
export const space = stylex.defineVars({
  x1: '4px',
  x2: '8px',
  x3: '12px',
  x4: '16px',
  x6: '24px',
  x8: '32px',
  x12: '48px',
  x16: '64px',
  x24: '96px',
});

/** Corner radius scale. */
export const radius = stylex.defineVars({
  sm: '6px',
  md: '8px',
  lg: '12px',
  full: '9999px',
});

/** Font families. The `--font-*` variables come from the Astro Fonts API. */
export const font = stylex.defineVars({
  sans: 'var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif',
  mono: 'var(--font-geist-mono), ui-monospace, monospace',
});

/** Font sizes. 16px is the base, 14px is the minimum. */
export const text = stylex.defineVars({
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '24px',
  display: '40px',
});

/** Font weights. Only regular, medium and bold are allowed. */
export const weight = stylex.defineVars({
  regular: '400',
  medium: '500',
  bold: '700',
});

/** Motion durations and easings. Nothing should run longer than 300ms. */
export const motion = stylex.defineVars({
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  easeOut: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeInOut: 'cubic-bezier(0.77, 0, 0.175, 1)',
});
