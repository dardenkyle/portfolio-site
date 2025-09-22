import { useEffect, useState } from "react";
import ProjectsGrid from "@/ui/ProjectGrid";
import type { Project } from "@/domain/projects";
import { apiGet } from "@/api/client";
import type { ApiProject } from "@/api/types";
import { toProject } from "@/api/mappers";

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    apiGet<ApiProject[]>("projects")
      .then((data) => {
        if (!alive) return;
        const mapped = data.map(toProject);
        setProjects(mapped);
      })
      .catch((e) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, []);

  if (error)
    return <main className="max-w-5xl mx-auto p-6">Error: {error}</main>;
  if (!projects) return <main className="max-w-5xl mx-auto p-6">Loading…</main>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      {/* PAGE HEADER */}
      <section className="mx-auto max-w-3xl text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Kyle Darden — Backend-focused Engineer
        </h1>
        <p className="opacity-80">
          Python • FastAPI • Postgres • Docker • AWS • CI/CD
        </p>
      </section>

      {/* PROJECTS GRID */}
      <section>
        <section className="space-y-3">
          <header className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold">Projects</h2>
          </header>
          <p className="opacity-80 max-w-6xl mx-auto">
            A selection of my work, showcasing backend engineering with Python,
            FastAPI, and PostgreSQL. These projects highlight my skills in API
            design, data workflows, and system reliability.
          </p>
        </section>
        <ProjectsGrid projects={projects} />
      </section>
    </main>
  );
}
