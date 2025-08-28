import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./ui/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement is optional; it's for thrown/loader errors, not 404s.
    // errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      // Catch-all for anything under "/"
      { path: "*", element: <NotFound /> },
    ],
  },
  // Top-level catch-all (future-proofing if you add other route groups)
  { path: "*", element: <NotFound /> },
]);
