# EngX v2 — Product Scope

## Vision

EngX is a guided engineering problem-solving platform for students. Unlike generic quiz apps, EngX breaks problems into structured steps, provides contextual hints, and tracks progress at the step level.

## Target Users

- Undergraduate engineering students (Mech, Civil, Electrical)
- Students preparing for exams (FE Exam, coursework)
- Self-learners revisiting engineering fundamentals

## Current Scope (v0 / Foundation)

This scaffold represents the **v0 foundation** — UI, data models, and infrastructure. The following features are scaffolded but NOT yet interactive:

| Feature | Status |
|---|---|
| Landing page with feature highlights | ✅ Complete |
| Problems list page | ✅ Complete (mock data) |
| Individual problem page with step UI | ✅ Complete (no submission) |
| Dashboard with mock stats | ✅ Complete (mock data) |
| Admin panel with problem list | ✅ Complete (mock data) |
| Login page | ✅ UI only (auth not wired) |
| Drizzle schema | ✅ Defined |
| Supabase client | ✅ Configured |

## Upcoming Features (v1)

- [ ] Supabase Auth (Google + GitHub OAuth)
- [ ] Step submission with answer checking (numeric tolerance + multiple choice)
- [ ] Hint reveal system
- [ ] Attempt tracking (start/complete/score)
- [ ] User profiles
- [ ] Real database-backed problems
- [ ] Topic filtering

## Out of Scope (v2+)

- Social features (leaderboards, sharing)
- Video explanations
- AI-generated hints
- Mobile apps
- Payment / subscriptions
