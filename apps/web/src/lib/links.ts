/** True for absolute links that leave the site, including protocol-relative. */
function isExternal(href: string) {
  return /^(https?:)?\/\//i.test(href);
}

/**
 * True when `href` is safe to put on an anchor: in-page, site-relative, or
 * http(s)/mailto. Rejects `javascript:` and other non-web schemes.
 */
export function isSafeHref(href: string) {
  const value = href.trim();
  if (value === '' || value.startsWith('#')) return true;
  try {
    const url = new URL(value, 'https://jralvarenga.local');
    return (
      url.protocol === 'http:' ||
      url.protocol === 'https:' ||
      url.protocol === 'mailto:'
    );
  } catch {
    return false;
  }
}

/**
 * Attributes that open external links in a new tab. Internal links get
 * nothing, so site navigation stays in the same tab.
 */
export function linkTarget(href: string) {
  return isExternal(href)
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};
}
