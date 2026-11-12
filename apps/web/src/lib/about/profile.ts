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

/**
 * Identity and copy shared by the home page, the about page, the MCP
 * server, and `/llms.txt`. Role, employer, and headline come from the
 * newest chapter so those surfaces cannot drift apart.
 */
export const profile = {
  name: 'Rigo Alvarenga',
  greeting: "Hi, I'm",
  title: `${currentChapter.role} at ${currentChapter.organization.name}`,
  location: elSalvador.name,
  organization: currentChapter.organization.name,
  headline: `I'm a ${currentChapter.role} on the development team at ${currentChapter.organization.name}.`,
  featuredWorkIntro: 'Working on different projects like',
  featuredWork: {
    name: 'Orvia',
    href: 'https://orviadx.com',
  } satisfies ProfileLink,
  featuredWorkOutro: 'and many others.',
  sideNote: 'I also build my own projects on the side.',
  /** Home-page about blurb. */
  summary:
    'More than six years building web and mobile products, from frontend architecture to APIs, databases, and infrastructure. These days I lead development at Denzo Studios, in El Salvador.',
  aboutLead: 'Engineer, tech lead, and builder of my own products.',
  aboutRole: `a fullstack software engineer and ${currentChapter.role}`,
  aboutBody: [
    'I work on both ends of a product, on the web and on mobile, most of my time goes into planning and building apps, then the APIs and databases behind them, SQL or NoSQL depending on what the product needs.',
    "I've worked on a lot of different kinds of products over the years, that taught me to look at a problem from the frontend and the backend before I pick a solution, instead of forcing everything into the tools I already know.",
  ],
  aboutSkills: {
    before:
      "I like learning, so I'm usually trying something new, lately that's coding agents and I share the rules I give them as open ",
    label: 'skills',
    href: '/skills',
  },
  links: Object.values(social).map(({ label, href }) => ({
    name: label,
    href,
  })),
};

export type Profile = typeof profile;
