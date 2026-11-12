# Design

Styling is StyleX on React components, with Base UI for interactive primitives. The tokens, the base primitives, the header, and the home hero are built. Preview every primitive in both themes at `/ui` ([primitives.tsx](apps/web/src/components/showcase/primitives.tsx)).

## Direction

- A personal website, for recruiters, peers, and collaborators who want to see who Jorge is, what he builds, and what he writes.
- The feeling is quiet, precise, and confident. It should read like a well-set page, not a product landing page.
- Inspirations:
  - [vercel.com/font](https://vercel.com/font) for Geist and its restrained, Swiss-inspired typography.
  - [emilkowal.ski](https://emilkowal.ski) for the single narrow column, content first, and small purposeful motion.
  - [shadcn](https://ui.shadcn.com) for the neutral token system and simple component variants.
- Plain black and white with light and dark mode. Grays carry hierarchy. Color is never decoration.
- Pages stay flat: no glows, blurred blobs, glassmorphism, or decorative gradients. The header's soft scroll edge (a fading page-tint, see Spacing and layout) is the one page-level exception. Depth belongs only to controls (see Signature).

## Signature

**Elevated controls.** Every interactive control looks physical, like a key set into a bezel, while the page around it stays flat. All of them share one elevation ([elevation.ts](apps/web/src/styles/elevation.ts)), built from four box-shadow layers:

1. An inset 1px highlight on top for the lit edge.
2. A 1px edge that defines the shape (`edge`, `primaryEdge`, or `dangerEdge`).
3. A 4px translucent bezel ring around the control (`bezel`).
4. A soft drop shadow under the bezel (`drop`).

There are two elevation styles:

- **Raised** (`raisedPrimary`, `raisedSurface`, `raisedDanger`): buttons, checkboxes, and the switch thumb. A subtle top-to-bottom gradient sits on the fill. Raised fills and the header's fading scroll-edge tint are the only gradients allowed. Buttons drop the 4px bezel ring (layer 3) and keep the highlight, the 1px edge, and a tighter `0 1px 3px` drop shadow. Checkboxes, the switch, and fields keep the full bezel.
- **Recessed** (`recessed`): inputs, textareas, and the switch track. An inset shadow replaces the highlight. On focus the edge turns `ring` and the bezel turns `bezelFocus`.

Never add elevation to static content like cards, lists, or text. Never build a new shadow by hand. Reuse the `elevation` styles.

## Colors

All colors live in `colors` in [tokens.stylex.ts](apps/web/src/styles/tokens.stylex.ts). Each value is `light-dark(<light>, <dark>)`, so the theme follows `color-scheme`. [global.css](apps/web/src/styles/global.css) sets `color-scheme: light dark` on `:root`, and `data-theme="light"` or `data-theme="dark"` on `<html>` forces a theme. Components only use these variables. Never put hex, rgb, or oklch literals outside the tokens file.

| Token               | Light                       | Dark                        | Purpose                                                      |
| ------------------- | --------------------------- | --------------------------- | ------------------------------------------------------------ |
| `background`        | `oklch(1 0 0)`              | `oklch(0.145 0 0)`          | Page background                                              |
| `foreground`        | `oklch(0.145 0 0)`          | `oklch(0.985 0 0)`          | Body text, headings, icons                                   |
| `card`              | `oklch(1 0 0)`              | `oklch(0.205 0 0)`          | Cards, popovers, text field fill                             |
| `cardForeground`    | `oklch(0.145 0 0)`          | `oklch(0.985 0 0)`          | Text on cards                                                |
| `primary`           | `oklch(0.205 0 0)`          | `oklch(0.922 0 0)`          | Primary fill (bottom of the gradient)                        |
| `primaryTop`        | `oklch(0.34 0 0)`           | `oklch(1 0 0)`              | Top of the primary gradient                                  |
| `primaryEdge`       | `oklch(0.1 0 0)`            | `oklch(0.72 0 0)`           | 1px edge of primary controls                                 |
| `primaryHighlight`  | `oklch(1 0 0 / 0.2)`        | `oklch(1 0 0 / 0.9)`        | Lit top edge of primary and danger                           |
| `primaryForeground` | `oklch(0.985 0 0)`          | `oklch(0.205 0 0)`          | Text and icons on primary                                    |
| `surface`           | `oklch(0.965 0 0)`          | `oklch(0.235 0 0)`          | Secondary control fill (bottom of the gradient)              |
| `surfaceTop`        | `oklch(1 0 0)`              | `oklch(0.29 0 0)`           | Top of the secondary gradient                                |
| `edge`              | `oklch(0 0 0 / 0.14)`       | `oklch(1 0 0 / 0.12)`       | 1px edge of secondary controls and fields                    |
| `highlight`         | `oklch(1 0 0)`              | `oklch(1 0 0 / 0.08)`       | Lit top edge of secondary controls                           |
| `bezel`             | `oklch(0 0 0 / 0.06)`       | `oklch(1 0 0 / 0.07)`       | 4px ring around every control                                |
| `bezelFocus`        | `oklch(0 0 0 / 0.12)`       | `oklch(1 0 0 / 0.16)`       | Bezel of a focused field                                     |
| `drop`              | `oklch(0 0 0 / 0.08)`       | `oklch(0 0 0 / 0.5)`        | Drop shadow under raised controls                            |
| `inset`             | `oklch(0 0 0 / 0.06)`       | `oklch(0 0 0 / 0.35)`       | Inner shadow of recessed controls                            |
| `muted`             | `oklch(0.97 0 0)`           | `oklch(0.269 0 0)`          | Ghost hover, switch track, tags                              |
| `mutedForeground`   | `oklch(0.556 0 0)`          | `oklch(0.708 0 0)`          | Secondary text, descriptions, placeholders                   |
| `border`            | `oklch(0.922 0 0)`          | `oklch(0.32 0 0)`           | Hairline dividers between content, always 1px                |
| `ring`              | `oklch(0.556 0 0)`          | `oklch(0.708 0 0)`          | Focus outline and focused field edge                         |
| `success`           | same as `primary`           | same as `primary`           | Success messages (always with an icon or text)               |
| `warning`           | `oklch(0.62 0.15 70)`       | `oklch(0.82 0.14 80)`       | Warnings, used rarely                                        |
| `danger`            | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Error text and invalid field edges                           |
| `dangerSolid`       | `oklch(0.577 0.245 27.325)` | `oklch(0.56 0.22 25)`       | Danger button fill (`dangerTop` and `dangerEdge` go with it) |
| `dangerForeground`  | `oklch(0.985 0 0)`          | `oklch(0.985 0 0)`          | Text on danger buttons                                       |
| `linkedin`          | `#0A66C2`                   | `#0A66C2`                   | LinkedIn logo only                                           |
| `denzo`             | `#0F52BA`                   | `#0F52BA`                   | Denzo Studios logo only                                      |
| `caban`             | `#0246F3`                   | `#FFFFFF`                   | Caban mark                                                   |
| `cabanDot`          | `#00F970`                   | `#00F970`                   | Caban's green dot                                            |
| `fiverr`            | `#1DBF73`                   | `#1DBF73`                   | Fiverr logo tile                                             |
| `fiverrForeground`  | `#FFFFFF`                   | `#FFFFFF`                   | White "fi" on the Fiverr tile                                |
| `ucaTile`           | `#FFFFFF`                   | `#FFFFFF`                   | White tile behind the UCA crest                              |

- `warning` and the `danger*` tokens are the only hues in the UI, and they appear only in states, never in decoration. Logo fills are the other exception, and they are only used on those marks: `linkedin` (`#0A66C2`, both themes), `denzo` (`#0F52BA`, both themes), `caban` (`#0246F3` in light, `#FFFFFF` in dark) and `cabanDot` (`#00F970`, both themes), `fiverr` (`#1DBF73`) with `fiverrForeground` (`#FFFFFF`), and `ucaTile` (`#FFFFFF` behind the crest, both themes). GitHub and X use `currentColor` so they follow the theme.
- Status never relies on color alone. Pair it with an icon, a label, or `aria-invalid`.

## Typography

Geist Sans, Geist Mono, and Geist Pixel (Square) load through the Astro Fonts API from [src/assets/fonts](apps/web/src/assets/fonts), as `--font-geist-sans`, `--font-geist-mono`, and `--font-geist-pixel`. The `font` tokens wrap them with fallbacks. Do not use Google Fonts.

| Role    | Font               | Use                                        |
| ------- | ------------------ | ------------------------------------------ |
| Display | Geist Pixel Square | Page titles, through `PageLayout`          |
| Body    | Geist Sans         | All text by default                        |
| Utility | Geist Mono         | Code, dates, small metadata, keyboard keys |
| Hero    | Geist Pixel Square | The name in the home hero                  |

| Style   | Size / line height                                 | Weight | Tracking                          |
| ------- | -------------------------------------------------- | ------ | --------------------------------- |
| Hero    | `clamp(40px, 11vw, 72px)` / 1, Geist Pixel         | 500    | -0.02em                           |
| Display | 40px / 1.1 on desktop, 32px on mobile, Geist Pixel | 500    | 0                                 |
| H2      | 24px / 1.3                                         | 500    | -0.02em                           |
| H3      | 18px / 1.4                                         | 500    | -0.01em                           |
| Body    | 16px / 1.6                                         | 400    | 0                                 |
| Small   | 14px / 1.5                                         | 400    | 0, for labels, captions, metadata |
| Mono    | 14px / 1.5                                         | 400    | 0                                 |

- The base size is 16px. Don't go below 14px, except the 12px `text.xs` in tags.
- Use only the `weight` tokens: 400, 500, and 700. Never 600 or 900.
- Never use all caps with wide tracking.
- Set `font-variant-numeric: tabular-nums` on dates and numbers in lists.
- Use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs.

## Spacing and layout

- Spacing uses the `space` tokens on a 4px scale: `x1` (4px) through `x24` (96px).
- Use one master layout: a single centered column with `max-width: 640px`, a 16px side gutter on mobile, and 24px from 640px up. Pages that need it, like a project gallery, can widen to 960px.
- Header: my photo on the left as a 32px round avatar ([avatar.jpg](apps/web/src/assets/avatar.jpg), cropped to the face, 128px for sharp high-density screens) with a 1px `border` ring, in a 40px touch target that links home (accessible name "Rigo Alvarenga, home", 0.9 opacity on hover). Nav links and the theme toggle on the right. It is sticky, with a soft scroll edge like SwiftUI's: no solid fill, but a `background` tint that fades to transparent 32px below the bar, over three stacked `backdrop-filter` blurs (1px, 3px, 8px), each masked to a shorter band at the top so the blur builds toward the top edge. No border or shadow under it.
- Space sections 64px apart on mobile and 96px apart on desktop. Inside a section, space items 16 to 24px apart.
- Lists for writing and projects are full-width rows with the title left and the date or meta right, in `mutedForeground` mono. Don't use card grids for lists.
- Use hairline `border` dividers only where they separate information. Don't use boxes around everything.
- Design mobile first. There is no horizontal scroll. Nav wraps or collapses instead of scrolling.
- Leave at least 8px between neighbouring controls.

## Components

Primitives live in [components/ui](apps/web/src/components/ui). Reuse them before creating new ones. Each accepts an `xstyle` prop for StyleX overrides.

| Component  | Built on                | Variants and props                                                                                                                                                             |
| ---------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Button`   | Base UI `Button`        | `variant`: `primary`, `secondary`, `ghost`, `danger`. `size`: `sm` 28px, `md` 32px, `lg` 36px, `icon` 32px, all with 14px labels (compact, like shadcn). `loading`, `disabled` |
| `Input`    | Base UI `Input`         | 36px tall, recessed. `invalid` for use outside a `Field`                                                                                                                       |
| `Textarea` | Base UI `Field.Control` | Recessed, 96px minimum, vertical resize. `invalid`                                                                                                                             |
| `Switch`   | Base UI `Switch`        | Recessed 40×24 track, raised 18px thumb. Checked track uses `primary`                                                                                                          |
| `Checkbox` | Base UI `Checkbox`      | Raised 20px box, primary when checked. `indeterminate`                                                                                                                         |
| `Field`    | Base UI `Field`         | `label`, `description`, `error`, `disabled`. `layout`: `stacked` (fields) or `inline` (checkbox, switch)                                                                       |
| `Spinner`  | SVG                     | Inherits `currentColor`. `label`, `size`                                                                                                                                       |
| `Tag`      | `span`                  | Flat `muted` label, 20px tall, radius `sm`, Geist Mono 12px medium in `mutedForeground`. For statuses and stack items                                                          |

Always wrap form controls in `Field` so the label, description, and error are linked. Theme switching is built as a hotkey: pressing D anywhere outside a text field flips light and dark ([theme.ts](apps/web/src/lib/theme.ts)). It sets `data-theme` on `<html>`, stores the choice in `localStorage`, switches with transitions turned off, and an inline script in `Layout.astro` applies it before paint. With nothing stored, the site follows the system. The header shows no hint for it. Still to build: Link, a ThemeToggle button for touch screens, ListItem and Card (flat, 1px `border`, radius 12px).

Radius scale (`radius` tokens): `sm` 6px for checkboxes and tags, `md` 8px for buttons and fields, `lg` 12px for cards, `full` for the switch.

## Skills pages

`/skills` and `/skills/<name>`, modeled on skills.sh, without install counts or stars.

- Page header: rendered by `PageLayout`. An optional breadcrumb (`skills / <name>`, `mutedForeground`, 14px), the title in the Display style (Geist Pixel), the subtitle, then a row of 14px facts or links with 14px icons (skill count, GitHub, Source).
- Sections: a label in Geist Mono 14px, uppercase with no extra tracking, over a 1px `border` hairline, 48px apart.
- Install command: `muted` fill, radius `md`, `$` prompt in `mutedForeground`, Geist Mono 14px, scrolls sideways inside its box on narrow screens, with a ghost icon copy button that shows a check for 1.5s.
- Skill list: full-width rows split by hairlines, the name in medium weight (underlined on row hover) over a one-line description in Geist Mono 14px `mutedForeground`, cut with an ellipsis.
- Skill subtitle: the first sentence of the description. A period inside a name such as `CLAUDE.md` is not a break; the next sentence has to start with a capital letter. When the description continues, the rest is a `mutedForeground` paragraph under the header, before the install command.
- SKILL.md: headings shift down one level under the page `h1`, body at 16px / 1.7, code blocks and inline code on `muted`, tables with hairline rows. Links to another skill stay on the site; other relative links go to GitHub.

## Projects

Projects are markdown files in [src/content/projects](apps/web/src/content/projects), one per project, with `name`, `summary`, `started` (`YYYY-MM`), `status` (`live` or `building`), `order`, `stack`, `links` (full URLs, or site paths like `/skills`), and optional `parts` in the frontmatter, and the write-up as the body. A part is an app or site the project is made of (luvid has a web app, an iOS app, and a design system), with its own `name`, `summary`, `status`, `stack`, and optional `site` link.

- Social links (GitHub, LinkedIn, and X, from [social.ts](apps/web/src/lib/social.ts)) show as a `MetaList` row under the home intro and in the About page header: icon only, all 16px, each in a 40px touch target with the label as its accessible name, 0.7 opacity on hover. GitHub and X use `currentColor`, so they are black in light mode and white in dark; LinkedIn keeps its brand blue, opening in a new tab.
- The home page has an ABOUT section between the hero and projects: two `mutedForeground` sentences and a "Read more about me →" link to `/about`.
- Rows ([project-list.tsx](apps/web/src/components/projects/project-list.tsx)) appear on the home page (the first two by `order`, then an "All projects →" link) and on `/projects` (all of them): the name in medium weight with an "In progress" `Tag` when building, the start month on the right in Geist Mono `mutedForeground`, and the summary underneath in `mutedForeground`. Hovering underlines the name. Projects with parts list their names on a last line in Geist Mono `mutedForeground`, joined by `·`.
- `/projects/<slug>` uses the same page parts as the skills pages: breadcrumb, title with the status tag beside it, the summary as the subtitle, a meta row (start month, then links with GitHub, npm, or globe icons picked from the URL), an ABOUT section with the write-up, a PARTS section (one hairline row per part: name and status tag, its link on the right, the summary, and its stack in mono joined by `·`), and a STACK section of tags when the project has a top-level stack.
- Every inner page (Projects, Skills, About, and their detail pages) wraps its sections in [PageLayout](apps/web/src/components/layout/page-layout.tsx): the `<main>` in the 640px column, optional breadcrumbs, the Geist Pixel title with an optional badge, a required subtitle (the `lead` prop: 18px `mutedForeground`, at most 52ch, one short sentence), and the meta row. The skills index, a skill, a project, and About each set one; a skill uses the first sentence of its description. The parts it uses live in [page.tsx](apps/web/src/components/page.tsx), and the markdown renderer in [markdown.tsx](apps/web/src/components/markdown.tsx).

## About page

`/about` ([about-page.tsx](apps/web/src/components/about/about-page.tsx)). Timeline chapters, organizations, and tools live in [about.ts](apps/web/src/lib/about/about.ts). Identity and intro copy live in [profile.ts](apps/web/src/lib/about/profile.ts) so the pages, the MCP server, and `/llms.txt` share one source; the intro markup stays in the page so logos can sit inline. Role, employer, and headline come from the newest chapter. It should read like a story, not a résumé: no job-board fields. The intro may name the current organization and El Salvador next to their logos.

- **Title**: "About me" in the shared `PageHeader`, Geist Pixel like every other page title, with a one-line subtitle.
- **Intro**: plain body text. My avatar sits inline before my name in the first sentence: round, 1.25em (a little larger than the 1em logo tiles so the face reads), with the same 1px `border` ring as the header avatar. The first paragraph in `foreground`, the rest in `mutedForeground`: what I work on, how I approach problems, and what I'm learning, with no job history (that's the timeline's job).
- **Inline logos** ([inline-logo.tsx](apps/web/src/components/about/inline-logo.tsx)): rounded tiles sized 1em with a 0.26em radius, centered on the text, so they scale with any font size. Countries show their flag emoji (El Salvador is 🇸🇻) at the text's size, with no tile fill or border. Organizations with a logo show it as an inline SVG component ([logos.tsx](apps/web/src/components/about/logos.tsx)) filling the tile, with no background or border: Denzo Studios in its brand blue, and Caban as a blue C with a green dot, the C turning white in dark mode. Fiverr is its white "fi" on its green, like its app icon, since the full wordmark is unreadable at 1em. UCA's crest is a black-on-white PNG ([uca.png](apps/web/src/assets/logos/uca.png), 160px tall) centered on a white tile (`ucaTile`) in both themes, with the tile's rounded corners. Brand colors are tokens in `colors` (`denzo`, `caban`, `cabanDot`, `fiverr`, `fiverrForeground`, `ucaTile`), like `linkedin`. The `logo` field in [about.ts](apps/web/src/lib/about/about.ts) is a key (`denzo`, `caban`, `fiverr`, `uca`); [inline-logo.tsx](apps/web/src/components/about/inline-logo.tsx) maps that key to the component, so the content module does not import UI. Until an organization has a `logo`, the tile is a placeholder: `muted` fill, 1px `border`, and mono initials in `mutedForeground`. Tiles are `aria-hidden`, since the name is always written next to them.
- **My experience** ([timeline.tsx](apps/web/src/components/about/timeline.tsx)): chapters newest first. On desktop the years sit in a 112px mono column, then a 1px `border` rail with a 9px dot (filled `foreground` while the chapter is still going, hollow with a `ring` edge otherwise), then the story. On mobile the years move above the story. Each chapter is a sentence ("Role at [logo] Organization", with "at" in `mutedForeground`) and a short `mutedForeground` story. Education is a chapter too.
- **Tools** ([tool-list.tsx](apps/web/src/components/about/tool-list.tsx)): three groups, My current stack, Infrastructure, and AI and tools, split by 1px `border` hairlines. On desktop the group name sits in a 145px `mutedForeground` 14px column so the pills start where the timeline's stories do; on mobile it moves above them. Each tool is a flat pill: 32px tall, 1px `border` edge, radius `full`, a 16px brand mark and a 14px medium label in `foreground`, 8px apart. Pills are static, so they get no elevation or hover. Marks ([tool-icon.tsx](apps/web/src/components/about/tool-icon.tsx), from Simple Icons, Lobe Icons, and the StyleX and Depot sites) fill with `currentColor`, so they stay black and white with the theme, like the GitHub and X marks. The `icon` field in [about.ts](apps/web/src/lib/about/about.ts) is a key into that file.

## States

- **Hover**: raised buttons drop to 0.9 opacity. Ghost buttons get a `muted` background. No movement on hover.
- **Focus**: buttons show `outline: 2px solid ring` with a 3px offset. Switches and checkboxes use a 6px offset to clear their bezel. Fields darken their edge and bezel instead.
- **Active**: buttons scale to `0.97` and checkboxes to `0.94`.
- **Disabled**: `opacity: 0.5`, `cursor: not-allowed`, no hover or press change.
- **Loading**: the button keeps its width, hides the label, and shows a centered `Spinner` with `aria-busy`.
- **Empty**: one line of `mutedForeground` text that says what will appear, for example "No posts yet."
- **Error**: a `danger` edge on the field plus `danger` text with an icon and a plain sentence on how to fix it (`Field` `error`).
- **Success**: `success` text with a check icon.
- **404**: the same layout, a short sentence, and a link home.

## Motion

Motion is rare, fast, and informative, following Emil Kowalski's principles. Use the `motion` tokens.

- **Easing**: `easeOut` (`cubic-bezier(0.23, 1, 0.32, 1)`) for enter, exit, and feedback. `easeInOut` (`cubic-bezier(0.77, 0, 0.175, 1)`) for things that move on screen, like the switch thumb. Never use `ease-in` for UI.
- **Duration**: `fast` (150ms) for hover, press, and focus. `base` (200ms) for the switch, popovers, and menus. Never more than `slow` (300ms), except the pixel reveal (~1.1s).
- **Properties**: only animate `transform`, `opacity`, `box-shadow`, and `background-color`. Prefer CSS transitions, which can be interrupted, over keyframes.
- **Enter animations**: start from `scale(0.95)` or above, never `scale(0)`. Popovers scale from their trigger with `transform-origin`.
- **Page load**: at most one subtle fade-and-rise of the main column (opacity 0 to 1, `translateY(8px)` to 0, 300ms). No stagger on every element.
- **Pixel reveal**: the hero name and every page title build themselves out of their own pixels once on load ([pixel-reveal.ts](apps/web/src/lib/pixel-reveal.ts)), through the `PixelReveal` component. Each glyph is sampled on Geist Pixel's grid (0.038em squares) and drawn on a canvas over the text. Pixels pop in solid, left to right with jitter, but the canvas only redraws every 80ms, so they land in visible batches with a pause between each. Then the real text replaces the canvas. It takes about 1.1s, an exception to the 300ms limit. Use it only on the hero name and page titles. Under reduced motion the text just appears.
- **Page transitions**: links prefetch on hover, and a cross-document view transition ([global.css](apps/web/src/styles/global.css)) keeps the old page up until the new one is ready, so a click never shows a blank page or the browser's loading flash. The old page fades out in `fast` (150ms), then the new one fades in and rises 8px in `slow` (300ms) after a 120ms delay, both `easeOut`. This is the page-load fade-and-rise. The site header (`site-header`) and the page header with the title, subtitle, and meta row (`page-header`) have their own `view-transition-name`, so they stay still and only the content below fades. The page header swaps instantly: the new title builds out of its pixels and the subtitle fades in on their own. Under reduced motion the page swaps with no fade.
- **Subtitle**: the page subtitle fades in and rises 4px in `slow` (300ms), 300ms after load, while the title builds out of its pixels, so the header doesn't sit empty during the reveal. Under reduced motion it just appears.
- Don't animate actions done with the keyboard or things seen many times a day, like nav or theme switching.
- **Reduced motion**: under `prefers-reduced-motion: reduce`, remove movement (the switch thumb jumps and the spinner stops).

## Accessibility

- Text meets WCAG AA contrast in both themes. Don't use `mutedForeground` for essential content.
- Use semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, and a "Skip to content" link.
- Every icon-only button has an `aria-label`. Decorative SVGs have `aria-hidden="true"`.
- Touch targets are at least 40px, counting the bezel, except compact `Button` sizes (`sm` 28px, `md` and `icon` 32px, `lg` 36px), which follow the shadcn-style control heights. Icon-only social links stay at 40px.
- Respect `prefers-color-scheme` and `prefers-reduced-motion`.

## Open questions

- Should the primary color stay black and white, or take a hue like the purple reference? It changes only `primary*` tokens.
- Will the site have images (project screenshots, photo)? Card styling depends on it.
- Is there an icon set preference? Lucide matches the current stroke icons.
