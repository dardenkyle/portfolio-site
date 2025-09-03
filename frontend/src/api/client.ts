import { API_BASE } from "@/config";

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`GET ${path} ${res.status}`);
  return res.json() as Promise<T>;
}
