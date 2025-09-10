import { API_BASE } from "@/config";

export async function apiGet<T>(path: string): Promise<T> {
  const clean = path.replace(/^\/+/, "");
  const url = `${API_BASE}/${clean}`;

  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`GET ${url} → ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}
