# jralvarenga

Personal website of Jorge Alvarenga. It is a minimal, content-first site for people who want to know who Jorge is and what he builds and writes, and to get in touch.

Read [DESIGN.md](DESIGN.md) before any UI work.

## Stack

- Bun 1.2.23 as package manager and script runner, with Bun workspaces (`apps/*`, `packages/*`)
- Turborepo 2.11 for task orchestration ([turbo.json](turbo.json))
- Astro 7 for the website, static output, TypeScript strict (`astro/tsconfigs/strict`)
- TypeScript 7
- Biome 2.6 for formatting, linting, and import sorting ([biome.json](biome.json)). ESLint and Prettier are not used.
- Changesets for versioning and GitHub releases ([.changeset/config.json](.changeset/config.json))
- React 19 through `@astrojs/react` for UI components
- StyleX 0.19 for all styling, compiled at build time by `@stylexjs/unplugin` in [astro.config.mjs](apps/web/astro.config.mjs) with CSS layers on. Tailwind is not used.
- Base UI (`@base-ui/react`) for unstyled, accessible primitives (dialog, menu, popover, tooltip, and so on)
- `geist` 1.9 for the Geist Sans, Mono, and Pixel fonts

## Architecture

This is a Turborepo monorepo with one app today:

- `apps/web` is the Astro site. Pages in `src/pages` map to routes, and each page wraps its content in a layout from `src/layouts`.
- UI is built from React components in `src/components`, styled with StyleX. Astro files only handle routing, data loading, `<head>`, and composing components. They don't hold visual styles, because StyleX only compiles in `.ts`/`.tsx` files.
- React components render to static HTML by default. Add a `client:*` directive (prefer `client:visible` or `client:idle`) only when a component needs interactivity, for example the theme toggle or Base UI popovers.
- StyleX collects all styles into one CSS file at build time. In dev, [Layout.astro](apps/web/src/layouts/Layout.astro) loads `/virtual:stylex.css` and the StyleX runtime for hot reload. Keep those tags.
- The site has no backend, database, auth, or API. All content ships as static HTML at build time.
- `packages/*` holds shared config. Nothing in `apps/web` consumes it yet (see Open questions).

`apps/web` is still the Astro "basics" starter. Replace [Welcome.astro](apps/web/src/components/Welcome.astro), its SVG assets, and the starter styles in [Layout.astro](apps/web/src/layouts/Layout.astro) when building the real site. Do not build on top of them.

## Project structure

- `apps/web/` is the Astro website. See [apps/web/AGENTS.md](apps/web/AGENTS.md) for Astro-specific instructions.
  - `src/pages/` holds routes.
  - `src/layouts/` holds page shells (html, head, theme, header, footer).
  - `src/components/` holds reusable React components (`.tsx`) styled with StyleX.
  - `src/styles/` holds [global.css](apps/web/src/styles/global.css) (reset only) and the StyleX token files (`*.stylex.ts`).
  - `src/assets/` holds images and SVGs processed by Astro.
  - `public/` holds files served as is (favicons).
- `packages/typescript-config/` and `packages/eslint-config/` are shared config packages left over from the Turborepo Next.js starter.
- `.changeset/` holds pending changesets and the Changesets config.
- `.github/workflows/` holds CI ([release.yml](.github/workflows/release.yml)).

## Commands

Run these from the repository root.

```sh
bun install                    # install all workspaces
bun run dev                    # turbo dev, starts Astro at http://localhost:4321
bun run build                  # turbo build, outputs apps/web/dist
bun run check                  # biome check (format + lint + imports), what CI runs
bun run format                 # biome check --write, applies fixes
bun run lint                   # biome lint only
bun run changeset              # add a changeset for your change
cd apps/web && bun run preview # serve the production build
```

`bun run check-types` exists in the root, but no workspace defines a `check-types` script yet, so it does nothing.

## Environment

- Node.js 26, pinned in [.nvmrc](.nvmrc) and used by CI. The root `engines` allows >= 24. Run `nvm use` first: Astro 7 refuses to run on older Node versions, so the build fails with "Node.js ... is not supported by Astro".
- Bun 1.2.23 (`devEngines`).
- No environment variables are used yet. If any are added, document them here and add a `.env.example`.

## Conventions

- Follow the code-guidelines, frontend, design, and app-architecture skills.
- Biome formats with 2 spaces, LF, single quotes in JS/TS, and double quotes in JSX/HTML attributes. Run `bun run format` instead of formatting by hand.
- Style only with StyleX: `stylex.create` in the component file and `{...stylex.props(...)}` on elements. Don't use Tailwind, CSS modules, inline `style`, or `<style>` blocks in Astro files. [global.css](apps/web/src/styles/global.css) is only for the reset.
- Design tokens are StyleX variables (`stylex.defineVars`) in `src/styles/*.stylex.ts`. StyleX requires that file extension and named exports for variables. Components import tokens and never hardcode values.
- Build interactive primitives on Base UI (`@base-ui/react/<component>`) and style its parts with StyleX. Use its `data-*` state attributes (`[data-open]`, `[data-disabled]`) for state styles. Don't hand-roll focus traps, menus, or popovers.
- [.browserslistrc](apps/web/.browserslistrc) targets modern browsers so lightningcss doesn't lower `light-dark()`, which would break dark mode in StyleX.
- Add a changeset (`bun run changeset`) for every user-facing change to `apps/web`. Private packages are versioned and tagged.

## Testing

There are no tests yet. Verify UI changes by running `bun run dev` and checking the page in light and dark mode at mobile and desktop widths.

## Deployment

- Every push to `main` runs [release.yml](.github/workflows/release.yml): `bun install --frozen-lockfile`, `bun run check`, and `bun run build`. Then the Changesets action opens a "chore: version packages" PR, or creates GitHub releases when that PR is merged.
- No hosting target is configured yet.

## Rules

- Always run `bun run check` and `bun run build` before finishing a change. CI fails on either.
- Never add ESLint or Prettier config. Biome is the only formatter and linter.
- Never commit `.env` files or generated output (`dist`, `.astro`, `.turbo`).
- Keep the Turborepo managed block below as it is. `turbo` rewrites it.
- Update this file and DESIGN.md in the same change that modifies the architecture, commands, or design system.

## Open questions

- Hosting target for the site (`.vercel` is in `.gitignore`, but nothing is configured).
- Site sections and content model: home, projects, writing, about? If there is writing, should it use Astro content collections with MDX?
- Should `packages/eslint-config` and `packages/typescript-config` be removed? They target Next.js and are unused, and Biome replaces ESLint.
- Add `@astrojs/check` and a `check-types` script to `apps/web` so `bun run check-types` does real work?

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": true` in the root `turbo.json` or `turbo.jsonc` to opt in; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
