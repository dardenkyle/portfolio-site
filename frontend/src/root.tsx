import { StrictMode } from "react";
import { Links, Meta, Outlet, Scripts } from "react-router";
import "@/index.css";
import Starfield from "@/ui/Starfield";
import { usePageTracking } from "@/hooks/usePageTracking";

const GA_MEASUREMENT_ID = "G-RR5WDS9DYH";

const GA_INIT = `
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "${GA_MEASUREMENT_ID}");
`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kyle Darden — Portfolio</title>
        <meta
          name="description"
          content="Kyle Darden — Data Engineer & backend systems builder. Live CS2 analytics platform, dbt data warehousing, and FastAPI services."
        />

        {/* Favicon(s) */}
        <link
          rel="icon"
          href="/ann_favicon_32px.png"
          type="image/png"
          sizes="32x32"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Social preview (add /public/og-image.png if you want previews) */}
        <meta property="og:title" content="Kyle Darden — Portfolio" />
        <meta
          property="og:description"
          content="Kyle Darden — Data Engineer & backend systems builder. Live CS2 analytics platform, dbt data warehousing, and FastAPI services."
        />
        <meta property="og:type" content="website" />

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
