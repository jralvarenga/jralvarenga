import { getCollection, getEntry } from 'astro:content';
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
