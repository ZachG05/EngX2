/**
 * Centralised environment variable validation.
 * Import from this module instead of reading process.env directly.
 */

function requireEnv(name: string): string {
  const value = process.env[name];
  if ((!value || !value.trim()) && process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

export const env = {
  // Supabase — public (safe to expose in the browser)
  NEXT_PUBLIC_SUPABASE_URL: requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),

  // Database — server-side only
  POSTGRES_URL: requireEnv("POSTGRES_URL"),
} as const;
