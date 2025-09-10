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

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      <nav className="text-sm">
        <Link to="/projects" className="opacity-70 hover:opacity-100">
          ← Back to Projects
        </Link>
      </nav>

      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{project.title}</h1>
        <p className="text-lg opacity-80">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((t) => (
            <span
              key={t}
              className="rounded-full px-3 py-1 text-sm border border-white/15"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* Overview */}
      <section className="space-y-3">
        <h2 className="text-xl font-medium">Overview</h2>
        <p>
          Briefly describe the project goal, your role, and what makes it
          interesting. Keep it 3–6 sentences. Replace this placeholder with
          project-specific text.
        </p>
      </section>

      {/* Tech Stack */}
      <section className="space-y-3">
        <h2 className="text-xl font-medium">Tech Stack</h2>
        <ul className="list-disc pl-6">
          <li>Backend: Spring Boot (Java 21)</li>
          <li>Frontend: Vite + React + TypeScript + Tailwind</li>
          <li>DB: PostgreSQL</li>
          <li>Infra/Hosting: Render (API), GitHub Pages (frontend)</li>
        </ul>
      </section>

      {/* Challenges & Solutions */}
      <section className="space-y-3">
        <h2 className="text-xl font-medium">Challenges & Solutions</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>State the main problem you faced.</li>
          <li>Explain the decision(s) you made and why (tradeoffs).</li>
          <li>Show the outcome (perf, reliability, DX, etc.).</li>
        </ul>
      </section>

      {/* Links */}
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
    </main>
  );
}
