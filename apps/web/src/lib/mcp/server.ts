import {
  type McpServer,
  ResourceNotFoundError,
  ResourceTemplate,
} from '@modelcontextprotocol/server';
import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
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
} from './catalog';
import { jsonResource, jsonToolError, jsonToolResult } from './result';

const URI = {
  profile: 'jralvarenga://profile',
  experience: 'jralvarenga://experience',
  stack: 'jralvarenga://stack',
  contact: 'jralvarenga://contact',
  project: 'jralvarenga://projects/{slug}',
  skill: 'jralvarenga://skills/{name}',
} as const;

const projectSlug = z
  .string()
  .min(1)
  .describe('Project slug from list_projects, for example luvid');

const skillName = z
  .string()
  .min(1)
  .describe(
    'Skill directory name from list_skills, matching /skills/<name>, for example code-guidelines',
  );

const readOnly = {
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
} as const;

type FillResourceUriParams = {
  template: string;
  value: string;
};

/** Fills the single `{slug}` or `{name}` slot in a resource URI template. */
function fillResourceUri({ template, value }: FillResourceUriParams) {
  return template.replace(/\{[^}]+\}/, value);
}

/**
 * Registers the read-only tools and resources that expose this site's
 * content. Called once per MCP request; the handler is stateless.
 */
export function registerMcp(server: McpServer): void {
  server.registerTool(
    'get_profile',
    {
      title: 'Get profile',
      description:
        "Rigo Alvarenga's name, title, bio, location, and public links.",
      inputSchema: z.object({}),
      ...readOnly,
    },
    async () => jsonToolResult(getProfile()),
  );

  server.registerTool(
    'get_experience',
    {
      title: 'Get experience',
      description:
        'Work and education timeline from the about page, newest first.',
      inputSchema: z.object({}),
      ...readOnly,
    },
    async () => jsonToolResult(getExperience()),
  );

  server.registerTool(
    'list_projects',
    {
      title: 'List projects',
      description:
        'Summaries of every project on the site, in the same order as /projects.',
      inputSchema: z.object({}),
      ...readOnly,
    },
    async () => jsonToolResult(await listProjects()),
  );

  server.registerTool(
    'get_project',
    {
      title: 'Get project',
      description:
        'Full write-up for one project: summary, stack, links, parts, and body.',
      inputSchema: z.object({ slug: projectSlug }),
      ...readOnly,
    },
    async ({ slug }) => {
      const project = await readProject(slug);
      if (!project) {
        return jsonToolError(
          `Unknown project "${slug}". Call list_projects for valid slugs.`,
        );
      }
      return jsonToolResult(project);
    },
  );

  server.registerTool(
    'list_skills',
    {
      title: 'List skills',
      description:
        'Agent skills from jralvarenga/skills, including each install command.',
      inputSchema: z.object({}),
      ...readOnly,
    },
    async () =>
      jsonToolResult({
        ...getSkillsMeta(),
        skills: await listSkills(),
      }),
  );

  server.registerTool(
    'get_skill',
    {
      title: 'Get skill',
      description:
        'One SKILL.md: description, install command, source URL, and body.',
      inputSchema: z.object({ name: skillName }),
      ...readOnly,
    },
    async ({ name }) => {
      const skill = await readSkill(name);
      if (!skill) {
        return jsonToolError(
          `Unknown skill "${name}". Call list_skills for valid names.`,
        );
      }
      return jsonToolResult(skill);
    },
  );

  server.registerTool(
    'get_stack',
    {
      title: 'Get stack',
      description: 'Tools grouped the way they appear on the about page.',
      inputSchema: z.object({}),
      ...readOnly,
    },
    async () => jsonToolResult(getStack()),
  );

  server.registerTool(
    'get_contact',
    {
      title: 'Get contact',
      description: 'Public social links, in site order. There is no email.',
      inputSchema: z.object({}),
      ...readOnly,
    },
    async () => jsonToolResult(getContact()),
  );

  server.registerResource(
    'profile',
    URI.profile,
    {
      title: 'Profile',
      description: "Rigo Alvarenga's name, title, bio, location, and links.",
      mimeType: 'application/json',
    },
    async (uri) => jsonResource(uri, getProfile()),
  );

  server.registerResource(
    'experience',
    URI.experience,
    {
      title: 'Experience',
      description: 'Work and education timeline, newest first.',
      mimeType: 'application/json',
    },
    async (uri) => jsonResource(uri, getExperience()),
  );

  server.registerResource(
    'stack',
    URI.stack,
    {
      title: 'Stack',
      description: 'Tool groups from the about page.',
      mimeType: 'application/json',
    },
    async (uri) => jsonResource(uri, getStack()),
  );

  server.registerResource(
    'contact',
    URI.contact,
    {
      title: 'Contact',
      description: 'Public social links.',
      mimeType: 'application/json',
    },
    async (uri) => jsonResource(uri, getContact()),
  );

  server.registerResource(
    'project',
    new ResourceTemplate(URI.project, {
      list: async () => ({
        resources: (await listProjects()).map((project) => ({
          uri: fillResourceUri({
            template: URI.project,
            value: project.slug,
          }),
          name: project.name,
          description: project.summary,
          mimeType: 'application/json',
        })),
      }),
      complete: {
        slug: async (value) =>
          (await listProjects())
            .map((project) => project.slug)
            .filter((slug) => slug.startsWith(value)),
      },
    }),
    {
      title: 'Project',
      description: 'A project write-up by slug.',
      mimeType: 'application/json',
    },
    async (uri, variables) => {
      const slug = String(variables.slug ?? '');
      const project = await readProject(slug);
      if (!project) {
        throw new ResourceNotFoundError(uri.href, `Unknown project "${slug}".`);
      }
      return jsonResource(uri, project);
    },
  );

  server.registerResource(
    'skill',
    new ResourceTemplate(URI.skill, {
      list: async () => ({
        resources: (await listSkills()).map((skill) => ({
          uri: fillResourceUri({
            template: URI.skill,
            value: skill.slug,
          }),
          name: skill.name,
          description: skill.description,
          mimeType: 'application/json',
        })),
      }),
      complete: {
        name: async (value) =>
          (await listSkills())
            .map((skill) => skill.slug)
            .filter((slug) => slug.startsWith(value)),
      },
    }),
    {
      title: 'Skill',
      description: 'A SKILL.md by directory name.',
      mimeType: 'application/json',
    },
    async (uri, variables) => {
      const name = String(variables.name ?? '');
      const skill = await readSkill(name);
      if (!skill) {
        throw new ResourceNotFoundError(uri.href, `Unknown skill "${name}".`);
      }
      return jsonResource(uri, skill);
    },
  );
}

/**
 * Streamable HTTP handler for `/mcp`. Stateless, no auth. Serves the
 * 2026 MCP spec and falls back to 2025-era Streamable HTTP clients.
 */
export const handleMcpRequest = createMcpHandler(registerMcp, {
  serverInfo: {
    name: 'jralvarenga',
    version: '0.0.1',
  },
  instructions:
    'Read-only data about Rigo Alvarenga: profile, experience, projects, agent skills, stack, and contact links. Prefer tools for lookups. Resources expose the same JSON. There is no email address.',
});
