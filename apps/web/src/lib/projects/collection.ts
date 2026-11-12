import { getCollection } from 'astro:content';

/** Every project, in the order set by its `order` field. */
export async function getProjects() {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

/** The fields the project lists need. */
export async function getProjectSummaries() {
  return (await getProjects()).map(({ id, data }) => ({
    slug: id,
    name: data.name,
    summary: data.summary,
    started: data.started,
    status: data.status,
    parts: data.parts.map((part) => part.name),
  }));
}
