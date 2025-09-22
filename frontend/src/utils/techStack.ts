export interface TechItem {
  name: string;
  category: string;
  slug: string;
}

export const TECH_STACK: TechItem[] = [
  { name: "Python", category: "Language", slug: "python" },
  { name: "Java", category: "Language", slug: "java" },
  { name: "TypeScript", category: "Language", slug: "typescript" },
  { name: "FastAPI", category: "Backend", slug: "fastapi" },
  { name: "Spring Boot", category: "Backend", slug: "spring-boot" },
  { name: "React", category: "Frontend", slug: "react" },
  { name: "PostgreSQL", category: "Database", slug: "postgresql" },
  { name: "Docker", category: "DevOps", slug: "docker" },
  { name: "AWS", category: "Cloud", slug: "aws" },
  { name: "dbt", category: "Data", slug: "dbt" },
  { name: "GitHub Actions", category: "CI/CD", slug: "github-actions" },
  { name: "Tailwind CSS", category: "Styling", slug: "tailwind-css" },
];
