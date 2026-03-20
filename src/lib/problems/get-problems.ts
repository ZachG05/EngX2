import { eq, inArray, asc } from "drizzle-orm";
import { db, problems, problemSteps, topics } from "@/lib/db";
import type { Difficulty, Problem, ProblemStep, Topic } from "@/types";
import { mapStep } from "./map-step";

export async function getProblems(): Promise<Problem[]> {
  const problemRows = await db
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
    .where(eq(problems.published, true))
    .orderBy(asc(problems.createdAt));

  if (problemRows.length === 0) return [];

  const problemIds = problemRows.map((p) => p.id);

  const stepRows = await db
    .select()
    .from(problemSteps)
    .where(inArray(problemSteps.problemId, problemIds))
    .orderBy(asc(problemSteps.stepOrder));

  const stepsByProblemId = new Map<string, ProblemStep[]>();
  for (const step of stepRows) {
    const existing = stepsByProblemId.get(step.problemId) ?? [];
    existing.push(mapStep(step));
    stepsByProblemId.set(step.problemId, existing);
  }

  return problemRows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    difficulty: row.difficulty as Difficulty,
    topic: row.topicName ?? "General",
    estimatedTime: row.estimatedTime,
    steps: stepsByProblemId.get(row.id) ?? [],
  }));
}

export async function getTopics(): Promise<Topic[]> {
  const rows = await db
    .select()
    .from(topics)
    .orderBy(asc(topics.name));

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
  }));
}
