import type { Project } from "@/domain/projects";
import ProjectsGrid from "@/ui/ProjectGrid";

/** TODO(api): replace with backend data later. */
const PROJECTS: Project[] = [
  {
    id: "freightfolio",
    title: "FreightFolio (Logistics SaaS)",
    summary:
      "Load Manager, Invoices, AR/AP microservices; production-grade FastAPI + Postgres.",
    tags: ["FastAPI", "Postgres", "Docker"],
    url: "https://github.com/dardenkyle/freightfolio",
  },
  {
    id: "cs2-analytics",
    title: "CS2 Analytics",
    summary:
      "Queue-based scraping and analytics API for pro matches (ETL + SQL).",
    tags: ["Python", "ETL", "Postgres"],
    url: "https://github.com/dardenkyle/cs2-analytics",
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    summary:
      "Vite + React + Tailwind frontend; Spring Boot backend (to be wired).",
    tags: ["React", "Tailwind", "Java"],
    url: "https://github.com/dardenkyle/portfolio-site",
  },
];

export default function Projects() {
  return <ProjectsGrid projects={PROJECTS} />;
}
