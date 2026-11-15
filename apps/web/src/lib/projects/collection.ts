import { type CollectionEntry, getCollection, getEntry } from 'astro:content';
import type { Localized } from '../i18n/locales';
import type { Project } from './types';

/** The fields the project lists and MCP `list_projects` both need. */
export type ProjectSummary = {
  slug: string;
  name: string;
  summary: string;
  started: string;
  status: Project['status'];
  parts: string[];
};

/** A full project, including the markdown write-up. */
export type ProjectDetail = {
  slug: string;
  name: string;
  summary: string;
  started: string;
  status: Project['status'];
  stack: string[];
  links: Project['links'];
  parts: Project['parts'];
  body: string;
};

/** Every project, in the order set by its `order` field. */
export async function getProjects() {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** The fields the project lists need. */
export async function getProjectSummaries(): Promise<ProjectSummary[]> {
  return (await getProjects()).map(({ id, data }) => ({
    slug: id,
    name: data.name,
    summary: data.summary,
    started: data.started,
    status: data.status,
    parts: data.parts.map((part) => part.name),
  }));
}

/** One project by slug, or `undefined` when it does not exist. */
export async function getProject(
  slug: string,
): Promise<ProjectDetail | undefined> {
  const project = await getEntry('projects', slug);
  if (!project) return undefined;

  const { data } = project;
  return {
    slug: project.id,
    name: data.name,
    summary: data.summary,
    started: data.started,
    status: data.status,
    stack: data.stack,
    links: data.links,
    parts: data.parts,
    body: project.body ?? '',
  };
}

/** A project row in every language, for the home page and `/projects`. */
export type LocalizedProjectSummary = {
  slug: string;
  name: string;
  summary: Localized;
  started: string;
  status: Project['status'];
  /** Names of the apps or sites the project is made of. */
  parts: Localized[];
};

/** A link with its label in every language. */
export type LocalizedProjectLink = {
  label: Localized;
  href: string;
};

/** One part of a project in every language. */
export type LocalizedProjectPart = {
  name: Localized;
  summary: Localized;
  status: Project['status'];
  stack: string[];
  site?: LocalizedProjectLink;
};

/** A full project in every language, for `/projects/<slug>`. */
export type LocalizedProject = {
  slug: string;
  name: string;
  summary: Localized;
  started: string;
  status: Project['status'];
  stack: string[];
  links: LocalizedProjectLink[];
  parts: LocalizedProjectPart[];
  /** The markdown write-up. */
  body: Localized;
};

/** Pairs an English string with its translation, or English when missing. */
function pair(en: string, es: string | undefined): Localized {
  return { en, es: es ?? en };
}

/**
 * Merges a project with its Spanish file. Fails the build when the Spanish
 * file lists a different number of links or parts than the English one.
 */
function localizeProject(
  project: CollectionEntry<'projects'>,
  translation: CollectionEntry<'projectTranslations'> | undefined,
): LocalizedProject {
  const { data } = project;
  const es = translation?.data;
  const file = `src/content/projects/es/${project.id}.md`;

  if (es && es.links.length > 0 && es.links.length !== data.links.length) {
    throw new Error(`${file}: \`links\` must have ${data.links.length} labels`);
  }
  if (es && es.parts.length > 0 && es.parts.length !== data.parts.length) {
    throw new Error(`${file}: \`parts\` must have ${data.parts.length} items`);
  }

  return {
    slug: project.id,
    name: data.name,
    summary: pair(data.summary, es?.summary),
    started: data.started,
    status: data.status,
    stack: data.stack,
    links: data.links.map((link, index) => ({
      label: pair(link.label, es?.links[index]),
      href: link.href,
    })),
    parts: data.parts.map((part, index) => {
      const partEs = es?.parts[index];
      return {
        name: pair(part.name, partEs?.name),
        summary: pair(part.summary, partEs?.summary),
        status: part.status,
        stack: part.stack,
        site: part.site && {
          label: pair(part.site.label, partEs?.site),
          href: part.site.href,
        },
      };
    }),
    body: pair(project.body ?? '', translation?.body || undefined),
  };
}

/** Every project in every language, in the order set by `order`. */
export async function getLocalizedProjects(): Promise<LocalizedProject[]> {
  const [projects, translations] = await Promise.all([
    getProjects(),
    getCollection('projectTranslations'),
  ]);
  const byId = new Map(translations.map((entry) => [entry.id, entry]));

  for (const id of byId.keys()) {
    if (!projects.some((project) => project.id === id)) {
      throw new Error(
        `src/content/projects/es/${id}.md has no English project to translate`,
      );
    }
  }

  return projects.map((project) =>
    localizeProject(project, byId.get(project.id)),
  );
}

/** Project rows in every language, for the project lists. */
export async function getLocalizedProjectSummaries(): Promise<
  LocalizedProjectSummary[]
> {
  return (await getLocalizedProjects()).map((project) => ({
    slug: project.slug,
    name: project.name,
    summary: project.summary,
    started: project.started,
    status: project.status,
    parts: project.parts.map((part) => part.name),
  }));
}
