import type {
  ApiProject,
  ApiTechItem,
  ApiChallengeItem,
  ApiLinkItem,
} from "@/api/types";
import type {
  Project,
  TechItem,
  ChallengeItem,
  LinkItem,
} from "@/domain/projects";

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
    overview: p.overview,
    techStack: sortByOrder((p.techStack ?? []).map(toTechItem)),
    challenges: sortByOrder((p.challenges ?? []).map(toChallengeItem)),
  };
}

// ---------- helpers ----------
function byOrder<T extends { order?: number }>(a: T, b: T) {
  return (a.order ?? 0) - (b.order ?? 0);
}
function sortByOrder<T extends { order?: number }>(xs: T[]): T[] {
  return xs.slice().sort(byOrder);
}

function toTechItem(t: ApiTechItem): TechItem {
  return {
    id: t.id,
    name: t.name,
    category: t.category,
    url: t.url,
    order: t.order,
  };
}

function toLink(l: ApiLinkItem): LinkItem {
  return { label: l.label, url: l.url };
}

function toChallengeItem(c: ApiChallengeItem): ChallengeItem {
  return {
    id: c.id,
    title: c.title,
    context: c.context,
    solution: c.solution,
    impact: c.impact,
    links: (c.links ?? []).map(toLink),
    tags: c.tags ?? [],
    order: c.order,
  };
}
