import { Field } from '@base-ui/react/field';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { elevation, field } from '../../styles/elevation';

interface Props
  extends Omit<ComponentProps<'textarea'>, 'className' | 'style'> {
  /** Marks the textarea invalid when it is used outside a `Field`. */
  invalid?: boolean;
  /** StyleX overrides applied last. */
  xstyle?: stylex.StyleXStyles;
}

const styles = stylex.create({
  root: {
    minHeight: '96px',
    resize: 'vertical',
  },
});

/**
 * A multi line text field with the same recessed elevation as `Input`. It
 * renders through `Field.Control`, so it works inside a `Field` too.
 */
export function Textarea({
  invalid,
  disabled,
  xstyle,
  rows = 4,
  ...props
}: Props) {
  return (
    <Field.Control
      render={<textarea {...props} rows={rows} />}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      className={(state) =>
        stylex.props(
          field.base,
          elevation.recessed,
          styles.root,
          (invalid || state.valid === false) && elevation.recessedInvalid,
          state.disabled && field.disabled,
          xstyle,
        ).className ?? ''
      }
    />
  );
}
