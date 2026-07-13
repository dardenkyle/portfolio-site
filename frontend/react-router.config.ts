import type { Config } from "@react-router/dev/config";
import { loadEnv } from "vite";
import { PROJECTS_WITH_CASE_STUDIES } from "./src/config/caseStudies";

// The config runs in Node outside Vite's transform pipeline, so
// import.meta.env is not populated here; resolve VITE_API_URL the same
// way Vite does (.env files, with real environment variables winning).
function resolveApiBase(): string {
  const env = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");
  const base = (env.VITE_API_URL ?? "").replace(/\/+$/, "");
  if (!base) {
    throw new Error("VITE_API_URL is not set. Define it for the build.");
  }
  return base;
}

async function fetchSlugs(url: string): Promise<string[]> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Prerender: GET ${url} -> ${res.status} ${res.statusText}`);
  }
  const items = (await res.json()) as { slug: string }[];
  return items.map((item) => item.slug);
}

export default {
  // Static site: no server runtime, GitHub Pages serves the build output
  ssr: false,
  // Keep the existing src/ layout instead of the default app/ directory
  appDirectory: "src",
  // Enumerate every route at build time so each one ships as a real
  // HTML file (GitHub Pages has no rewrites). Dynamic segments come
  // from the API and the case-study config, never a manual list.
  async prerender() {
    const apiBase = resolveApiBase();
    const [projectSlugs, skillSlugs] = await Promise.all([
      fetchSlugs(`${apiBase}/projects`),
      fetchSlugs(`${apiBase}/skills`),
    ]);

    return [
      "/",
      "/projects",
      "/skills",
      "/about",
      "/contact",
      // Caught by the "*" route, so this prerenders the NotFound page;
      // the deploy workflow copies it to 404.html, which GitHub Pages
      // serves (with a real 404 status) for unknown paths
      "/404",
      ...projectSlugs.map((slug) => `/projects/${slug}`),
      ...PROJECTS_WITH_CASE_STUDIES.map(
        (slug) => `/projects/${slug}/case-study`
      ),
      ...skillSlugs.map((slug) => `/skills/${slug}`),
    ];
  },
} satisfies Config;
