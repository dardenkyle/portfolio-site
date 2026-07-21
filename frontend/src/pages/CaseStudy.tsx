import { useEffect } from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import Button from "@/ui/Button";
import { trackContentView } from "@/utils/analytics";
import { apiGet } from "@/api/client";
import type { ApiProject } from "@/api/types";
import { toProject } from "@/api/mappers";
import { pageMeta } from "@/utils/meta";
import type { Route } from "./+types/CaseStudy";

export function meta({ data }: Route.MetaArgs) {
  // data is undefined when the loader threw (ErrorBoundary render)
  if (!data) {
    return pageMeta(
      "Case Study Not Found — Kyle Darden",
      "This case study doesn't exist yet."
    );
  }
  return pageMeta(
    `${data.project.title} Case Study — Kyle Darden`,
    data.project.summary ||
      `Case study for the ${data.project.title} project.`
  );
}

// Runs at build time (prerender) in Node, so the case-study markdown is
// read straight from public/ instead of fetched over HTTP; the result
// ships as static data.
export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;

  const [project, content] = await Promise.all([
    apiGet<ApiProject[]>("projects").then((list) =>
      list
        .map(toProject)
        .find((p) => p.slug.toLowerCase() === slug.toLowerCase())
    ),
    import("node:fs/promises").then((fs) =>
      fs
        .readFile(`public/case-studies/${slug}.md`, "utf-8")
        .catch(() => null)
    ),
  ]);

  if (!project || content === null) {
    throw new Response("Case study not found.", { status: 404 });
  }
  return { project, content };
}

export function ErrorBoundary() {
  const { slug } = useParams();

  return (
    <main className="max-w-5xl mx-auto p-6">
      <nav className="mb-8">
        <Button
          to={`/projects/${slug}/`}
          size="sm"
          variant="link"
          useGlow
          glowKey="project-back"
        >
          ← Back to Project
        </Button>
      </nav>

      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-white mb-4">
          Case Study Not Found
        </h1>
        <p className="text-slate-400 mb-6">
          The case study for "{slug}" doesn't exist yet.
        </p>
        <Button to={`/projects/${slug}/`} variant="link" size="sm">
          ← Back to Project
        </Button>
      </div>
    </main>
  );
}

export default function CaseStudy({ loaderData }: Route.ComponentProps) {
  const { project, content } = loaderData;

  // Track case study view
  useEffect(() => {
    trackContentView("case_study", project.slug, project.slug);
  }, [project.slug]);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.slug]);

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      <nav className="flex items-center justify-between">
        <Button
          to={`/projects/${project.slug}/`}
          size="sm"
          variant="link"
          useGlow
          glowKey="project-back"
        >
          ← Back to Project
        </Button>

        {project.repoUrl && (
          <Button
            href={project.repoUrl}
            size="sm"
            variant="link"
            useGlow
            glowKey="github-repo"
          >
            GitHub Repository →
          </Button>
        )}
      </nav>

      {/* Professional case study container */}
      <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl shadow-lg">
        <div className="p-8 md:p-12">
          <ReactMarkdown
            components={{
              // Headers with professional styling
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold text-white mb-8 pb-6 border-b border-slate-700/70">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-semibold text-white mt-12 mb-6">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-medium text-blue-200 mt-8 mb-4">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-xl font-medium text-blue-300 mt-6 mb-3">
                  {children}
                </h4>
              ),

              // Paragraphs and text
              p: ({ children }) => (
                <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                  {children}
                </p>
              ),

              // Emphasis and strong
              strong: ({ children }) => (
                <strong className="font-semibold text-white">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-blue-200">{children}</em>
              ),

              // Code styling
              code: ({ children }) => (
                <code className="text-green-300 bg-slate-800/70 px-2 py-1 rounded-md text-sm font-mono border border-slate-700/50">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-slate-900/80 border border-slate-700/50 rounded-lg p-6 overflow-x-auto mb-6 text-sm font-mono">
                  {children}
                </pre>
              ),

              // Lists
              ul: ({ children }) => (
                <ul className="space-y-2 mb-6 pl-0">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-2 mb-6 pl-6 list-decimal list-outside">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-slate-300 relative pl-6 before:content-['▶'] before:absolute before:left-0 before:text-blue-400 before:text-xs before:mt-1">
                  {children}
                </li>
              ),

              // Horizontal rule
              hr: () => <hr className="border-slate-700/70 my-12 border-t" />,

              // Blockquotes
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-400 bg-slate-800/30 pl-6 py-4 my-6 italic text-slate-300 rounded-r-lg">
                  {children}
                </blockquote>
              ),

              // Links
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-400/50 hover:decoration-blue-300/70 transition-colors"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href?.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                >
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
