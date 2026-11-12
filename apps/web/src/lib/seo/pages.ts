import { profile } from '../about/profile';
import { getProjectSummaries } from '../projects/collection';
import { getSkillSummaries } from '../skills/collection';
import { pageDescriptions } from './site';

/** What a page's social preview image shows. */
export type OgPage = {
  path: string;
  eyebrow?: string;
  title: string;
  description: string;
};

/**
 * Every indexable page, for the `/og/<path>.png` images. Reads the same
 * collections as the pages, so a new project or skill gets an image too.
 */
export async function getOgPages(): Promise<OgPage[]> {
  const [projects, skills] = await Promise.all([
    getProjectSummaries(),
    getSkillSummaries(),
  ]);

  return [
    {
      path: '/',
      eyebrow: profile.title,
      title: profile.name,
      description: profile.summary,
    },
    {
      path: '/about',
      title: 'About me',
      description: pageDescriptions.about,
    },
    {
      path: '/projects',
      title: 'Projects',
      description: pageDescriptions.projects,
    },
    ...projects.map((project) => ({
      path: `/projects/${project.slug}`,
      eyebrow: 'Projects',
      title: project.name,
      description: project.summary,
    })),
    {
      path: '/skills',
      title: 'Skills',
      description: pageDescriptions.skills,
    },
    ...skills.map((skill) => ({
      path: `/skills/${skill.slug}`,
      eyebrow: 'Skills',
      title: skill.name,
      description: skill.description,
    })),
  ];
}
