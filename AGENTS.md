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
- StyleX 0.19 for all styling, compiled at build time by `@stylexjs/unplugin` in [astro.config.mjs](apps/web/astro.config.mjs). Tailwind is not used.
- Base UI (`@base-ui/react`) for unstyled, accessible primitives (dialog, menu, popover, tooltip, and so on)
- Geist Sans, Mono, and Pixel (Square) fonts, loaded with the Astro Fonts API (`fonts` in [astro.config.mjs](apps/web/astro.config.mjs)) from `src/assets/fonts`

## Architecture

This is a Turborepo monorepo with one app today:

- `apps/web` is the Astro site. Pages in `src/pages` map to routes, and each page wraps its content in a layout from `src/layouts`.
- UI is built from React components in `src/components`, styled with StyleX. Astro files only handle routing, data loading, `<head>`, and composing components. They don't hold visual styles, because StyleX only compiles in `.ts`/`.tsx` files. When an Astro file needs a StyleX class, precompile it in a `.ts` module and import the class string, like `bodyClass` in [root.ts](apps/web/src/styles/root.ts).
- React components render to static HTML by default. Add a `client:*` directive (prefer `client:visible` or `client:idle`) only when a component needs interactivity, for example the theme toggle or Base UI popovers.
- Navigation is plain multi-page: `prefetch.prefetchAll` in [astro.config.mjs](apps/web/astro.config.mjs) fetches a page on link hover, and `@view-transition { navigation: auto }` in global.css fades the old page out and the new one in without a blank frame. The site header and the page header (title, subtitle, meta) keep still through their own `view-transition-name`s. Don't add Astro's `<ClientRouter />`: page scripts like the pixel reveal expect a full page load.
- StyleX collects all styles into one CSS file at build time. In dev, [Layout.astro](apps/web/src/layouts/Layout.astro) loads `/virtual:stylex.css` and the StyleX runtime for hot reload. Keep those tags.
- The site has no backend, database, auth, or API. All content ships as static HTML at build time.
- `/projects` and `/projects/<slug>` come from the `projects` content collection: one markdown file per project in [src/content/projects](apps/web/src/content/projects), validated by the schema in [content.config.ts](apps/web/src/content.config.ts). Add a project by adding a file. The home page lists them too.
- `/skills` and `/skills/<name>` come from the `skills` content collection ([content.config.ts](apps/web/src/content.config.ts)). Its loader ([loader.ts](apps/web/src/lib/skills/loader.ts)) fetches every `skills/*/SKILL.md` from [jralvarenga/skills](https://github.com/jralvarenga/skills) at build time: one GitHub API call for the file tree, then raw downloads. Routes use the directory name (`skill.id`), not the frontmatter `name`. `build` and `dev` need network access, and the build fails if GitHub is unreachable, rate-limited, or returns a truncated tree. An optional `GITHUB_TOKEN` (or `GH_TOKEN`) avoids GitHub API rate-limit failures; without it the public unauthenticated limit applies. SKILL.md bodies render to static HTML with `react-markdown` and `remark-gfm` through StyleX-styled components ([markdown.tsx](apps/web/src/components/markdown.tsx)). Restart `dev` to pick up new skills.
- `packages/*` holds shared config. Nothing in `apps/web` consumes it yet (see Open questions).

[Layout.astro](apps/web/src/layouts/Layout.astro) renders the html shell and the site [Header](apps/web/src/components/layout/header.tsx) (skip link, avatar linking home, nav). Each page renders its own `<main id="content">` inside a React component: [HomePage](apps/web/src/components/home/home-page.tsx) on `/`, and `PageLayout` on the inner pages. The nav links to `/about`, `/projects`, and `/skills`. `/writing` is not built yet. `/ui` ([ui.astro](apps/web/src/pages/ui.astro)) previews every primitive in light and dark mode.

## Project structure

- `apps/web/` is the Astro website. See [apps/web/AGENTS.md](apps/web/AGENTS.md) for Astro-specific instructions.
  - `src/pages/` holds routes.
  - `src/layouts/` holds page shells (html, head, theme, header, footer).
  - `src/components/ui/` holds the primitives (button, input, textarea, switch, checkbox, field, spinner, tag), one component per kebab-case file.
  - `src/components/layout/` holds the site header and `PageLayout`, the shell every inner page uses for its `<main>`, breadcrumbs, title, and required subtitle (`lead`).
  - `src/components/page.tsx` holds shared page parts (breadcrumbs, page header, section) and `src/components/markdown.tsx` renders markdown bodies.
  - `src/components/icons.tsx` holds inline SVG icons (Lucide style, plus the GitHub mark).
  - `src/components/<feature>/` holds feature components, for example `home/` for the home page and `showcase/` for the `/ui` preview.
  - `src/lib/<feature>/` holds browser logic that isn't a component, for example the pixel reveal ([pixel-reveal.ts](apps/web/src/lib/pixel-reveal.ts)) that builds the hero name and every page title, started for each `[data-pixel-reveal]` element from a `<script>` in [Layout.astro](apps/web/src/layouts/Layout.astro) so React doesn't need to hydrate. Its markup is [PixelReveal](apps/web/src/components/pixel-reveal.tsx). [theme.ts](apps/web/src/lib/theme.ts) runs the D hotkey that toggles the theme, bound in [Layout.astro](apps/web/src/layouts/Layout.astro), whose inline `<head>` script applies the stored theme before paint.
  - `src/styles/` holds [layout.ts](apps/web/src/styles/layout.ts) (the 640px page column), [tokens.stylex.ts](apps/web/src/styles/tokens.stylex.ts) (all design tokens), [elevation.ts](apps/web/src/styles/elevation.ts) (shared control styles), [root.ts](apps/web/src/styles/root.ts) (body class), and [global.css](apps/web/src/styles/global.css) (reset, `color-scheme`, and the page view transition).
  - `src/assets/` holds fonts, images, and SVGs processed by Astro.
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
bun run check-types            # astro sync + tsc --noEmit for apps/web
bun run changeset              # add a changeset for your change
cd apps/web && bun run preview # serve the production build
```

## Environment

- Node.js 26, pinned in [.nvmrc](.nvmrc) and used by CI. The root `engines` allows >= 24. Run `nvm use` first: Astro 7 refuses to run on older Node versions, so the build fails with "Node.js ... is not supported by Astro".
- Bun 1.2.23 (`devEngines`).
- Optional `GITHUB_TOKEN` or `GH_TOKEN` for the skills loader's GitHub API call. Without it, a GitHub rate limit fails the build. See [apps/web/.env.example](apps/web/.env.example). CI's check job passes a read-only `GITHUB_TOKEN` into `bun run build`.

## Conventions

- Follow the code-guidelines, frontend, design, and app-architecture skills.
- Biome formats with 2 spaces, LF, single quotes in JS/TS, and double quotes in JSX/HTML attributes. Run `bun run format` instead of formatting by hand.
- Style only with StyleX: `stylex.create` in the component file and `{...stylex.props(...)}` on elements. Don't use Tailwind, CSS modules, inline `style`, or `<style>` blocks in Astro files. [global.css](apps/web/src/styles/global.css) is only for the reset, `color-scheme`, and the `@view-transition` rules, which StyleX can't emit.
- Design tokens are StyleX variables (`stylex.defineVars`) in [tokens.stylex.ts](apps/web/src/styles/tokens.stylex.ts). StyleX requires that file extension, and the file may only export `defineVars` results. Components import tokens and never hardcode values.
- StyleX CSS layers are off on purpose (`stylex.vite()` with no `useCSSLayers`). The unlayered element rules in global.css would otherwise beat every StyleX style, for example `button { color: inherit }`.
- Build interactive primitives on Base UI (`@base-ui/react/<component>`) and wrap them in `components/ui`. Style state through Base UI's `className={(state) => stylex.props(...).className ?? ''}` callback, since StyleX can't target `data-*` attributes. Don't hand-roll focus traps, menus, or popovers.
- Primitives take an `xstyle?: stylex.StyleXStyles` prop for overrides instead of `className` or `style`.
- [.browserslistrc](apps/web/.browserslistrc) targets modern browsers so lightningcss doesn't lower `light-dark()`, which would break dark mode in StyleX.
- Add a changeset (`bun run changeset`) for every user-facing change to `apps/web`. Private packages are versioned and tagged.

## Testing

There are no tests yet. Verify UI changes on `/ui` and the affected pages with `bun run dev`, in light and dark mode, at mobile and desktop widths.

## Deployment

- Every push to `main` runs [release.yml](.github/workflows/release.yml): a read-only check job (`bun install --frozen-lockfile`, `bun run check`, `bun run build`), then a write-scoped Changesets job that opens a "chore: version packages" PR, or creates GitHub releases when that PR is merged.
- No hosting target is configured yet.

## Rules

- Always run `bun run check`, `bun run check-types`, and `bun run build` before finishing a change.
- Never add ESLint or Prettier config. Biome is the only formatter and linter.
- Never commit `.env` files or generated output (`dist`, `.astro`, `.turbo`).
- Keep the Turborepo managed block below as it is. `turbo` rewrites it.
- Update this file and DESIGN.md in the same change that modifies the architecture, commands, or design system.

## Open questions

- Hosting target for the site (`.vercel` is in `.gitignore`, but nothing is configured).
- Writing: there is no writing section yet. If one is added, it can follow the projects collection pattern.
- Should `packages/eslint-config` and `packages/typescript-config` be removed? They target Next.js and are unused, and Biome replaces ESLint.
- Add `@astrojs/check` so `check-types` also type-checks `.astro` files? Today it only checks `.ts` and `.tsx`.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": true` in the root `turbo.json` or `turbo.jsonc` to opt in; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
