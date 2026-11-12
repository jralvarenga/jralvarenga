import { Menu } from '@base-ui/react/menu';
import * as stylex from '@stylexjs/stylex';
import { type LanguageCode, languages } from '../../lib/colophon';
import { elevation } from '../../styles/elevation';
import {
  colors,
  motion,
  radius,
  space,
  text,
} from '../../styles/tokens.stylex';
import { CheckIcon, ChevronsUpDownIcon, GlobeIcon } from '../icons';
import { Button } from '../ui/button';
import { Tag } from '../ui/tag';

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
    transitionDuration: motion.base,
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
  disabled: {
    color: colors.mutedForeground,
  },
  check: {
    display: 'inline-flex',
    width: '14px',
  },
  name: {
    flexGrow: 1,
  },
});

const current: LanguageCode = 'en';

/**
 * Language picker. Only English exists today, so the other languages are
 * listed as coming soon and can't be picked.
 */
export function LanguageMenu() {
  const active = languages.find((language) => language.code === current);

  return (
    <Menu.Root>
      <Menu.Trigger
        render={
          <Button
            variant="ghost"
            size="sm"
            aria-label={`Language: ${active?.label}`}
            xstyle={styles.trigger}
          />
        }
      >
        <GlobeIcon size={14} />
        {active?.label}
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
            <Menu.RadioGroup value={current}>
              {languages.map((language) => (
                <Menu.RadioItem
                  key={language.code}
                  value={language.code}
                  disabled={!language.available}
                  lang={language.code}
                  className={(state) =>
                    stylex.props(
                      styles.item,
                      state.highlighted && styles.highlighted,
                      state.disabled && styles.disabled,
                    ).className ?? ''
                  }
                >
                  <span {...stylex.props(styles.check)}>
                    <Menu.RadioItemIndicator>
                      <CheckIcon size={14} />
                    </Menu.RadioItemIndicator>
                  </span>
                  <span {...stylex.props(styles.name)}>{language.label}</span>
                  {!language.available && <Tag>Soon</Tag>}
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
