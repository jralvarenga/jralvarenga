/**
 * Draws the stack section of the root README as two SVGs, one per GitHub
 * theme, from the same `toolGroups` and brand marks as the About page.
 * Satori turns the text into outlines, so the image shows Geist on GitHub
 * without loading a font.
 *
 * Run from apps/web after changing `toolGroups`: `bun run readme:stack`.
 * The script also rewrites the stack image alt text in the root README.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import satori from 'satori';
import { ToolIcon } from '../src/components/about/tool-icon';
import { type ToolGroup, toolGroups } from '../src/lib/about/about';
import { THEME_PALETTE } from '../src/lib/seo/site';

/** About the width of a profile README on desktop. */
const WIDTH = 880;
const ROOT = resolve(process.cwd(), '../..');
const OUT_DIR = resolve(ROOT, '.github/readme');
const README = resolve(ROOT, 'README.md');

/*
 * Shared with Open Graph images. The background stays transparent so the
 * card sits on GitHub's own theme.
 */
const themes = {
  light: THEME_PALETTE.light,
  dark: THEME_PALETTE.dark,
};

type Theme = (typeof themes)[keyof typeof themes];

/**
 * Turns a list of names into "A, B, and C".
 */
function joinNames(names: string[]): string {
  if (names.length === 0) return '';
  if (names.length === 1) return names[0] ?? '';
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, and ${names.at(-1)}`;
}

/**
 * Alt text for the README stack image, derived from `toolGroups` so it
 * cannot drift from the SVG.
 */
function stackImageAlt(groups: ToolGroup[]): string {
  const sentences = groups.map((group, index) => {
    const names = joinNames(group.tools.map((tool) => tool.name));
    if (index === 0) return `My stack: ${names}`;
    if (group.group === 'Infrastructure') return `Infrastructure on ${names}`;
    return `${group.group}: ${names}`;
  });
  return `${sentences.join('. ')}.`;
}

/**
 * Rewrites the stack `<img>` alt in the root README from `toolGroups`.
 */
async function writeReadmeAlt(alt: string) {
  const readme = await readFile(README, 'utf8');
  const next = readme.replace(/alt="My stack: [^"]*"/, `alt="${alt}"`);
  if (next === readme) {
    throw new Error('Could not find the stack image alt text in README.md');
  }
  await writeFile(README, next);
  console.log('Updated README.md stack alt text');
}

function Stack({ theme }: { theme: Theme }) {
  return (
    <div
      style={{
        width: WIDTH,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Geist',
        color: theme.foreground,
      }}
    >
      {toolGroups.map(({ group, tools }, index) => (
        <div
          key={group}
          style={{
            display: 'flex',
            gap: 24,
            paddingTop: index === 0 ? 0 : 20,
            paddingBottom: 20,
            borderTop: index === 0 ? 'none' : `1px solid ${theme.border}`,
          }}
        >
          <div
            style={{
              width: 150,
              flexShrink: 0,
              paddingTop: 9,
              fontSize: 14,
              color: theme.muted,
            }}
          >
            {group}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: 1 }}>
            {tools.map((tool) => (
              <div
                key={tool.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 36,
                  paddingLeft: 12,
                  paddingRight: 14,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 9999,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                <ToolIcon name={tool.icon} size={16} fill={theme.foreground} />
                {tool.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const font = (file: string) =>
  readFile(resolve(process.cwd(), 'src/assets/fonts/og', file));

const [regular, medium] = await Promise.all([
  font('Geist-Regular.ttf'),
  font('Geist-Medium.ttf'),
]);

await mkdir(OUT_DIR, { recursive: true });

for (const [name, theme] of Object.entries(themes)) {
  const svg = await satori(<Stack theme={theme} />, {
    width: WIDTH,
    fonts: [
      { name: 'Geist', data: regular, weight: 400, style: 'normal' },
      { name: 'Geist', data: medium, weight: 500, style: 'normal' },
    ],
  });
  await writeFile(resolve(OUT_DIR, `stack-${name}.svg`), `${svg}\n`);
  console.log(`Wrote .github/readme/stack-${name}.svg`);
}

await writeReadmeAlt(stackImageAlt(toolGroups));
