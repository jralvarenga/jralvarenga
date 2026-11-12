/**
 * About page content. Countries show their flag emoji, organizations a
 * `logo` key, and the rest a placeholder tile with their initials.
 * `inline-logo.tsx` maps each key to a component.
 */

/** Keys for the logos in `components/about/logos.tsx`. */
export type LogoName = 'denzo' | 'caban' | 'fiverr' | 'uca';

export interface Organization {
  name: string;
  /** Shown in the placeholder tile until there is a logo. */
  initials: string;
  /** Logo key. `inline-logo.tsx` maps it to a component. */
  logo?: LogoName;
  /** Flag emoji, used for countries instead of a logo. */
  emoji?: string;
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

export const denzo: Organization = {
  name: 'Denzo Studios',
  initials: 'DS',
  logo: 'denzo',
};
export const elSalvador: Organization = {
  name: 'El Salvador',
  initials: 'SV',
  emoji: '🇸🇻',
};

const caban: Organization = { name: 'Caban', initials: 'C', logo: 'caban' };
const fiverr: Organization = {
  name: 'Fiverr and other freelance projects',
  initials: 'F',
  logo: 'fiverr',
};
const uca: Organization = { name: 'UCA', initials: 'U', logo: 'uca' };

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
    start: 2025,
    end: 2026,
    role: 'Frontend Engineer Lead',
    organization: caban,
    story:
      "I led frontend delivery for Caban's web apps: the architecture, implementation, deployment, and performance with React, Next.js, and Tailwind CSS, plus the code reviews and the technical direction with other teams.",
  },
  {
    start: 2022,
    end: 2025,
    role: 'Software Engineer',
    organization: caban,
    story:
      'I joined as a fullstack engineer, building web apps for both users and the business with React, Next.js, Auth0, Laravel, and Django.',
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

/** Keys for the brand marks in `components/about/tool-icon.tsx`. */
export type ToolIconName =
  | 'typescript'
  | 'react'
  | 'nextjs'
  | 'tanstack'
  | 'vue'
  | 'swift'
  | 'nodejs'
  | 'bun'
  | 'astro'
  | 'tailwind'
  | 'stylex'
  | 'python'
  | 'rust'
  | 'php'
  | 'vercel'
  | 'cloudflare'
  | 'render'
  | 'railway'
  | 'aws'
  | 'googleCloud'
  | 'docker'
  | 'jenkins'
  | 'depot'
  | 'expo'
  | 'postgresql'
  | 'neon'
  | 'convex'
  | 'sentry'
  | 'posthog'
  | 'claude'
  | 'openai'
  | 'cursor'
  | 'grok'
  | 'grokBot'
  | 'coderabbit'
  | 'cubic'
  | 'graphite'
  | 't3code';

export interface Tool {
  name: string;
  icon: ToolIconName;
}

export interface ToolGroup {
  group: string;
  tools: Tool[];
}

/** What I work with, by kind, in the order I reach for them. */
export const toolGroups: ToolGroup[] = [
  {
    group: 'My current stack',
    tools: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'TanStack Start', icon: 'tanstack' },
      { name: 'React Native', icon: 'react' },
      { name: 'Vue.js', icon: 'vue' },
      { name: 'SwiftUI', icon: 'swift' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Bun', icon: 'bun' },
      { name: 'Astro', icon: 'astro' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'StyleX', icon: 'stylex' },
      { name: 'Python', icon: 'python' },
      { name: 'Rust', icon: 'rust' },
      { name: 'PHP', icon: 'php' },
    ],
  },
  {
    group: 'Infrastructure',
    tools: [
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Cloudflare', icon: 'cloudflare' },
      { name: 'Render', icon: 'render' },
      { name: 'Railway', icon: 'railway' },
      { name: 'AWS', icon: 'aws' },
      { name: 'Google Cloud', icon: 'googleCloud' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Jenkins', icon: 'jenkins' },
      { name: 'Depot', icon: 'depot' },
      { name: 'Expo EAS', icon: 'expo' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Neon', icon: 'neon' },
      { name: 'Convex', icon: 'convex' },
      { name: 'Sentry', icon: 'sentry' },
      { name: 'PostHog', icon: 'posthog' },
    ],
  },
  {
    group: 'AI and tools',
    tools: [
      { name: 'Claude Code', icon: 'claude' },
      { name: 'Codex', icon: 'openai' },
      { name: 'Cursor', icon: 'cursor' },
      { name: 'T3 Code', icon: 't3code' },
      { name: 'Grok', icon: 'grok' },
      { name: 'Grok Bot', icon: 'grokBot' },
      { name: 'CodeRabbit', icon: 'coderabbit' },
      { name: 'Cubic', icon: 'cubic' },
      { name: 'Graphite', icon: 'graphite' },
    ],
  },
];

/** "2022 – 2025", or "2026 – now" while it's still going. */
export function formatYears(chapter: Pick<Chapter, 'start' | 'end'>) {
  return `${chapter.start} – ${chapter.end ?? 'now'}`;
}
