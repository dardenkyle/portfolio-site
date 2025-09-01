/** Frontend domain model used by the UI (backend-agnostic). */
export type Project = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  url: string; // case study or repo link
};
