import type { Project } from "@/domain/projects";
import TagChip from "@/ui/TagChip";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getRandomShadowColor } from "@/utils/colors";

export default function ProjectCard({ p }: { p: Project }) {
  const [shadowColor, setShadowColor] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    const color = getRandomShadowColor();
    setShadowColor(color);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      to={`/projects/${p.slug}`}
      className={`block rounded-2xl shadow p-5 transition-all duration-300 ${
        isHovered ? `shadow-lg ${shadowColor}` : ""
      }`}
      aria-label={`View details for ${p.title}`}
      onMouseEnter={handleMouseEnter}
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
