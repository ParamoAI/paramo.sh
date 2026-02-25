# AGENTS.md — Autonomous Development Guidelines

This file governs how AI agents (Frailejón and any future agents) contribute to this repository.

## Rules

1. **Never push directly to `main`.** Always create a feature branch and open a PR.
2. **Never merge your own PR.** Wait for operator approval.
3. **Screenshot required.** Every PR that touches UI must include a screenshot of the rendered result. Attach it to the PR description.
4. **Build and verify locally** before opening a PR:
   ```bash
   make build    # Build the NextJS site
   ```
   **Do NOT run `make deploy`** — that is admin-only.
5. **Keep PRs focused.** One logical change per PR. Don't bundle unrelated work.

## Workflow

```
main ← PR ← feature-branch
```

1. `git checkout -b <descriptive-branch-name>` from `main`
2. Make changes
3. `make build` → verify locally
4. Take a screenshot of the relevant pages
5. Commit, push, open PR with screenshot attached
6. Wait for review and approval
7. Operator merges → admin runs `make deploy` → GitHub Pages deploys from `docs/`

## What Counts as UI Changes

If any of these files are touched, a screenshot is mandatory:
- Any `.tsx`, `.jsx`, `.css`, or `.scss` file
- Layout or component files
- Any page content that renders visually

Config-only or build-script changes don't require screenshots (but they're welcome).
