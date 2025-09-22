import type { Project } from "@/domain/projects";
import TagChip from "@/ui/TagChip";
import { Link } from "react-router-dom";
import { useRandomGlow } from "@/hooks/useRandomGlow";

export default function ProjectCard({ p }: { p: Project }) {
  const { handleMouseEnter, handleMouseLeave, getGlowClass } = useRandomGlow();

  return (
    <Link
      to={`/projects/${p.slug}`}
      className={`block rounded-2xl shadow p-5 transition-all duration-100 ${getGlowClass(
        p.slug
      )}`}
      aria-label={`View details for ${p.title}`}
      onMouseEnter={() => handleMouseEnter(p.slug)}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
      <p className="text-sm opacity-80 mb-3">{p.summary}</p>
      <div className="flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <TagChip key={t} label={t} />
        ))}
      </div>
    </Link>
  );
}
