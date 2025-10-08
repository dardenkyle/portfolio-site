// Mirrors backend JSON

export type ApiLinkItem = { label: string; url: string };

export type ApiTechItem = {
  id: string;
  name: string;
  category?: string;
  url?: string;
  order?: number;
};

export type ApiChallengeItem = {
  id: string;
  title: string;
  context?: string;
  solution: string;
  impact?: string;
  links?: ApiLinkItem[];
  tags?: string[];
  order?: number;
};

export type ApiSkillItem = {
  name: string;
  category: string;
  slug: string;
  description: string;
  experience: string;
  projects: ApiProject[];
};

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
  overview?: string;
  techStack?: ApiTechItem[];
  challenges?: ApiChallengeItem[];
};
