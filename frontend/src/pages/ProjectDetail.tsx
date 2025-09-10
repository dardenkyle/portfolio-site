import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGet } from "@/api/client";
import type { Project } from "@/domain/projects";

type ApiProject = {
  slug: string;
  title: string;
  summary: string;
  repoUrl?: string;
  liveUrl?: string;
  tags?: string[];
  // Optional extended fields you can add later:
  // problem?: string;
  // solution?: string;
  // videoId?: string; // YouTube
  // screenshots?: string[];
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    // For now, fetch the list and pick by slug.
    // (Later: switch to /api/projects/:slug when the backend exposes it.)
    apiGet<ApiProject[]>("projects")
      .then((list) => {
        if (!alive) return;
        const p = list.find((x) => x.slug === slug);
        if (!p) {
          setError("Project not found.");
          return;
        }
        const mapped: Project = {
          slug: p.slug,
          title: p.title,
          summary: p.summary,
          repoUrl: p.repoUrl ?? "",
          tags: p.tags ?? [],
        };
        setProject(mapped);
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

      {/* Media (replace with real embed if you have one) */}
      {/* Example YouTube embed:
      <section className="space-y-3">
        <h2 className="text-xl font-medium">Demo</h2>
        <div className="aspect-video">
          <iframe
            className="w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="Demo video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>
      */}

      {/* Links */}
      <section className="space-y-3">
        <h2 className="text-xl font-medium">Links</h2>
        <div className="flex gap-4">
          {project.repoUrl && (
            <a
              className="underline opacity-90 hover:opacity-100"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live / Repo
            </a>
          )}
          {/* Add more: GitHub, API docs, Swagger, etc. */}
        </div>
      </section>
    </main>
  );
}
