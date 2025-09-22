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
        <div className="flex items-center justify-center gap-3">
          <Button
            to="/projects"
            variant="secondary"
            useGlow
            glowKey="hero-projects"
          >
            View projects
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
            href="mailto:darden_kyle@hotmail.com"
            variant="secondary"
            useGlow
            glowKey="hero-email"
          >
            Email Me
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
            View more
          </Button>
        </header>
        <p className="opacity-80 max-w-6xl mx-auto">
          I’m a backend engineer specializing in Python, FastAPI, and
          PostgreSQL, with experience building production-grade systems from ETL
          pipelines processing 176M+ records to SaaS platforms with per-service
          migrations and CI/CD automation. I focus on resilient, data-heavy
          backends and API design, with clear documentation and trade-off
          decisions. <br />
          <br />
          Currently open to Backend Engineer roles (Python/FastAPI/SQL, AWS) —
          Austin or remote.
        </p>
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
            Browse all
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
        </header>
        <TechStack />
      </section>

      {/* CONTACT CTA */}
      <section className="rounded-2xl border border-white/15 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            Have a question or opportunity?
          </h3>
        </div>
        <Button to="/contact" variant="primary" useGlow glowKey="contact-cta">
          Get in touch
        </Button>
      </section>
    </main>
  );
}
