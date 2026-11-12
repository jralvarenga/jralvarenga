// @ts-check

import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import stylex from '@stylexjs/unplugin';
import { defineConfig, envField, fontProviders } from 'astro/config';
import { loadEnv } from 'vite';

/**
 * The production origin. Canonical URLs, Open Graph tags, the sitemap, and
 * robots.txt are built from it, so preview deployments still point search
 * engines at production. Override with `SITE_URL` for another domain.
 *
 * `loadEnv` reads `apps/web/.env*` (Astro does not put those files on
 * `process.env` while this config runs). A real `SITE_URL` in the
 * environment still wins.
 */
const env = loadEnv(
  process.env.NODE_ENV ?? 'production',
  fileURLToPath(new URL('.', import.meta.url)),
  '',
);
const site = env.SITE_URL || 'https://jralvarenga.com';

/** Pages that must stay out of the sitemap. They also send `noindex`. */
const NOT_IN_SITEMAP = ['/ui', '/404'];

// https://astro.build/config
export default defineConfig({
  site,
  // One URL per page. `/about/` redirects to `/about` on Vercel, so the
  // canonical, the sitemap, and internal links all agree.
  trailingSlash: 'never',
  // Pages stay static HTML. The Vercel adapter is here so `/mcp` can be a
  // serverless function (`prerender = false`) without flipping the rest of
  // the site to SSR.
  output: 'static',
  adapter: vercel(),
  // Fetch a page when its link is hovered or focused, so the click loads
  // from cache instead of the network.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !NOT_IN_SITEMAP.some((path) => new URL(page).pathname === path),
    }),
  ],
  env: {
    schema: {
      // Search engine ownership tokens, rendered as `<meta>` tags. Use only
      // the value of `content`, not the whole tag.
      GOOGLE_SITE_VERIFICATION: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
      }),
      BING_SITE_VERIFICATION: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
      }),
    },
  },
  vite: {
    plugins: [stylex.vite()],
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Geist',
      cssVariable: '--font-geist-sans',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/Geist-Variable.woff2'],
            weight: '100 900',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      fallbacks: ['ui-monospace', 'monospace'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/GeistMono-Variable.woff2'],
            weight: '100 900',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Geist Pixel',
      cssVariable: '--font-geist-pixel',
      fallbacks: ['ui-monospace', 'monospace'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/GeistPixel-Square.woff2'],
            weight: '500',
            style: 'normal',
          },
        ],
      },
    },
  ],
});
