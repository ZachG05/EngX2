import { db } from "@/lib/db";
import { problems, topics, problemSteps } from "@/lib/db/schema";
import { eq, asc, and } from "drizzle-orm";
import { Problem } from "@/types";
import { mapStep, coerceDifficulty } from "./map-step";

/**
 * Returns a single published problem (with ordered steps) by its slug,
 * or `null` when no matching published problem exists.
 *
 * Callers should treat a `null` return as a 404.
 */
export async function getProblemBySlug(slug: string): Promise<Problem | null> {
  const [problemRow] = await db
    .select({
      id: problems.id,
      slug: problems.slug,
      title: problems.title,
      description: problems.description,
      difficulty: problems.difficulty,
      topicId: problems.topicId,
      estimatedTime: problems.estimatedTime,
    })
    .from(problems)
    .where(and(eq(problems.slug, slug), eq(problems.published, true)))
    .limit(1);

  if (!problemRow) return null;

  // Resolve topic name
  let topicName = "General";
  if (problemRow.topicId) {
    const [topicRow] = await db
      .select({ name: topics.name })
      .from(topics)
      .where(eq(topics.id, problemRow.topicId))
      .limit(1);
    if (topicRow) topicName = topicRow.name;
  }

  // Load steps ordered by step_order
  const stepRows = await db
    .select({
      id: problemSteps.id,
      problemId: problemSteps.problemId,
      stepOrder: problemSteps.stepOrder,
      prompt: problemSteps.prompt,
      type: problemSteps.type,
      correctAnswer: problemSteps.correctAnswer,
      tolerance: problemSteps.tolerance,
      unit: problemSteps.unit,
      hint: problemSteps.hint,
      explanation: problemSteps.explanation,
      options: problemSteps.options,
    })
    .from(problemSteps)
    .where(eq(problemSteps.problemId, problemRow.id))
    .orderBy(asc(problemSteps.stepOrder));

  return {
    id: problemRow.id,
    slug: problemRow.slug,
    title: problemRow.title,
    description: problemRow.description,
    difficulty: coerceDifficulty(problemRow.difficulty),
    topic: topicName,
    estimatedTime: problemRow.estimatedTime,
    steps: stepRows.map(mapStep),
  };
}
