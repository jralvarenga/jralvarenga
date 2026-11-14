import * as stylex from '@stylexjs/stylex';
import type { SettingsCopy } from '../../lib/i18n/settings-copy';
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

interface Props {
  /** Accessible labels in every language, built on the server. */
  copy: SettingsCopy;
}

/** The footer's interactive controls, hydrated as one island. */
export function FooterSettings({ copy }: Props) {
  return (
    <div {...stylex.props(styles.row)}>
      <LanguageMenu label={copy.language} />
      <ThemeToggle labels={copy.theme} />
    </div>
  );
}
