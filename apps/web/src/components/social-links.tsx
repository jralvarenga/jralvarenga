import { social } from '../lib/social';
import { GitHubIcon, LinkedInIcon, XIcon } from './icons';
import type { MetaItem } from './page';

/** Social profiles as icon-only meta items, for `PageLayout` or `MetaList`. */
export const socialLinks: MetaItem[] = [
  { ...social.github, icon: <GitHubIcon size={16} />, iconOnly: true },
  { ...social.linkedin, icon: <LinkedInIcon size={16} />, iconOnly: true },
  { ...social.x, icon: <XIcon size={16} />, iconOnly: true },
];
