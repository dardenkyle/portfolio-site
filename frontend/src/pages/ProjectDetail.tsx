import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGet } from "@/api/client";
import type { Project } from "@/domain/projects";
import type { ApiProject } from "@/api/types";
import { toProject } from "@/api/mappers";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("Missing project slug.");
      return;
    }
    let alive = true;

    apiGet<ApiProject[]>("projects")
      .then((list) => {
        if (!alive) return;
        const mapped = list.map(toProject);
        const p = mapped.find(
          (x) => x.slug.toLowerCase() === slug.toLowerCase()
        );
        if (!p) {
          setError("Project not found.");
          return;
        }
        setProject(p);
      })
      .catch((e) => alive && setError(e.message));

    return () => {
      alive = false;
    };
  }, [slug]);

  if (error)
    return <main className="max-w-5xl mx-auto p-6">Error: {error}</main>;
  if (!project) return <main className="max-w-5xl mx-auto p-6">Loading…</main>;

  // Already sorted in the mapper; just provide safe fallbacks.
  const tech = project.techStack ?? [];
  const challenges = project.challenges ?? [];

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      <nav className="text-sm">
        <Link to="/projects" className="opacity-70 hover:opacity-100">
          ← Back to Projects
        </Link>
      </nav>

      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{project.title}</h1>
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
        <section className="space-y-3">
          <h2 className="text-xl font-medium">Overview</h2>
          <div className="prose prose-invert">
            <ReactMarkdown>{project.overview}</ReactMarkdown>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {!!tech.length && (
        <section className="space-y-3">
          <h2 className="text-xl font-medium">Tech Stack</h2>
          <ul className="list-disc pl-6 space-y-1">
            {tech.map((t) => (
              <li key={t.id}>
                {t.url ? (
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {t.name}
                  </a>
                ) : (
                  t.name
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Challenges & Solutions */}
      {!!challenges.length && (
        <section className="space-y-3">
          <h2 className="text-xl font-medium">Challenges &amp; Solutions</h2>
          <ul className="mt-2 space-y-4 list-none pl-0">
            {challenges.map((c) => (
              <li key={c.id} id={c.id} className="bg-white/5 rounded-2xl p-4">
                <h3 className="font-medium">{c.title}</h3>
                {c.context && (
                  <p className="mt-1 text-sm opacity-80">{c.context}</p>
                )}
                <p className="mt-2">
                  <span className="font-semibold">Solution:</span> {c.solution}
                </p>
                {c.impact && (
                  <p className="mt-2 text-sm">
                    <span className="font-semibold">Impact:</span> {c.impact}
                  </p>
                )}
                {c.links?.length ? (
                  <ul className="mt-2 text-sm underline">
                    {c.links.map((l) => (
                      <li key={l.url}>
                        <a href={l.url} target="_blank" rel="noreferrer">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {c.tags?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-full border border-white/15"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Links */}
      {(project.liveUrl || project.repoUrl) && (
        <section className="space-y-3">
          <h2 className="text-xl font-medium">Links</h2>
          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                className="underline opacity-90 hover:opacity-100"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                Live
              </a>
            )}
            {project.repoUrl && (
              <a
                className="underline opacity-90 hover:opacity-100"
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
