import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "@/api/client";
import type { ApiProject } from "@/api/types";
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
          I build resilient data systems and clean APIs with production polish.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/projects"
            className="rounded-xl px-4 py-2 border border-white/20 hover:bg-white/10"
          >
            View projects
          </Link>
        </div>
      </section>

      {/* HIGHLIGHTS (no duplication of project content) */}
      <header className="flex items-end justify-between">
        <h2 className="text-2xl font-semibold">Highlights</h2>
      </header>
      <section className="grid sm:grid-cols-3 gap-4">
        <Highlight
          kpi="Resilient pipelines"
          blurb="Backoff, retries, idempotent upserts"
        />
        <Highlight
          kpi="PostgreSQL first"
          blurb="Migrations, indexing, data integrity"
        />
        <Highlight
          kpi="Production polish"
          blurb="CI/CD, error handling, logging, docs"
        />
      </section>

      {/* PROJECT TEASERS: titles + a couple concept tags + updated date */}
      <section className="space-y-6">
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
          <div className="grid md:grid-cols-3 gap-5">
            {teasers.map((p) => (
              <ProjectTeaser key={p.slug} p={p} />
            ))}
          </div>
        )}
      </section>

      {/* ABOUT TEASER */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">About</h2>
        <p className="opacity-80 max-w-3xl">
          I focus on data-heavy backends and API design. I like predictable
          systems, clear interfaces, and making trade-offs explicit in docs and
          code.
        </p>
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

function Highlight({ kpi, blurb }: { kpi: string; blurb: string }) {
  return (
    <div className="rounded-2xl border border-white/15 p-4">
      <div className="font-semibold">{kpi}</div>
      <div className="opacity-80 text-sm">{blurb}</div>
    </div>
  );
}

function ProjectTeaser({ p }: { p: Project }) {
  const updated =
    p.updatedAt && new Date(p.updatedAt).toISOString().slice(0, 10);
  const tags = (p.tags ?? []).slice(0, 3); // keep home minimal

  return (
    <article className="rounded-2xl border border-white/15 p-4 flex flex-col gap-3">
      <header className="flex items-center gap-2">
        <Link
          to={`/projects/${p.slug}`}
          className="text-lg font-semibold underline-offset-4 hover:underline"
        >
          {p.title}
        </Link>
        {updated && (
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full border border-white/15">
            {updated}
          </span>
        )}
      </header>

      {tags.length ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full border border-white/15"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
