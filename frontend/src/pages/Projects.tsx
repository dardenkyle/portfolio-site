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
        // Sort projects by order value (ascending)
        const sorted = mapped.sort((a, b) => (a.order || 0) - (b.order || 0));
        setProjects(sorted);
      })
      .catch((e) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error)
    return <main className="max-w-5xl mx-auto p-6">Error: {error}</main>;
  if (!projects) return <main className="max-w-5xl mx-auto p-6">Loading…</main>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      {/* PROJECTS GRID */}
      <section>
        <section className="mx-auto max-w-3xl text-center space-y-4">
          <h1 className="text-4xl font-bold">Projects</h1>
          <p className="opacity-80">
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
