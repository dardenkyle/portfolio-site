import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Config } from "@react-router/dev/config";
import { loadEnv } from "vite";
import { PROJECTS_WITH_CASE_STUDIES } from "./src/config/caseStudies";
import { canonicalUrl } from "./src/utils/meta";

// The prerendered output is the source of truth: every route the build
// emitted is a <dir>/index.html under the client directory. (The config
// module is instantiated separately for prerender() and buildEnd(), so
// the route list cannot simply be shared between them.)
async function prerenderedRoutePaths(clientDir: string): Promise<string[]> {
  const entries = await readdir(clientDir, { recursive: true });
  return entries
    .filter((entry) => path.basename(entry) === "index.html")
    .map((entry) => path.dirname(entry))
    .map((dir) => (dir === "." ? "/" : `/${dir.split(path.sep).join("/")}`))
    .sort();
}

// GitHub Pages 301s directory paths without a trailing slash, so the
// sitemap lists the canonical trailing-slash form crawlers get a 200 from;
// canonicalUrl (shared with the per-page tags) produces exactly that form
function sitemapXml(paths: string[]): string {
  const urls = paths
    .map((p) => canonicalUrl(p))
    .map((loc) => `  <url><loc>${loc}</loc></url>`)
    .join("\n");
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

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

const config: Config = {
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

    // Prerender paths must stay slash-less: the prerenderer rejects
    // trailing-slash entries (build fails in writeBundle). Canonical
    // trailing-slash URLs are produced downstream by sitemapXml().
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
  // Emit the sitemap from the routes the build actually prerendered
  async buildEnd({ reactRouterConfig }) {
    const clientDir = path.join(reactRouterConfig.buildDirectory, "client");
    const routePaths = await prerenderedRoutePaths(clientDir);
    if (routePaths.length === 0) {
      throw new Error(`Sitemap: no prerendered routes found in ${clientDir}`);
    }
    // /404 is the error page and must not be indexed. Per-skill pages
    // stay prerendered and reachable from the skills index, but the
    // sitemap advertises only the primary pages.
    const sitemapPaths = routePaths.filter(
      (p) => p !== "/404" && !p.startsWith("/skills/")
    );
    const sitemapPath = path.join(clientDir, "sitemap.xml");
    await writeFile(sitemapPath, sitemapXml(sitemapPaths), "utf-8");
    console.log(`Sitemap: ${sitemapPaths.length} URLs -> ${sitemapPath}`);
  },
};

export default config;
