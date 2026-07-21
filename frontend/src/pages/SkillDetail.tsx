import { useEffect } from "react";
import { ApiError, getSkillBySlug } from "@/api/client";
import Button from "@/ui/Button";
import ProjectCard from "@/ui/ProjectCard";
import { toProject } from "@/api/mappers";
import { trackContentView } from "@/utils/analytics";
import { pageMeta } from "@/utils/meta";
import type { Route } from "./+types/SkillDetail";

export function meta({ data, location }: Route.MetaArgs) {
  // data is undefined when the loader threw (ErrorBoundary render)
  if (!data) {
    return pageMeta("Skill Not Found — Kyle Darden", "This skill doesn't exist.");
  }
  return pageMeta(
    `${data.name} — Kyle Darden`,
    data.description || `My experience with ${data.name}.`,
    { pathname: location.pathname }
  );
}

// Runs at build time (prerender); the result ships as static data.
export async function loader({ params }: Route.LoaderArgs) {
  try {
    return await getSkillBySlug(params.slug);
  } catch (error) {
    // Only an API 404 means the skill doesn't exist; outages and server
    // errors must propagate so they fail the build instead of quietly
    // prerendering a "Skill Not Found" page.
    if (error instanceof ApiError && error.status === 404) {
      throw new Response("Skill not found.", { status: 404 });
    }
    throw error;
  }
}

export function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl font-bold text-white">Skill Not Found</h1>
      <p className="text-slate-400">This skill doesn't exist.</p>
      <Button to="/" variant="primary">
        Back to Home
      </Button>
    </div>
  );
}

export default function SkillDetail({
  loaderData: skill,
}: Route.ComponentProps) {
  // Track skill view
  useEffect(() => {
    trackContentView("skill", skill.name, skill.slug);
  }, [skill.name, skill.slug]);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [skill.slug]);

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      <nav>
        <Button to="/skills/" size="sm" variant="link">
          ← Back to Skills
        </Button>
      </nav>

      <header className="space-y-3">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
            <span>{skill.category}</span>
          </div>
          <h1 className="text-4xl font-bold">{skill.name}</h1>
        </div>
        <div className="text-slate-300">
          <span className="font-medium">{skill.experience}</span> of experience
        </div>
      </header>

      {/* Description */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium">About {skill.name}</h2>
        <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-6 shadow-lg">
          <p className="opacity-80 leading-relaxed">{skill.description}</p>
        </div>
      </section>

      {/* Related Projects */}
      {skill.projects && skill.projects.length > 0 && (
        <section className="space-y-3">
          <header className="flex items-end justify-between">
            <h2 className="text-xl font-medium">Projects Using {skill.name}</h2>
            <Button to="/projects/" size="sm" variant="link">
              View all projects →
            </Button>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skill.projects.map((project) => (
              <ProjectCard key={project.slug} p={toProject(project)} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
