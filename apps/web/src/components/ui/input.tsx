import { Input as BaseInput } from '@base-ui/react/input';
import * as stylex from '@stylexjs/stylex';
import type { ComponentProps } from 'react';
import { elevation, field } from '../../styles/elevation';

interface Props
  extends Omit<ComponentProps<typeof BaseInput>, 'className' | 'style'> {
  /** Marks the input invalid when it is used outside a `Field`. */
  invalid?: boolean;
  /** StyleX overrides applied last. */
  xstyle?: stylex.StyleXStyles;
}

const styles = stylex.create({
  root: {
    height: '36px',
  },
});

/**
 * A single line text input with the recessed elevation. Inside a `Field` it
 * picks up the label, description and validity automatically.
 */
export function Input({ invalid, xstyle, ...props }: Props) {
  return (
    <BaseInput
      {...props}
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
