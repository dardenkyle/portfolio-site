import { useEffect } from "react";
import { Link } from "react-router";
import { pageMeta } from "@/utils/meta";
import type { Route } from "./+types/About";

export function meta({ location }: Route.MetaArgs) {
  return pageMeta(
    "About — Kyle Darden",
    "Software engineer building data-intensive systems — from a physics background to a live, end-to-end analytics platform and the projects around it.",
    { pathname: location.pathname }
  );
}

const caseStudyLink =
  "underline underline-offset-4 decoration-white/30 hover:decoration-white/70 transition";

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
            I’m a software engineer building data-intensive systems — the
            pipelines that ingest data, the models that structure it, and the
            APIs that serve it. Based in Austin, TX.
          </p>
        </section>
        <div className="space-y-6 bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-6 shadow-lg">
          <p className="opacity-80 max-w-6xl mx-auto">
            I came to software from physics. What carried over is systems
            thinking — understanding how the pieces of a system interact, and
            working one layer below the problem when the surface answer
            doesn’t hold.
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            Most of that work happens in CS2 Analytics, which collects and
            normalizes professional Counter-Strike 2 match data: a Python
            ingestion pipeline into PostgreSQL, a FastAPI service, and a React
            dashboard, deployed end to end and running in production. The
            constraints have shaped it more than the initial build did — the
            data source blocks datacenter IPs, so scraping is decoupled from
            the cloud-hosted API, and ingestion tracks its own state so
            interrupted runs resume cleanly instead of double-processing.
            Details are in the{" "}
            <Link
              to="/projects/cs2-analytics/case-study/"
              className={caseStudyLink}
            >
              case study
            </Link>
            .
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            The rest of the work — and the case studies covering the
            decisions behind it — is on the{" "}
            <Link to="/projects/" className={caseStudyLink}>
              projects page
            </Link>
            .
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            I hold a B.S. in Physics from UT Austin (2022) and a postgraduate
            certificate in data science and machine learning from McCombs
            (2024), and I’m currently completing CS coursework towards
            enrolling in a graduate program.
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            I’m looking for software engineering roles — Austin or remote —
            and I gravitate toward the data-heavy end of them: ingestion,
            modeling, and the services that put data in front of people.
          </p>
          <p className="opacity-80 max-w-6xl mx-auto">
            Outside of work: competitive gaming, music, and weight training.
          </p>
        </div>
      </section>
    </main>
  );
}
