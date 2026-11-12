import * as stylex from '@stylexjs/stylex';
import { chapters, denzo, elSalvador, stack } from '../../lib/about/about';
import { colors, space, weight } from '../../styles/tokens.stylex';
import { PageLayout } from '../layout/page-layout';
import { Section } from '../page';
import { socialLinks } from '../social-links';
import { InlineLogo } from './inline-logo';
import { Timeline } from './timeline';

const styles = stylex.create({
  intro: {
    marginTop: space.x6,
    display: 'flex',
    flexDirection: 'column',
    gap: space.x4,
    lineHeight: 1.7,
    textWrap: 'pretty',
  },
  muted: {
    color: colors.mutedForeground,
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: space.x3,
    margin: 0,
  },
  stackRow: {
    lineHeight: 1.6,
  },
  stackGroup: {
    display: 'inline',
    fontWeight: weight.medium,
  },
  stackItems: {
    display: 'inline',
    margin: 0,
    color: colors.mutedForeground,
  },
  link: {
    color: colors.foreground,
    textDecorationLine: 'underline',
    textDecorationColor: colors.ring,
    textUnderlineOffset: '3px',
  },
});

/**
 * `/about`: the page title, a plain intro, the story so far as a
 * timeline, the tools I use, and side projects.
 */
export function AboutPage() {
  return (
    <PageLayout title="About me" meta={socialLinks}>
      <div {...stylex.props(styles.intro)}>
        <p>
          I'm Rigo Alvarenga, a fullstack software engineer and Tech Lead at{' '}
          <InlineLogo organization={denzo} /> Denzo Studios, based in{' '}
          <InlineLogo organization={elSalvador} /> El Salvador.
        </p>
        <p {...stylex.props(styles.muted)}>
          I've spent more than six years building web and mobile products, from
          frontend architecture to APIs, databases, and infrastructure.
        </p>
      </div>

      <Section label="SO FAR">
        <Timeline chapters={chapters} />
      </Section>

      <Section label="TOOLS">
        <dl {...stylex.props(styles.stack)}>
          {stack.map(({ group, items }) => (
            <div key={group} {...stylex.props(styles.stackRow)}>
              <dt {...stylex.props(styles.stackGroup)}>{group} </dt>
              <dd {...stylex.props(styles.stackItems)}>{items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section label="OUTSIDE WORK">
        <p {...stylex.props(styles.muted, styles.stackRow)}>
          I like building side projects, like{' '}
          <a href="/projects/luvid" {...stylex.props(styles.link)}>
            luvid
          </a>
          , my own budgeting app built on Convex and Polar, and this site, which
          I built with Astro.
        </p>
      </Section>
    </PageLayout>
  );
}
