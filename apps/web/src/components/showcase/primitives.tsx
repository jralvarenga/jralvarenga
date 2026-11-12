import * as stylex from '@stylexjs/stylex';
import { useEffect, useState } from 'react';
import {
  applyPreference,
  readPreference,
  subscribeTheme,
  type ThemePreference,
} from '../../lib/theme';
import { colors, space, text, weight } from '../../styles/tokens.stylex';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Field } from '../ui/field';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Tag } from '../ui/tag';
import { Textarea } from '../ui/textarea';

const styles = stylex.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x16,
    width: '100%',
    maxWidth: '640px',
    marginInline: 'auto',
    paddingInline: {
      default: space.x4,
      '@media (min-width: 640px)': space.x6,
    },
    paddingBlock: space.x16,
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.x4,
  },
  title: {
    fontSize: text.xl,
    fontWeight: weight.medium,
    letterSpacing: '-0.02em',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x6,
  },
  heading: {
    fontSize: text.lg,
    fontWeight: weight.medium,
    letterSpacing: '-0.01em',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: space.x4,
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x6,
  },
  muted: {
    fontSize: text.sm,
    color: colors.mutedForeground,
  },
});

/**
 * Preview of every UI primitive in each variant and state. Used by the
 * `/ui` route to review the design system in light and dark mode.
 */
export function Primitives() {
  const [theme, setTheme] = useState<ThemePreference>('system');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function sync() {
      setTheme(readPreference());
    }

    sync();
    return subscribeTheme(sync);
  }, []);

  function selectTheme(next: ThemePreference) {
    applyPreference(next);
    setTheme(next);
  }

  function simulateLoading() {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1500);
  }

  return (
    <main id="content" {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>Primitives</h1>
        <div {...stylex.props(styles.row)}>
          {(['system', 'light', 'dark'] as const).map((option) => (
            <Button
              key={option}
              size="sm"
              variant={theme === option ? 'secondary' : 'ghost'}
              onClick={() => selectTheme(option)}
              aria-pressed={theme === option}
            >
              {option}
            </Button>
          ))}
        </div>
      </header>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.heading)}>Button</h2>
        <div {...stylex.props(styles.row)}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Delete</Button>
        </div>
        <div {...stylex.props(styles.row)}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" variant="secondary" aria-label="Swap">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.5 5.5h10m0 0L10 3m2.5 2.5L10 8M13.5 10.5h-10m0 0L6 8m-2.5 2.5L6 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
        <div {...stylex.props(styles.row)}>
          <Button loading={loading} onClick={simulateLoading}>
            Save changes
          </Button>
          <Button variant="secondary" loading>
            Loading
          </Button>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.heading)}>Input</h2>
        <div {...stylex.props(styles.stack)}>
          <Field label="Name" description="How should I address you?">
            <Input placeholder="Jane Doe" />
          </Field>
          <Field label="Email" error="Enter a valid email, like jane@site.com.">
            <Input type="email" defaultValue="jane@" />
          </Field>
          <Field label="Disabled" disabled>
            <Input placeholder="Not editable" />
          </Field>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.heading)}>Textarea</h2>
        <div {...stylex.props(styles.stack)}>
          <Field label="Message" description="A few lines is enough.">
            <Textarea placeholder="Tell me about your project" />
          </Field>
          <Field label="Message" error="The message can't be empty.">
            <Textarea />
          </Field>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.heading)}>Switch</h2>
        <div {...stylex.props(styles.stack)}>
          <Field label="Email notifications" layout="inline">
            <Switch defaultChecked />
          </Field>
          <Field label="Weekly digest" layout="inline">
            <Switch />
          </Field>
          <Field label="Disabled" layout="inline" disabled>
            <Switch />
          </Field>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.heading)}>Checkbox</h2>
        <div {...stylex.props(styles.stack)}>
          <Field label="Accept terms" layout="inline">
            <Checkbox defaultChecked />
          </Field>
          <Field label="Subscribe" layout="inline">
            <Checkbox />
          </Field>
          <Field label="Some selected" layout="inline">
            <Checkbox indeterminate />
          </Field>
          <Field label="Disabled" layout="inline" disabled>
            <Checkbox />
          </Field>
        </div>
        <p {...stylex.props(styles.muted)}>
          All controls share one elevation: a lit top edge, a 1px edge, and a
          4px bezel ring.
        </p>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.heading)}>Tag</h2>
        <div {...stylex.props(styles.row)}>
          <Tag>In progress</Tag>
          <Tag>TypeScript</Tag>
          <Tag>Next.js</Tag>
        </div>
        <p {...stylex.props(styles.muted)}>
          Tags are static content, so they stay flat.
        </p>
      </section>
    </main>
  );
}
