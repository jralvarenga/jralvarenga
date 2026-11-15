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

/** Own products named in the home bio, linked to their project pages. */
const sideProjects = [
  { name: 'Luvid', href: '/projects/luvid' },
  { name: 'Treid', href: '/projects/treid' },
] as const satisfies readonly [ProfileLink, ProfileLink];

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
  /** Public title for tab titles, social cards, and search. No employer. */
  title: t('profile.title'),
  location: elSalvador.name,
  organization,
  headline: t('profile.headline', { params: { organization } }),
  sideProjects,
  sideNote: `${t('profile.sideProjectsIntro')} ${sideProjects[0].name} ${t('profile.sideProjectsJoin')} ${sideProjects[1].name}.`,
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
