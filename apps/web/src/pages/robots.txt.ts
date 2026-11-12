import type { APIRoute } from 'astro';

/**
 * Serves `/robots.txt` at build time, pointing at the sitemap.
 *
 * `/mcp` and `/ui` stay crawlable so crawlers can read their `noindex`
 * (`X-Robots-Tag` on `/mcp`, the robots meta on `/ui`). Disallowing a
 * path would hide that header.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap-index.xml', site).href;
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
