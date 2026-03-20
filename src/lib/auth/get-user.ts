import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "./server";

/**
 * Returns the currently authenticated user, or null if not signed in.
 * Safe to call in Server Components and Server Actions.
 */
export async function getUser(): Promise<User | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
