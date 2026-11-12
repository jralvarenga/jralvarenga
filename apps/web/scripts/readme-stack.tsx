/**
 * Draws the stack section of the root README as two SVGs, one per GitHub
 * theme, from the same `toolGroups` and brand marks as the About page.
 * Satori turns the text into outlines, so the image shows Geist on GitHub
 * without loading a font.
 *
 * Run from apps/web after changing `toolGroups`: `bun run readme:stack`.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import satori from 'satori';
import { ToolIcon } from '../src/components/about/tool-icon';
import { toolGroups } from '../src/lib/about/about';

/** About the width of a profile README on desktop. */
const WIDTH = 880;
const OUT_DIR = resolve(process.cwd(), '../../.github/readme');

/*
 * Mirrors the `foreground`, `mutedForeground`, and `border` tokens. The
 * background stays transparent so the card sits on GitHub's own theme.
 */
const themes = {
  light: { foreground: '#0a0a0a', muted: '#737373', border: '#e5e5e5' },
  dark: { foreground: '#fafafa', muted: '#a1a1a1', border: '#3d444d' },
};

type Theme = (typeof themes)[keyof typeof themes];

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
