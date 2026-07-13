// Shared shape for per-route meta exports so every page carries a real
// title/description and matching Open Graph tags in its prerendered HTML.

export const SITE_TITLE = "Kyle Darden — Portfolio";

export const SITE_DESCRIPTION =
  "Kyle Darden — Data Engineer & backend systems builder. Live CS2 analytics platform, dbt data warehousing, and FastAPI services.";

export function pageMeta(title: string, description: string) {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ];
}
