import * as stylex from '@stylexjs/stylex';
import { type ReactNode, useEffect, useState } from 'react';
import {
  applyPreference,
  readPreference,
  subscribeTheme,
  type ThemePreference,
} from '../../lib/theme';
import { motion } from '../../styles/tokens.stylex';
import { MonitorIcon, MoonIcon, SunIcon } from '../icons';
import { Button } from '../ui/button';

/** The order the button cycles through. */
const cycle: ThemePreference[] = ['system', 'light', 'dark'];

const labels: Record<ThemePreference, string> = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};

const icons: Record<ThemePreference, ReactNode> = {
  system: <MonitorIcon size={16} />,
  light: <SunIcon size={16} />,
  dark: <MoonIcon size={16} />,
};

const styles = stylex.create({
  stack: {
    position: 'relative',
    display: 'block',
    width: '16px',
    height: '16px',
  },
  icon: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
  },
  animated: {
    transitionProperty: 'opacity, transform',
    transitionDuration: {
      default: motion.slow,
      '@media (prefers-reduced-motion: reduce)': '0s',
    },
    transitionTimingFunction: motion.easeOut,
  },
  current: {
    opacity: 1,
    transform: 'rotate(0deg) scale(1)',
  },
  // The next icon waits a quarter turn back, so it turns in clockwise.
  next: {
    opacity: 0,
    transform: 'rotate(-90deg) scale(0.5)',
  },
  // The previous icon leaves a quarter turn forward, still clockwise.
  previous: {
    opacity: 0,
    transform: 'rotate(90deg) scale(0.5)',
  },
});

function nextOf(theme: ThemePreference) {
  return cycle[(cycle.indexOf(theme) + 1) % cycle.length] ?? 'system';
}

/**
 * One button that cycles system, light, and dark. The icons morph into
 * each other: the old one turns out and shrinks while the new one turns in.
 * Stays in sync with the D hotkey.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemePreference>('system');
  // The stored theme is read after hydration. Skip the morph for that first
  // sync so the button doesn't animate on load.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function sync() {
      setTheme(readPreference());
    }

    sync();
    const frame = requestAnimationFrame(() => setReady(true));
    const unsubscribe = subscribeTheme(sync);
    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
    };
  }, []);

  function toggle() {
    const next = nextOf(theme);
    setTheme(next);
    applyPreference(next);
  }

  const next = nextOf(theme);

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={toggle}
      aria-label={`Theme: ${labels[theme]}. Switch to ${labels[next]}`}
      title={`Theme: ${labels[theme]}`}
    >
      <span aria-hidden="true" {...stylex.props(styles.stack)}>
        {cycle.map((option) => (
          <span
            key={option}
            {...stylex.props(
              styles.icon,
              ready && styles.animated,
              option === theme
                ? styles.current
                : option === next
                  ? styles.next
                  : styles.previous,
            )}
          >
            {icons[option]}
          </span>
        ))}
      </span>
    </Button>
  );
}
