import { z } from "zod";

export const stepTypeSchema = z.enum(["numeric", "multiple_choice", "text"]);
export const difficultySchema = z.enum(["easy", "medium", "hard"]);

export const problemStepSchema = z.object({
  id: z.string(),
  prompt: z.string().min(1),
  type: stepTypeSchema,
  correctAnswer: z.union([z.string(), z.number()]),
  tolerance: z.number().optional(),
  unit: z.string().optional(),
  hint: z.string().optional(),
  explanation: z.string().optional(),
  options: z.array(z.string()).optional(),
});

export const problemSchema = z.object({
  id: z.string(),
  slug: z.string().min(1),
  title: z.string().min(1),
  difficulty: difficultySchema,
  description: z.string().min(1),
  topic: z.string().min(1),
  estimatedTime: z.number().positive(),
  steps: z.array(problemStepSchema),
});

export const stepAnswerSchema = z.object({
  stepId: z.string(),
  answer: z.union([z.string(), z.number()]),
});

export type ProblemInput = z.infer<typeof problemSchema>;
export type StepAnswerInput = z.infer<typeof stepAnswerSchema>;
