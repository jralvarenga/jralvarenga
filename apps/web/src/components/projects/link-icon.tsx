import { BoxIcon, GitHubIcon, GlobeIcon, PackageIcon } from '../icons';

/** Picks an icon from a link's host, so content files stay plain data. */
export function LinkIcon({ href }: { href: string }) {
  // Paths on this site, such as `/skills`.
  if (href.startsWith('/')) return <BoxIcon size={14} />;
  const host = new URL(href).hostname;
  if (host === 'github.com') return <GitHubIcon size={14} />;
  if (host.endsWith('npmjs.com')) return <PackageIcon size={14} />;
  return <GlobeIcon size={14} />;
}
