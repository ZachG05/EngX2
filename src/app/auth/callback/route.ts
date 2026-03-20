import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/auth/server";

/**
 * Handles the OAuth callback from Supabase Auth providers (Google, GitHub).
 * Exchanges the PKCE authorization code for a session and redirects to the
 * dashboard.
 *
 * In Vercel production deployments the internal `request.url` origin may
 * differ from the public-facing host.  We prefer the `x-forwarded-host`
 * header (set by Vercel's edge network) so the final redirect goes to the
 * correct URL.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  // Derive the public-facing base URL.  In production Vercel sets
  // x-forwarded-host to the canonical hostname; fall back to `origin` for
  // local development.  We validate the header looks like a plain hostname
  // (letters, digits, hyphens, dots) to guard against header injection.
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  const isSafeHost = forwardedHost !== null && /^[\w.-]+$/.test(forwardedHost);
  const baseUrl =
    !isLocalEnv && isSafeHost ? `https://${forwardedHost}` : origin;

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${baseUrl}${next}`);
    }
  }

  // If code exchange fails, redirect to login with an error message
  return NextResponse.redirect(`${baseUrl}/login?error=auth`);
}
