import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { OG_HEIGHT, OG_WIDTH, THEME_PALETTE, truncateAtWord } from './site';

const palette = THEME_PALETTE.light;

/** Resolved from the app root, which is the working directory at build. */
const asset = (path: string) => resolve(process.cwd(), 'src/assets', path);

type Assets = {
  fonts: Parameters<typeof satori>[1]['fonts'];
  avatar: string;
};

let assets: Promise<Assets> | undefined;

/** Fonts and the avatar, read once per build. */
function loadAssets() {
  assets ??= (async () => {
    const [regular, medium, pixel, avatar] = await Promise.all([
      readFile(asset('fonts/og/Geist-Regular.ttf')),
      readFile(asset('fonts/og/Geist-Medium.ttf')),
      readFile(asset('fonts/og/GeistPixel-Square.ttf')),
      // Re-encoding drops the photo's EXIF metadata.
      sharp(await readFile(asset('avatar.jpg')))
        .resize(160, 160)
        .jpeg({ quality: 90 })
        .toBuffer(),
    ]);
    return {
      fonts: [
        { name: 'Geist', data: regular, weight: 400, style: 'normal' },
        { name: 'Geist', data: medium, weight: 500, style: 'normal' },
        { name: 'Geist Pixel', data: pixel, weight: 500, style: 'normal' },
      ],
      avatar: `data:image/jpeg;base64,${avatar.toString('base64')}`,
    };
  })();
  return assets;
}

export type OgImageParams = {
  /** Small label above the title, such as "Projects". */
  eyebrow?: string;
  title: string;
  description: string;
  /** Host shown in the footer, such as `jralvarenga.com`. */
  host: string;
  author: string;
};

/** Long titles step down so they stay on two lines. */
function titleSize(title: string) {
  if (title.length <= 16) return 112;
  if (title.length <= 28) return 88;
  return 68;
}

/** Renders a page's 1200×630 social preview as a PNG. */
export async function renderOgImage(params: OgImageParams) {
  const { fonts, avatar } = await loadAssets();

  const svg = await satori(
    <div
      style={{
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        boxSizing: 'border-box',
        backgroundColor: palette.background,
        color: palette.foreground,
        fontFamily: 'Geist',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {params.eyebrow && (
          <div style={{ fontSize: 30, color: palette.muted }}>
            {params.eyebrow}
          </div>
        )}
        <div
          style={{
            fontFamily: 'Geist Pixel',
            fontSize: titleSize(params.title),
            lineHeight: 1.05,
          }}
        >
          {params.title}
        </div>
        <div
          style={{
            maxWidth: 940,
            fontSize: 34,
            lineHeight: 1.4,
            color: palette.muted,
          }}
        >
          {truncateAtWord(params.description, 120)}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 32,
          borderTop: `1px solid ${palette.border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <img
            src={avatar}
            width={64}
            height={64}
            alt=""
            style={{ borderRadius: 9999 }}
          />
          <div style={{ fontSize: 30, fontWeight: 500 }}>{params.author}</div>
        </div>
        <div style={{ fontSize: 30, color: palette.muted }}>{params.host}</div>
      </div>
    </div>,
    { width: OG_WIDTH, height: OG_HEIGHT, fonts },
  );

  return sharp(Buffer.from(svg)).png().toBuffer();
}
