import { Field as BaseField } from '@base-ui/react/field';
import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import { colors, space, text, weight } from '../../styles/tokens.stylex';

interface Props {
  label: ReactNode;
  description?: ReactNode;
  /** Error message. When set, the field and its control are invalid. */
  error?: ReactNode;
  disabled?: boolean;
  /**
   * `stacked` puts the label above the control (inputs and textareas).
   * `inline` puts the control before the label (checkboxes and switches).
   */
  layout?: 'stacked' | 'inline';
  name?: string;
  children: ReactNode;
  /** StyleX overrides applied last. */
  xstyle?: stylex.StyleXStyles;
}

const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x2,
    minWidth: 0,
  },
  label: {
    fontSize: text.sm,
    fontWeight: weight.medium,
    color: colors.foreground,
  },
  inlineLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.x3,
    fontSize: text.md,
    fontWeight: weight.regular,
    color: colors.foreground,
    cursor: 'pointer',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  description: {
    margin: 0,
    fontSize: text.sm,
    lineHeight: 1.5,
    color: colors.mutedForeground,
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    gap: space.x1,
    fontSize: text.sm,
    lineHeight: 1.5,
    color: colors.danger,
  },
});

/**
 * Wraps a control with its label, description and error message. It links
 * them through Base UI, so `Input`, `Textarea`, `Checkbox` and `Switch` get
 * the right ids, `aria-describedby` and invalid state.
 */
export function Field({
  label,
  description,
  error,
  disabled,
  layout = 'stacked',
  name,
  children,
  xstyle,
}: Props) {
  const isInline = layout === 'inline';

  return (
    <BaseField.Root
      {...stylex.props(styles.root, xstyle)}
      invalid={Boolean(error)}
      disabled={disabled}
      name={name}
    >
      {isInline ? (
        <BaseField.Label
          {...stylex.props(styles.inlineLabel, disabled && styles.disabled)}
        >
          {children}
          {label}
        </BaseField.Label>
      ) : (
        <>
          <BaseField.Label {...stylex.props(styles.label)}>
            {label}
          </BaseField.Label>
          {children}
        </>
      )}
      {description && (
        <BaseField.Description {...stylex.props(styles.description)}>
          {description}
        </BaseField.Description>
      )}
      {error && (
        <BaseField.Error {...stylex.props(styles.error)} match>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="7"
              cy="7"
              r="6"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M7 4v3.5M7 9.75v.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {error}
        </BaseField.Error>
      )}
    </BaseField.Root>
  );
}
