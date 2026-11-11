# Design

Styling is StyleX on React components, with Base UI for interactive primitives. The tokens and the base primitives are built. Pages still use the Astro starter. Preview every primitive in both themes at `/ui` ([primitives.tsx](apps/web/src/components/showcase/primitives.tsx)).

## Direction

- A personal website, for recruiters, peers, and collaborators who want to see who Jorge is, what he builds, and what he writes.
- The feeling is quiet, precise, and confident. It should read like a well-set page, not a product landing page.
- Inspirations:
  - [vercel.com/font](https://vercel.com/font) for Geist and its restrained, Swiss-inspired typography.
  - [emilkowal.ski](https://emilkowal.ski) for the single narrow column, content first, and small purposeful motion.
  - [shadcn](https://ui.shadcn.com) for the neutral token system and simple component variants.
- Plain black and white with light and dark mode. Grays carry hierarchy. Color is never decoration.
- Pages stay flat: no glows, blurred blobs, glassmorphism, or decorative gradients. Depth belongs only to controls (see Signature).

## Signature

**Elevated controls.** Every interactive control looks physical, like a key set into a bezel, while the page around it stays flat. All of them share one elevation ([elevation.ts](apps/web/src/styles/elevation.ts)), built from four box-shadow layers:

1. An inset 1px highlight on top for the lit edge.
2. A 1px edge that defines the shape (`edge`, `primaryEdge`, or `dangerEdge`).
3. A 4px translucent bezel ring around the control (`bezel`).
4. A soft drop shadow under the bezel (`drop`).

There are two elevation styles:

- **Raised** (`raisedPrimary`, `raisedSurface`, `raisedDanger`): buttons, checkboxes, and the switch thumb. A subtle top-to-bottom gradient sits on the fill. This is the only place gradients are allowed. Buttons drop the 4px bezel ring (layer 3) and keep the highlight, the 1px edge, and a tighter `0 1px 3px` drop shadow. Checkboxes, the switch, and fields keep the full bezel.
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

- `warning` and the `danger*` tokens are the only hues. They appear only in states, never in decoration.
- Status never relies on color alone. Pair it with an icon, a label, or `aria-invalid`.

## Typography

Geist Sans and Geist Mono load through the Astro Fonts API from [src/assets/fonts](apps/web/src/assets/fonts), as `--font-geist-sans` and `--font-geist-mono`. The `font` tokens wrap them with fallbacks. Do not use Google Fonts.

| Role    | Font       | Use                                        |
| ------- | ---------- | ------------------------------------------ |
| Display | Geist Sans | Page titles and section headings           |
| Body    | Geist Sans | All text by default                        |
| Utility | Geist Mono | Code, dates, small metadata, keyboard keys |

| Style   | Size / line height                           | Weight | Tracking                          |
| ------- | -------------------------------------------- | ------ | --------------------------------- |
| Display | 40px / 1.1 on desktop, 32px / 1.15 on mobile | 500    | -0.03em                           |
| H2      | 24px / 1.3                                   | 500    | -0.02em                           |
| H3      | 18px / 1.4                                   | 500    | -0.01em                           |
| Body    | 16px / 1.6                                   | 400    | 0                                 |
| Small   | 14px / 1.5                                   | 400    | 0, for labels, captions, metadata |
| Mono    | 14px / 1.5                                   | 400    | 0                                 |

- The base size is 16px. Don't go below 14px.
- Use only the `weight` tokens: 400, 500, and 700. Never 600 or 900.
- Never use all caps with wide tracking.
- Set `font-variant-numeric: tabular-nums` on dates and numbers in lists.
- Use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs.

## Spacing and layout

- Spacing uses the `space` tokens on a 4px scale: `x1` (4px) through `x24` (96px).
- Use one master layout: a single centered column with `max-width: 640px`, a 16px side gutter on mobile, and 24px from 640px up. Pages that need it, like a project gallery, can widen to 960px.
- Header: the name on the left, nav links and the theme toggle on the right. The header is not sticky and has no background fill.
- Space sections 64px apart on mobile and 96px apart on desktop. Inside a section, space items 16 to 24px apart.
- Lists for writing and projects are full-width rows with the title left and the date or meta right, in `mutedForeground` mono. Don't use card grids for lists.
- Use hairline `border` dividers only where they separate information. Don't use boxes around everything.
- Design mobile first. There is no horizontal scroll. Nav wraps or collapses instead of scrolling.
- Leave at least 8px between neighbouring controls.

## Components

Primitives live in [components/ui](apps/web/src/components/ui). Reuse them before creating new ones. Each accepts an `xstyle` prop for StyleX overrides.

| Component  | Built on                | Variants and props                                                                                                                |
| ---------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `Button`   | Base UI `Button`        | `variant`: `primary`, `secondary`, `ghost`, `danger`. `size`: `sm` 32px, `md` 36px, `lg` 44px, `icon` 36px. `loading`, `disabled` |
| `Input`    | Base UI `Input`         | 36px tall, recessed. `invalid` for use outside a `Field`                                                                          |
| `Textarea` | Base UI `Field.Control` | Recessed, 96px minimum, vertical resize. `invalid`                                                                                |
| `Switch`   | Base UI `Switch`        | Recessed 40×24 track, raised 18px thumb. Checked track uses `primary`                                                             |
| `Checkbox` | Base UI `Checkbox`      | Raised 20px box, primary when checked. `indeterminate`                                                                            |
| `Field`    | Base UI `Field`         | `label`, `description`, `error`, `disabled`. `layout`: `stacked` (fields) or `inline` (checkbox, switch)                          |
| `Spinner`  | SVG                     | Inherits `currentColor`. `label`, `size`                                                                                          |

Always wrap form controls in `Field` so the label, description, and error are linked. Still to build: Link, ThemeToggle (it sets `data-theme` on `<html>`, stores the choice in `localStorage`, and applies it before paint with an inline script), ListItem, Card (flat, 1px `border`, radius 12px), and Tag.

Radius scale (`radius` tokens): `sm` 6px for checkboxes and tags, `md` 8px for buttons and fields, `lg` 12px for cards, `full` for the switch.

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
- **Duration**: `fast` (150ms) for hover, press, and focus. `base` (200ms) for the switch, popovers, and menus. Never more than `slow` (300ms).
- **Properties**: only animate `transform`, `opacity`, `box-shadow`, and `background-color`. Prefer CSS transitions, which can be interrupted, over keyframes.
- **Enter animations**: start from `scale(0.95)` or above, never `scale(0)`. Popovers scale from their trigger with `transform-origin`.
- **Page load**: at most one subtle fade-and-rise of the main column (opacity 0 to 1, `translateY(8px)` to 0, 300ms). No stagger on every element.
- Don't animate actions done with the keyboard or things seen many times a day, like nav or theme switching.
- **Reduced motion**: under `prefers-reduced-motion: reduce`, remove movement (the switch thumb jumps and the spinner stops).

## Accessibility

- Text meets WCAG AA contrast in both themes. Don't use `mutedForeground` for essential content.
- Use semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, and a "Skip to content" link.
- Every icon-only button has an `aria-label`. Decorative SVGs have `aria-hidden="true"`.
- Touch targets are at least 40px, counting the bezel.
- Respect `prefers-color-scheme` and `prefers-reduced-motion`.

## Open questions

- Should the primary color stay black and white, or take a hue like the purple reference? It changes only `primary*` tokens.
- Should the name in the header be set in Geist Pixel as a second accent, or stay in Geist Sans?
- Will the site have images (project screenshots, photo)? Card styling depends on it.
- Is there an icon set preference? Lucide matches the current stroke icons.
