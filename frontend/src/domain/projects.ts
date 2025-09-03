/** Frontend domain model used by the UI (backend-agnostic). */
export type Project = {
  slug: string;
  title: string;
  summary: string;
  repoUrl?: string; // case study or repo link
  liveUrl?: string; // live demo link
  tags: string[];
};
