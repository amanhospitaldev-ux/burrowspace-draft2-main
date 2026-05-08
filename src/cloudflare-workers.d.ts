/**
 * Declarations for the Workers virtual module. Run `npx wrangler types` after
 * changing wrangler.jsonc to regenerate a fuller Env type in worker-configuration.d.ts.
 */
declare module "cloudflare:workers" {
  interface KvNs {
    get(key: string): Promise<string | null>;
    put(key: string, value: string): Promise<void>;
    list(options?: { prefix?: string }): Promise<{ keys: { name: string }[] }>;
  }

  export const env: {
    FAQS_KV?: KvNs;
    ABOUT_KV?: KvNs;
  };
}
