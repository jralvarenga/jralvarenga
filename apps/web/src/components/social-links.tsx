import { social } from '../lib/social';
import { InstagramIcon, LinkedInIcon, XIcon } from './icons';
import type { MetaItem } from './page';

/** Social profiles as icon-only meta items, for `PageLayout` or `MetaList`. */
export const socialLinks: MetaItem[] = [
  { ...social.linkedin, icon: <LinkedInIcon size={16} />, iconOnly: true },
  { ...social.x, icon: <XIcon size={16} />, iconOnly: true },
  {
    ...social.instagram,
    icon: <InstagramIcon size={16} />,
    iconOnly: true,
  },
];
