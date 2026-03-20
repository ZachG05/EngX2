import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  totalSteps: number;
  activeStepIndex: number; // first incomplete step (equals totalSteps when all done)
  stepCorrect: (boolean | null)[]; // correct status per step
  className?: string;
}

export function ProgressIndicator({
  totalSteps,
  activeStepIndex,
  stepCorrect,
  className,
}: ProgressIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2 mb-6", className)}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const correct = stepCorrect[i];
        const isActive = i === activeStepIndex;
        const isLocked = i > activeStepIndex;

        return (
          <div key={i} className="flex items-center gap-2">
            <div
              aria-label={
                correct
                  ? `Step ${i + 1} complete`
                  : isActive
                  ? `Step ${i + 1} active`
                  : `Step ${i + 1} locked`
              }
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all",
                correct
                  ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                  : isActive
                  ? "border-primary bg-primary/20 text-primary"
                  : isLocked
                  ? "border-border/40 bg-transparent text-muted-foreground/40"
                  : "border-border bg-transparent text-muted-foreground"
              )}
            >
              {correct ? "✓" : i + 1}
            </div>
            {i < totalSteps - 1 && (
              <div
                className={cn(
                  "h-0.5 w-6 rounded-full transition-all",
                  correct ? "bg-emerald-500/60" : "bg-border/40"
                )}
              />
            )}
          </div>
        );
      })}
      <span className="ml-2 text-xs text-muted-foreground">
        {stepCorrect.filter((c) => c === true).length} / {totalSteps} complete
      </span>
    </div>
  );
}
