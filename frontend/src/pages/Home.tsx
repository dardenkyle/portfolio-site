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
        <h1 className="text-4xl font-bold">Kyle Darden — Data Engineer</h1>
        <p className="opacity-80">
          Python • SQL • dbt • FastAPI • PostgreSQL • Docker
        </p>
        <p className="opacity-80">
          I build data platforms end to end — ingestion, storage, and the APIs
          that serve them, on a backend-engineering foundation.
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
            href="/Kyle_Darden_Resume.pdf"
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
            I build data platforms end to end. My CS2 Analytics project is live
            and public — a Python ingestion pipeline feeding a PostgreSQL
            store, a FastAPI service, and a React dashboard, deployed the whole
            way through. I also build dimensional data warehouses (dbt,
            star-schema modeling) and production backend services (FastAPI,
            PostgreSQL, Docker, AWS Cognito auth).
            <br />
            <br />
            B.S. in Physics from UT Austin; graduate training in data science
            and machine learning; currently completing CS coursework towards
            enrolling in a graduate program.
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
