# web

## 0.1.0

### Minor Changes

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`b1ab9ef`](https://github.com/jralvarenga/jralvarenga/commit/b1ab9ef89923f376a0046f09cc7a29db7e717ecd) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add the About page: a short intro with inline logos, the story so far as a timeline, tools, and side projects.

- [`2bfcdf2`](https://github.com/jralvarenga/jralvarenga/commit/2bfcdf23dc224d58ffd425357a691c34cef624f5) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add design tokens, Geist fonts, and elevated UI primitives (button, input, textarea, switch, checkbox, field, spinner) with a `/ui` preview page.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`05005cc`](https://github.com/jralvarenga/jralvarenga/commit/05005cc99e094da7ed531bdf9d357bde2093d313) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add a GitHub link to the social links on the home and About pages.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`83a9be9`](https://github.com/jralvarenga/jralvarenga/commit/83a9be95b44afe737512751666bd0175a4c8ed47) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add the site header with nav and a home hero with the name set in Geist Pixel, replacing the Astro starter. The name builds itself out of its own pixels on load.

- [#4](https://github.com/jralvarenga/jralvarenga/pull/4) [`050ece1`](https://github.com/jralvarenga/jralvarenga/commit/050ece19381de6bffbfab189ef953a9c7bad7cac) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add a public read-only MCP server at `/mcp` and `/llms.txt` so assistants can fetch profile, experience, projects, skills, stack, and contact data from the same sources as the pages.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`b1ab9ef`](https://github.com/jralvarenga/jralvarenga/commit/b1ab9ef89923f376a0046f09cc7a29db7e717ecd) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Set every page title in Geist Pixel through a shared page layout, and add a short About section with a link to `/about` on the home page.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`cfb09d3`](https://github.com/jralvarenga/jralvarenga/commit/cfb09d3d897d89c4f346f3442225fa10522465ce) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add projects: a Projects section on the home page, a `/projects` page, and a page for each project (luvid, treid, better-translate, skills), plus a `Tag` primitive. Projects can list their parts, like luvid's web app, iOS app, and design system.

- [#7](https://github.com/jralvarenga/jralvarenga/pull/7) [`3087854`](https://github.com/jralvarenga/jralvarenga/commit/30878548db06535190709da5a3750d708d8782cd) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add SEO across the site: per-page descriptions, canonical URLs, Open Graph and X cards with a generated image for every indexable page, JSON-LD (person, website, breadcrumbs, projects, and skills), a sitemap, robots.txt, a web manifest with app icons, a 404 page, and Google Search Console and Bing verification through environment variables.

- [#9](https://github.com/jralvarenga/jralvarenga/pull/9) [`05d4078`](https://github.com/jralvarenga/jralvarenga/commit/05d4078f8ef6ae0e3f7141d58dec508962976d25) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add a site footer with the copyright and MIT license, a theme toggle that cycles system, light, and dark with a morphing icon, and a language menu that lists Spanish as coming soon. A soft scroll edge now fades content along the bottom of the screen, like the header's. The site is now open source under the MIT license.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`3ed9372`](https://github.com/jralvarenga/jralvarenga/commit/3ed9372e54a5ef831b83d146435c9ef0ac13ddbd) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add a Skills link to the header and `/skills` pages that list my agent skills from GitHub, with install commands and each SKILL.md rendered.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`b1ab9ef`](https://github.com/jralvarenga/jralvarenga/commit/b1ab9ef89923f376a0046f09cc7a29db7e717ecd) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add LinkedIn, X, and Instagram icon links under the home intro and on the About page. The X and Instagram icons follow the light or dark theme.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`018d2f8`](https://github.com/jralvarenga/jralvarenga/commit/018d2f8fe48d098d41173e4581bd2060b97a1ff4) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Make the header sticky with a soft, fading blur backdrop over the content that scrolls under it.

- [#12](https://github.com/jralvarenga/jralvarenga/pull/12) [`f0e08c5`](https://github.com/jralvarenga/jralvarenga/commit/f0e08c5294b00afada3390e33be8d261a4637620) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add Spanish. The footer language menu switches the main site pages between English and Spanish in place, with no `/es` URLs: the choice is stored, and first visits follow the browser's language. Profile, work history, tools, projects, and page interfaces are translated; skills and the `/ui` primitive showcase stay in English.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`018d2f8`](https://github.com/jralvarenga/jralvarenga/commit/018d2f8fe48d098d41173e4581bd2060b97a1ff4) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Press D to switch between light and dark mode. The choice is remembered and applied before the page paints.

### Patch Changes

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`05005cc`](https://github.com/jralvarenga/jralvarenga/commit/05005cc99e094da7ed531bdf9d357bde2093d313) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Show my avatar next to my name in the About page intro.

- [#3](https://github.com/jralvarenga/jralvarenga/pull/3) [`4b7df16`](https://github.com/jralvarenga/jralvarenga/commit/4b7df16ef8c68b9001202c646d07054ad4ac2dfa) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Redesign the About page: tools show as icon pills grouped into my current stack, infrastructure, and AI and tools; the intro describes how I work; Caban's two roles are separate timeline entries; and Instagram is gone from the social links.

- [#7](https://github.com/jralvarenga/jralvarenga/pull/7) [`3087854`](https://github.com/jralvarenga/jralvarenga/commit/30878548db06535190709da5a3750d708d8782cd) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Remove EXIF metadata, including the GPS location, from the avatar photo.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`47a118b`](https://github.com/jralvarenga/jralvarenga/commit/47a118b82a7458e92e272b5e1ac010f50f3716bf) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Make buttons and tags more compact, in the spirit of shadcn: buttons are 28, 32, and 36px tall with 14px labels, and tags are 20px with 12px text.

- [#17](https://github.com/jralvarenga/jralvarenga/pull/17) [`22be7ce`](https://github.com/jralvarenga/jralvarenga/commit/22be7cef3203119d38bcba368e2ca1bfd20594bc) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add Devin to the AI tools on the About page.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`05005cc`](https://github.com/jralvarenga/jralvarenga/commit/05005cc99e094da7ed531bdf9d357bde2093d313) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Show my photo as a round avatar in the header instead of my name.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`1dd06d2`](https://github.com/jralvarenga/jralvarenga/commit/1dd06d2359c787bc6c11ca9081e06a9accfed4d9) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Show only the first two projects on the home page, with the rest on /projects.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`05005cc`](https://github.com/jralvarenga/jralvarenga/commit/05005cc99e094da7ed531bdf9d357bde2093d313) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Show the Denzo Studios, Caban, Fiverr, and UCA logos on the About page, with Caban's logo following light and dark mode, and show countries as flag emoji.

- [#6](https://github.com/jralvarenga/jralvarenga/pull/6) [`a446a0e`](https://github.com/jralvarenga/jralvarenga/commit/a446a0e6cad57cd94675f478ec6ac99a57ac8b76) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Use a new "JR" favicon, with a multi-size .ico fallback for browsers without SVG favicon support.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`05005cc`](https://github.com/jralvarenga/jralvarenga/commit/05005cc99e094da7ed531bdf9d357bde2093d313) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Fade the old page out before the new one fades in, keep the header, page title, and subtitle still between pages, and give every inner page a subtitle that fades in while its title builds.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`05005cc`](https://github.com/jralvarenga/jralvarenga/commit/05005cc99e094da7ed531bdf9d357bde2093d313) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Build every page title out of its pixels on load, like the home page name.

- [#9](https://github.com/jralvarenga/jralvarenga/pull/9) [`c3ae580`](https://github.com/jralvarenga/jralvarenga/commit/c3ae580fd4e7a0dcf7a4796b55cfe051d756968c) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Preserve the footer theme icon morph, respect reduced motion in the language menu, and remove the theme button’s duplicate description.

- [#1](https://github.com/jralvarenga/jralvarenga/pull/1) [`3ed9372`](https://github.com/jralvarenga/jralvarenga/commit/3ed9372e54a5ef831b83d146435c9ef0ac13ddbd) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Remove the D key hint from the header. Pressing D still switches the theme.

- [#12](https://github.com/jralvarenga/jralvarenga/pull/12) [`84ec2da`](https://github.com/jralvarenga/jralvarenga/commit/84ec2da3a6b6156b8417727e715b60596e367c8f) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Rename the exchange project to treid, point it at treid.app, and rewrite its description to match the product.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`357afcc`](https://github.com/jralvarenga/jralvarenga/commit/357afccf8067e27aba59ce2e8c24c26490f13c7b) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Keep the site header from crossfading during navigation, turn the page fade off for reduced motion, and use the first sentence of a skill description as its subtitle.

- [#13](https://github.com/jralvarenga/jralvarenga/pull/13) [`a315443`](https://github.com/jralvarenga/jralvarenga/commit/a315443eab9ebbad76db4c2d653edd49b6e5d2b8) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Show "Software Engineer" instead of the current employer in the tab title, search snippets, social cards, Open Graph images, and structured data, and write the page descriptions in first person.

- [#10](https://github.com/jralvarenga/jralvarenga/pull/10) [`fe1bd66`](https://github.com/jralvarenga/jralvarenga/commit/fe1bd665ad4863a1dd7af892c3b31451539e1c0f) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add `lastmod` to project pages in the sitemap, from a new optional `updated` date on each project.

- [#2](https://github.com/jralvarenga/jralvarenga/pull/2) [`05005cc`](https://github.com/jralvarenga/jralvarenga/commit/05005cc99e094da7ed531bdf9d357bde2093d313) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Prefetch pages on link hover and crossfade between pages with a view transition, so navigating no longer flashes a blank loading page.

- [#17](https://github.com/jralvarenga/jralvarenga/pull/17) [`6b7504f`](https://github.com/jralvarenga/jralvarenga/commit/6b7504f42a818d4254ac6fe3060caf2503e03044) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Add Supabase to the infrastructure tools on the About page.

- [#12](https://github.com/jralvarenga/jralvarenga/pull/12) [`d562c85`](https://github.com/jralvarenga/jralvarenga/commit/d562c85459a9795c3c96a5b001e07a39c02c925e) Thanks [@jralvarenga](https://github.com/jralvarenga)! - Cross-fade the page when switching the theme or the language, instead of snapping. Reduced motion keeps the instant switch.
