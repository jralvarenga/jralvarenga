import * as stylex from '@stylexjs/stylex';
import { space } from '../../styles/tokens.stylex';
import { LanguageMenu } from './language-menu';
import { ThemeToggle } from './theme-toggle';

const styles = stylex.create({
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: space.x3,
  },
});

/** The footer's interactive controls, hydrated as one island. */
export function FooterSettings() {
  return (
    <div {...stylex.props(styles.row)}>
      <LanguageMenu />
      <ThemeToggle />
    </div>
  );
}
