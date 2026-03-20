/**
 * Public environment variables — safe to import in both Server and Client Components.
 * Import from this module instead of reading process.env directly.
 *
 * Server-only variables (POSTGRES_URL, etc.) live in env.server.ts.
 */

function requirePublicEnv(name: string, value: string | undefined): string {
  // Must use static dot-notation so Next.js can inline these into the client
  // bundle at build time; dynamic bracket access (process.env[name]) is not
  // statically analysable and resolves to undefined in the browser.
  if ((!value || !value.trim()) && process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

export const env = {
  // Supabase — public (safe to expose in the browser).
  NEXT_PUBLIC_SUPABASE_URL: requirePublicEnv(
    "NEXT_PUBLIC_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SUPABASE_URL
  ),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: requirePublicEnv(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ),
} as const;
