import { nextPreference, type ThemePreference, themeCycle } from '../theme';
import { type Localized, languageNames } from './locales';
import { localize } from './translator';

/** Labels for the footer controls, passed to the island as props. */
export type SettingsCopy = {
  /** "Language: English" for the menu trigger. */
  language: Localized;
  /** "Theme: System. Switch to Light", for each current preference. */
  theme: Record<ThemePreference, Localized>;
};

/**
 * Builds the footer controls' accessible labels on the server, so the
 * island doesn't ship the translator or the message files.
 */
export function settingsCopy(): SettingsCopy {
  const names: Record<ThemePreference, Localized> = {
    system: localize('settings.themes.system'),
    light: localize('settings.themes.light'),
    dark: localize('settings.themes.dark'),
  };

  return {
    language: localize('settings.language', { language: languageNames }),
    theme: Object.fromEntries(
      themeCycle.map((theme) => [
        theme,
        localize('settings.theme', {
          current: names[theme],
          next: names[nextPreference(theme)],
        }),
      ]),
    ) as Record<ThemePreference, Localized>,
  };
}
