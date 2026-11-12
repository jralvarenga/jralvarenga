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

export const collections = { skills, projects };
