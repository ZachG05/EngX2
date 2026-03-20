# EngX v2 — Engineering Problem Solver

A modern, guided engineering problem-solving platform for students. Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Supabase, and Drizzle ORM.

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org) | App Router, SSR, Server Components |
| [TypeScript](https://typescriptlang.org) | Type safety (strict mode) |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com) | Accessible UI components |
| [Supabase](https://supabase.com) | Auth + PostgreSQL database |
| [Drizzle ORM](https://orm.drizzle.team) | Type-safe database queries |
| [Zod](https://zod.dev) | Schema validation |

## Getting Started

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd EngX2
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon public key |
| `DATABASE_URL` | Supabase → Settings → Database → Connection string (URI, port 5432) |

### 3. Run database migrations

```bash
npm run db:generate   # generate SQL from schema changes
npm run db:migrate    # apply pending migrations to Supabase
```

### 4. Seed the database with starter data

```bash
npm run db:seed
```

This populates the database with realistic starter topics, problems, and problem steps
(see [`scripts/seed.ts`](scripts/seed.ts) for the full data set). The script is
idempotent — re-running it will not create duplicates.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                         # Next.js App Router pages
│   ├── page.tsx                 # Landing page (/)
│   ├── login/page.tsx           # Login (/login)
│   ├── dashboard/page.tsx       # Dashboard (/dashboard)
│   ├── problems/page.tsx        # Problem list (/problems)
│   ├── problems/[slug]/page.tsx # Problem solver (/problems/:slug)
│   └── admin/page.tsx           # Admin panel (/admin)
├── components/
│   ├── ui/                      # shadcn/ui primitives — never edit
│   ├── layout/                  # Navbar, DashboardSidebar, PageContainer
│   ├── problems/                # ProblemCard
│   ├── dashboard/               # StatCard
│   └── marketing/               # HeroSection
├── lib/
│   ├── auth/supabase.ts         # Supabase browser client
│   ├── env.ts                   # Centralised env variable validation
│   ├── db/                      # Drizzle schema + client
│   │   ├── index.ts             # Drizzle db instance + barrel re-export
│   │   ├── schema.ts            # Backwards-compat re-export (→ schema/)
│   │   └── schema/              # Modular schema definitions
│   │       ├── profiles.ts
│   │       ├── topics.ts
│   │       ├── problems.ts
│   │       ├── problem-steps.ts
│   │       ├── attempts.ts
│   │       ├── step-attempts.ts
│   │       └── index.ts         # Barrel export
│   ├── problems/mock-problems.ts# Mock data (dev-only)
│   ├── validation/schemas.ts    # Zod schemas
│   └── utils.ts                 # cn() helper
└── types/index.ts               # Shared TypeScript types
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Drizzle migrations
npm run db:migrate   # Run pending migrations
npm run db:seed      # Seed starter topics, problems, and steps
npm run db:studio    # Open Drizzle Studio (DB GUI)
```

## Project Conventions Summary

- **Server Components by default** — add `"use client"` only when state/effects are needed.
- **No DB queries in components** — fetch in Server Components or Server Actions; pass as props.
- **Zod for all validation** — schemas in `src/lib/validation/schemas.ts`; re-validate at the server boundary.
- **Tailwind + `cn()` only** — no inline styles, no CSS modules.
- **shadcn/ui primitives** — never modify files in `src/components/ui/`.
- **Strict TypeScript** — no `any`; use `z.infer<>` to derive types from Zod schemas.
- **Drizzle for all DB access** — run `npm run db:generate` after every schema change.
- **Commit format**: `type: description` (`feat`, `fix`, `chore`, `docs`, `refactor`, `test`).

## For AI Agents

Start with these docs in this order:
1. [`docs/architecture.md`](docs/architecture.md) — directory layout, route map, where things live
2. [`docs/current-priority.md`](docs/current-priority.md) — what to build next (active focus areas)
3. [`docs/agent-workflow.md`](docs/agent-workflow.md) — step-by-step workflow rules
4. [`docs/development-rules.md`](docs/development-rules.md) — coding standards
5. [`docs/database-schema.md`](docs/database-schema.md) — DB table reference

Always run `npm run build` before and after your changes. Fix all TypeScript errors before declaring a task complete.

## Documentation

- [`docs/architecture.md`](docs/architecture.md) — App structure, route map, and principles
- [`docs/current-priority.md`](docs/current-priority.md) — Active product focus and next steps
- [`docs/development-rules.md`](docs/development-rules.md) — Coding standards
- [`docs/agent-workflow.md`](docs/agent-workflow.md) — Guide for AI agents
- [`docs/feature-template.md`](docs/feature-template.md) — How to add new features
- [`docs/product-scope.md`](docs/product-scope.md) — Full product roadmap
- [`docs/database-schema.md`](docs/database-schema.md) — Database table reference

## Current Status

This is **v0** — a fully scaffolded UI foundation with mock data. Auth, database connectivity, and interactive submission logic are coming in v1.

See `docs/current-priority.md` for the active build plan.

## License

MIT
