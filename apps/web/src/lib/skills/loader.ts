import type { Loader } from 'astro/loaders';
import { SKILLS_BRANCH, SKILLS_REPO } from './repo';

const SKILL_PATH = /^skills\/([^/]+)\/SKILL\.md$/;
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

interface TreeResponse {
  tree: { path: string; type: string }[];
}

/**
 * Reads the flat `key: value` frontmatter of a SKILL.md. Multi-line YAML
 * values aren't supported; the collection schema rejects what this misses.
 */
function parseSkill(raw: string) {
  const match = raw.match(FRONTMATTER);
  const fields: Record<string, string> = {};

  for (const line of match?.[1]?.split(/\r?\n/) ?? []) {
    const field = line.match(/^([\w-]+):\s*(.*)$/);
    if (!field?.[1]) continue;
    fields[field[1]] = (field[2] ?? '').trim().replace(/^(['"])(.*)\1$/, '$2');
  }

  return { fields, body: match ? raw.slice(match[0].length) : raw };
}

async function fetchOk(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetching ${url} failed with ${response.status}.`);
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
        const { fields, body } = parseSkill(raw);
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
