import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSkills } from "@/api/client";
import type { ApiSkillItem } from "@/api/types";
import { useRandomGlow } from "@/hooks/useRandomGlow";
import Button from "@/ui/Button";

export default function Skills() {
  const [skills, setSkills] = useState<ApiSkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { handleMouseEnter, handleMouseLeave, getGlowClass } = useRandomGlow();

  useEffect(() => {
    getSkills()
      .then(setSkills)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, ApiSkillItem[]>);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading skills...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold text-white">Error Loading Skills</h1>
        <p className="text-slate-400">{error}</p>
        <Button to="/" variant="primary">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-14">
      {/* Header */}
      <section className="mx-auto max-w-3xl text-center space-y-4">
        <h1 className="text-4xl font-bold">Skills & Technologies</h1>
        <p className="opacity-80">
          A comprehensive overview of the technologies, frameworks, and tools I
          use to build modern applications. Click on any skill to learn more
          about my experience and see related projects.
        </p>
      </section>

      {/* Skills by Category */}
      <section className="space-y-12">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <h2 className="text-2xl font-semibold mb-6">{category}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorySkills.map((skill) => (
                <Link
                  key={skill.slug}
                  to={`/skills/${skill.slug}`}
                  className={`
                    block rounded-2xl shadow p-5 transition-all duration-100
                    ${getGlowClass(skill.slug)}
                  `}
                  onMouseEnter={() => handleMouseEnter(skill.slug)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">
                      {skill.name}
                    </h3>
                    <span className="text-sm text-slate-400">
                      {skill.experience}
                    </span>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {skill.description}
                  </p>

                  {skill.projects && skill.projects.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>Used in:</span>
                      <span className="text-slate-300">
                        {skill.projects.length} project
                        {skill.projects.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Call to Action */}
    </main>
  );
}
