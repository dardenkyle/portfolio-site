import Button from "@/ui/Button";
import { pageMeta } from "@/utils/meta";

export function meta() {
  return pageMeta(
    "Page Not Found — Kyle Darden",
    "The page you're looking for doesn't exist."
  );
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center flex-col gap-4 p-6 text-center">
      <h1 className="text-2xl font-bold text-white">404 — Page Not Found</h1>
      <p className="text-slate-400">
        The page you’re looking for doesn’t exist.
      </p>
      <Button to="/" variant="primary">
        Back to Home
      </Button>
    </main>
  );
}
