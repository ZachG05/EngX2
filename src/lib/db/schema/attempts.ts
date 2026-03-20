import { pgTable, text, timestamp, boolean, integer, uuid } from "drizzle-orm/pg-core";
import { problems } from "./problems";

export const attempts = pgTable("attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  problemId: uuid("problem_id")
    .notNull()
    .references(() => problems.id),
  completed: boolean("completed").notNull().default(false),
  score: integer("score").notNull().default(0),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});
