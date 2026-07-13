import type { Config } from "@react-router/dev/config";

export default {
  // Static site: no server runtime, GitHub Pages serves the build output
  ssr: false,
  // Keep the existing src/ layout instead of the default app/ directory
  appDirectory: "src",
} satisfies Config;
