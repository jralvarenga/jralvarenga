---

name: exchange
summary: A trading dashboard on Alpaca, where every account brings its own paper and live keys, encrypted at rest.
started: 2026-08
status: live
order: 2
stack: [Next.js, Better Auth, Drizzle, Postgres, TanStack Query, Alpaca]
links:

- label: Website
  href: https://exchange-sigma-ten.vercel.app
- label: GitHub
  href: https://github.com/jralvarenga/exchange

---

Exchange is a dashboard for trading through Alpaca. Each account stores its own Alpaca paper and live keys, encrypted at rest, and every Alpaca call uses the keys of the account that made it.

Sign-in is built on Better Auth. Google comes first, and email and password require a verified address. Google and password sign-ins for the same verified email join one user, and email sign-in is rate limited in Postgres so the limit holds across instances.

Sign-up is closed by default in production. An allowlist of emails can open it to specific people in every environment.
