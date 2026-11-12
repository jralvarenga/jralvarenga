import * as stylex from '@stylexjs/stylex';
import avatar from '../../assets/avatar.jpg';
import { chapters, elSalvador, toolGroups } from '../../lib/about/about';
import { currentChapter, profile } from '../../lib/about/profile';
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
    <PageLayout title="About me" lead={profile.aboutLead} meta={socialLinks}>
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
          {profile.name}, {profile.aboutRole} at{' '}
          <InlineLogo organization={currentChapter.organization} />{' '}
          {profile.organization}, based in{' '}
          <InlineLogo organization={elSalvador} /> {profile.location}.
        </p>
        {profile.aboutBody.map((paragraph) => (
          <p key={paragraph} {...stylex.props(styles.muted)}>
            {paragraph}
          </p>
        ))}
        <p {...stylex.props(styles.muted)}>
          {profile.aboutSkills.before}
          <a href={profile.aboutSkills.href} {...stylex.props(styles.link)}>
            {profile.aboutSkills.label}
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
