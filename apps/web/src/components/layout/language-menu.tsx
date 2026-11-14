import { Menu } from '@base-ui/react/menu';
import * as stylex from '@stylexjs/stylex';
import { useLocale } from '../../hooks/use-locale';
import { applyLocale } from '../../lib/i18n/locale';
import {
  isLocale,
  type Localized,
  languageNames,
  languages,
} from '../../lib/i18n/locales';
import { elevation } from '../../styles/elevation';
import {
  colors,
  motion,
  radius,
  space,
  text,
} from '../../styles/tokens.stylex';
import { CheckIcon, ChevronsUpDownIcon, GlobeIcon } from '../icons';
import { Translation } from '../translation';
import { Button } from '../ui/button';

const styles = stylex.create({
  trigger: {
    color: colors.mutedForeground,
  },
  chevron: {
    opacity: 0.6,
  },
  positioner: {
    zIndex: 20,
  },
  popup: {
    minWidth: '176px',
    padding: space.x1,
    borderRadius: radius.lg,
    transformOrigin: 'var(--transform-origin)',
    transitionProperty: 'opacity, transform',
    transitionDuration: {
      default: motion.base,
      '@media (prefers-reduced-motion: reduce)': '0s',
    },
    transitionTimingFunction: motion.easeOut,
    outline: 'none',
  },
  // A floating surface: the raised elevation, filled flat with `card`.
  surface: {
    backgroundColor: colors.card,
    backgroundImage: 'none',
  },
  hidden: {
    opacity: 0,
    transform: 'scale(0.96)',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: space.x2,
    minHeight: '36px',
    paddingInline: space.x2,
    borderRadius: radius.md,
    fontSize: text.sm,
    color: colors.foreground,
    cursor: 'default',
    userSelect: 'none',
    outline: 'none',
  },
  highlighted: {
    backgroundColor: colors.muted,
  },
  check: {
    display: 'inline-flex',
    width: '14px',
  },
  name: {
    flexGrow: 1,
  },
});

interface Props {
  /** "Language: English", per locale, for the trigger's accessible name. */
  label: Localized;
}

/**
 * Language picker. Switching rewrites `<html lang>` in place, so the page
 * shows its other copy at once, and stores the choice for the next visit.
 * The trigger shows both names and lets the page language pick one, so it
 * reads right before the island hydrates.
 */
export function LanguageMenu({ label }: Props) {
  const locale = useLocale();

  function select(value: unknown) {
    if (isLocale(value) && value !== locale) applyLocale(value);
  }

  return (
    <Menu.Root>
      <Menu.Trigger
        render={
          <Button
            variant="ghost"
            size="sm"
            aria-label={label[locale]}
            xstyle={styles.trigger}
          />
        }
      >
        <GlobeIcon size={14} />
        <Translation value={languageNames} />
        <ChevronsUpDownIcon size={12} {...stylex.props(styles.chevron)} />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner
          side="top"
          align="end"
          sideOffset={8}
          {...stylex.props(styles.positioner)}
        >
          <Menu.Popup
            className={(state) =>
              stylex.props(
                elevation.raisedSurface,
                styles.surface,
                styles.popup,
                (state.transitionStatus === 'starting' ||
                  state.transitionStatus === 'ending') &&
                  styles.hidden,
              ).className ?? ''
            }
          >
            <Menu.RadioGroup value={locale} onValueChange={select}>
              {languages.map((language) => (
                <Menu.RadioItem
                  key={language.locale}
                  value={language.locale}
                  lang={language.locale}
                  className={(state) =>
                    stylex.props(
                      styles.item,
                      state.highlighted && styles.highlighted,
                    ).className ?? ''
                  }
                >
                  <span {...stylex.props(styles.check)}>
                    <Menu.RadioItemIndicator>
                      <CheckIcon size={14} />
                    </Menu.RadioItemIndicator>
                  </span>
                  <span {...stylex.props(styles.name)}>{language.label}</span>
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
