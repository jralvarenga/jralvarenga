---

name: better-translate
summary: Type-safe i18n for TypeScript. One config that works across Next.js, Astro, React, TanStack Router, Node, Bun, and Expo.
started: 2026-03
status: live
order: 3
stack: [TypeScript, Next.js, Astro, React, TanStack Router, AI SDK]
links:

- label: Website
  href: https://better-translate.com
- label: GitHub
  href: https://github.com/jralvarenga/better-translate
- label: npm
  href: https://www.npmjs.com/package/@better-translate/core

---

Better Translate treats translations as first-class TypeScript. You write the config once and get the same API and the same types everywhere: Next.js, Astro, React, TanStack Router, Node, Bun, and Expo.

Keys are inferred and interpolations are typed, so a missing or misspelled key is a type error instead of a blank string in production.

A built-in CLI generates the translated locale files with any AI provider, or with local models through Ollama, so no one writes a locale file by hand.
