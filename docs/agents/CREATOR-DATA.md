# Creator Data Guide

## Source of truth

- Creator profiles live in `src/data/creators/*.json`
- Files prefixed with `_` are non-public and ignored by dataset loading
- Access to dataset is centralized in `src/lib/creators.ts`
- Validation contract is centralized in `src/schemas/creator.schema.ts`

## Validation and contribution flow

1. Add or edit creator JSON files
2. Run `npm run validate`
3. Run `npm run lint`
4. Run `npm run type-check`
5. Run `npm run build`

CI re-runs equivalent checks on PRs via `.github/workflows/ci.yml`.

## Data rules and behavior

- `contentTypes` is derived from `links`, not authored directly in JSON
- `featured: true` controls spotlight highlights
- File name should match `slug`
- Keep schema-driven constraints in Zod as the single source for field requirements

## Relevant files

- `src/schemas/creator.schema.ts`
- `src/lib/creators.ts`
- `src/data/creators/`
- `scripts/validate-data.ts`
- `CONTRIBUTING.md`
