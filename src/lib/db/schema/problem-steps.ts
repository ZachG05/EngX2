import { pgTable, text, timestamp, integer, real, uuid, json } from "drizzle-orm/pg-core";
import { problems } from "./problems";

export const problemSteps = pgTable("problem_steps", {
  id: uuid("id").defaultRandom().primaryKey(),
  problemId: uuid("problem_id")
    .notNull()
    .references(() => problems.id, { onDelete: "cascade" }),
  stepOrder: integer("step_order").notNull(),
  prompt: text("prompt").notNull(),
  type: text("type").notNull(), // numeric | multiple_choice | text
  correctAnswer: text("correct_answer").notNull(),
  tolerance: real("tolerance"),
  unit: text("unit"),
  hint: text("hint"),
  explanation: text("explanation"),
  options: json("options").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
