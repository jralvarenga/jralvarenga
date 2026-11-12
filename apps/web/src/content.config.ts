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
/** A full URL, or a path on this site such as `/skills`. */
const link = z.object({
  label: z.string(),
  href: z.union([z.string().url(), z.string().regex(/^\/[^/]/)]),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string().min(1),
    /** One or two sentences, shown in lists and as the page lead. */
    summary: z.string().min(1),
    /** Month the project started, as `YYYY-MM`. */
    started: z.string().regex(/^\d{4}-\d{2}$/),
    /** `building` shows an "In progress" tag. */
    status,
    /** Position in lists, lowest first. */
    order: z.number().int(),
    stack: z.array(z.string()).default([]),
    links: z.array(link).default([]),
    /** Apps or sites the project is made of, each with its own status. */
    parts: z
      .array(
        z.object({
          name: z.string().min(1),
          summary: z.string().min(1),
          status,
          stack: z.array(z.string()).default([]),
          // Named `site`, not `link`: Astro rejects a nested `link` key with
          // "Expected type object, received object".
          site: link.optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { skills, projects };
