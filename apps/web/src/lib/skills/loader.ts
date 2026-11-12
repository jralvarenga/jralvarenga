import type { Loader } from 'astro/loaders';
import { SKILLS_BRANCH, SKILLS_REPO } from './repo';

const SKILL_PATH = /^skills\/([^/]+)\/SKILL\.md$/;
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const FIELD = /^([\w-]+):\s*(.*)$/;
const YAML_BLOCK = /^[>|][+-]?$/;

interface TreeResponse {
  tree: { path: string; type: string }[];
  truncated?: boolean;
}

/**
 * Strips matching quotes and unescapes the YAML subset this loader supports:
 * `\"` / `\\` in double quotes, and `''` in single quotes.
 */
function unquote(value: string) {
  if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1).replace(/\\([\\"])/g, '$1');
  }
  if (value.length >= 2 && value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replace(/''/g, "'");
  }
  return value;
}

/**
 * Reads the flat `key: value` frontmatter of a SKILL.md. Multi-line YAML
 * values aren't supported; the collection schema rejects what this misses.
 */
function parseSkill(raw: string, path: string) {
  const match = raw.match(FRONTMATTER);
  const fields: Record<string, string> = {};

  for (const line of match?.[1]?.split(/\r?\n/) ?? []) {
    if (line.trim() === '') continue;
    if (/^\s/.test(line) || YAML_BLOCK.test(line)) {
      throw new Error(
        `${path}: multi-line YAML is not supported in SKILL.md frontmatter.`,
      );
    }

    const field = line.match(FIELD);
    if (!field?.[1]) continue;
    const value = (field[2] ?? '').trim();
    if (YAML_BLOCK.test(value)) {
      throw new Error(
        `${path}: multi-line YAML is not supported in SKILL.md frontmatter.`,
      );
    }
    fields[field[1]] = unquote(value);
  }

  return { fields, body: match ? raw.slice(match[0].length) : raw };
}

/**
 * Optional token. `import.meta.env` holds both shell variables and values
 * from `apps/web/.env`; `process.env` only holds shell variables.
 */
function githubToken(): string | undefined {
  return import.meta.env.GITHUB_TOKEN || import.meta.env.GH_TOKEN || undefined;
}

function requestHeaders(url: string) {
  const headers: Record<string, string> = {
    'User-Agent': 'jralvarenga/jralvarenga',
  };

  if (url.startsWith('https://api.github.com/')) {
    headers.Accept = 'application/vnd.github+json';
    headers['X-GitHub-Api-Version'] = '2022-11-28';
    const token = githubToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function fetchOk(url: string) {
  const response = await fetch(url, { headers: requestHeaders(url) });
  if (!response.ok) {
    const rateLimited =
      (response.status === 403 || response.status === 429) &&
      url.startsWith('https://api.github.com/');
    const hint =
      rateLimited && !githubToken()
        ? ' Set GITHUB_TOKEN to raise the GitHub API rate limit.'
        : '';
    throw new Error(`Fetching ${url} failed with ${response.status}.${hint}`);
  }
  return response;
}

/**
 * Loads every `skills/<name>/SKILL.md` from the GitHub repository at build
 * time, with one API call for the file tree and raw downloads for files.
 */
export function skillsLoader(): Loader {
  return {
    name: 'skills-loader',
    async load({ store, parseData, generateDigest, logger }) {
      const tree = (await (
        await fetchOk(
          `https://api.github.com/repos/${SKILLS_REPO}/git/trees/${SKILLS_BRANCH}?recursive=1`,
        )
      ).json()) as TreeResponse;

      if (tree.truncated) {
        throw new Error(
          `GitHub tree for ${SKILLS_REPO}@${SKILLS_BRANCH} is truncated. Refusing to publish an incomplete skill list.`,
        );
      }

      const paths = tree.tree
        .filter((entry) => entry.type === 'blob' && SKILL_PATH.test(entry.path))
        .map((entry) => entry.path);

      const skills = await Promise.all(
        paths.map(async (path) => {
          const raw = await (
            await fetchOk(
              `https://raw.githubusercontent.com/${SKILLS_REPO}/${SKILLS_BRANCH}/${path}`,
            )
          ).text();
          return { path, raw };
        }),
      );

      store.clear();

      for (const { path, raw } of skills) {
        const id = path.match(SKILL_PATH)?.[1] ?? path;
        const { fields, body } = parseSkill(raw, path);
        const data = await parseData({
          id,
          data: { ...fields, path },
        });
        store.set({ id, data, body, digest: generateDigest(raw) });
      }

      logger.info(`Loaded ${skills.length} skills from ${SKILLS_REPO}.`);
    },
  };
}
