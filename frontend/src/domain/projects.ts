/** Frontend domain model used by the UI (backend-agnostic). */

export type LinkItem = { label: string; url: string };

export type TechItem = {
  id: string;
  name: string;
  category?: string;
  url?: string;
  order?: number;
};

export type ChallengeItem = {
  id: string;
  title: string;
  context?: string;
  solution: string;
  impact?: string;
  links?: LinkItem[];
  tags?: string[];
  order?: number;
};

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
  overview?: string; // optional: markdown content for detail page
  techStack?: TechItem[]; // optional: technologies used
  challenges?: ChallengeItem[]; // optional: challenges faced and solved
}>;
