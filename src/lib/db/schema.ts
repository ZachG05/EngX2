import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  real,
  uuid,
  json,
} from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().unique(),
  displayName: text("display_name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const topics = pgTable("topics", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const problems = pgTable("problems", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(), // easy | medium | hard
  topicId: uuid("topic_id").references(() => topics.id),
  estimatedTime: integer("estimated_time").notNull().default(15),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

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
