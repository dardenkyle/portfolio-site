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
  return <ProjectsGrid projects={projects} />;
}
