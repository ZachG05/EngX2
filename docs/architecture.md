# EngX v2 — Architecture Overview

## Directory Structure

```
src/
├── app/                         # Next.js App Router pages & API routes
│   ├── layout.tsx               # Root layout (Navbar, fonts, dark mode)
│   ├── page.tsx                 # Landing page (/)
│   ├── login/page.tsx           # Login page (/login)
│   ├── dashboard/page.tsx       # User dashboard (/dashboard)
│   ├── problems/
│   │   ├── page.tsx             # Problem browser (/problems)
│   │   └── [slug]/page.tsx      # Individual problem solver (/problems/:slug)
│   └── admin/page.tsx           # Admin panel (/admin)
├── components/
│   ├── ui/                      # shadcn/ui primitives — DO NOT edit manually
│   ├── layout/                  # Navbar, DashboardSidebar, PageContainer
│   ├── problems/                # ProblemCard (used in browse + admin)
│   ├── dashboard/               # StatCard (used on /dashboard)
│   └── marketing/               # HeroSection (used on landing page)
├── lib/
│   ├── auth/supabase.ts         # Supabase browser client
│   ├── db/
│   │   ├── index.ts             # Drizzle db client instance
│   │   └── schema.ts            # All table definitions (profiles, problems, etc.)
│   ├── problems/
│   │   └── mock-problems.ts     # Mock Problem[] and Topic[] arrays (dev-only)
│   ├── validation/
│   │   └── schemas.ts           # Zod schemas for Problem, ProblemStep, StepAnswer
│   └── utils.ts                 # cn() utility for Tailwind class merging
└── types/
    └── index.ts                 # Shared TypeScript interfaces (Problem, ProblemStep, etc.)
```

## App Routes

| Route | File | Status | Notes |
|---|---|---|---|
| `/` | `app/page.tsx` | ✅ Live | Landing page with HeroSection |
| `/login` | `app/login/page.tsx` | 🔲 UI only | Auth not wired yet |
| `/dashboard` | `app/dashboard/page.tsx` | 🔲 Mock data | Shows mock stats |
| `/problems` | `app/problems/page.tsx` | 🔲 Mock data | Browse + topic filter (UI only) |
| `/problems/[slug]` | `app/problems/[slug]/page.tsx` | 🔲 Mock data | Step UI, no submission |
| `/admin` | `app/admin/page.tsx` | 🔲 Mock data | Problem list for admins |

## Component Organization

| Directory | Purpose | Key Files |
|---|---|---|
| `components/ui/` | shadcn/ui primitives — never modify | `button`, `card`, `badge`, `input`, `label`, `separator` |
| `components/layout/` | Shared chrome (all pages) | `Navbar.tsx`, `DashboardSidebar.tsx`, `PageContainer.tsx` |
| `components/problems/` | Problem-related UI | `ProblemCard.tsx` |
| `components/dashboard/` | Dashboard widgets | `StatCard.tsx` |
| `components/marketing/` | Landing-page sections | `HeroSection.tsx` |

Each feature directory exports from an `index.ts` barrel. Import as:
```ts
import { ProblemCard } from "@/components/problems";
```

## Domain Logic Placement

All business logic lives in `src/lib/{feature}/` — never inside page or component files.

| Concern | Location | Example |
|---|---|---|
| Problem data (mock) | `src/lib/problems/mock-problems.ts` | `mockProblems`, `mockTopics` arrays |
| Problem data (real) | `src/lib/problems/` (add new files here) | `getProblems()`, `getProblemBySlug()` |
| Auth helpers | `src/lib/auth/supabase.ts` | `createBrowserClient()` |

## DB Utilities Placement

- Schema lives in `src/lib/db/schema.ts` — all Drizzle table definitions.
- The db client is in `src/lib/db/index.ts` — import as `import { db } from "@/lib/db"`.
- Run `npm run db:generate` after any schema change; never alter the DB directly.
- See `docs/database-schema.md` for the full table reference.

## Validation Placement

- All Zod schemas live in `src/lib/validation/schemas.ts`.
- Current schemas: `problemSchema`, `problemStepSchema`, `stepAnswerSchema`, `difficultySchema`, `stepTypeSchema`.
- Inferred types (e.g. `ProblemInput`) are exported from the same file.
- Server Actions and API routes **must** re-validate at the server boundary using these schemas.

## Architecture Principles

### 1. App Router Convention
- Every `page.tsx` is a **Server Component** by default.
- Add `"use client"` only when state, effects, or browser APIs are needed.
- Co-locate `loading.tsx` and `error.tsx` within route segments when needed.

### 2. Component Layers
| Layer | Location | Rules |
|---|---|---|
| UI Primitives | `components/ui/` | shadcn only — never edit |
| Feature Components | `components/{feature}/` | Composable, typed props |
| Page Components | `app/**/page.tsx` | No business logic, just layout + data fetching |

### 3. Data Flow
- Server components fetch data directly (Drizzle queries or Supabase).
- Client components receive data via props or use SWR/React Query.
- **Never put DB queries inside client components.**

### 4. Validation
- All form inputs are validated with Zod schemas in `src/lib/validation/`.
- Server Actions or API routes must re-validate at the server boundary.

### 5. Styling
- Tailwind CSS utility classes only. No inline styles.
- Use `cn()` from `@/lib/utils` for conditional class merging.
- Stick to the design token system (CSS variables defined in `globals.css`).
