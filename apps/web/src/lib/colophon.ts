/**
 * Facts about the site itself and its languages, shown in the footer.
 */

/** The site's source code. */
export const siteSource = 'https://github.com/jralvarenga/jralvarenga';

/** The license the source is published under, MIT in my name. */
export const siteLicense = `${siteSource}/blob/main/LICENSE`;

/**
 * When this build ran. Pages are prerendered, so the copyright year is the
 * year the site was last deployed.
 */
export const siteUpdated = new Date();

/** Languages the site will be offered in. Only English exists today. */
export const languages = [
  { code: 'en', label: 'English', available: true },
  { code: 'es', label: 'Español', available: false },
] as const;

export type LanguageCode = (typeof languages)[number]['code'];
