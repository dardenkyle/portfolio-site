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
            Python-based Backend Engineer building data-heavy systems with
            FastAPI and PostgreSQL.
          </p>
        </section>
        <div className="space-y-6 bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-6 shadow-lg">
          <p className="opacity-80 max-w-6xl mx-auto">
            I’m a backend engineer specializing in Python, FastAPI, and
            PostgreSQL. I build scalable, resilient, and data-driven systems —
            from ETL pipelines processing 176M+ records to SaaS platforms with
            per-service migrations and CI/CD automation.
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            My work emphasizes clear architecture, documentation, and trade-offs
            that ensure long-term maintainability.
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            I hold a Bachelor’s degree in Physics from UT Austin (2022) and a
            postgraduate certification in AI/ML from McCombs (2024), which
            broadened my technical perspective to include data science and
            applied machine learning.
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            I’m currently pursuing backend or data-engineering roles
            (Python/FastAPI/SQL/AWS) — Austin or remote — where I can contribute
            to teams tackling complex data-heavy backends, API architecture, and
            system reliability.
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            Outside of work, I’m passionate about competitive gaming, music, and
            lifting weights. These pursuits keep me creative and balanced —
            qualities I bring into my engineering work.
          </p>
        </div>
      </section>
    </main>
  );
}
