import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env";
import * as schema from "./schema";

// In development without POSTGRES_URL, fall back to a local dev connection.
const connectionString =
  env.POSTGRES_URL.trim() !== "" ? env.POSTGRES_URL : "postgres://localhost:5432/engx_dev";

const client = postgres(connectionString, {
  max: 1,
  onnotice: () => {},
});

export const db = drizzle(client, { schema });
export * from "./schema";
