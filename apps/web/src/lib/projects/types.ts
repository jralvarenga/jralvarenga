import type { CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>['data'];
export type ProjectStatus = Project['status'];
export type ProjectLink = Project['links'][number];
export type ProjectPart = Project['parts'][number];
