"use client";

import { useState, useCallback } from "react";
import { Problem } from "@/types";
import {
  StepState,
  makeInitialStepStates,
  validateAnswer,
  getActiveStepIndex,
  isProblemComplete,
} from "@/lib/problems/solver";
import { ProblemHeader } from "./ProblemHeader";
import { ProgressIndicator } from "./ProgressIndicator";
import { StepCard } from "./StepCard";
import { CompletionState } from "./CompletionState";

interface ProblemSolverProps {
  problem: Problem;
}

export function ProblemSolver({ problem }: ProblemSolverProps) {
  const [stepStates, setStepStates] = useState<StepState[]>(() =>
    makeInitialStepStates(problem.steps.length)
  );

  const activeStepIndex = getActiveStepIndex(stepStates);
  const completed = isProblemComplete(stepStates);

  const updateStep = useCallback(
    (index: number, patch: Partial<StepState>) => {
      setStepStates((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], ...patch };
        return next;
      });
    },
    []
  );

  function handleAnswerChange(index: number, answer: string) {
    updateStep(index, { answer });
  }

  function handleSubmit(index: number) {
    const step = problem.steps[index];
    const state = stepStates[index];
    const correct = validateAnswer(step, state.answer);

    updateStep(index, {
      submitted: true,
      correct,
      attempts: state.attempts + 1,
      // auto-show explanation on correct
      explanationShown: correct ? true : state.explanationShown,
    });
  }

  function handleToggleHint(index: number) {
    updateStep(index, { hintShown: !stepStates[index].hintShown });
  }

  function handleToggleExplanation(index: number) {
    updateStep(index, {
      explanationShown: !stepStates[index].explanationShown,
    });
  }

  const totalHintsUsed = stepStates.filter((s) => s.hintShown).length;

  return (
    <div>
      <ProblemHeader problem={problem} />

      <ProgressIndicator
        totalSteps={problem.steps.length}
        activeStepIndex={activeStepIndex}
        stepCorrect={stepStates.map((s) => s.correct)}
      />

      {completed ? (
        <CompletionState
          title={problem.title}
          totalSteps={problem.steps.length}
          hintsUsed={totalHintsUsed}
        />
      ) : (
        <div className="flex flex-col gap-6">
          {problem.steps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              stepIndex={index}
              state={stepStates[index]}
              isActive={index === activeStepIndex}
              onAnswerChange={(answer) => handleAnswerChange(index, answer)}
              onSubmit={() => handleSubmit(index)}
              onToggleHint={() => handleToggleHint(index)}
              onToggleExplanation={() => handleToggleExplanation(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
