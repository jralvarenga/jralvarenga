import { profile } from '../about/profile';
import { social } from '../social';

/** Name shown as `og:site_name` and the `WebSite` name in JSON-LD. */
export const SITE_NAME = profile.name;

/** Other names people search for, used as `alternateName` in JSON-LD. */
export const ALTERNATE_NAMES = ['Jorge Alvarenga', 'jralvarenga'];

export const LOCALE = 'en_US';

/** `@handle` from the X profile URL, for `twitter:site` and `twitter:creator`. */
export const X_HANDLE = `@${new URL(social.x.href).pathname.replace(/^\/+|\/+$/g, '')}`;

/** Per-page fallback when a page passes no description. */
export const DEFAULT_DESCRIPTION = `${profile.name} is ${profile.aboutRole} at ${profile.organization}, in ${profile.location}. ${profile.sideNote}`;

/** Copy for the pages whose lead is not already a good description. */
export const pageDescriptions = {
  home: `${profile.name} is a ${profile.title} in ${profile.location}, building web and mobile products from frontend architecture to APIs and infrastructure.`,
  about: `About ${profile.name}: ${profile.aboutRole} at ${profile.organization}, with work history and the stack I build with.`,
  projects: `Products, tools, and libraries built by ${profile.name}, with the stack and status of each.`,
  skills: `Open Agent Skills by ${profile.name}: the rules I give coding agents, from how to write code to how to review it.`,
} as const;

/**
 * Absolute URL for a site path. Strips the trailing slash so it matches
 * `trailingSlash: 'never'` and the sitemap.
 */
export function absoluteUrl(path: string, site: URL) {
  const url = new URL(path, site);
  if (url.pathname !== '/') {
    url.pathname = url.pathname.replace(/\/+$/, '');
  }
  return url.href;
}

/** The size Open Graph and X large cards expect. */
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** Path of the generated Open Graph image for a page path. */
export function ogImagePath(pathname: string) {
  const slug = pathname.replace(/^\/+|\/+$/g, '');
  return `/og/${slug === '' ? 'index' : slug}.png`;
}

/**
 * Hex mirrors of StyleX color tokens for surfaces that cannot read CSS
 * variables: Satori (Open Graph images and the README stack) and
 * `<meta name="theme-color">` / the web manifest. Keep in sync with
 * `tokens.stylex.ts`. See DESIGN.md Colors.
 */
export const THEME_PALETTE = {
  light: {
    background: '#ffffff',
    foreground: '#0a0a0a',
    muted: '#737373',
    border: '#e5e5e5',
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#fafafa',
    muted: '#a1a1a1',
    border: '#3d444d',
  },
} as const;

/** Page background in each theme, for `theme-color` and the manifest. */
export const THEME_COLORS = {
  light: THEME_PALETTE.light.background,
  dark: THEME_PALETTE.dark.background,
};

/** Search engines cut snippets near 160 characters. */
const DESCRIPTION_MAX = 160;

/**
 * Cuts `text` at the last space at or before `max`, strips a trailing
 * comma or period, and adds an ellipsis. Falls back to a hard cut at
 * `max` when there is no space, so a long word cannot blow past the
 * limit.
 */
export function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const at = text.lastIndexOf(' ', max);
  const cut = text.slice(0, at === -1 ? max : at).replace(/[,.;:]$/, '');
  return `${cut}…`;
}

/**
 * Shortens text for `<meta name="description">`: whole sentences while
 * they fit, else cut at a word with an ellipsis.
 */
export function metaDescription(text: string) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= DESCRIPTION_MAX) return clean;

  let fitted = '';
  for (const sentence of clean.match(/[^.!?]+[.!?]+/g) ?? []) {
    const next = `${fitted}${sentence}`.trim();
    if (next.length > DESCRIPTION_MAX) break;
    fitted = next;
  }
  if (fitted.length >= 70) return fitted;

  return truncateAtWord(clean, DESCRIPTION_MAX);
}
