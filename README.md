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

Edit `.env.local` and fill in your Supabase project URL, anon key, and database URL.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── login/              # Login page (placeholder)
│   ├── dashboard/          # User dashboard
│   ├── problems/           # Problem list + individual problem
│   └── admin/              # Admin panel
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── layout/             # Navbar, Sidebar, PageContainer
│   ├── problems/           # ProblemCard
│   ├── dashboard/          # StatCard
│   └── marketing/          # HeroSection
├── lib/
│   ├── auth/               # Supabase client
│   ├── db/                 # Drizzle schema + client
│   ├── problems/           # Mock data
│   └── validation/         # Zod schemas
└── types/
    └── index.ts            # Shared types
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Drizzle migrations
npm run db:migrate   # Run pending migrations
npm run db:studio    # Open Drizzle Studio (DB GUI)
```

## Current Status

This is **v0** — a fully scaffolded UI foundation with mock data. Auth, database connectivity, and interactive submission logic are coming in v1.

See `docs/product-scope.md` for the full roadmap.

## Documentation

- [`docs/architecture.md`](docs/architecture.md) — App structure and principles
- [`docs/development-rules.md`](docs/development-rules.md) — Coding standards
- [`docs/feature-template.md`](docs/feature-template.md) — How to add new features
- [`docs/product-scope.md`](docs/product-scope.md) — What's built and what's next
- [`docs/database-schema.md`](docs/database-schema.md) — Database table reference
- [`docs/agent-workflow.md`](docs/agent-workflow.md) — Guide for AI agents

## License

MIT
