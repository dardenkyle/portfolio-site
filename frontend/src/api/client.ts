import { API_BASE } from "@/config";
import type { ApiSkillItem } from "./types";

// Carries the HTTP status so callers can distinguish "not found" from
// outages/server errors instead of parsing the message.
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const clean = path.replace(/^\/+/, "");
  const url = `${API_BASE}/${clean}`;

  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new ApiError(res.status, `GET ${url} → ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function getSkills(): Promise<ApiSkillItem[]> {
  return apiGet<ApiSkillItem[]>("skills");
}

export async function getSkillBySlug(slug: string): Promise<ApiSkillItem> {
  return apiGet<ApiSkillItem>(`skills/${slug}`);
}
