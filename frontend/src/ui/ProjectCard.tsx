import type { Project } from "@/domain/projects";
import TagChip from "@/ui/TagChip";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <a
      href={p.repoUrl}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl shadow p-5 hover:shadow-lg transition"
    >
      <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
      <p className="text-sm opacity-80 mb-3">{p.summary}</p>
      <div className="flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <TagChip key={t} label={t} />
        ))}
      </div>
    </a>
  );
}
