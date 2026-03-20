"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./server";

/**
 * Signs the current user out and redirects to the home page.
 */
export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
