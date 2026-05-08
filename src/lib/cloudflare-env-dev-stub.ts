/**
 * Vite dev (Node) cannot resolve the real `cloudflare:workers` module.
 * `vite.config.ts` aliases that id to this file only when `command === "serve"`.
 * Production builds use the real virtual module from @cloudflare/vite-plugin.
 */
export const env = {
  FAQS_KV: undefined,
  ABOUT_KV: undefined,
};
