import type { APIRoute, GetStaticPaths } from 'astro';
import { profile } from '../../lib/about/profile';
import { renderOgImage } from '../../lib/seo/og-image';
import { getOgPages, type OgPage } from '../../lib/seo/pages';
import { ogImagePath } from '../../lib/seo/site';

/** One PNG per indexable page, at the path `ogImagePath` returns. */
export const getStaticPaths = (async () => {
  const pages = await getOgPages();
  return pages.map((page) => ({
    params: {
      slug: ogImagePath(page.path).slice('/og/'.length, -'.png'.length),
    },
    props: { page },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ page: OgPage }> = async ({ props, site }) => {
  const png = await renderOgImage({
    ...props.page,
    author: profile.name,
    host: site?.host ?? '',
  });
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
