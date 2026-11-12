# web

## 0.1.0

### Minor Changes

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`b1ab9ef`](https://github.com/jralvarenga/jralvarenga/commit/b1ab9ef89923f376a0046f09cc7a29db7e717ecd) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add the About page: a short intro with inline logos, the story so far as a timeline, tools, and side projects.

- [`2bfcdf2`](https://github.com/jralvarenga/jralvarenga/commit/2bfcdf23dc224d58ffd425357a691c34cef624f5) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add design tokens, Geist fonts, and elevated UI primitives (button, input, textarea, switch, checkbox, field, spinner) with a `/ui` preview page.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`05005cc`](https://github.com/jralvarenga/jralvarenga/commit/05005cc99e094da7ed531bdf9d357bde2093d313) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add a GitHub link to the social links on the home and About pages.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`83a9be9`](https://github.com/jralvarenga/jralvarenga/commit/83a9be95b44afe737512751666bd0175a4c8ed47) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add the site header with nav and a home hero with the name set in Geist Pixel, replacing the Astro starter. The name builds itself out of its own pixels on load.

- [#4](https://github.com/jralvarenga/jralvarenga/pull/4) [`050ece1`](https://github.com/jralvarenga/jralvarenga/commit/050ece19381de6bffbfab189ef953a9c7bad7cac) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add a public read-only MCP server at `/mcp` and `/llms.txt` so assistants can fetch profile, experience, projects, skills, stack, and contact data from the same sources as the pages.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`b1ab9ef`](https://github.com/jralvarenga/jralvarenga/commit/b1ab9ef89923f376a0046f09cc7a29db7e717ecd) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Set every page title in Geist Pixel through a shared page layout, and add a short About section with a link to `/about` on the home page.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`cfb09d3`](https://github.com/jralvarenga/jralvarenga/commit/cfb09d3d897d89c4f346f3442225fa10522465ce) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add projects: a Projects section on the home page, a `/projects` page, and a page for each project (luvid, exchange, better-translate, skills), plus a `Tag` primitive. Projects can list their parts, like luvid's web app, iOS app, and design system.

- [#7](https://github.com/jralvarenga/jralvarenga/pull/7) [`3087854`](https://github.com/jralvarenga/jralvarenga/commit/30878548db06535190709da5a3750d708d8782cd) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add SEO across the site: per-page descriptions, canonical URLs, Open Graph and X cards with a generated image for every indexable page, JSON-LD (person, website, breadcrumbs, projects, and skills), a sitemap, robots.txt, a web manifest with app icons, a 404 page, and Google Search Console and Bing verification through environment variables.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`3ed9372`](https://github.com/jralvarenga/jralvarenga/commit/3ed9372e54a5ef831b83d146435c9ef0ac13ddbd) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add a Skills link to the header and `/skills` pages that list my agent skills from GitHub, with install commands and each SKILL.md rendered.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`b1ab9ef`](https://github.com/jralvarenga/jralvarenga/commit/b1ab9ef89923f376a0046f09cc7a29db7e717ecd) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add LinkedIn, X, and Instagram icon links under the home intro and on the About page. The X and Instagram icons follow the light or dark theme.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`018d2f8`](https://github.com/jralvarenga/jralvarenga/commit/018d2f8fe48d098d41173e4581bd2060b97a1ff4) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Make the header sticky with a soft, fading blur backdrop over the content that scrolls under it.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`018d2f8`](https://github.com/jralvarenga/jralvarenga/commit/018d2f8fe48d098d41173e4581bd2060b97a1ff4) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Press D to switch between light and dark mode. The choice is remembered and applied before the page paints.

### Patch Changes

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`05005cc`](https://github.com/jralvarenga/jralvarenga/commit/05005cc99e094da7ed531bdf9d357bde2093d313) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Show my avatar next to my name in the About page intro.

- [#3](https://github.com/jralvarenga/jralvarenga/pull/3) [`4b7df16`](https://github.com/jralvarenga/jralvarenga/commit/4b7df16ef8c68b9001202c646d07054ad4ac2dfa) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Redesign the About page: tools show as icon pills grouped into my current stack, infrastructure, and AI and tools; the intro describes how I work; Caban's two roles are separate timeline entries; and Instagram is gone from the social links.

- [#7](https://github.com/jralvarenga/jralvarenga/pull/7) [`3087854`](https://github.com/jralvarenga/jralvarenga/commit/30878548db06535190709da5a3750d708d8782cd) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Remove EXIF metadata, including the GPS location, from the avatar photo.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`47a118b`](https://github.com/jralvarenga/jralvarenga/commit/47a118b82a7458e92e272b5e1ac010f50f3716bf) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Make buttons and tags more compact, in the spirit of shadcn: buttons are 28, 32, and 36px tall with 14px labels, and tags are 20px with 12px text.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`05005cc`](https://github.com/jralvarenga/jralvarenga/commit/05005cc99e094da7ed531bdf9d357bde2093d313) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Show my photo as a round avatar in the header instead of my name.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`1dd06d2`](https://github.com/jralvarenga/jralvarenga/commit/1dd06d2359c787bc6c11ca9081e06a9accfed4d9) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Show only the first two projects on the home page, with the rest on /projects.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`05005cc`](https://github.com/jralvarenga/jralvarenga/commit/05005cc99e094da7ed531bdf9d357bde2093d313) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Show the Denzo Studios, Caban, Fiverr, and UCA logos on the About page, with Caban's logo following light and dark mode, and show countries as flag emoji.

- [#6](https://github.com/jralvarenga/jralvarenga/pull/6) [`a446a0e`](https://github.com/jralvarenga/jralvarenga/commit/a446a0e6cad57cd94675f478ec6ac99a57ac8b76) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Use a new "JR" favicon, with a multi-size .ico fallback for browsers without SVG favicon support.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`05005cc`](https://github.com/jralvarenga/jralvarenga/commit/05005cc99e094da7ed531bdf9d357bde2093d313) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Fade the old page out before the new one fades in, keep the header, page title, and subtitle still between pages, and give every inner page a subtitle that fades in while its title builds.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`05005cc`](https://github.com/jralvarenga/jralvarenga/commit/05005cc99e094da7ed531bdf9d357bde2093d313) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Build every page title out of its pixels on load, like the home page name.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`3ed9372`](https://github.com/jralvarenga/jralvarenga/commit/3ed9372e54a5ef831b83d146435c9ef0ac13ddbd) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Remove the D key hint from the header. Pressing D still switches the theme.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`357afcc`](https://github.com/jralvarenga/jralvarenga/commit/357afccf8067e27aba59ce2e8c24c26490f13c7b) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Keep the site header from crossfading during navigation, turn the page fade off for reduced motion, and use the first sentence of a skill description as its subtitle.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`05005cc`](https://github.com/jralvarenga/jralvarenga/commit/05005cc99e094da7ed531bdf9d357bde2093d313) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Prefetch pages on link hover and crossfade between pages with a view transition, so navigating no longer flashes a blank loading page.
