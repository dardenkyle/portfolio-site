import type { Project } from "@/domain/projects";
import ProjectCard from "@/ui/ProjectCard";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="max-w-7xl mx-auto p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} p={p} />
      ))}
    </div>
  );
}
