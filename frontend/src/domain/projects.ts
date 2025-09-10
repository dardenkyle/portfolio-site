/** Frontend domain model used by the UI (backend-agnostic). */

export type Project = Readonly<{
  slug: string;
  title: string;
  summary: string;
  tags: string[];

  repoUrl?: string; // optional: repo link
  liveUrl?: string; // optional: live demo link

  order?: number; // optional: for sorting in the grid
  updatedAt?: string; // optional ISO date for “new/updated” badges
  heroImage?: string; // optional: for detail page hero
  videoId?: string; // optional: YouTube id for embed
}>;
