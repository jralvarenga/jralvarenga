import { t } from '../i18n/translator';
import { social } from '../social';
import { chapters, elSalvador } from './about';

const current = chapters[0];
if (!current) {
  throw new Error('About chapters must include a current role.');
}

/** Newest chapter: the current role and employer. */
export const currentChapter = current;

/** A named link used in copy, MCP payloads, and the pages. */
export type ProfileLink = {
  name: string;
  href: string;
};

const role = currentChapter.role;
const organization = currentChapter.organization.name;

/**
 * Identity and copy shared by the home page, the about page, the MCP
 * server, and `/llms.txt`, in English. Role, employer, and headline come
 * from the newest chapter so those surfaces cannot drift apart. The copy
 * lives in `lib/i18n/messages`; pages render it in every language through
 * `localize('profile.…')`.
 */
export const profile = {
  name: 'Rigo Alvarenga',
  greeting: t('profile.greeting'),
  title: t('profile.title', { params: { role, organization } }),
  location: elSalvador.name,
  organization,
  headline: t('profile.headline', { params: { role, organization } }),
  featuredWorkIntro: t('profile.featuredWorkIntro'),
  featuredWork: {
    name: 'Orvia',
    href: 'https://orviadx.com',
  } satisfies ProfileLink,
  featuredWorkOutro: t('profile.featuredWorkOutro'),
  sideNote: t('profile.sideNote'),
  /** Home-page about blurb. */
  summary: t('profile.summary'),
  aboutLead: t('profile.aboutLead'),
  aboutRole: t('profile.aboutRole', { params: { role } }),
  aboutBody: [t('profile.aboutBody.first'), t('profile.aboutBody.second')],
  aboutSkills: {
    before: t('profile.aboutSkills.before'),
    label: t('profile.aboutSkills.label'),
    href: '/skills',
  },
  links: Object.values(social).map(({ label, href }) => ({
    name: label,
    href,
  })),
};

export type Profile = typeof profile;
