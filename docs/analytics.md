# Analytics

GA4 event reference and manual verification checklist for the frontend.

The GA4 property is `G-RR5WDS9DYH`, loaded via the gtag snippet in
`frontend/index.html`. Tracking code lives in:

- `frontend/src/utils/analytics.ts` — event helper functions
- `frontend/src/hooks/usePageTracking.tsx` — page view tracking on route
  change, mounted through `frontend/src/components/AppWithTracking.tsx`
- `frontend/src/ui/Button.tsx` — automatic click tracking for all `Button`
  components
- `frontend/src/ui/Nav.tsx` — social link tracking in the navigation bar

Event names and parameters are load-bearing: GA4 reports depend on them. Do
not rename events or parameters without updating dashboards (see the Agent
Change Policy in `CLAUDE.md`).

## Event Reference

### `page_view`

- **Trigger**: every route change (React Router location change).
- **Source**: `usePageTracking`.
- **Parameters**: `page_path` (pathname + query string), `page_title`.

### `cta_click`

- **Trigger**: clicks on `Button` components with a `to` prop (fired
  alongside `page_navigation`) or with neither `href` nor `to` (plain
  action buttons).
- **Source**: `trackCTAClick`, called from `Button.tsx`.
- **Parameters**: `event_category: "engagement"`, `event_label` (button
  text), `page_location` (current path), `custom_parameters.button_text`,
  `custom_parameters.page_section`. Internal-navigation clicks add
  `destination`; plain buttons add `category` (the button's
  `trackingCategory` prop, defaulting to `button_action`).

### `file_download`

- **Trigger**: clicks on `Button` components whose `href` contains `.pdf`,
  `/download`, or `resume` (e.g., the resume download in the footer).
- **Source**: `trackDownload`, called from `Button.tsx`.
- **Parameters**: `event_category: "downloads"`, `event_label` (file name),
  `custom_parameters.file_name`, `custom_parameters.file_type` (uppercased
  extension), `custom_parameters.download_source` (current path).

### `click` (external links)

- **Trigger**: clicks on `Button` components with a non-download `href`,
  and on the GitHub/LinkedIn icons in the navigation bar.
- **Source**: `trackExternalLink`, called from `Button.tsx` and `Nav.tsx`.
- **Parameters**: `event_category: "external_links"`, `event_label` (link
  text), `custom_parameters.link_url`, `custom_parameters.link_text`,
  `custom_parameters.link_type` (`social` for GitHub/LinkedIn, `project`
  for other http(s) URLs, `reference`, or `other`),
  `custom_parameters.outbound: true`.

### `page_navigation`

- **Trigger**: clicks on `Button` components with a `to` prop (fired
  alongside `cta_click`).
- **Source**: `trackInternalNavigation`, called from `Button.tsx`.
- **Parameters**: `event_category: "navigation"`, `event_label`
  (`from → to`), `custom_parameters.from_page`,
  `custom_parameters.to_page`,
  `custom_parameters.navigation_trigger` (`button_click`).

### `content_view`

- **Trigger**: viewing a project detail page, skill detail page, or case
  study.
- **Source**: `trackContentView`, called from `ProjectDetail.tsx`,
  `SkillDetail.tsx`, and `CaseStudy.tsx`.
- **Parameters**: `event_category: "content"`, `event_label` (content
  name), `custom_parameters.content_type` (`project`, `skill`, or
  `case_study`), `custom_parameters.content_name`,
  `custom_parameters.content_id` (slug; falls back to the name).

### `form_interaction` (defined, not currently used)

- **Trigger**: none — `trackFormInteraction` exists in `analytics.ts` but
  has no call sites.
- **Parameters** (when wired up): `event_category: "forms"`,
  `event_label` (`<formName>_<action>` where action is `start`, `submit`,
  or `error`), `custom_parameters.form_name`,
  `custom_parameters.form_action`.

### Notes

- All helpers no-op safely when `window.gtag` is unavailable (e.g., GA4
  blocked by the browser).
- On `localhost`, `trackCTAClick` and `trackDownload` also log their
  payload to the browser console. The other events do not log; verify them
  via GA4 Realtime or the Network tab (requests to
  `google-analytics.com/g/collect`).

## Manual Verification Checklist

Run the frontend locally (`npm run dev` in `frontend/`, site at
http://localhost:5173/) with DevTools open. Use the Console tab for
`cta_click` / `file_download` and the Network tab (filter `collect`) or
GA4 Realtime for everything else.

- [ ] **Page views** — navigate Home → Projects → Skills → About →
      Contact; each route change sends a `page_view`.
- [ ] **CTA clicks** — click "View My Projects" on Home and "Get In Touch"
      in the footer; each sends `cta_click` (and `page_navigation` for
      internal destinations).
- [ ] **Resume download** — click "Download Resume" in the footer; sends
      `file_download` with the file name and type.
- [ ] **External links** — click the GitHub and LinkedIn icons in the
      navigation; each sends `click` with `link_type: "social"`.
- [ ] **Content views** — open a project detail page, a skill detail page,
      and a case study; each sends `content_view` with the matching
      `content_type`.
- [ ] **No console errors** — no JavaScript errors while exercising the
      above.
- [ ] **GA4 Realtime** — in the GA4 property (`G-RR5WDS9DYH`), Reports →
      Realtime shows the events within ~30 seconds.
- [ ] **Production build** — `npm run build && npm run preview` and spot-
      check that events still fire.

If events are missing: confirm the gtag script loaded (Network tab), the
tracking ID matches `G-RR5WDS9DYH`, and there are no console errors
swallowing the click handlers.
