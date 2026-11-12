import * as stylex from '@stylexjs/stylex';
import avatar from '../../assets/avatar.jpg';
import { chapters, denzo, elSalvador, toolGroups } from '../../lib/about/about';
import { colors, radius, space } from '../../styles/tokens.stylex';
import { PageLayout } from '../layout/page-layout';
import { Section } from '../page';
import { socialLinks } from '../social-links';
import { InlineLogo } from './inline-logo';
import { Timeline } from './timeline';
import { ToolList } from './tool-list';

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
  // My photo next to my name, round like the header avatar. A bit larger
  // than the 1em logo tiles, so the face still reads at text size.
  avatar: {
    display: 'inline-block',
    width: '1.25em',
    height: '1.25em',
    marginInline: '0.08em',
    borderRadius: radius.full,
    objectFit: 'cover',
    verticalAlign: 'middle',
    boxShadow: `0 0 0 1px ${colors.border}`,
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
 * timeline, and the tools I use.
 */
export function AboutPage() {
  return (
    <PageLayout
      title="About me"
      lead="Engineer, tech lead, and builder of my own products."
      meta={socialLinks}
    >
      <div {...stylex.props(styles.intro)}>
        <p>
          I'm{' '}
          <img
            src={avatar.src}
            alt=""
            width={20}
            height={20}
            {...stylex.props(styles.avatar)}
          />{' '}
          Rigo Alvarenga, a fullstack software engineer and Tech Lead at{' '}
          <InlineLogo organization={denzo} /> Denzo Studios, based in{' '}
          <InlineLogo organization={elSalvador} /> El Salvador.
        </p>
        <p {...stylex.props(styles.muted)}>
          I work on both ends of a product, on the web and on mobile, most of my
          time goes into planning and building apps, then the APIs and databases
          behind them, SQL or NoSQL depending on what the product needs.
        </p>
        <p {...stylex.props(styles.muted)}>
          I've worked on a lot of different kinds of products over the years,
          that taught me to look at a problem from the frontend and the backend
          before I pick a solution, instead of forcing everything into the tools
          I already know.
        </p>
        <p {...stylex.props(styles.muted)}>
          I like learning, so I'm usually trying something new, lately that's
          coding agents and I share the rules I give them as open{' '}
          <a href="/skills" {...stylex.props(styles.link)}>
            skills
          </a>
        </p>
      </div>

      <Section label="MY EXPERIENCE">
        <Timeline chapters={chapters} />
      </Section>

      <Section label="TOOLS">
        <ToolList groups={toolGroups} />
      </Section>
    </PageLayout>
  );
}
