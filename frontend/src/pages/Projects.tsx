import { useEffect, useState } from "react";
import ProjectsGrid from "@/ui/ProjectGrid";
import type { Project } from "@/domain/projects";
import { apiGet } from "@/api/client";

type ApiProject = {
  slug: string;
  title: string;
  summary: string;
  repoUrl?: string;
  liveUrl?: string;
  tags?: string[];
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    apiGet<ApiProject[]>("/projects")
      .then((data) => {
        if (!alive) return;
        const mapped: Project[] = data.map((p) => ({
          id: p.slug,
          title: p.title,
          summary: p.summary,
          tags: p.tags ?? [],
          url: p.liveUrl ?? p.repoUrl ?? "",
        }));
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
