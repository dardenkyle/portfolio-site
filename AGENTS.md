# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Shape

Monorepo for kyledarden.com — a portfolio site with two independent apps:

- `frontend/` — Vite + React 19 + TypeScript + Tailwind, deployed to GitHub Pages
- `backend/` — Spring Boot (Java 21) + Gradle REST API, serves content as JSON

There is no database. **All site content (projects, skills) is hardcoded in
backend service classes** — see "Where Content Lives" below.

## Commands

### Frontend (run from `frontend/`)

- `npm install` — install deps (required after fresh clone)
- `npm run dev` — dev server at http://localhost:5173
- `npm run typecheck` — TypeScript check (`tsc -b`)
- `npm run lint` — ESLint
- `npm run build` — typecheck + production build

The build **throws if `VITE_API_URL` is unset** (`src/config.ts`). For local
dev create `frontend/.env` with:

```
VITE_API_URL=http://localhost:8080/api
```

The URL must include the `/api` suffix. There is no test suite in the
frontend; CI runs lint + typecheck + build.

### Backend (run from `backend/`)

- `./gradlew bootRun` — run API at http://localhost:8080
- `./gradlew test` — run tests
- `./gradlew build` — full build (what CI runs)

## Where Content Lives

Content updates are the most common task in this repo. Locations:

- **Projects** — `backend/src/main/java/com/kyledarden/backend/service/ProjectService.java`
  (project templates with tech references resolved against TechService)
- **Skills/tech items** — `backend/src/main/java/com/kyledarden/backend/service/TechService.java`
  (name, category, slug, description, start date)
- **Case studies** — markdown files in `frontend/public/case-studies/<slug>.md`,
  enabled per-project by adding the slug to
  `frontend/src/config/caseStudies.ts` (`PROJECTS_WITH_CASE_STUDIES`)
- **Page copy** (Home, About, Projects intro, etc.) — directly in
  `frontend/src/pages/*.tsx`
- **Resume PDF and static assets** — `frontend/public/`

Descriptions of external projects must match the actual state of their
repos (`github.com/dardenkyle/<repo>`) and any live URLs — verify hosting,
deploy status, test counts, and tech stacks there before writing claims.

## Architecture

- Frontend data flow: `src/api/types.ts` (API wire types) →
  `src/api/mappers.ts` (mapping + order-sorting) → `src/domain/projects.ts`
  (UI domain model) → pages. Keep the domain model backend-agnostic; add new
  fields in all three layers.
- `@` is a path alias for `frontend/src` (vite.config.ts + tsconfig).
- API endpoints (all under `/api`): `/health`, `/hello`, `/projects`,
  `/skills`, `/skills/{slug}`, `POST /contact`. Controllers are thin;
  services own the data.
- CORS: allowed origins are set in `backend/src/main/resources/application.properties`
  (localhost:5173, kyledarden.com, www.kyledarden.com). `CorsConfig.java`
  allows only GET/OPTIONS — so `POST /api/contact` is blocked cross-origin
  from the browser; keep this in mind when debugging contact-form issues.
- GA4 analytics: `frontend/src/utils/analytics.ts` +
  `frontend/src/hooks/usePageTracking.tsx`, wired through
  `frontend/src/components/AppWithTracking.tsx`. See `docs/analytics.md`
  for the event reference and manual verification checklist.

## Deployment

- Frontend: `.github/workflows/deploy-frontend.yml` deploys to GitHub Pages
  on push to `main`. `VITE_API_URL` comes from a repo secret. `dist/index.html`
  is copied to `404.html` as the SPA routing fallback — React Router depends
  on this.
- Backend is hosted separately (reads `PORT` from the environment); backend
  changes are **not** deployed by this repo's workflows.
- CI (`.github/workflows/ci.yml`) runs on PRs and main: Gradle build +
  frontend lint/typecheck/build.

## Workflow And Conventions

- Branch per feature; squash merge to `main`.
- Conventional commits (e.g., `feat: ...`, `chore: cleanup boilerplate`).
- Content changes usually touch both backend (data) and frontend (display) —
  verify with both apps running locally before pushing, since `main` deploys
  straight to production.

## Documentation Expectations

Update docs in the same branch as the change that affects them:

- `README.md` — when setup/run commands, prerequisites, API endpoints,
  scripts, or the repo structure it describes change. Its "Structure" section
  goes stale easily; fix it when touching listed files. Keep README changes
  user-facing and concise.
- `docs/analytics.md` — when adding, removing, or renaming GA4 events,
  parameters, or tracked interactions, or when analytics changes alter how
  tracking is manually verified.
- `frontend/public/case-studies/<slug>.md` — when a project's scope, tech
  stack, or outcomes change enough that its case study is no longer accurate.
- `docs/adr/` — add an Architecture Decision Record when making a decision
  that future work must respect: new dependencies or frameworks, API shape
  changes, hosting/deployment changes, analytics schema changes, or anything
  from the "must ask before" list below. Number files sequentially
  (`0001-short-title.md`) and follow the template in `docs/adr/0000-template.md`.
- `CLAUDE.md` (this file) — when commands, content locations, architecture
  boundaries, or deployment behavior change.

Purely internal refactors that change no behavior, commands, or public
interfaces need no doc updates.

## Change Discipline

- Prefer small, reviewable diffs.
- Do not reformat, reorder, or rewrite unrelated code to make a small change.
- Do not mix refactors with feature/content work unless explicitly requested.
- Preserve existing structure unless the task explicitly calls for a refactor.
- Do not run auto-formatters across the repo unless the task is formatting.

## Agent Change Policy

Agents may make scoped changes without extra approval when the work matches
an explicit request: content edits in the services/pages listed above, case
study markdown, focused component changes, and docs.

Agents must ask before:

- changing API routes, response shapes, or the frontend domain model
- changing CORS config, deployment workflows, or repo secrets usage
- adding dependencies or changing build tooling
- changing analytics event names/parameters (dashboards depend on them)
- anything destructive or outside the requested scope

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
