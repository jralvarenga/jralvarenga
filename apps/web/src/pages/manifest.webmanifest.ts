import type { APIRoute } from 'astro';
import { profile } from '../lib/about/profile';
import { DEFAULT_DESCRIPTION, THEME_COLORS } from '../lib/seo/site';

/** Serves `/manifest.webmanifest` for install prompts and home-screen icons. */
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: profile.name,
      short_name: 'jralvarenga',
      description: DEFAULT_DESCRIPTION,
      lang: 'en',
      start_url: '/',
      scope: '/',
      display: 'browser',
      background_color: THEME_COLORS.light,
      theme_color: THEME_COLORS.light,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        {
          src: '/icon-maskable-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
