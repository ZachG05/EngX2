# EngX v2 — Current Priority

This document defines the active product focus for the next development milestone (the v1 phase of EngX v2). Work on items in this order. Do not skip to later phases before earlier phases are stable.

## Active Focus Areas (in priority order)

### 1. Problem Browsing
**Goal:** Replace mock data with real database-backed problem lists and topic filtering.

- Wire `/problems` page to fetch from Drizzle (`db.select().from(problems)`)
- Implement topic filter as a proper server-side query parameter (`?topic=mechanics`)
- Add `published = true` filter so only published problems appear to students
- Relevant files: `src/app/problems/page.tsx`, `src/lib/problems/`, `src/lib/db/schema.ts`

### 2. Multi-Step Solving
**Goal:** Make the problem solver interactive — accept answers, validate them, and advance step by step.

- Add a Client Component (`StepForm`) that manages per-step submission state
- On submit, call a Server Action that validates the answer (numeric tolerance or exact match)
- Show "correct/incorrect" feedback per step; lock a step once answered correctly
- Relevant files: `src/app/problems/[slug]/page.tsx`, `src/lib/validation/schemas.ts`

### 3. Hints and Explanations
**Goal:** Allow students to reveal hints and see explanations after answering.

- `hint` and `explanation` fields already exist on `ProblemStep` (both in the type and mock data)
- Build a toggle component: "Show Hint" reveals `step.hint`; explanation shown after correct answer
- Track `hints_used` count per step in `step_attempts` (see `docs/database-schema.md`)
- Relevant files: `src/types/index.ts`, `src/lib/db/schema.ts`, step UI in `[slug]/page.tsx`

### 4. Progress Tracking
**Goal:** Record and display a user's attempt history and scores.

- Create `attempts` and `step_attempts` rows in the database when a user starts/submits
- Dashboard (`/dashboard`) should pull real attempt data instead of mock stats
- Show completion percentage and score per problem
- Relevant files: `src/app/dashboard/page.tsx`, `src/components/dashboard/StatCard.tsx`, `src/lib/db/schema.ts`

### 5. Admin Content Tools
**Goal:** Allow admins to create, edit, and publish problems without touching the database directly.

- Build CRUD forms in `/admin` for `problems` and `problem_steps`
- Gate the admin route — only users with an admin role can access it
- Use Zod schemas from `src/lib/validation/schemas.ts` for form validation
- Relevant files: `src/app/admin/page.tsx`, `src/lib/validation/schemas.ts`

## What Is Not in Scope Yet

- Supabase Auth (OAuth with Google/GitHub) — required before progress tracking can land
- Social features, leaderboards, video explanations
- Mobile app or PWA

See `docs/product-scope.md` for the full vision and long-term roadmap.
