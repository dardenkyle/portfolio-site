// src/types/gtag.d.ts
export {};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (
      command: string,
      targetIdOrEventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}
