"use client";

import { KeyboardEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ProblemStep, StepType } from "@/types";
import { StepState } from "@/lib/problems/solver";

const stepTypeLabels: Record<StepType, string> = {
  numeric: "numeric",
  multiple_choice: "multiple choice",
  text: "text",
};

interface StepCardProps {
  step: ProblemStep;
  stepIndex: number;
  state: StepState;
  isActive: boolean;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  onToggleHint: () => void;
  onToggleExplanation: () => void;
}

export function StepCard({
  step,
  stepIndex,
  state,
  isActive,
  onAnswerChange,
  onSubmit,
  onToggleHint,
  onToggleExplanation,
}: StepCardProps) {
  const isCorrect = state.correct === true;
  const isIncorrect = state.submitted && state.correct === false;

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && isActive && !isCorrect) {
      onSubmit();
    }
  }

  return (
    <Card
      className={cn(
        "transition-all",
        isCorrect && "border-emerald-500/30 bg-emerald-500/5",
        isActive && !isCorrect && "border-primary/40",
        !isActive && !isCorrect && "opacity-60"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
              isCorrect
                ? "bg-emerald-500/20 text-emerald-400"
                : isActive
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            )}
          >
            {isCorrect ? "✓" : stepIndex + 1}
          </div>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Step {stepIndex + 1}
            {" · "}
            {stepTypeLabels[step.type]}
            {step.unit && ` (${step.unit})`}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-sm leading-relaxed">{step.prompt}</p>

        {/* Answer input */}
        {step.type === "multiple_choice" && step.options ? (
          <div className="flex flex-col gap-2">
            {step.options.map((option) => {
              const isSelected = state.answer === option;
              const isWrong =
                isIncorrect && isSelected;
              const isRight = isCorrect && isSelected;

              return (
                <button
                  key={option}
                  disabled={isCorrect || !isActive}
                  onClick={() => {
                    if (isActive && !isCorrect) {
                      onAnswerChange(option);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-md border px-4 py-2.5 text-sm text-left transition-colors",
                    isRight
                      ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
                      : isWrong
                      ? "border-red-500/60 bg-red-500/10 text-red-300"
                      : isSelected
                      ? "border-primary/60 bg-primary/10 text-foreground"
                      : "border-border/40 hover:border-border hover:bg-accent text-foreground",
                    (!isActive || isCorrect) && "cursor-default"
                  )}
                >
                  <span
                    className={cn(
                      "h-4 w-4 rounded-full border-2 flex-shrink-0",
                      isSelected ? "border-primary bg-primary/40" : "border-muted-foreground/40"
                    )}
                  />
                  {option}
                </button>
              );
            })}
            {/* Submit for multiple choice */}
            {isActive && !isCorrect && (
              <div className="flex justify-end pt-1">
                <Button
                  size="sm"
                  onClick={onSubmit}
                  disabled={!state.answer}
                >
                  Submit →
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              type={step.type === "numeric" ? "number" : "text"}
              placeholder={
                step.type === "numeric" ? "Enter a number…" : "Your answer…"
              }
              value={state.answer}
              disabled={isCorrect || !isActive}
              onChange={(e) => onAnswerChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className={cn(
                "flex-1",
                isCorrect && "border-emerald-500/40",
                isIncorrect && "border-red-500/40"
              )}
              aria-label={`Answer for step ${stepIndex + 1}`}
            />
            {step.unit && (
              <span className="flex h-9 items-center rounded-md border border-input bg-muted px-3 text-sm text-muted-foreground">
                {step.unit}
              </span>
            )}
            {isActive && !isCorrect && (
              <Button
                size="sm"
                onClick={onSubmit}
                disabled={!state.answer.trim()}
              >
                Submit →
              </Button>
            )}
          </div>
        )}

        {/* Feedback */}
        {state.submitted && (
          <p
            className={cn(
              "text-sm font-medium",
              isCorrect ? "text-emerald-400" : "text-red-400"
            )}
          >
            {isCorrect
              ? "✓ Correct!"
              : `✗ Not quite. Try again.${
                  state.attempts >= 2 && step.hint && !state.hintShown
                    ? " Hint available below."
                    : ""
                }`}
          </p>
        )}

        {/* Hint */}
        {step.hint && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground h-auto py-1 px-2"
              onClick={onToggleHint}
              disabled={!isActive && !isCorrect}
            >
              {state.hintShown ? "Hide Hint" : "💡 Show Hint"}
            </Button>
            {state.hintShown && (
              <div className="mt-2 rounded-md border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-amber-300">
                {step.hint}
              </div>
            )}
          </div>
        )}

        {/* Explanation — shown after correct */}
        {step.explanation && isCorrect && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground h-auto py-1 px-2"
              onClick={onToggleExplanation}
            >
              {state.explanationShown ? "Hide Explanation" : "📖 Show Explanation"}
            </Button>
            {state.explanationShown && (
              <div className="mt-2 rounded-md border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground/80 leading-relaxed">
                {step.explanation}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
