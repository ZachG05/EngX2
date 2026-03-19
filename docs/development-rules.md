# EngX v2 — Development Rules

These are non-negotiable rules for all contributors and AI agents working on this repo.

## TypeScript

- **Strict mode is ON.** No `any`, no `ts-ignore` without explanation.
- Define types in `src/types/index.ts` or co-locate with the feature if private.
- Prefer `interface` for object shapes, `type` for unions/aliases.

## File & Naming Conventions

- **Components**: PascalCase (`ProblemCard.tsx`)
- **Pages**: `page.tsx` (Next.js convention)
- **Utilities/Helpers**: camelCase (`mockProblems.ts`)
- **Directories**: kebab-case (`mock-problems/`)
- One component per file. No barrel files except `index.ts` in component dirs.

## Components

- Never put database queries, API calls, or business logic in `page.tsx`.
- Server components are default. Add `"use client"` only when necessary.
- All component props must be typed with explicit interfaces.

## Git

- Commit messages: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
- Never commit `.env.local` or any file with real credentials.
- PR titles should be descriptive: `feat: add step submission logic`

## Database

- All schema changes go through Drizzle migrations (`npm run db:generate`).
- Never modify the database directly without a corresponding migration file.
- Use the `profiles` table for user metadata — do not extend Supabase auth tables.

## Testing (future)

- All utility functions in `src/lib/` must have unit tests.
- Component tests use React Testing Library.
- E2E tests use Playwright.

## AI Agent Rules

- See `docs/agent-workflow.md` for AI-specific rules.
- Never delete existing files without explicit instruction.
- Always run `npm run build` before considering a task complete.
