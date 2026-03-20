# EngX v2 — Database Schema

Tables are defined in `src/lib/db/schema/` using Drizzle ORM with PostgreSQL (Supabase).
Each domain has its own module; `src/lib/db/schema/index.ts` re-exports everything.
`src/lib/db/schema.ts` is a thin backward-compatibility re-export — prefer importing from `@/lib/db`.

## Tables

### `profiles`
Stores user profile data. Created when a user signs up via Supabase Auth.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | text | References Supabase Auth user ID (unique) |
| display_name | text | Public display name |
| email | text | User email (unique) |
| created_at | timestamp | Auto-set on insert |
| updated_at | timestamp | Auto-set on insert, must be updated manually |

---

### `topics`
Engineering topic categories (Mechanics, Circuits, etc.).

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| name | text | Display name |
| slug | text | URL-safe identifier (unique) |
| description | text | Optional |
| created_at | timestamp | Auto-set |

---

### `problems`
Individual engineering problems.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| slug | text | URL-safe identifier (unique) |
| title | text | Problem title |
| description | text | Full problem description |
| difficulty | text | `easy`, `medium`, or `hard` |
| topic_id | uuid | FK → topics.id |
| estimated_time | integer | Minutes |
| published | boolean | Only published problems show to students |
| created_at | timestamp | Auto-set |
| updated_at | timestamp | Auto-set |

---

### `problem_steps`
Individual steps within a problem.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| problem_id | uuid | FK → problems.id (cascade delete) |
| step_order | integer | Order within the problem |
| prompt | text | The question/instruction |
| type | text | `numeric`, `multiple_choice`, or `text` |
| correct_answer | text | The correct answer (stored as text) |
| tolerance | real | For numeric: acceptable margin of error |
| unit | text | Optional unit label (e.g., "m/s") |
| hint | text | Optional hint text |
| explanation | text | Shown after answering |
| options | json | For multiple_choice: array of option strings |
| created_at | timestamp | Auto-set |

---

### `attempts`
Tracks a user's attempt at a problem.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| user_id | text | Supabase Auth user ID |
| problem_id | uuid | FK → problems.id |
| completed | boolean | True when all steps answered |
| score | integer | Number of correct steps |
| started_at | timestamp | Auto-set |
| completed_at | timestamp | Set when completed |

---

### `step_attempts`
Individual step answers within an attempt.

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| attempt_id | uuid | FK → attempts.id (cascade delete) |
| step_id | uuid | FK → problem_steps.id |
| answer | text | The submitted answer |
| correct | boolean | Whether the answer was correct |
| hints_used | integer | How many times hint was revealed |
| submitted_at | timestamp | Auto-set |

---

## Seed Data

Starter data is available in two forms:

- **`scripts/seed.ts`** — TypeScript seed script, run via `npm run db:seed` (requires `DATABASE_URL`).
- **`supabase/seed.sql`** — Plain SQL file you can paste directly into the **Supabase SQL Editor** and run without any local tooling.

### Seeded topics

| slug | name |
|---|---|
| `statics` | Statics |
| `dynamics` | Dynamics |
| `circuits` | Circuits |

### Seeded problems

| slug | topic | difficulty | steps |
|---|---|---|---|
| `concurrent-forces-equilibrium` | Statics | easy | 4 |
| `simply-supported-beam-udl` | Statics | medium | 8 |
| `truss-method-of-joints` | Statics | hard | 6 |
| `projectile-cliff-launch` | Dynamics | easy | 4 |
| `newtons-second-law-incline` | Dynamics | easy | 3 |
| `ohms-law-series-circuit` | Circuits | easy | 4 |
| `rc-circuit-charging` | Circuits | medium | 4 |

All seeded problems are published (`published = true`) and ready for browsing.

The seed script is **idempotent** — it uses `ON CONFLICT DO NOTHING` so re-running
it never creates duplicate rows.
