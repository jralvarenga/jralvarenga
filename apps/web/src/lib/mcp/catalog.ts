import { chapters, formatYears, toolGroups } from '../about/about';
import { profile } from '../about/profile';
import {
  getProject,
  getProjectSummaries,
  type ProjectDetail,
  type ProjectSummary,
} from '../projects/collection';
import {
  getSkill,
  getSkillSummaries,
  type SkillDetail,
  type SkillSummary,
} from '../skills/collection';
import { installCommand, SKILLS_REPO, SKILLS_REPO_URL } from '../skills/repo';
import { social } from '../social';

/** One chapter of work history, flattened for MCP and `/llms.txt`. */
export type ExperienceEntry = {
  start: number;
  end: number | null;
  years: string;
  role: string;
  organization: string;
  story: string;
};

/** Profile fields an assistant needs, plus the same links the pages show. */
export type ProfilePayload = {
  name: string;
  title: string;
  location: string;
  organization: string;
  bio: string;
  summary: string;
  aboutLead: string;
  links: { name: string; href: string }[];
};

export type { ProjectDetail, ProjectSummary, SkillDetail, SkillSummary };

/** The install command and GitHub source for the whole skills repo. */
export type SkillsMeta = {
  repo: string;
  repoUrl: string;
  installAll: string;
};

/**
 * Builds the profile payload from the shared about copy. Pages render the
 * same strings; this is the assistant-facing shape.
 */
export function getProfile(): ProfilePayload {
  const featured = `${profile.featuredWorkIntro} ${profile.featuredWork.name} ${profile.featuredWorkOutro}`;
  return {
    name: profile.name,
    title: profile.title,
    location: profile.location,
    organization: profile.organization,
    bio: `${profile.headline} ${featured} ${profile.sideNote}`,
    summary: profile.summary,
    aboutLead: profile.aboutLead,
    links: profile.links,
  };
}

/** Work history, newest first, matching the about page timeline. */
export function getExperience(): ExperienceEntry[] {
  return chapters.map((chapter) => ({
    start: chapter.start,
    end: chapter.end ?? null,
    years: formatYears(chapter),
    role: chapter.role,
    organization: chapter.organization.name,
    story: chapter.story,
  }));
}

/** Tool groups from the about page, names only. */
export function getStack(): { group: string; items: string[] }[] {
  return toolGroups.map(({ group, tools }) => ({
    group,
    items: tools.map((tool) => tool.name),
  }));
}

/** Social profiles, in the order they appear on the site. */
export function getContact(): { name: string; href: string }[] {
  return Object.values(social).map(({ label, href }) => ({
    name: label,
    href,
  }));
}

/** Repo-level skill install info, shared with the skills index. */
export function getSkillsMeta(): SkillsMeta {
  return {
    repo: SKILLS_REPO,
    repoUrl: SKILLS_REPO_URL,
    installAll: installCommand(),
  };
}

/** Every project, in site order. */
export async function listProjects(): Promise<ProjectSummary[]> {
  return getProjectSummaries();
}

/** One project by slug, or `undefined` when it does not exist. */
export async function readProject(
  slug: string,
): Promise<ProjectDetail | undefined> {
  return getProject(slug);
}

/** Every skill, sorted by display name. */
export async function listSkills(): Promise<SkillSummary[]> {
  return getSkillSummaries();
}

/** One skill by directory name, or `undefined` when it does not exist. */
export async function readSkill(
  name: string,
): Promise<SkillDetail | undefined> {
  return getSkill(name);
}
