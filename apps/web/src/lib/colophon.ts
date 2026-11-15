/**
 * Facts about the site itself, shown in the footer. Languages are in
 * `lib/i18n/locales.ts`.
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
