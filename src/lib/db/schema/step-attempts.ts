import { pgTable, text, timestamp, boolean, integer, uuid } from "drizzle-orm/pg-core";
import { attempts } from "./attempts";
import { problemSteps } from "./problem-steps";

export const stepAttempts = pgTable("step_attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  attemptId: uuid("attempt_id")
    .notNull()
    .references(() => attempts.id, { onDelete: "cascade" }),
  stepId: uuid("step_id")
    .notNull()
    .references(() => problemSteps.id),
  answer: text("answer").notNull(),
  correct: boolean("correct").notNull().default(false),
  hintsUsed: integer("hints_used").notNull().default(0),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});
