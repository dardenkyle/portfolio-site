import { StrictMode } from "react";
import { Links, Meta, Outlet, Scripts, isRouteErrorResponse } from "react-router";
import "@/index.css";
import Starfield from "@/ui/Starfield";
import { usePageTracking } from "@/hooks/usePageTracking";
import { pageMeta, SITE_TITLE, SITE_DESCRIPTION } from "@/utils/meta";
import NotFound from "@/pages/NotFound";
import type { Route } from "./+types/root";

const GA_MEASUREMENT_ID = "G-RR5WDS9DYH";

const GA_INIT = `
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "${GA_MEASUREMENT_ID}");
`;

// Fallback for routes without their own meta export; every page module
// overrides this with route-specific tags via pageMeta().
export function meta({ location }: Route.MetaArgs) {
  return pageMeta(SITE_TITLE, SITE_DESCRIPTION, {
    pathname: location.pathname,
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Favicon(s) */}
        <link
          rel="icon"
          href="/ann_favicon_32px.png"
          type="image/png"
          sizes="32x32"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Social preview tags (og:*, twitter:card, canonical link) are
            all per-route via meta exports (pageMeta). */}

        {/* Google tag (gtag.js) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        ></script>
        <script dangerouslySetInnerHTML={{ __html: GA_INIT }} />

        <Meta />
        <Links />
      </head>
      <body>
        <StrictMode>{children}</StrictMode>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  usePageTracking();

  return (
    <div className="relative min-h-screen bg-black">
      {/* Put the canvas above the body background but below content */}
      <Starfield
        density={0.5}
        speed={0.001}
        background={undefined} // keep transparent
        color="#B26A6A"
        maxRadius={0.5}
        zIndex={0} // canvas layer
        debug={false} // set true once if you need to prove it draws
      />
      <Starfield
        density={1}
        speed={0.01}
        background={undefined} // keep transparent
        color="#ffffff"
        maxRadius={1}
        zIndex={0} // canvas layer
        debug={false} // set true once if you need to prove it draws
      />
      <Starfield
        density={0.05}
        speed={0.01}
        background={undefined} // keep transparent
        color="#b7d8ff"
        maxRadius={1}
        zIndex={2} // canvas layer
        debug={false} // set true once if you need to prove it draws
      />
      <Starfield
        density={0.009}
        speed={1}
        background={undefined} // keep transparent
        color="#ffffff"
        maxRadius={0.5}
        zIndex={2} // canvas layer
        debug={false} // set true once if you need to prove it draws
      />
      {/* Content layer above */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}

// Last-resort boundary: loader 404s are handled by the route-level
// boundaries, so this mostly covers unexpected render/data errors.
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center flex-col gap-4 p-6 text-center">
      <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
      <p className="text-slate-400">
        An unexpected error occurred. Please try again.
      </p>
      <a href="/" className="underline hover:no-underline">
        Go back home
      </a>
    </main>
  );
}
