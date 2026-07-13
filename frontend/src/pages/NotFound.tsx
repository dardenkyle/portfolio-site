import { Link } from "react-router";
import { pageMeta } from "@/utils/meta";

export function meta() {
  return pageMeta(
    "Page Not Found — Kyle Darden",
    "The page you're looking for doesn't exist."
  );
}

export default function NotFound() {
  return (
    <section style={{ padding: 12 }}>
      <h1>404 — Page Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </section>
  );
}
