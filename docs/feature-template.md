# Feature Template

Use this checklist when implementing a new feature for EngX v2.

## Checklist

### 1. Types
- [ ] Add or update types in `src/types/index.ts`

### 2. Validation
- [ ] Create Zod schema in `src/lib/validation/schemas.ts`

### 3. Database (if new data)
- [ ] Add table definition to `src/lib/db/schema.ts`
- [ ] Run `npm run db:generate` to create migration
- [ ] Update `docs/database-schema.md`

### 4. Business Logic
- [ ] Implement helper functions in `src/lib/{feature}/`
- [ ] Keep functions pure and well-typed

### 5. Components
- [ ] Create component(s) in `src/components/{feature}/`
- [ ] Export from `src/components/{feature}/index.ts`

### 6. Pages / Routes
- [ ] Create `page.tsx` in appropriate `src/app/` directory
- [ ] Keep page components thin — delegate to feature components

### 7. API Routes (if needed)
- [ ] Create in `src/app/api/{feature}/route.ts`
- [ ] Validate input with Zod
- [ ] Return typed responses

### 8. Verification
- [ ] `npm run build` passes with no errors
- [ ] Feature works end-to-end in dev (`npm run dev`)
- [ ] No `any` types introduced
