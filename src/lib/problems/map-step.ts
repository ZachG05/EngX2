import { problemSteps } from "@/lib/db";
import type { ProblemStep, StepType } from "@/types";

export function mapStep(row: typeof problemSteps.$inferSelect): ProblemStep {
  return {
    id: row.id,
    prompt: row.prompt,
    type: row.type as StepType,
    correctAnswer: row.correctAnswer,
    tolerance: row.tolerance ?? undefined,
    unit: row.unit ?? undefined,
    hint: row.hint ?? undefined,
    explanation: row.explanation ?? undefined,
    options: row.options ?? undefined,
  };
}
