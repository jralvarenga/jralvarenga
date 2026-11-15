---

name: treid
summary: A quiet trading desk for Alpaca accounts. Trade on your own, or share a workspace with your team and decide what each person can do.
started: 2026-08
updated: 2026-11-14
status: live
order: 2
stack: [Next.js, Better Auth, Drizzle, Postgres, TanStack Query, Alpaca]
links:

- label: Website
  href: https://www.treid.app
- label: GitHub
  href: https://github.com/jralvarenga/treid

---

Treid is an independent trading app for Alpaca accounts. Alpaca holds the money and fills the orders, and Treid is where you trade from. It shows your balance, buying power, cash, positions, and recent orders, and live prices flash as they change. On a phone, a tab bar keeps your positions a tap away, and the desktop has full trading.

Every account starts with a personal workspace. A shared workspace lets you trade with a partner, a club, or a small fund. You invite people, give each one a role (owner, admin, paper member, or viewer), and an activity feed records what each person did.

You bring your own Alpaca keys and can add as many named connections as you need, so paper and live accounts sit side by side on the same screen. Live orders always ask before they go out. Keys are encrypted with AES-256-GCM when saved, only the server uses them to talk to Alpaca, and they are never sent to the browser.

Treid is open source, so every line that touches keys and orders is public, and you can self-host it on your own Postgres. Sign-in is built on Better Auth.
