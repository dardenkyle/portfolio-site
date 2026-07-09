import { useEffect } from "react";

export default function About() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-14">
      {/* ABOUT */}
      <section className="space-y-12">
        <section className="mx-auto max-w-3xl text-center space-y-4">
          <h1 className="text-4xl font-bold">About</h1>
          <p className="opacity-80">
            I build data platforms end to end — ingestion, storage, and the
            APIs that serve them, on a backend-engineering foundation.
          </p>
        </section>
        <div className="space-y-6 bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-6 shadow-lg">
          <p className="opacity-80 max-w-6xl mx-auto">
            I’m a data engineer working in Python, SQL, and dbt on a
            backend-engineering foundation of FastAPI, PostgreSQL, and Docker.
            My flagship project, CS2 Analytics, is live and public — a Python
            ingestion pipeline feeding a PostgreSQL store, a FastAPI service,
            and a React dashboard, deployed the whole way through.
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            I also build dimensional data warehouses — most recently a
            star-schema warehouse over 176M+ IMDb records, with dbt staging and
            marts layers backed by data-quality tests — and backend services
            with production-grade AWS Cognito auth, Dockerized PostgreSQL, and
            per-service migrations.
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            I emphasize clear architecture, maintainable code, and thoughtful
            trade-offs that ensure reliability at scale.
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            I hold a B.S. in Physics from UT Austin (2022) and a postgraduate
            certificate in data science and machine learning from McCombs
            (2024), and I’m currently completing CS coursework towards
            enrolling in a graduate program.
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            I’m currently focused on data-engineering roles
            (Python/SQL/dbt/AWS) — Austin or remote — where I can build
            ingestion pipelines, warehouses, and the data-heavy APIs that
            serve them.
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            Outside of work, I enjoy competitive gaming, music, and weight
            training — interests that keep me focused and creative in
            engineering.
          </p>
        </div>
      </section>
    </main>
  );
}
