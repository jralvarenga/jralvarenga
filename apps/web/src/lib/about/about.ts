/**
 * About page content. Logos are placeholders until `logo` is set to an
 * image URL (for example an import from `src/assets/logos`).
 */

export interface Organization {
  name: string;
  /** Shown in the placeholder tile until there is a logo. */
  initials: string;
  logo?: string;
}

export interface Chapter {
  /** `end` is omitted while it's still going. */
  start: number;
  end?: number;
  /** What I was, before "at". For example "Tech Lead". */
  role: string;
  organization: Organization;
  story: string;
}

export const denzo: Organization = { name: 'Denzo Studios', initials: 'DS' };
export const elSalvador: Organization = { name: 'El Salvador', initials: 'SV' };

const caban: Organization = { name: 'Caban', initials: 'C' };
const fiverr: Organization = {
  name: 'Fiverr and other freelance projects',
  initials: 'F',
};
const uca: Organization = { name: 'UCA', initials: 'U' };

/** Newest first. */
export const chapters: Chapter[] = [
  {
    start: 2026,
    role: 'Tech Lead',
    organization: denzo,
    story:
      'I lead technical development across frontend, backend, database design, and infrastructure. I set development standards, make architecture calls, and turn business requirements into reliable products.',
  },
  {
    start: 2022,
    end: 2026,
    role: 'Software Engineer, then Frontend Engineer Lead',
    organization: caban,
    story:
      'I joined as a fullstack engineer, shipping web apps with React, Next.js, Auth0, Laravel, and Django. In 2025 I grew into leading the frontend: its architecture, deployment, and performance, the code reviews, and the technical direction with other teams.',
  },
  {
    start: 2020,
    end: 2021,
    role: 'Freelancing',
    organization: fiverr,
    story: 'Where it started: React-focused apps, built with different teams.',
  },
  {
    start: 2019,
    end: 2024,
    role: 'Mechanical Engineering',
    organization: uca,
    story: 'Studied at Universidad Centroamericana José Simeón Cañas.',
  },
];

export const stack: { group: string; items: string[] }[] = [
  {
    group: 'Frontend',
    items: [
      'React',
      'Next.js',
      'React Native',
      'TypeScript',
      'Tailwind CSS',
      'Flutter',
      'Electron',
    ],
  },
  {
    group: 'Backend',
    items: [
      'Node.js',
      'Express',
      'Django',
      'Flask',
      'Laravel',
      'REST',
      'GraphQL',
    ],
  },
  {
    group: 'Data and cloud',
    items: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
      'Supabase',
      'Neon',
      'Firebase',
      'AWS',
      'GCP',
      'Azure',
      'Docker',
    ],
  },
  { group: 'Auth', items: ['Auth0', 'Clerk', 'Better Auth'] },
];

/** "2022 – 2025", or "2026 – now" while it's still going. */
export function formatYears(chapter: Pick<Chapter, 'start' | 'end'>) {
  return `${chapter.start} – ${chapter.end ?? 'now'}`;
}
