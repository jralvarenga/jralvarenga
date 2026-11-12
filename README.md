<div align="center">

<img src="apps/web/src/assets/avatar.jpg" width="96" height="96" alt="Rigo Alvarenga">

<h1>Rigo Alvarenga</h1>

Tech Lead on the development team at Denzo Studios, in El Salvador.<br />
I also build my own projects on the side.

<sub>
  <a href="https://jralvarenga.com">jralvarenga.com</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/jralvarenga">GitHub</a>
  &nbsp;·&nbsp;
  <a href="https://www.linkedin.com/in/jorge-alvarenga-26126b148">LinkedIn</a>
  &nbsp;·&nbsp;
  <a href="https://x.com/rigo_alvarenga1">X</a>
</sub>

</div>

<br>

## Projects

|                                                   |                                                                       |
| ------------------------------------------------- | --------------------------------------------------------------------- |
| [luvid](https://luvid-design.vercel.app)          | Money tracking you can share, in spaces you invite people into.       |
| [exchange](https://exchange-sigma-ten.vercel.app) | A trading dashboard on Alpaca, with your own keys, encrypted at rest. |
| [better-translate](https://better-translate.com)  | Type-safe i18n for TypeScript, one config across frameworks.          |
| [skills](https://github.com/jralvarenga/skills)   | The rules I give coding agents, packaged as Agent Skills.             |

## This site

A single narrow column, plain black and white, set in Geist. Built with Astro, React, StyleX, and Base UI, in a Bun and Turborepo monorepo.

```sh
nvm use          # Node 26
bun install
bun run dev      # http://localhost:4321
bun run build    # static output in apps/web/dist
```

The build fetches skills from GitHub, so it needs network access. See [AGENTS.md](AGENTS.md) for the architecture and [DESIGN.md](DESIGN.md) for the design system.
