# Operations, CI, and CD Guide

## Workflow overview

- PR validation workflow: `.github/workflows/ci.yml`
- Pages deploy workflow: `.github/workflows/deploy-pages.yml`
- Ownership rules for critical paths: `.github/CODEOWNERS`

## CI behavior

On `pull_request` to `main`, CI runs:

1. `npm ci`
2. `npm run validate:ci`
3. `npm run lint`
4. `npm run type-check`
5. `npm run build`

The `validate` job is expected to be protected as a required status check.

## Deploy behavior

On `push`/merge to `main`, deploy workflow:

1. Builds static output with production settings
2. Uploads `out/` artifact
3. Deploys to GitHub Pages

Concurrency is configured so only the latest deploy continues.

## Manual maintainer setup (GitHub UI)

- `Settings -> Pages`: Source must be `GitHub Actions`
- `Settings -> Branches -> main`: branch protection with required check `validate`

These steps are required in the official repository and are not fully codified in git.
