# girls-in-tech-brazil Development Guidelines

Auto-generated from feature plans. Last updated: 2026-03-09

## Quick Context

- Stack: TypeScript 5.x, Node.js >= 22.x, Next.js 15.x App Router, React 19.x
- Styling: Tailwind CSS 4.x
- Data layer: Zod schema + JSON files in `src/data/creators/`
- Validation flow: `npm run validate`, `npm run lint`, `npm run type-check`, `npm run build`
- Current focus: E2 delivered the creator data layer, contribution workflow, CI validation, and minimal data consumption in app routes

## Active Technologies

- TypeScript 5.x, Node.js >= 22.x
- Next.js 15.x (App Router), React 19.x
- Tailwind CSS 4.x
- ESLint 9.x, Prettier 3.x
- Zod 4.x for data contracts
- TSX for TypeScript script execution

## Progressive Disclosure

Use this section as the default reading order for future work:

1. Read this file for the current shape of the repo.
2. If the task touches creator data, inspect:
   - `src/schemas/creator.schema.ts`
   - `src/lib/creators.ts`
   - `src/data/creators/`
   - `scripts/validate-data.ts`
3. If the task touches contribution flow or governance, inspect:
   - `CONTRIBUTING.md`
   - `.github/PULL_REQUEST_TEMPLATE.md`
   - `.github/workflows/ci.yml`
4. If the task touches feature planning, inspect the active spec under `specs/`.
5. Only read deeper files when the task actually needs them.

## Project Structure

```text
.github/
  workflows/
docs-spec/
public/
  images/
    creators/
scripts/
specs/
src/
  app/
  components/
  data/
    creators/
  lib/
  schemas/
  styles/
```

## Commands

- `npm run dev`: start local development
- `npm run validate`: validate creator dataset locally
- `npm run validate:ci`: validate dataset in CI mode
- `npm run lint`: run lint
- `npm run type-check`: run TypeScript checks
- `npm run build`: verify production build/export

## Data Layer Notes

- Source of truth for creators is `src/data/creators/*.json`
- Files starting with `_` are non-public and ignored by dataset loading
- `contentTypes` is derived from `links`, not manually authored in JSON
- Dataset access is centralized in `src/lib/creators.ts`
- Validation rules are centralized in `src/schemas/creator.schema.ts`

## Contribution Flow Notes

- New creator contributions should follow `CONTRIBUTING.md`
- PRs should use `.github/PULL_REQUEST_TEMPLATE.md`
- PR validation runs through `.github/workflows/ci.yml`
- Branch protection expectations are documented, but configured in GitHub settings rather than in-repo

## Recent Changes

- `001-creator-data-contrib`: added typed creator schema, JSON dataset, validation script, contribution guide, PR template, CI validation workflow, and creator route data consumption
- `001-epic-e1-spec`: established Next.js app foundation, App Router, Tailwind, ESLint, and Prettier

## Manual Additions

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
