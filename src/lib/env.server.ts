/**
 * Server-only environment variables — must NOT be imported in Client Components.
 * The `server-only` guard below will cause a build error if this module is
 * accidentally included in a client bundle.
 *
 * Public variables (NEXT_PUBLIC_*) live in env.ts.
 */
import "server-only";

function requireEnv(name: string): string {
  const value = process.env[name];
  if ((!value || !value.trim()) && process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

export const serverEnv = {
  // Database — server-side only
  POSTGRES_URL: requireEnv("POSTGRES_URL"),
} as const;
