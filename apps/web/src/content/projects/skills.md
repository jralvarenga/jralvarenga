---

name: skills
summary: The rules I give coding agents, from how to write and review code to how to design and ship apps, packaged as Agent Skills.
started: 2026-08
status: live
order: 4
stack: [Agent Skills, Claude Code, Codex, Cursor, Changesets]
links:

- label: Browse skills
  href: /skills
- label: GitHub
  href: https://github.com/jralvarenga/skills

---

Skills are how I teach coding agents to work the way I do. Each one is a `SKILL.md` with rules for one kind of task: writing code, reviewing pull requests, designing the frontend, planning the backend, structuring apps, managing issues, and keeping a project's agent files up to date.

The same files work in Claude Code, Codex, ChatGPT, Cursor, Grok Build, and any agent that supports the Agent Skills format. The repository ships as a plugin for each of them, and through skills.sh for everything else.

Every skill on this site is read straight from the repository when the site is built, so the [skills pages](/skills) always match what the agents use.
