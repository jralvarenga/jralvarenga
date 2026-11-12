import { profile } from '../about/profile';
import {
  getContact,
  getExperience,
  getProfile,
  getSkillsMeta,
  getStack,
  listProjects,
  listSkills,
  readProject,
  readSkill,
} from '../mcp/catalog';
import { resolveSkillMarkdown } from '../skills/repo';

const TITLE = `# ${profile.name}`;

const INTRO = `> ${profile.aboutLead} ${profile.title}, based in ${profile.location}.`;

/** Bullet list of `- [label](href): note` lines, skipping empty notes. */
function linkList(
  items: { label: string; href: string; note?: string }[],
): string {
  return items
    .map((item) => {
      const link = `- [${item.label}](${item.href})`;
      return item.note ? `${link}: ${item.note}` : link;
    })
    .join('\n');
}

/**
 * Builds `/llms.txt`: a short map of the site for AI crawlers. Uses the
 * same catalog as the MCP server so the two cannot drift.
 */
export async function buildLlmsTxt(): Promise<string> {
  const [projects, skills] = await Promise.all([listProjects(), listSkills()]);
  const person = getProfile();
  const experience = getExperience();
  const stack = getStack();
  const contact = getContact();
  const skillsMeta = getSkillsMeta();

  return [
    TITLE,
    '',
    INTRO,
    '',
    person.bio,
    '',
    person.summary,
    '',
    '## Profile',
    '',
    linkList([
      { label: 'Home', href: '/', note: person.aboutLead },
      { label: 'About', href: '/about', note: person.summary },
    ]),
    '',
    '## Experience',
    '',
    linkList(
      experience.map((entry) => ({
        label: `${entry.role} at ${entry.organization}`,
        href: '/about',
        note: `${entry.years}. ${entry.story}`,
      })),
    ),
    '',
    '## Projects',
    '',
    linkList(
      projects.map((project) => ({
        label: project.name,
        href: `/projects/${project.slug}`,
        note: project.summary,
      })),
    ),
    '',
    '## Skills',
    '',
    linkList([
      {
        label: skillsMeta.repo,
        href: skillsMeta.repoUrl,
        note: `Install all: \`${skillsMeta.installAll}\``,
      },
      ...skills.map((skill) => ({
        label: skill.name,
        href: `/skills/${skill.slug}`,
        note: skill.description,
      })),
    ]),
    '',
    '## Stack',
    '',
    linkList(
      stack.map((group) => ({
        label: group.group,
        href: '/about',
        note: group.items.join(', '),
      })),
    ),
    '',
    '## Contact',
    '',
    linkList(contact.map((link) => ({ label: link.name, href: link.href }))),
    '',
    '## For AI assistants',
    '',
    linkList([
      {
        label: 'MCP server',
        href: '/mcp',
        note: 'Streamable HTTP, read-only, no auth.',
      },
      {
        label: 'Full text',
        href: '/llms-full.txt',
        note: 'Project write-ups and SKILL.md bodies.',
      },
    ]),
    '',
  ].join('\n');
}

/**
 * Builds `/llms-full.txt`: the short map plus every project write-up and
 * SKILL.md body.
 */
export async function buildLlmsFullTxt(): Promise<string> {
  const [index, projects, skills] = await Promise.all([
    buildLlmsTxt(),
    listProjects(),
    listSkills(),
  ]);

  const projectSections = await Promise.all(
    projects.map(async (summary) => {
      const project = await readProject(summary.slug);
      if (!project) return '';
      const links = project.links
        .map((link) => `- [${link.label}](${link.href})`)
        .join('\n');
      const parts = project.parts
        .map(
          (part) =>
            `- ${part.name} (${part.status}): ${part.summary}${
              part.site ? ` — [${part.site.label}](${part.site.href})` : ''
            }`,
        )
        .join('\n');
      return [
        `### ${project.name}`,
        '',
        project.summary,
        '',
        `Started ${project.started}. Status: ${project.status}.`,
        project.stack.length > 0 ? `Stack: ${project.stack.join(', ')}.` : null,
        links || null,
        parts ? `Parts:\n${parts}` : null,
        '',
        project.body.trim(),
        '',
      ]
        .filter((line) => line !== null)
        .join('\n');
    }),
  );

  const skillSections = await Promise.all(
    skills.map(async (summary) => {
      const skill = await readSkill(summary.slug);
      if (!skill) return '';
      return [
        `### ${skill.name}`,
        '',
        skill.description,
        '',
        `Install: \`${skill.install}\``,
        `Source: ${skill.sourceUrl}`,
        '',
        resolveSkillMarkdown({
          body: skill.body.trim(),
          skillPath: skill.path,
        }),
        '',
      ].join('\n');
    }),
  );

  return [
    index.trimEnd(),
    '',
    '## Full project write-ups',
    '',
    projectSections.filter(Boolean).join('\n'),
    '## Full skill documents',
    '',
    skillSections.filter(Boolean).join('\n'),
  ].join('\n');
}
