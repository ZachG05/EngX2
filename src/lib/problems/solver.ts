import { ProblemStep } from "@/types";

// Per-step runtime state tracked in the client
export interface StepState {
  answer: string;
  submitted: boolean;
  correct: boolean | null; // null = not yet evaluated
  hintShown: boolean;
  explanationShown: boolean;
  attempts: number;
}

export function makeInitialStepStates(count: number): StepState[] {
  return Array.from({ length: count }, () => ({
    answer: "",
    submitted: false,
    correct: null,
    hintShown: false,
    explanationShown: false,
    attempts: 0,
  }));
}

/**
 * Validate a user's answer against a step.
 * - numeric: parse float, compare within optional tolerance (default 0)
 * - multiple_choice / text: exact string match (case-insensitive trimmed)
 */
export function validateAnswer(step: ProblemStep, userAnswer: string): boolean {
  const raw = userAnswer.trim();

  if (step.type === "numeric") {
    const parsed = parseFloat(raw);
    if (isNaN(parsed)) return false;
    const expected =
      typeof step.correctAnswer === "number"
        ? step.correctAnswer
        : parseFloat(String(step.correctAnswer));
    const tolerance = step.tolerance ?? 0;
    return Math.abs(parsed - expected) <= tolerance;
  }

  // multiple_choice and text: exact match (trimmed, case-insensitive)
  return raw.toLowerCase() === String(step.correctAnswer).trim().toLowerCase();
}

/**
 * Return the index of the first step that has not yet been correctly answered.
 * If all steps are done, returns stepStates.length (past the end).
 */
export function getActiveStepIndex(stepStates: StepState[]): number {
  const idx = stepStates.findIndex((s) => s.correct !== true);
  return idx === -1 ? stepStates.length : idx;
}

/**
 * Returns true when every step has been answered correctly.
 */
export function isProblemComplete(stepStates: StepState[]): boolean {
  return stepStates.length > 0 && stepStates.every((s) => s.correct === true);
}
