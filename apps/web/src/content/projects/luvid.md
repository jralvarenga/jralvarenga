---

name: luvid
summary: Money tracking you can share. Income and expenses live in spaces you invite people into, each with its own currency.
started: 2026-06
status: building
order: 1
parts:

- name: Web app
  summary: The Luvid app for the browser. Sign-in and the Convex backend are wired, and the product screens are next.
  status: building
  stack: [Next.js, Convex, Better Auth, Tailwind CSS]
- name: iOS app
  summary: A native app with spaces, accounts, transactions, categories, recurring transactions, and budgets, stored on the device and signed in through the shared backend.
  status: building
  stack: [SwiftUI, GRDB, SQLite, Convex, Better Auth]
- name: Design system
  summary: Tokens, typography, color, and components for the Luvid interface, shared by the web and iOS apps.
  status: live
  stack: [TanStack Start, Tailwind CSS, Vercel]
  site: { label: Website, href: https://luvid-design.vercel.app }

---

Luvid keeps track of where money goes, alone or with the people you share it with. Everything lives in **spaces**: a space has a name, a color, an emoji, and a default currency, and you can invite others into it. Each transaction is income or an expense inside a space.

Currency follows the person. Your default currency comes from your country unless you pick one yourself, and once you do, changing countries never overwrites it.

The interface is warm and quiet, with green as the only loud color. The web and iOS apps share one design system, so both feel like the same product.
