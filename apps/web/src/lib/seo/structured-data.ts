import { chapters, elSalvador, toolGroups } from '../about/about';
import { profile } from '../about/profile';
import { social } from '../social';
import { ALTERNATE_NAMES, absoluteUrl, LOCALE, SITE_NAME } from './site';

/** A JSON-LD node. Kept loose because schema.org types are open-ended. */
export type JsonLd = Record<string, unknown>;

export type Crumb = {
  name: string;
  path: string;
};

type Listed = {
  name: string;
  path: string;
  description: string;
};

const LANGUAGE = LOCALE.replace('_', '-');

/** Stable `@id`s so every page points at the same person and website. */
function ids(site: URL) {
  return {
    person: `${absoluteUrl('/', site)}#person`,
    website: `${absoluteUrl('/', site)}#website`,
  };
}

/** Me, with the profiles search engines use to join my identity. */
export function personNode(site: URL, image: string): JsonLd {
  const knowsAbout = toolGroups.flatMap((group) =>
    group.tools.map((tool) => tool.name),
  );
  const current = chapters[0];

  return {
    '@type': 'Person',
    '@id': ids(site).person,
    name: profile.name,
    alternateName: ALTERNATE_NAMES,
    url: absoluteUrl('/', site),
    image,
    jobTitle: current?.role,
    description: profile.summary,
    worksFor: current
      ? { '@type': 'Organization', name: current.organization.name }
      : undefined,
    homeLocation: { '@type': 'Country', name: elSalvador.name },
    knowsAbout,
    sameAs: Object.values(social).map((link) => link.href),
  };
}

/** The site itself, published by me. */
export function websiteNode(site: URL): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': ids(site).website,
    name: SITE_NAME,
    alternateName: ALTERNATE_NAMES,
    url: absoluteUrl('/', site),
    inLanguage: LANGUAGE,
    publisher: { '@id': ids(site).person },
    author: { '@id': ids(site).person },
  };
}

/** `/about`: a profile page about me. */
export function profilePageNode(site: URL, path: string): JsonLd {
  return {
    '@type': 'ProfilePage',
    url: absoluteUrl(path, site),
    inLanguage: LANGUAGE,
    isPartOf: { '@id': ids(site).website },
    mainEntity: { '@id': ids(site).person },
  };
}

/** Breadcrumbs, home first, the current page last. */
export function breadcrumbNode(site: URL, crumbs: Crumb[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path, site),
    })),
  };
}

/** An index page that lists other pages, such as `/projects`. */
export function collectionPageNode(
  site: URL,
  page: { name: string; path: string; description: string },
  items: Listed[],
): JsonLd {
  return {
    '@type': 'CollectionPage',
    name: page.name,
    url: absoluteUrl(page.path, site),
    description: page.description,
    inLanguage: LANGUAGE,
    isPartOf: { '@id': ids(site).website },
    author: { '@id': ids(site).person },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path, site),
        description: item.description,
      })),
    },
  };
}

type ProjectNodeParams = {
  name: string;
  path: string;
  description: string;
  /** `YYYY-MM`. */
  started: string;
  stack: string[];
  links: { label: string; href: string }[];
};

/** `/projects/<slug>`: a project I made, with its code and live site. */
export function projectNode(site: URL, project: ProjectNodeParams): JsonLd {
  const repository = project.links.find((link) =>
    link.href.startsWith('https://github.com/'),
  )?.href;
  const external = project.links
    .map((link) => link.href)
    .filter((href) => /^https?:\/\//.test(href));

  return {
    '@type': repository ? 'SoftwareSourceCode' : 'CreativeWork',
    name: project.name,
    url: absoluteUrl(project.path, site),
    description: project.description,
    dateCreated: project.started,
    keywords: project.stack.join(', '),
    codeRepository: repository,
    sameAs: external.length > 0 ? external : undefined,
    inLanguage: LANGUAGE,
    author: { '@id': ids(site).person },
    isPartOf: { '@id': ids(site).website },
  };
}

type SkillNodeParams = {
  name: string;
  path: string;
  description: string;
  sourceUrl: string;
};

/** `/skills/<name>`: a SKILL.md, published as a technical article. */
export function skillNode(site: URL, skill: SkillNodeParams): JsonLd {
  return {
    '@type': 'TechArticle',
    headline: skill.name,
    name: skill.name,
    url: absoluteUrl(skill.path, site),
    description: skill.description,
    inLanguage: LANGUAGE,
    isBasedOn: skill.sourceUrl,
    author: { '@id': ids(site).person },
    publisher: { '@id': ids(site).person },
    isPartOf: { '@id': ids(site).website },
  };
}

/**
 * Wraps nodes in one `@graph` and serializes it for a
 * `<script type="application/ld+json">`. Escapes `<` so a value can't
 * close the script tag.
 */
export function serializeJsonLd(nodes: JsonLd[]) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes,
  }).replace(/</g, '\\u003c');
}
