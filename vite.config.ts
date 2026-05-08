// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(async (env) => ({
  resolve: {
    alias:
      env.command === "serve"
        ? {
            "cloudflare:workers": path.join(dirname, "src/lib/cloudflare-env-dev-stub.ts"),
          }
        : {},
  },
}));
