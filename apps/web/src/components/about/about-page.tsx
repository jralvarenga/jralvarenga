import * as stylex from '@stylexjs/stylex';
import avatar from '../../assets/avatar.jpg';
import {
  chapterCopy,
  chapters,
  elSalvador,
  organizationName,
  toolGroups,
} from '../../lib/about/about';
import { currentChapter, profile } from '../../lib/about/profile';
import { localize } from '../../lib/i18n/translator';
import { colors, radius, space } from '../../styles/tokens.stylex';
import { PageLayout } from '../layout/page-layout';
import { Section } from '../page';
import { socialLinks } from '../social-links';
import { Translation } from '../translation';
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
  const role = chapterCopy(currentChapter).role;

  return (
    <PageLayout
      title={localize('about.title')}
      lead={<Translation value={localize('profile.aboutLead')} />}
      meta={socialLinks}
    >
      <div {...stylex.props(styles.intro)}>
        <p>
          <Translation value={localize('about.intro.im')} />{' '}
          <img
            src={avatar.src}
            alt=""
            width={20}
            height={20}
            {...stylex.props(styles.avatar)}
          />{' '}
          {profile.name},{' '}
          <Translation value={localize('profile.aboutRole', { role })} />{' '}
          <Translation value={localize('about.intro.at')} />{' '}
          <InlineLogo organization={currentChapter.organization} />{' '}
          <Translation value={organizationName(currentChapter.organization)} />,{' '}
          <Translation value={localize('about.intro.basedIn')} />{' '}
          <InlineLogo organization={elSalvador} />{' '}
          <Translation value={organizationName(elSalvador)} />.
        </p>
        <p {...stylex.props(styles.muted)}>
          <Translation value={localize('profile.aboutBody.first')} />
        </p>
        <p {...stylex.props(styles.muted)}>
          <Translation value={localize('profile.aboutBody.second')} />
        </p>
        <p {...stylex.props(styles.muted)}>
          <Translation value={localize('profile.aboutSkills.before')} />
          <a href={profile.aboutSkills.href} {...stylex.props(styles.link)}>
            <Translation value={localize('profile.aboutSkills.label')} />
          </a>
          <Translation value={localize('profile.aboutSkills.after')} />
        </p>
      </div>

      <Section label={localize('about.experience')}>
        <Timeline chapters={chapters} />
      </Section>

      <Section label={localize('about.tools')}>
        <ToolList groups={toolGroups} />
      </Section>
    </PageLayout>
  );
}
