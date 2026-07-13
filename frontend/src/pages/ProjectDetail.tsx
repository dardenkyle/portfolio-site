import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
import { Link } from "react-router";
import { apiGet } from "@/api/client";
import Button from "@/ui/Button";
import type { ApiProject } from "@/api/types";
import { toProject } from "@/api/mappers";
import { PROJECTS_WITH_CASE_STUDIES } from "@/config/caseStudies";
import { useRandomGlow } from "@/hooks/useRandomGlow";
import { trackContentView } from "@/utils/analytics";
import { pageMeta } from "@/utils/meta";
import type { Route } from "./+types/ProjectDetail";

export function meta({ data }: Route.MetaArgs) {
  // data is undefined when the loader threw (ErrorBoundary render)
  if (!data) {
    return pageMeta("Project Not Found — Kyle Darden", "This project doesn't exist.");
  }
  return pageMeta(
    `${data.title} — Kyle Darden`,
    data.summary || `${data.title} — project details.`
  );
}

// Runs at build time (prerender); the result ships as static data.
export async function loader({ params }: Route.LoaderArgs) {
  const list = await apiGet<ApiProject[]>("projects");
  const project = list
    .map(toProject)
    .find((p) => p.slug.toLowerCase() === params.slug.toLowerCase());
  if (!project) {
    throw new Response("Project not found.", { status: 404 });
  }
  return project;
}

export function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl font-bold text-white">Project Not Found</h1>
      <p className="text-slate-400">This project doesn't exist.</p>
      <Button to="/projects" variant="primary">
        Back to Projects
      </Button>
    </div>
  );
}

export default function ProjectDetail({
  loaderData: project,
}: Route.ComponentProps) {
  const { handleMouseEnter, handleMouseLeave, getGlowClass } = useRandomGlow();

  // Track project view
  useEffect(() => {
    trackContentView("project", project.title, project.slug);
  }, [project.title, project.slug]);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.slug]);

  // Already sorted in the mapper; just provide safe fallbacks.
  const tech = project.techStack ?? [];
  const challenges = project.challenges ?? [];

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <Button
          to="/projects"
          size="sm"
          variant="link"
          useGlow
          glowKey="projects-back"
        >
          ← Back to Projects
        </Button>
        {PROJECTS_WITH_CASE_STUDIES.includes(project.slug) && (
          <Button
            to={`/projects/${project.slug}/case-study`}
            size="sm"
            variant="link"
            useGlow
            glowKey="case-study"
          >
            Case Study →
          </Button>
        )}
      </nav>

      <header className="space-y-2">
        <div>
          <h1 className="text-3xl font-semibold">{project.title}</h1>
        </div>
        {project.summary && (
          <p className="text-lg opacity-80">{project.summary}</p>
        )}
        {project.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full px-3 py-1 text-sm border border-white/15"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      {/* Overview */}
      {project.overview && (
        <section className="space-y-4">
          <h2 className="text-xl font-medium">Overview</h2>
          <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-6 shadow-lg">
            <div className="prose prose-invert">
              <ReactMarkdown>{project.overview}</ReactMarkdown>
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {!!tech.length && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">Tech Stack</h2>
            <Button
              to="/skills"
              size="sm"
              variant="link"
              useGlow
              glowKey="view-more-skills"
            >
              View more →
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tech.map((t) => {
              // Create a slug from the tech name for linking to skills
              const techSlug = t.name
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");

              return (
                <Link
                  key={t.id}
                  to={`/skills/${techSlug}`}
                  className={`block rounded-2xl border border-white/15 p-4 text-center space-y-2 transition-all duration-300 hover:border-white/25 ${getGlowClass(
                    techSlug
                  )}`}
                  onMouseEnter={() => handleMouseEnter(techSlug)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="font-semibold">{t.name}</div>
                  <div className="opacity-60 text-xs">
                    {t.category || "Technology"}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Challenges & Solutions */}
      {!!challenges.length && (
        <section className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-medium mb-6">
            Challenges &amp; Solutions
          </h2>
          <div className="space-y-6">
            {challenges.map((c) => (
              <div
                key={c.id}
                id={c.id}
                className="border-b border-neutral-700/50 last:border-b-0 pb-6 last:pb-0"
              >
                <h3 className="text-lg font-semibold mb-3">{c.title}</h3>
                {c.context && (
                  <p className="text-sm opacity-80 mb-3 leading-relaxed">
                    {c.context}
                  </p>
                )}
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold">Solution:</span>{" "}
                    {c.solution}
                  </p>
                  {c.impact && (
                    <p className="text-sm leading-relaxed">
                      <span className="font-semibold">Impact:</span> {c.impact}
                    </p>
                  )}
                </div>
                {c.links?.length ? (
                  <div className="mt-4">
                    <ul className="text-sm space-y-1">
                      {c.links.map((l) => (
                        <li key={l.url}>
                          <a
                            href={l.url}
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:no-underline"
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {c.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-full border border-white/20 bg-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Links */}
      {(project.liveUrl ||
        project.repoUrl ||
        PROJECTS_WITH_CASE_STUDIES.includes(project.slug)) && (
        <section className="space-y-3">
          <h2 className="text-xl font-medium">Links</h2>
          <div className="flex gap-4">
            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                size="sm"
                variant="link"
                useGlow
                glowKey="demo-live"
              >
                Live Demo
              </Button>
            )}
            {project.repoUrl && (
              <Button
                href={project.repoUrl}
                size="sm"
                variant="link"
                useGlow
                glowKey="github-repo"
              >
                GitHub
              </Button>
            )}
            {PROJECTS_WITH_CASE_STUDIES.includes(project.slug) && (
              <Button
                to={`/projects/${project.slug}/case-study`}
                size="sm"
                variant="link"
                useGlow
                glowKey="case-study-link"
              >
                Case Study
              </Button>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
