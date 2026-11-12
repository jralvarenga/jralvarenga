import { getCollection, getEntry } from 'astro:content';
import { installCommand, sourceUrl } from './repo';

/** A skill row as the index page and MCP `list_skills` both need it. */
export type SkillSummary = {
  /** Directory name, used as the `/skills/<name>` slug. */
  slug: string;
  /** Frontmatter name, shown on the page. */
  name: string;
  description: string;
  install: string;
};

/** A full skill, including the SKILL.md body and where to install it. */
export type SkillDetail = SkillSummary & {
  path: string;
  sourceUrl: string;
  body: string;
};

/** Every skill, sorted by display name. */
export async function getSkills() {
  const skills = await getCollection('skills');
  return skills.sort((a, b) => a.data.name.localeCompare(b.data.name));
}

/**
 * Index fields for every skill. `slug` is the directory name used in
 * routes and `get_skill`; `name` is the frontmatter title.
 */
export async function getSkillSummaries(): Promise<SkillSummary[]> {
  return (await getSkills()).map((skill) => ({
    slug: skill.id,
    name: skill.data.name,
    description: skill.data.description,
    install: installCommand(skill.id),
  }));
}

/** One skill by directory name, or `undefined` when it does not exist. */
export async function getSkill(name: string): Promise<SkillDetail | undefined> {
  const skill = await getEntry('skills', name);
  if (!skill) return undefined;

  return {
    slug: skill.id,
    name: skill.data.name,
    description: skill.data.description,
    path: skill.data.path,
    sourceUrl: sourceUrl(skill.data.path),
    install: installCommand(skill.id),
    body: skill.body ?? '',
  };
}
