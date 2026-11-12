/** True for absolute links that leave the site. */
function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

/**
 * Attributes that open external links in a new tab. Internal links get
 * nothing, so site navigation stays in the same tab.
 */
export function linkTarget(href: string) {
  return isExternal(href)
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
}
