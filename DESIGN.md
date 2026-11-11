# Design

The system below is decided but not implemented yet. The app still renders the Astro starter. Styling is StyleX on React components, with Base UI for interactive primitives. Build the tokens first in `apps/web/src/styles/tokens.stylex.ts`, then build components on top of them.

## Direction

- A personal website, for recruiters, peers, and collaborators who want to see who Jorge is, what he builds, and what he writes.
- The feeling is quiet, precise, and confident. It should read like a well-set page, not a product landing page.
- Inspirations:
  - [vercel.com/font](https://vercel.com/font) for Geist and its restrained, Swiss-inspired typography.
  - [emilkowal.ski](https://emilkowal.ski) for the single narrow column, content first, and small purposeful motion.
  - [shadcn](https://ui.shadcn.com) for the neutral token system, hairline rings instead of shadows, and simple component variants.
- Plain black and white with light and dark mode. Grays carry hierarchy. Color is never decoration.
- No gradients, glows, blurred blobs, glassmorphism, or heavy shadows.

## Signature

Jorge's name in **Geist Pixel** (Square variant). It is used once per page, as the wordmark in the header, and in the home hero. Everything else is set in Geist Sans, so the pixel wordmark stays the one memorable element. Do not use Geist Pixel for headings, buttons, or body text.

## Colors

Define the colors with `stylex.defineVars` as `colors` in `tokens.stylex.ts`. Each value is `{ default: <light>, '@media (prefers-color-scheme: dark)': <dark> }`. Forced themes are `stylex.createTheme(colors, …)` exports (`lightTheme`, `darkTheme`), and the theme toggle applies their class to `<html>`. Put spacing, radius, font, and motion values in the same file as their own `defineVars` groups. Components only use these variables. Never put hex, rgb, or oklch literals in a component.

| Token                  | Light                       | Dark                        | Purpose                                        |
| ---------------------- | --------------------------- | --------------------------- | ---------------------------------------------- |
| `--background`         | `oklch(1 0 0)`              | `oklch(0.145 0 0)`          | Page background                                |
| `--foreground`         | `oklch(0.145 0 0)`          | `oklch(0.985 0 0)`          | Body text, headings, icons                     |
| `--card`               | `oklch(1 0 0)`              | `oklch(0.205 0 0)`          | Raised surfaces (cards, popovers, code blocks) |
| `--card-foreground`    | `oklch(0.145 0 0)`          | `oklch(0.985 0 0)`          | Text on cards                                  |
| `--primary`            | `oklch(0.205 0 0)`          | `oklch(0.922 0 0)`          | Primary button fill, active nav                |
| `--primary-foreground` | `oklch(0.985 0 0)`          | `oklch(0.205 0 0)`          | Text on primary                                |
| `--muted`              | `oklch(0.97 0 0)`           | `oklch(0.269 0 0)`          | Hover fills, subtle surfaces, tags             |
| `--muted-foreground`   | `oklch(0.556 0 0)`          | `oklch(0.708 0 0)`          | Secondary text, dates, captions                |
| `--border`             | `oklch(0.922 0 0)`          | `oklch(0.32 0 0)`           | Hairline dividers and rings, always 1px        |
| `--ring`               | `oklch(0.708 0 0)`          | `oklch(0.556 0 0)`          | Focus outline                                  |
| `--success`            | `= --primary`               | `= --primary`               | Success messages (always with an icon or text) |
| `--warning`            | `oklch(0.75 0.15 75)`       | `oklch(0.82 0.14 80)`       | Warnings, used rarely                          |
| `--danger`             | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Errors, invalid fields                         |

- `--warning` and `--danger` are the only hues in the system. They only appear in states, never in decoration.
- Status never relies on color alone. Pair it with an icon, a label, or `aria-invalid`.
- Selection uses `--foreground` on `--background` inverted.

## Typography

Load the fonts from the `geist` package (`geist/dist/fonts`). Do not use Google Fonts.

| Role      | Font               | Use                                        |
| --------- | ------------------ | ------------------------------------------ |
| Display   | Geist Sans         | Page titles and section headings           |
| Body      | Geist Sans         | All text by default                        |
| Utility   | Geist Mono         | Code, dates, small metadata, keyboard keys |
| Signature | Geist Pixel Square | Wordmark only (see Signature)              |

| Style   | Size / line height                           | Weight | Tracking                          |
| ------- | -------------------------------------------- | ------ | --------------------------------- |
| Display | 40px / 1.1 on desktop, 32px / 1.15 on mobile | 500    | -0.03em                           |
| H2      | 24px / 1.3                                   | 500    | -0.02em                           |
| H3      | 18px / 1.4                                   | 500    | -0.01em                           |
| Body    | 16px / 1.6                                   | 400    | 0                                 |
| Small   | 14px / 1.5                                   | 400    | 0, for metadata and captions only |
| Mono    | 14px / 1.5                                   | 400    | 0                                 |

- The base size is 16px. Don't go below 14px.
- Use only weights 400, 500, and 700. Never 600 or 900.
- Never use all caps with wide tracking.
- Set `font-variant-numeric: tabular-nums` on dates and numbers in lists.
- Use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs.

## Spacing and layout

- Spacing uses a 4px scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Use one master layout: a single centered column with `max-width: 640px`, a 16px side gutter on mobile, and 24px from 640px up. Pages that need it, like a project gallery, can widen to 960px.
- Header: the wordmark on the left, nav links and the theme toggle on the right. The header is not sticky and has no background fill.
- Space sections 64px apart on mobile and 96px apart on desktop. Inside a section, space items 16 to 24px apart.
- Lists for writing and projects are full-width rows with the title left and the date or meta right, in `--muted-foreground` mono. Don't use card grids for lists.
- Use hairline `--border` dividers only where they separate information. Don't use boxes around everything.
- Design mobile first. There is no horizontal scroll. Nav wraps or collapses instead of scrolling.
- Use flexbox first and grid second.

## Components

There are no components yet. [Welcome.astro](apps/web/src/components/Welcome.astro) is starter code to delete, so do not reuse its styles. Build these base components as React + StyleX in `apps/web/src/components/` and reuse them before creating new ones. Interactive ones wrap the matching Base UI primitive:

- **Link**: inline text link, `--foreground` with an underline in `--border` that turns `--foreground` on hover. A nav variant has no underline, uses `--muted-foreground`, and turns `--foreground` on hover and when active.
- **Button**:
  - Variants: `primary` (`--primary` fill), `outline` (1px `--border` ring, `--muted` on hover), and `ghost` (no ring, `--muted` on hover).
  - Sizes: `sm` (32px) and `md` (36px), plus `icon`.
  - Radius 8px.
- **ThemeToggle**: an icon button with three modes (system, light, dark). It puts the `lightTheme`/`darkTheme` StyleX class on `<html>` (none for system) and stores the choice in `localStorage`. An inline script in `<head>` applies the stored theme before paint to avoid a flash.
- **ListItem**: a row for writing and projects, with title, optional one-line description, and mono meta on the right.
- **Card**: `--card` background, 1px `--border` ring, radius 12px, 16px padding, no shadow. Only use it for projects that need an image.
- **Tag**: `--muted` background, `--muted-foreground` text, radius 6px, 14px text.

Radius scale: 6px for tags and inputs, 8px for buttons, and 12px for cards. Shadows are not used. Rings and borders define edges.

## States

- **Hover**: color or `--muted` background changes only. No movement on hover.
- **Focus**: `outline: 2px solid var(--ring); outline-offset: 2px` on `:focus-visible` for every interactive element.
- **Active**: buttons scale to `0.97`.
- **Disabled**: `opacity: 0.5`, `cursor: not-allowed`, no hover change.
- **Loading**: keep the element's size and replace the label with a small spinner in `currentColor`.
- **Empty**: one line of `--muted-foreground` text that says what will appear, for example "No posts yet."
- **Error**: `--danger` text with an icon and a plain sentence on how to fix it. Invalid inputs use `aria-invalid` and a `--danger` ring.
- **Success**: `--success` text with a check icon.
- **404**: the same layout, a short sentence, and a link home.

## Motion

Motion is rare, fast, and informative, following Emil Kowalski's principles.

- **Easing**: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for enter and exit. `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` for elements that move on screen. Never use `ease-in` for UI.
- **Duration**: 150ms for hover and color, 200ms for popovers and menus, never more than 300ms.
- **Properties**: only animate `transform` and `opacity` (and `color`/`background-color` for hover). Prefer CSS transitions, which can be interrupted, over keyframes.
- **Enter animations**: start from `scale(0.95)` or above, never `scale(0)`. Popovers scale from their trigger with `transform-origin`.
- **Page load**: at most one subtle fade-and-rise of the main column (opacity 0 to 1, `translateY(8px)` to 0, 300ms). No stagger on every element.
- Don't animate actions done with the keyboard or things seen many times a day, like nav or theme switching.
- **Reduced motion**: under `prefers-reduced-motion: reduce`, replace movement with opacity only, or remove the animation.

## Accessibility

- Text meets WCAG AA contrast in both themes. Don't use `--muted-foreground` for essential content.
- Use semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, and a "Skip to content" link.
- Every icon-only button has an `aria-label`. Decorative SVGs have `aria-hidden="true"`.
- Touch targets are at least 40px.
- Respect `prefers-color-scheme` and `prefers-reduced-motion`.

## Open questions

- Should the signature be the Geist Pixel wordmark, or another element such as thin Swiss gridlines?
- Geist Pixel variant for the wordmark: Square, Grid, or Circle?
- Will the site have images (project screenshots, photo)? Card styling depends on it.
- Is there an icon set preference? Lucide matches the shadcn style.
