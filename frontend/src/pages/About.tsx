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
            Focused on building data-heavy, reliable backends and automation
            pipelines.
          </p>
        </section>
        <div className="space-y-6 bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-6 shadow-lg">
          <p className="opacity-80 max-w-6xl mx-auto">
            I’m a backend engineer specializing in Python, FastAPI, and
            PostgreSQL. I build scalable, data-driven systems — from ETL
            pipelines processing 176M+ records to SaaS platforms with
            per-service migrations and CI/CD automation.
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            I emphasize clear architecture, maintainable code, and thoughtful
            trade-offs that ensure reliability at scale.
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            I hold a B.S. in Physics from UT Austin (2022) and a postgraduate
            certification in AI/ML from McCombs (2024), which strengthened my
            foundation in data science and applied machine learning.
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            I’m currently focused on backend and data-engineering roles
            (Python/FastAPI/SQL/AWS) — Austin or remote — where I can contribute
            to data-heavy APIs, automation, and production-grade infrastructure.
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
