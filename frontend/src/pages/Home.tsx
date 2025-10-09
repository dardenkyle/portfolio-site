import { useEffect, useMemo, useState } from "react";
import { apiGet } from "@/api/client";
import type { ApiProject } from "@/api/types";
import ProjectsGrid from "@/ui/ProjectGrid";
import Button from "@/ui/Button";
import TechStack from "@/ui/TechStack";
import { toProject } from "@/api/mappers";
import type { Project } from "@/domain/projects";

// Order: explicit order first (asc), then most recently updated.
function sortProjects(a: Project, b: Project) {
  const ao = a.order ?? Number.MAX_SAFE_INTEGER;
  const bo = b.order ?? Number.MAX_SAFE_INTEGER;
  if (ao !== bo) return ao - bo;
  const ad = a.updatedAt ? Date.parse(a.updatedAt) : 0;
  const bd = b.updatedAt ? Date.parse(b.updatedAt) : 0;
  return bd - ad; // newer first
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    apiGet<ApiProject[]>("projects")
      .then((list) => setProjects(list.map(toProject).sort(sortProjects)))
      .catch((e) => setErr(e.message));
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teasers = useMemo(() => projects.slice(0, 3), [projects]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-14">
      {/* HERO */}
      <section className="mx-auto max-w-3xl text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Kyle Darden — Backend-focused Engineer
        </h1>
        <p className="opacity-80">
          Python • FastAPI • Postgres • Docker • AWS • CI/CD
        </p>
        <p className="opacity-80">
          Focused on building data-heavy, reliable backends and automation
          pipelines.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button
            to="/projects"
            variant="secondary"
            useGlow
            glowKey="hero-projects"
          >
            View Projects
          </Button>
          <Button
            href="/DARDEN_BACKEND_v2.pdf"
            variant="secondary"
            useGlow
            glowKey="hero-resume"
          >
            Download Resume
          </Button>
          <Button
            to="/contact"
            variant="secondary"
            useGlow
            glowKey="hero-contact"
          >
            Get in Touch
          </Button>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="space-y-3">
        <header className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">About</h2>
          <Button
            to="/about"
            size="sm"
            variant="link"
            useGlow
            glowKey="about-more"
          >
            View more →
          </Button>
        </header>
        <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-6 shadow-lg">
          <p className="opacity-80 max-w-6xl mx-auto">
            I’m a backend-focused engineer skilled in Python, FastAPI, and
            PostgreSQL, with hands-on experience building data-heavy systems,
            ETL pipelines, and automated CI/CD workflows. My background bridges
            software engineering, QA automation, and data engineering — giving
            me a strong edge in designing reliable, analytics-driven backends.{" "}
            <br />
            <br />
            Currently open to Backend, QA Automation, Data Engineering, and Data
            Science roles — Austin or remote.
          </p>
        </div>
      </section>

      {/* PROJECT TEASERS: titles + a couple concept tags + updated date */}
      <section className="space-y-3">
        <header className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>
          <Button
            to="/projects"
            size="sm"
            variant="link"
            useGlow
            glowKey="projects-more"
          >
            View more →
          </Button>
        </header>

        {err ? (
          <p className="text-red-400">Failed to load projects: {err}</p>
        ) : (
          <ProjectsGrid projects={teasers} />
        )}
      </section>

      {/* Tech Stack */}
      <section className="space-y-3">
        <header className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Tech Stack</h2>
          <Button
            to="/skills"
            size="sm"
            variant="link"
            useGlow
            glowKey="projects-more"
          >
            View more →
          </Button>
        </header>
        <TechStack />
      </section>
    </main>
  );
}
