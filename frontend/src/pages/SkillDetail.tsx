import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSkillBySlug } from "@/api/client";
import type { ApiSkillItem } from "@/api/types";
import Button from "@/ui/Button";
import ProjectCard from "@/ui/ProjectCard";
import { toProject } from "@/api/mappers";

export default function SkillDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [skill, setSkill] = useState<ApiSkillItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    getSkillBySlug(slug)
      .then(setSkill)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading skill details...</div>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold text-white">Skill Not Found</h1>
        <p className="text-slate-400">{error || "This skill doesn't exist."}</p>
        <Button to="/" variant="primary">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      <nav>
        <Button to="/skills" size="sm" variant="link">
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
            <Button to="/projects" size="sm" variant="link">
              View all projects
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
