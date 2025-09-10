import type { ApiProject } from "./types";
import type { Project } from "@/domain/projects";

export function toProject(p: ApiProject): Project {
  return {
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    tags: p.tags ?? [],
    repoUrl: p.repoUrl,
    liveUrl: p.liveUrl,
    order: p.order,
    updatedAt: p.updatedAt,
    heroImage: p.heroImage,
    videoId: p.videoId,
  };
}
