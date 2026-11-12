/** The GitHub repository the skills pages are built from. */
export const SKILLS_REPO = 'jralvarenga/skills';
export const SKILLS_BRANCH = 'main';
export const SKILLS_REPO_URL = `https://github.com/${SKILLS_REPO}`;

/** The skills.sh command that installs one skill, or all of them. */
export function installCommand(skill?: string) {
  const base = `npx skills add ${SKILLS_REPO}`;
  return skill ? `${base} --skill ${skill}` : base;
}

/** GitHub page for a file inside the repository. */
export function sourceUrl(path: string) {
  return `${SKILLS_REPO_URL}/blob/${SKILLS_BRANCH}/${path}`;
}

/**
 * Resolves a link written inside a SKILL.md. Links to another skill's
 * SKILL.md stay on this site; other relative links point to GitHub.
 */
export function resolveSkillHref(href: string, skillPath: string) {
  if (/^([a-z]+:|#|\/)/i.test(href)) return href;

  const base = new URL(skillPath, 'https://repo.local/');
  const url = new URL(href, base);
  const skill = url.pathname.match(/^\/skills\/([^/]+)\/SKILL\.md$/);
  if (skill) return `/skills/${skill[1]}${url.hash}`;

  return sourceUrl(url.pathname.slice(1)) + url.search + url.hash;
}
