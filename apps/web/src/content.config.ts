import { defineCollection } from 'astro:content';
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

export const collections = { skills };
