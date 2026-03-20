# EngX v2 — Architecture Overview

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── layout.tsx          # Root layout (Navbar, fonts, dark mode)
│   ├── page.tsx            # Landing page
│   ├── login/              # Auth pages
│   ├── dashboard/          # User dashboard
│   ├── problems/           # Problem browser & solver
│   └── admin/              # Admin panel
├── components/
│   ├── ui/                 # shadcn/ui primitives (DO NOT edit manually)
│   ├── layout/             # Shared layout: Navbar, Sidebar, PageContainer
│   ├── problems/           # Problem-specific UI components
│   ├── dashboard/          # Dashboard widgets
│   └── marketing/          # Landing page sections
├── lib/
│   ├── auth/               # Supabase client and auth helpers
│   ├── db/                 # Drizzle ORM schema and db client
│   ├── problems/           # Problem data helpers and mock data
│   └── validation/         # Zod schemas
└── types/
    └── index.ts            # Shared TypeScript interfaces
```

## Architecture Principles

### 1. App Router Convention
- Every `page.tsx` is a **Server Component** by default.
- Add `"use client"` only when state, effects, or browser APIs are needed.
- Co-locate `loading.tsx` and `error.tsx` within route segments.

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
