// Shared shape for per-route meta exports so every page carries a real
// title/description and matching Open Graph tags in its prerendered HTML.

import type { MetaDescriptor } from "react-router";

// Canonical origin (mirrors frontend/public/CNAME); react-router.config.ts
// imports this for sitemap URLs so the origin lives in one place.
export const SITE_ORIGIN = "https://kyledarden.com";

export const SITE_NAME = "Kyle Darden";

export const SITE_TITLE =
  "Kyle Darden — Software Engineer | Data Platforms & Pipelines";

export const SITE_DESCRIPTION =
  "Software engineer building data-intensive systems — ingestion pipelines, dimensional models, and the APIs that serve them. Case studies on each project.";

// Homepage share-card copy is shorter than the meta description because
// preview cards truncate aggressively.
export const HOME_OG_DESCRIPTION =
  "Case studies on data pipelines, dimensional modeling, and full-stack systems.";

// Dimensions match public/og-image.png; emitting them lets scrapers lay
// out the preview card on the first share, before the image is fetched.
export const OG_IMAGE_URL = `${SITE_ORIGIN}/og-image.png`;
const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";
const OG_IMAGE_ALT =
  "Kyle Darden - Software Engineer | Data Platforms & Pipelines";

// GitHub Pages serves each prerendered route as <route>/index.html and
// 301s the slash-less form, so the trailing-slash URL is the canonical
// one everywhere: sitemap, internal links, og:url, and this tag. The
// pathname is normalized rather than used verbatim because prerendering
// renders routes at their slash-less paths while the deployed site serves
// them with the slash.
export function canonicalUrl(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${trimmed}/`;
}

type PageMetaOptions = {
  // Route pathname (from Route.MetaArgs location); emits og:url and the
  // canonical link. Omitted on error/404 renders, which have no canonical.
  pathname?: string;
  // Share-card copy when it should differ from the meta description.
  ogDescription?: string;
  // Open Graph object type; defaults to "website". Case studies pass
  // "article" since they are standalone written pieces.
  ogType?: "website" | "article";
};

export function pageMeta(
  title: string,
  description: string,
  options: PageMetaOptions = {}
): MetaDescriptor[] {
  const tags: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:type", content: options.ogType ?? "website" },
    { property: "og:title", content: title },
    {
      property: "og:description",
      content: options.ogDescription ?? description,
    },
    { property: "og:image", content: OG_IMAGE_URL },
    { property: "og:image:width", content: OG_IMAGE_WIDTH },
    { property: "og:image:height", content: OG_IMAGE_HEIGHT },
    { property: "og:image:alt", content: OG_IMAGE_ALT },
    { name: "twitter:card", content: "summary_large_image" },
  ];
  if (options.pathname !== undefined) {
    const url = canonicalUrl(options.pathname);
    tags.push({ property: "og:url", content: url });
    tags.push({ tagName: "link", rel: "canonical", href: url });
  }
  return tags;
}
