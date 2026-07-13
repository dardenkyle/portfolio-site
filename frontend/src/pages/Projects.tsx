import { useEffect } from "react";
import ProjectsGrid from "@/ui/ProjectGrid";
import { apiGet } from "@/api/client";
import type { ApiProject } from "@/api/types";
import { toProject } from "@/api/mappers";
import { pageMeta } from "@/utils/meta";
import type { Route } from "./+types/Projects";

export function meta() {
  return pageMeta(
    "Projects — Kyle Darden",
    "Data pipelines, warehouses, and backend services built with Python, SQL, dbt, FastAPI, PostgreSQL, and Docker."
  );
}

// Runs at build time (prerender); the result ships as static data.
export async function loader() {
  const list = await apiGet<ApiProject[]>("projects");
  // Sort projects by order value (ascending)
  return list.map(toProject).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export default function Projects({
  loaderData: projects,
}: Route.ComponentProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      {/* PROJECTS GRID */}
      <section>
        <section className="mx-auto max-w-3xl text-center space-y-4">
          <h1 className="text-4xl font-bold">Projects</h1>
          <p className="opacity-80">
            A selection of my work — data pipelines, warehouses, and backend
            services built with Python, SQL, dbt, FastAPI, PostgreSQL, and
            Docker. These projects highlight my skills in data workflows, API
            design, and system reliability.
          </p>
        </section>
        <ProjectsGrid projects={projects} />
      </section>
    </main>
  );
}
