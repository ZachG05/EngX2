// Core types for EngX v2

export type Difficulty = "easy" | "medium" | "hard";

export type StepType = "numeric" | "multiple_choice" | "text";

export interface ProblemStep {
  id: string;
  prompt: string;
  type: StepType;
  correctAnswer: string | number;
  tolerance?: number;
  unit?: string;
  hint?: string;
  explanation?: string;
  options?: string[]; // for multiple_choice
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  topic: string;
  estimatedTime: number; // minutes
  steps: ProblemStep[];
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  displayName: string;
  email: string;
  createdAt: string;
}

export interface Attempt {
  id: string;
  userId: string;
  problemId: string;
  completed: boolean;
  score: number;
  startedAt: string;
  completedAt?: string;
}

export interface StepAttempt {
  id: string;
  attemptId: string;
  stepId: string;
  answer: string;
  correct: boolean;
  hintsUsed: number;
  submittedAt: string;
}
