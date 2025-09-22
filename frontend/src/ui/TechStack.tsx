import { Link } from "react-router-dom";
import { TECH_STACK } from "@/utils/techStack";
import { useRandomGlow } from "@/hooks/useRandomGlow";

interface TechItemProps {
  name: string;
  category: string;
  slug: string;
}

function TechItem({ name, category, slug }: TechItemProps) {
  const { handleMouseEnter, handleMouseLeave, getGlowClass } = useRandomGlow();

  return (
    <Link
      to={`/skills/${slug}`}
      className={`block rounded-2xl border border-white/15 p-4 text-center space-y-2 transition-all duration-300 hover:border-white/25 ${getGlowClass(
        slug
      )}`}
      onMouseEnter={() => handleMouseEnter(slug)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="font-semibold">{name}</div>
      <div className="opacity-60 text-xs">{category}</div>
    </Link>
  );
}

interface TechStackProps {
  className?: string;
  items?: TechItemProps[];
}

export default function TechStack({
  className = "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4",
  items = TECH_STACK,
}: TechStackProps) {
  return (
    <div className={className}>
      {items.map((item) => (
        <TechItem
          key={item.slug}
          name={item.name}
          category={item.category}
          slug={item.slug}
        />
      ))}
    </div>
  );
}
