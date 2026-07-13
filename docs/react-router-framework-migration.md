# React Router Framework-Mode Migration

Migrate the frontend from React Router in library mode (SPA with the
GitHub Pages 404.html fallback hack) to React Router 7 framework mode
with build-time prerendering.

## Problem

GitHub Pages has no rewrite support. The current deploy copies
`index.html` to `404.html`, so every client-side route (`/projects`,
`/about`, `/projects/freightfolio`, ...) renders fine in a browser but
is served with **HTTP 404**. Consequences:

- Search engines will not index the routes (404 = "page does not exist").
- Link previews and unfurlers can refuse to render them.
- HTTP-level monitoring (including the site-sentry QA suite, see
  dardenkyle/site-sentry#27) correctly reports the pages as broken.
- Every page ships as an empty app shell; content only appears after
  the JS bundle loads and the API responds.

Discovered by site-sentry's rewritten link-validation test, which found
8 internal links returning 404 on the live site.

## Approach

React Router 7 framework mode with `ssr: false` and build-time
`prerender`. The build emits a real HTML file per route with actual
page content baked in. GitHub Pages serves real files with 200. The
`404.html` mechanism remains, but serves a prerendered NotFound page
with an honest 404 status for genuinely unknown paths.

Rejected alternatives:

- **Post-build copy script** (copy `index.html` per route): fixes only
  the status codes, keeps empty shells and generic meta tags, and
  introduces a manual route list that will drift.
- **Host migration** (Cloudflare Pages / Netlify rewrites): fixes only
  the status codes, adds a hosting move, still no per-route content.
- **Hash routing**: ugly URLs, no SEO benefit.

## Phases

Each phase ends in a working, buildable state and is committed
separately on the `react-router-framework-migration` branch. Nothing
deploys until the final squash merge to `main` (deploys trigger on
push to `main` only).

### Phase 1 - Framework mode with identical behavior

Swap the toolchain; change zero behavior. Anything that looks
different afterwards is a bug.

- Add `@react-router/dev`; imports move from `react-router-dom` to
  `react-router`.
- `vite.config.ts`: replace `@vitejs/plugin-react` with the
  `reactRouter()` plugin (keep the `@` alias).
- `react-router.config.ts` with `ssr: false`, `appDirectory: "src"`.
- New `src/root.tsx` absorbing `index.html` (favicons, manifest, GA
  script, meta via `<Meta/>`/`<Links/>`/`<Scripts/>`), the Starfield
  stack from `App.tsx`, and `AppWithTracking`.
- Convert `src/routes.tsx` (`createBrowserRouter`) to the framework
  route config (`index()`, `route()`, `layout()`), keeping the `*`
  catch-all -> NotFound.
- Delete `src/main.tsx`, `src/App.tsx`, `index.html`.
- Verify: dev server and production build render identically to the
  pre-migration baseline; pages still fetch client-side.

### Phase 2 - Loaders, prerender, per-route meta

- Move each page's `useEffect` fetch into a route `loader`; components
  consume `useLoaderData`. Unknown slugs throw a 404 response that the
  NotFound boundary renders.
- `prerender()` in `react-router.config.ts` enumerates routes at build
  time: static routes, project/skill slugs fetched from the API, and
  case-study routes from `config/caseStudies.ts`. No manual route list
  anywhere.
- Add `meta` exports per route: real per-page title/description/OG tags.
- Effect: prerendered data ships as static `.data` files; the deployed
  site no longer needs the API at runtime for content. Content updates
  require a rebuild (acceptable for a portfolio; the deploy workflow
  keeps `workflow_dispatch` for manual rebuilds).
- Verify: serve `build/client` statically; every route returns real
  HTML content before any JS executes.

### Phase 3 - Honest 404

- Add a dedicated path (e.g. `/404`) to the prerender list; the
  catch-all renders NotFound for it.
- Deploy workflow copies `build/client/404/index.html` to
  `build/client/404.html`.
- Result: known routes are real files served with 200; unknown paths
  get the styled NotFound page with a true 404 status.

### Phase 4 - CI/deploy and live verification

- `deploy-frontend.yml`: artifact path becomes `frontend/build/client`;
  `VITE_API_URL` is now required at build time for prerendering (it
  already is for the bundle); replace the old SPA-fallback copy step
  with the Phase 3 copy.
- Move `robots.txt` from the repo root into `frontend/public/` so it
  actually deploys (drive-by fix; it is currently absent from the
  built output).
- After merge: verify live with `curl -I` per route (expect 200, real
  content) and an unknown path (expect 404), then run the site-sentry
  suite and land dardenkyle/site-sentry#27 without an xfail.

## Acceptance criteria

- [ ] Every internal route returns HTTP 200 from the live site with
      page content present in the initial HTML.
- [ ] Unknown paths return HTTP 404 rendering the styled NotFound page.
- [ ] Each route has its own title/description meta tags.
- [ ] No manual route list: new projects/skills appear in the prerender
      set automatically on rebuild.
- [ ] site-sentry `test_navigation_links_valid` passes against the
      live site.

## Risks

- **Build-time rendering of canvas/analytics components** (Starfield,
  GA hooks): effects do not run during prerender, so these should be
  inert at build time; Phase 1 proves it before prerendering is in play.
- **API availability during CI builds**: prerendering calls the API at
  build time. The build already hard-fails without `VITE_API_URL`
  (`src/config.ts` throws), so this is not a new class of failure, but
  an API outage now blocks deploys.
- **Pages CDN/redirect behavior** (trailing slashes, cache): only
  verifiable after the merge deploys; rollback is a revert of the
  squash commit.
