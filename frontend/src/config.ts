// src/config.ts
const raw = import.meta.env.VITE_API_URL as string | undefined;
export const API_BASE = (raw ?? "").replace(/\/+$/, "");
if (!API_BASE) {
  throw new Error("VITE_API_URL is not set. Define it for the build.");
}
