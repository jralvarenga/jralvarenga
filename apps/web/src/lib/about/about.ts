/**
 * About page content. Countries show their flag emoji, organizations a
 * `logo` key, and the rest a placeholder tile with their initials.
 * `inline-logo.tsx` maps each key to a component. Names, roles, and
 * stories live in `lib/i18n/messages`; the English ones are kept here for
 * MCP, `/llms.txt`, and SEO.
 */

import { localize, t } from '../i18n/translator';

/** Keys for the logos in `components/about/logos.tsx`. */
export type LogoName = 'denzo' | 'caban' | 'fiverr' | 'uca';

/** Keys for organization names in the message files (`about.organizations`). */
export type OrganizationId =
  | 'denzo'
  | 'caban'
  | 'fiverr'
  | 'uca'
  | 'elSalvador';

/** Keys for chapters in the message files (`about.chapters`). */
export type ChapterId =
  | 'denzoLead'
  | 'cabanLead'
  | 'cabanEngineer'
  | 'freelance'
  | 'uca';

export interface Organization {
  id: OrganizationId;
  /** English name. Pages show `organizationName(organization)`. */
  name: string;
  /** Shown in the placeholder tile until there is a logo. */
  initials: string;
  /** Logo key. `inline-logo.tsx` maps it to a component. */
  logo?: LogoName;
  /** Flag emoji, used for countries instead of a logo. */
  emoji?: string;
}

export interface Chapter {
  id: ChapterId;
  /** `end` is omitted while it's still going. */
  start: number;
  end?: number;
  /** English role, before "at". For example "Tech Lead". */
  role: string;
  organization: Organization;
  /** English story. Pages show `chapterCopy(chapter)`. */
  story: string;
}

/** Builds an organization with its English name from the message files. */
function organization(
  id: OrganizationId,
  details: Omit<Organization, 'id' | 'name'>,
): Organization {
  return { id, name: t(`about.organizations.${id}`), ...details };
}

/** Builds a chapter with its English role and story from the message files. */
function chapter(
  id: ChapterId,
  details: Omit<Chapter, 'id' | 'role' | 'story'>,
): Chapter {
  return {
    id,
    role: t(`about.chapters.${id}.role`),
    story: t(`about.chapters.${id}.story`),
    ...details,
  };
}

export const denzo = organization('denzo', { initials: 'DS', logo: 'denzo' });
export const elSalvador = organization('elSalvador', {
  initials: 'SV',
  emoji: '🇸🇻',
});

const caban = organization('caban', { initials: 'C', logo: 'caban' });
const fiverr = organization('fiverr', { initials: 'F', logo: 'fiverr' });
const uca = organization('uca', { initials: 'U', logo: 'uca' });

/** Newest first. */
export const chapters: Chapter[] = [
  chapter('denzoLead', { start: 2026, organization: denzo }),
  chapter('cabanLead', { start: 2025, end: 2026, organization: caban }),
  chapter('cabanEngineer', { start: 2022, end: 2025, organization: caban }),
  chapter('freelance', { start: 2020, end: 2021, organization: fiverr }),
  chapter('uca', { start: 2019, end: 2024, organization: uca }),
];

/** An organization's name in every locale. */
export function organizationName(organization: Organization) {
  return localize(`about.organizations.${organization.id}`);
}

/** A chapter's role and story in every locale. */
export function chapterCopy(chapter: Chapter) {
  return {
    role: localize(`about.chapters.${chapter.id}.role`),
    story: localize(`about.chapters.${chapter.id}.story`),
  };
}

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
  | 'flask'
  | 'rust'
  | 'php'
  | 'laravel'
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

/** Keys for tool group names in the message files (`about.toolGroups`). */
export type ToolGroupId = 'stack' | 'infrastructure' | 'ai';

export interface ToolGroup {
  id: ToolGroupId;
  /** English name. Pages show `localize(`about.toolGroups.${id}`)`. */
  group: string;
  tools: Tool[];
}

/** What I work with, by kind, in the order I reach for them. */
export const toolGroups: ToolGroup[] = [
  {
    id: 'stack',
    group: t('about.toolGroups.stack'),
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
      { name: 'Flask', icon: 'flask' },
      { name: 'Rust', icon: 'rust' },
      { name: 'PHP', icon: 'php' },
      { name: 'Laravel', icon: 'laravel' },
    ],
  },
  {
    id: 'infrastructure',
    group: t('about.toolGroups.infrastructure'),
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
    id: 'ai',
    group: t('about.toolGroups.ai'),
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

/** "2022 – 2025", or "2026 – now" while it's still going, in English. */
export function formatYears(chapter: Pick<Chapter, 'start' | 'end'>) {
  return localizedYears(chapter).en;
}

/** The years of a chapter in every locale, such as "2026 – actualidad". */
export function localizedYears(chapter: Pick<Chapter, 'start' | 'end'>) {
  if (chapter.end === undefined) {
    return localize('about.ongoing', { start: chapter.start });
  }
  const years = `${chapter.start} – ${chapter.end}`;
  return { en: years, es: years };
}
