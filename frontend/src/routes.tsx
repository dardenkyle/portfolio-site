import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/ui/Layout";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Skills from "@/pages/Skills";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import ProjectDetail from "@/pages/ProjectDetail";
import SkillDetail from "@/pages/SkillDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "skills", element: <Skills /> },
      { path: "about", element: <About /> },
      { path: "/projects/:slug", element: <ProjectDetail /> },
      { path: "/skills/:slug", element: <SkillDetail /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
