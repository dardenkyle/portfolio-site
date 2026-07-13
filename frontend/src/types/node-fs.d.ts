// The app tsconfig deliberately keeps full Node types out (loaders are
// the only code that runs in Node, at prerender time). Declare just the
// surface the CaseStudy loader uses instead of pulling in @types/node.
declare module "node:fs/promises" {
  export function readFile(
    path: string,
    encoding: "utf-8"
  ): Promise<string>;
}
