import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.NODE_ENV === "production") {
  throw new Error("DATABASE_URL environment variable is required");
}

// Use a dummy connection string in development if DATABASE_URL is not set
const client = postgres(connectionString ?? "postgres://localhost:5432/engx_dev", {
  max: 1,
  onnotice: () => {},
});

export const db = drizzle(client, { schema });
export * from "./schema";
