import { db } from "@/lib/db";
import { problems, topics, problemSteps } from "@/lib/db/schema";
import { eq, asc, inArray } from "drizzle-orm";
import { Problem, Topic } from "@/types";
import { mapStep, coerceDifficulty } from "./map-step";

/**
 * Returns all topics ordered by name.
 */
export async function getTopics(): Promise<Topic[]> {
  const rows = await db
    .select({
      id: topics.id,
      name: topics.name,
      slug: topics.slug,
      description: topics.description,
    })
    .from(topics)
    .orderBy(asc(topics.name));

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
  }));
}

/**
 * Returns all published problems with their ordered steps.
 *
 * Steps are fetched in a second query and joined in memory to avoid a
 * complex lateral join while keeping everything type-safe.
 */
export async function getProblems(): Promise<Problem[]> {
  const problemRows = await db
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
    .where(eq(problems.published, true))
    .orderBy(asc(problems.createdAt));

  if (problemRows.length === 0) return [];

  // Resolve topic names in a single query
  const topicRows = await db
    .select({ id: topics.id, name: topics.name })
    .from(topics);

  const topicMap = new Map(topicRows.map((t) => [t.id, t.name]));

  // Fetch all steps for the returned problems in one query, ordered correctly
  const problemIds = problemRows.map((p) => p.id);
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
    .where(inArray(problemSteps.problemId, problemIds))
    .orderBy(asc(problemSteps.stepOrder));

  // Group steps by problem id (already in step_order order)
  const stepsByProblem = new Map<string, typeof stepRows>();
  for (const step of stepRows) {
    const list = stepsByProblem.get(step.problemId) ?? [];
    list.push(step);
    stepsByProblem.set(step.problemId, list);
  }

  return problemRows.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    difficulty: coerceDifficulty(p.difficulty),
    topic: topicMap.get(p.topicId ?? "") ?? "General",
    estimatedTime: p.estimatedTime,
    steps: (stepsByProblem.get(p.id) ?? []).map(mapStep),
  }));
}
