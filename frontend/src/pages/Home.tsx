import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "@/api/client";
import type { ApiProject } from "@/api/types";
import ProjectsGrid from "@/ui/ProjectGrid";
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

function TechItem({ name, category }: { name: string; category: string }) {
  return (
    <div className="rounded-2xl border border-white/15 p-4 text-center space-y-2">
      <div className="font-semibold">{name}</div>
      <div className="opacity-60 text-xs">{category}</div>
    </div>
  );
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
          <Link
            to="/projects"
            className="rounded-xl px-4 py-2 border border-white/20 hover:bg-white/10"
          >
            View projects
          </Link>
          <a
            href="/DARDEN_BACKEND_v2.pdf"
            download="Kyle_Darden_Resume.pdf"
            className="rounded-xl px-4 py-2 border border-white/20 hover:bg-white/10"
          >
            Download Resume
          </a>
          <Link
            to="mailto:darden_kyle@hotmail.com"
            className="rounded-xl px-4 py-2 border border-white/20 hover:bg-white/10"
          >
            Email Me
          </Link>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="space-y-3">
        <header className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">About</h2>
          <Link to="/about" className="underline opacity-80 hover:opacity-100">
            View more
          </Link>
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
          <Link
            to="/projects"
            className="underline opacity-80 hover:opacity-100"
          >
            Browse all
          </Link>
        </header>

        {err ? (
          <p className="text-red-400">Failed to load projects: {err}</p>
        ) : (
          <ProjectsGrid projects={teasers} />
        )}
      </section>

      {/* Tech Stack - replaces the "How I Build Backends" section */}
      <section className="space-y-3">
        <header className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Tech Stack</h2>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <TechItem name="Python" category="Language" />
          <TechItem name="Java" category="Language" />
          <TechItem name="TypeScript" category="Language" />
          <TechItem name="FastAPI" category="Backend" />
          <TechItem name="Spring Boot" category="Backend" />
          <TechItem name="React" category="Frontend" />
          <TechItem name="PostgreSQL" category="Database" />
          <TechItem name="Docker" category="DevOps" />
          <TechItem name="AWS" category="Cloud" />
          <TechItem name="dbt" category="Data" />
          <TechItem name="GitHub Actions" category="CI/CD" />
          <TechItem name="Tailwind CSS" category="Styling" />
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="rounded-2xl border border-white/15 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            Have a question or opportunity?
          </h3>
        </div>
        <Link
          to="/contact"
          className="rounded-xl px-4 py-2 border border-white/20 hover:bg-white/10"
        >
          Get in touch
        </Link>
      </section>
    </main>
  );
}
