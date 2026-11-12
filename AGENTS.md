# jralvarenga

Personal website of Jorge Alvarenga. It is a minimal, content-first site for people who want to know who Jorge is and what he builds and writes, and to get in touch.

Read [DESIGN.md](DESIGN.md) before any UI work.

## Stack

- Bun 1.2.23 as package manager and script runner, with Bun workspaces (`apps/*`, `packages/*`)
- Turborepo 2.11 for task orchestration ([turbo.json](turbo.json))
- Astro 7 for the website, static output plus one on-demand route, TypeScript strict (`astro/tsconfigs/strict`)
- `@astrojs/vercel` so `/mcp` can run as a Vercel Function while every page stays prerendered HTML
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
- Pages have no backend, database, or auth. They ship as static HTML at build time. The one exception is `/mcp`, an on-demand Streamable HTTP MCP endpoint (`prerender = false`) served by a Vercel Function. It is read-only, stateless, and needs no auth.
- Profile copy lives in [profile.ts](apps/web/src/lib/about/profile.ts). Work history and tool groups live in [about.ts](apps/web/src/lib/about/about.ts). Social links live in [social.ts](apps/web/src/lib/social.ts). The home page, about page, MCP server, and `/llms.txt` all read those modules so they cannot drift.
- `/projects` and `/projects/<slug>` come from the `projects` content collection: one markdown file per project in [src/content/projects](apps/web/src/content/projects), validated by the schema in [content.config.ts](apps/web/src/content.config.ts). Add a project by adding a file. The home page lists them too. Query helpers are in [collection.ts](apps/web/src/lib/projects/collection.ts).
- `/skills` and `/skills/<name>` come from the `skills` content collection ([content.config.ts](apps/web/src/content.config.ts)). Its loader ([loader.ts](apps/web/src/lib/skills/loader.ts)) fetches every `skills/*/SKILL.md` from [jralvarenga/skills](https://github.com/jralvarenga/skills) at build time: one GitHub API call for the file tree, then raw downloads. Routes use the directory name (`skill.id`), not the frontmatter `name`. `build` and `dev` need network access, and the build fails if GitHub is unreachable, rate-limited, or returns a truncated tree. An optional `GITHUB_TOKEN` (or `GH_TOKEN`) avoids GitHub API rate-limit failures; without it the public unauthenticated limit applies. SKILL.md bodies render to static HTML with `react-markdown` and `remark-gfm` through StyleX-styled components ([markdown.tsx](apps/web/src/components/markdown.tsx)). Restart `dev` to pick up new skills. Query helpers are in [collection.ts](apps/web/src/lib/skills/collection.ts).
- `/mcp` is the remote MCP server. It uses Vercel's `mcp-handler` on `@modelcontextprotocol/server` (the official SDK v2 package; v1 was `@modelcontextprotocol/sdk`). That adapter returns a Fetch `Request` → `Response` function, which matches Astro endpoints and Vercel Functions. Tools and resources are registered in [server.ts](apps/web/src/lib/mcp/server.ts) and read the same catalog as the pages ([catalog.ts](apps/web/src/lib/mcp/catalog.ts)).
- `/llms.txt` and `/llms-full.txt` are static text files generated at build time from that catalog, for crawlers that do not speak MCP.
- SEO is built in. `site` in [astro.config.mjs](apps/web/astro.config.mjs) is the production origin (`SITE_URL`, default `https://jralvarenga.com`), and `trailingSlash: 'never'` gives each page one URL (Vercel 308-redirects `/about/` to `/about`). [Layout.astro](apps/web/src/layouts/Layout.astro) takes `title`, `description`, `type`, `noindex`, and `structuredData`, and renders the description (shortened to about 160 characters by `metaDescription`), canonical, robots, Open Graph, X card, theme-color, manifest, search engine verification metas, and one JSON-LD `@graph` (`WebSite` and `Person` on every page, plus what the page passes). Every new page passes a `description`; pages that should stay out of search pass `noindex` (`/ui`, the 404) and are listed in `NOT_IN_SITEMAP` in astro.config.mjs. SEO copy and helpers are in [site.ts](apps/web/src/lib/seo/site.ts), and JSON-LD builders in [structured-data.ts](apps/web/src/lib/seo/structured-data.ts).
- `@astrojs/sitemap` writes `/sitemap-index.xml`. [robots.txt.ts](apps/web/src/pages/robots.txt.ts) and [manifest.webmanifest.ts](apps/web/src/pages/manifest.webmanifest.ts) are generated at build time. `/mcp` sends `X-Robots-Tag: noindex` and stays crawlable so that header can be read. The web manifest uses `display: standalone` so browsers can offer to install the site.
- Each indexable page gets a 1200×630 social image at `/og/<path>.png` (`/og/index.png` for home), rendered at build time by [og-image.tsx](apps/web/src/lib/seo/og-image.tsx) with Satori and sharp from the list in [pages.ts](apps/web/src/lib/seo/pages.ts). New projects and skills get one automatically; a new top-level page must be added to that list. Satori can't read woff2, so it uses the TTF copies in `src/assets/fonts/og` (Geist Pixel was converted from the woff2).
- The root README's stack section is two SVGs in `.github/readme/` (light and dark, swapped with `<picture>`), drawn by [readme-stack.tsx](apps/web/scripts/readme-stack.tsx) from `toolGroups` and the About page's brand marks. Run `cd apps/web && bun run readme:stack` after changing `toolGroups` or a mark; the script redraws the SVGs and rewrites the image alt text from `toolGroups`.
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
  - `src/lib/<feature>/` holds browser logic that isn't a component, for example the pixel reveal ([pixel-reveal.ts](apps/web/src/lib/pixel-reveal.ts)) that builds the hero name and every page title, started for each `[data-pixel-reveal]` element from a `<script>` in [Layout.astro](apps/web/src/layouts/Layout.astro) so React doesn't need to hydrate. Its markup is [PixelReveal](apps/web/src/components/pixel-reveal.tsx). [theme.ts](apps/web/src/lib/theme.ts) runs the D hotkey that toggles the theme, bound in [Layout.astro](apps/web/src/layouts/Layout.astro), whose inline `<head>` script applies the stored theme before paint. [mcp/](apps/web/src/lib/mcp) is the MCP catalog and Streamable HTTP server. [llms/](apps/web/src/lib/llms) builds `/llms.txt`. [seo/](apps/web/src/lib/seo) holds SEO copy, JSON-LD builders, and the Open Graph image renderer.
  - `src/styles/` holds [layout.ts](apps/web/src/styles/layout.ts) (the 640px page column), [tokens.stylex.ts](apps/web/src/styles/tokens.stylex.ts) (all design tokens), [elevation.ts](apps/web/src/styles/elevation.ts) (shared control styles), [root.ts](apps/web/src/styles/root.ts) (body class), and [global.css](apps/web/src/styles/global.css) (reset, `color-scheme`, and the page view transition).
  - `src/assets/` holds fonts, images, and SVGs processed by Astro.
  - `public/` holds files served as is (favicons, the apple-touch icon, and the manifest icons).
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
cd apps/web && bun run preview # serve the production build (static pages; use `dev` for `/mcp`)
cd apps/web && bun run readme:stack # redraw the README stack SVGs and alt text from toolGroups
```

## MCP

Remote MCP for assistants (Claude, Cursor, ChatGPT connectors). Read-only, no auth, Streamable HTTP. Stateless serving is POST-only; GET and DELETE return 405.

Local: `bun run dev`, then `http://localhost:4321/mcp`.

Production: `https://<your-domain>/mcp` after the site is deployed to Vercel. No extra environment variables. The skills loader's optional `GITHUB_TOKEN` is still only used at build time.

Cursor / Claude Desktop example (replace the URL with the deployed origin):

```json
{
  "mcpServers": {
    "jralvarenga": {
      "url": "https://<your-domain>/mcp"
    }
  }
}
```

Stdio-only clients can proxy with `npx -y mcp-remote https://<your-domain>/mcp`.

Tools: `get_profile`, `get_experience`, `list_projects`, `get_project`, `list_skills`, `get_skill`, `get_stack`, `get_contact`. Resources: `jralvarenga://profile`, `jralvarenga://experience`, `jralvarenga://stack`, `jralvarenga://contact`, `jralvarenga://projects/{slug}`, `jralvarenga://skills/{name}`.

## Environment

- Node.js 26, pinned in [.nvmrc](.nvmrc) and used by CI. The root `engines` allows >= 24. Run `nvm use` first: Astro 7 refuses to run on older Node versions, so the build fails with "Node.js ... is not supported by Astro".
- Bun 1.2.23 (`devEngines`).
- Optional `GITHUB_TOKEN` or `GH_TOKEN` for the skills loader's GitHub API call. Without it, a GitHub rate limit fails the build. Set it in your shell or in `apps/web/.env` (copy [apps/web/.env.example](apps/web/.env.example)). The loader reads `import.meta.env`, which holds both; `process.env` would miss `.env`. CI's check job passes a read-only `GITHUB_TOKEN` into `bun run build`. Turborepo runs in strict env mode, so it is listed in `passThroughEnv` on `build`, `dev`, and `check-types` in [turbo.json](turbo.json) (`astro sync` runs the skills loader).
- Optional `SITE_URL` for the production origin (default `https://jralvarenga.com`). [astro.config.mjs](apps/web/astro.config.mjs) loads it with Vite's `loadEnv` so `apps/web/.env` is honored; a real environment variable still wins. Optional `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` render the Search Console and Bing Webmaster ownership metas; set only the tag's `content` value. All three are read at build time, so change them and redeploy. They are listed in the build task's `env` in turbo.json; add any new build-time variable there too.

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

There are no tests yet. Verify UI changes on `/ui` and the affected pages with `bun run dev`, in light and dark mode, at mobile and desktop widths. For MCP changes, POST `initialize`, `tools/list`, and one `tools/call` to `/mcp` with `Accept: application/json, text/event-stream` (curl or the MCP inspector) and open `/llms.txt`.

## Deployment

- Every push to `main` runs [release.yml](.github/workflows/release.yml): a read-only check job (`bun install --frozen-lockfile`, `bun run check`, `bun run build`), then a write-scoped Changesets job that opens a "chore: version packages" PR, or creates GitHub releases when that PR is merged.
- Deploy to Vercel with the Astro framework (the `@astrojs/vercel` adapter emits the Build Output API). Pages stay static; `/mcp` is a serverless function. Set the Vercel Root Directory to `apps/web`, since the adapter writes `.vercel/output` there.
- The production domain is `https://jralvarenga.com` (`site` in astro.config.mjs). Point MCP clients at it plus `/mcp`.
- Search engines: add the domain in Google Search Console (a Domain property verified with a DNS TXT record, or a URL-prefix property verified with `GOOGLE_SITE_VERIFICATION`), then submit `https://jralvarenga.com/sitemap-index.xml`. Bing Webmaster Tools can import the Search Console property or use `BING_SITE_VERIFICATION`.

## Rules

- Always run `bun run check`, `bun run check-types`, and `bun run build` before finishing a change.
- Never add ESLint or Prettier config. Biome is the only formatter and linter.
- Never commit `.env` files or generated output (`dist`, `.astro`, `.turbo`, `.vercel`).
- Keep the Turborepo managed block below as it is. `turbo` rewrites it.
- Update this file and DESIGN.md in the same change that modifies the architecture, commands, or design system.

## Open questions

- Writing: there is no writing section yet. If one is added, it can follow the projects collection pattern.
- Should `packages/eslint-config` and `packages/typescript-config` be removed? They target Next.js and are unused, and Biome replaces ESLint.
- Add `@astrojs/check` so `check-types` also type-checks `.astro` files? Today it only checks `.ts` and `.tsx`.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": true` in the root `turbo.json` or `turbo.jsonc` to opt in; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
