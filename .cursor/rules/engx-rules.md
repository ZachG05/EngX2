# EngX Repository AI Development Rules

These rules MUST be followed by any AI agent or developer modifying this repository.

## General Philosophy

EngX is a clean, scalable SaaS platform focused on engineering problem solving.

The architecture must remain:
- simple
- predictable
- strongly typed
- domain-driven
- optimized for iterative AI-assisted development

Avoid overengineering at all stages.

---

## Mandatory Pre-Edit Workflow

Before making changes:

1. Read:
   - README.md
   - docs/architecture.md
   - docs/development-rules.md
   - docs/product-scope.md
   - docs/current-priority.md

2. Inspect existing patterns in:
   - src/lib
   - src/components
   - src/app

3. Extend existing patterns instead of inventing parallel systems.

---

## Architecture Rules

- Page components must remain thin and compositional.
- Business logic MUST live inside domain modules in `src/lib`.
- Database access must be abstracted through `lib/db` utilities.
- Reusable UI must live inside `src/components`.
- Shared types must live in `src/types`.

Never place:
- database queries
- heavy logic
- validation schemas
directly inside page components.

---

## UI / Component Rules

- Reuse existing UI patterns before creating new ones.
- Maintain consistent spacing, radius, and typography scales.
- Prefer composition over deeply nested component logic.
- Avoid large monolithic components.

---

## Database & Schema Rules

- All schema changes must go through Drizzle schema files.
- Never modify database structure ad-hoc.
- Update `docs/database-schema.md` when schema evolves.

---

## Feature Development Rules

Every new feature should:

- follow existing folder conventions
- introduce the smallest coherent change
- remain aligned with current product scope
- avoid speculative abstractions
- maintain strict TypeScript typing

If architecture patterns change:
→ update documentation in `/docs`.

---

## Product Scope Guardrails

Current priority is:

- engineering problem browsing
- multi-step solving flow
- hints and explanations
- progress tracking
- admin content tools

Avoid introducing:

- billing systems
- AI tutoring engines
- organizations / teams
- real-time collaboration
- mobile app infrastructure

unless explicitly requested.

---

## Code Quality Expectations

- Prefer readability over cleverness.
- Keep files small and focused.
- Use semantic naming.
- Avoid duplicate logic across modules.
- Ensure future AI agents can easily understand intent.

---

## AI Agent Behavior

AI agents must:

- explain structural changes briefly
- respect repository conventions
- avoid introducing new top-level folders
- update documentation when conventions evolve
- prioritize maintainability over speed

This repository is designed for long-term scalable vibecoding.
