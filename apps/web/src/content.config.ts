import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { skillsLoader } from './lib/skills/loader';

const skills = defineCollection({
  loader: skillsLoader(),
  schema: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    /** Path of the SKILL.md inside the repository. */
    path: z.string(),
  }),
});

const status = z.enum(['live', 'building']);
/** A full http(s) URL, or a path on this site such as `/skills`. */
const href = z
  .string()
  .min(1)
  .refine((value) => {
    if (/^\/[^/]/.test(value)) return true;
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }, 'Must be an http(s) URL or a site path');
const link = z.object({
  label: z.string(),
  href,
});
const stackItems = z
  .array(z.string())
  .default([])
  .refine((items) => new Set(items).size === items.length, {
    message: 'Stack items must be unique',
  });

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string().min(1),
    /** One or two sentences, shown in lists and as the page lead. */
    summary: z.string().min(1),
    /** Month the project started, as `YYYY-MM`. */
    started: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
    /**
     * Day the content last changed, as `YYYY-MM-DD`. Becomes the sitemap's
     * `lastmod`, so bump it when you edit the file. The YAML parser turns an
     * unquoted date into a `Date`, so accept that only at UTC midnight (a bare
     * day), and a quoted string only as `YYYY-MM-DD`.
     */
    updated: z
      .union([
        z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD'),
        z
          .date()
          .refine(
            (date) => date.toISOString().endsWith('T00:00:00.000Z'),
            'Use YYYY-MM-DD, with no time',
          ),
      ])
      .pipe(z.coerce.date())
      .optional(),
    /** `building` shows an "In progress" tag. */
    status,
    /** Position in lists, lowest first. */
    order: z.number().int(),
    stack: stackItems,
    links: z.array(link).default([]),
    /** Apps or sites the project is made of, each with its own status. */
    parts: z
      .array(
        z.object({
          name: z.string().min(1),
          summary: z.string().min(1),
          status,
          stack: stackItems,
          // Named `site`, not `link`: Astro rejects a nested `link` key with
          // "Expected type object, received object".
          site: link.optional(),
        }),
      )
      .default([]),
  }),
});

/**
 * Spanish copy for a project: `src/content/projects/es/<slug>.md`, named
 * like the English file. The body is the Spanish write-up. `links` and
 * `parts` follow the English file's order, and `collection.ts` fails the
 * build when their counts differ. A project without one shows in English.
 */
const projectTranslations = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects/es' }),
  schema: z.object({
    summary: z.string().min(1),
    /** Link labels, in the English file's order. */
    links: z.array(z.string().min(1)).default([]),
    parts: z
      .array(
        z.object({
          name: z.string().min(1),
          summary: z.string().min(1),
          /** Label for the part's `site` link. */
          site: z.string().min(1).optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { skills, projects, projectTranslations };
