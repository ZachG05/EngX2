import { pgTable, text, timestamp, boolean, integer, uuid } from "drizzle-orm/pg-core";
import { topics } from "./topics";

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
