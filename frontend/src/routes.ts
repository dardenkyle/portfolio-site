import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("ui/Layout.tsx", [
    index("pages/Home.tsx"),
    route("projects", "pages/Projects.tsx"),
    route("projects/:slug", "pages/ProjectDetail.tsx"),
    route("projects/:slug/case-study", "pages/CaseStudy.tsx"),
    route("skills", "pages/Skills.tsx"),
    route("skills/:slug", "pages/SkillDetail.tsx"),
    route("about", "pages/About.tsx"),
    route("contact", "pages/Contact.tsx"),
    route("*", "pages/NotFound.tsx"),
  ]),
] satisfies RouteConfig;
