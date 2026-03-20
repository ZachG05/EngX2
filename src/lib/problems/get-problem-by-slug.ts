import { eq, asc } from "drizzle-orm";
import { db, problems, problemSteps, topics } from "@/lib/db";
import type { Difficulty, Problem } from "@/types";
import { mapStep } from "./map-step";

export async function getProblemBySlug(slug: string): Promise<Problem | null> {
  const [problem] = await db
    .select({
      id: problems.id,
      slug: problems.slug,
      title: problems.title,
      description: problems.description,
      difficulty: problems.difficulty,
      topicName: topics.name,
      estimatedTime: problems.estimatedTime,
    })
    .from(problems)
    .leftJoin(topics, eq(problems.topicId, topics.id))
    .where(eq(problems.slug, slug))
    .limit(1);

  if (!problem) return null;

  const stepRows = await db
    .select()
    .from(problemSteps)
    .where(eq(problemSteps.problemId, problem.id))
    .orderBy(asc(problemSteps.stepOrder));

  return {
    id: problem.id,
    slug: problem.slug,
    title: problem.title,
    description: problem.description,
    difficulty: problem.difficulty as Difficulty,
    topic: problem.topicName ?? "General",
    estimatedTime: problem.estimatedTime,
    steps: stepRows.map(mapStep),
  };
}
