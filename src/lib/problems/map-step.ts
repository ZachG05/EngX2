import { ProblemStep, StepType, Difficulty } from "@/types";

/**
 * Shape of a raw row returned from the `problem_steps` table via Drizzle.
 * Defined here so the mapping is self-contained and easy to unit-test.
 */
export interface RawStep {
  id: string;
  prompt: string;
  type: string;
  correctAnswer: string;
  tolerance: number | null;
  unit: string | null;
  hint: string | null;
  explanation: string | null;
  options: string[] | null;
}

const VALID_STEP_TYPES: StepType[] = ["numeric", "multiple_choice", "text"];
const VALID_DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

function coerceStepType(raw: string): StepType {
  if ((VALID_STEP_TYPES as string[]).includes(raw)) return raw as StepType;
  return "text";
}

/**
 * Coerces a raw difficulty string from the DB to the `Difficulty` union type.
 * Falls back to `"easy"` for unrecognised values.
 */
export function coerceDifficulty(raw: string): Difficulty {
  if ((VALID_DIFFICULTIES as string[]).includes(raw)) return raw as Difficulty;
  return "easy";
}

/**
 * Maps a raw `problem_steps` DB row to the solver's `ProblemStep` model.
 *
 * - `correctAnswer` is stored as text in the DB; numeric steps keep their
 *   string value here — `validateAnswer` in solver.ts already handles both.
 * - Nullable DB fields become `undefined` so the interface shape stays clean.
 */
export function mapStep(row: RawStep): ProblemStep {
  return {
    id: row.id,
    prompt: row.prompt,
    type: coerceStepType(row.type),
    correctAnswer: row.correctAnswer,
    tolerance: row.tolerance ?? undefined,
    unit: row.unit ?? undefined,
    hint: row.hint ?? undefined,
    explanation: row.explanation ?? undefined,
    options: row.options ?? undefined,
  };
}
