import type { APIRoute } from 'astro';

/**
 * Paths crawlers should skip: the MCP endpoint is JSON-RPC, not a page.
 * `/ui` stays crawlable on purpose, so crawlers can read its `noindex`.
 */
const DISALLOW = ['/mcp'];

/** Serves `/robots.txt` at build time, pointing at the sitemap. */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap-index.xml', site).href;
  const body = [
    'User-agent: *',
    'Allow: /',
    ...DISALLOW.map((path) => `Disallow: ${path}`),
    '',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
