// src/pages/Projects.tsx
export default function Projects() {
  return (
    <section>
      <h2 className="text-2xl font-semibold">Projects</h2>
      <p className="mt-2 text-neutral-300">
        This page will show a grid of projects once the API is wired up.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-neutral-800 p-4">
          <h3 className="text-lg font-semibold">FreightFolio</h3>
          <p className="mt-1 text-neutral-300">
            Logistics SaaS app for load management, invoices, AR/AP.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded bg-neutral-800 px-2 py-0.5 text-xs">
              FastAPI
            </span>
            <span className="rounded bg-neutral-800 px-2 py-0.5 text-xs">
              React
            </span>
            <span className="rounded bg-neutral-800 px-2 py-0.5 text-xs">
              AWS
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-800 p-4">
          <h3 className="text-lg font-semibold">CS2 Analytics</h3>
          <p className="mt-1 text-neutral-300">
            Data pipeline + API for Counter-Strike 2 pro match analytics.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded bg-neutral-800 px-2 py-0.5 text-xs">
              PostgreSQL
            </span>
            <span className="rounded bg-neutral-800 px-2 py-0.5 text-xs">
              ETL
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
