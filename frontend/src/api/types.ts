// Mirrors backend JSON
export type ApiProject = {
  slug: string;
  title: string;
  summary: string;
  tags?: string[];
  repoUrl?: string;
  liveUrl?: string;
  order?: number;
  updatedAt?: string; // ISO 8601
  heroImage?: string;
  videoId?: string;
};
