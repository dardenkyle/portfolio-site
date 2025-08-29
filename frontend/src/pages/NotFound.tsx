import { Link } from "react-router-dom";

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
