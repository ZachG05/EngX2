import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Problem } from "@/types";
import { cn } from "@/lib/utils";

const difficultyColors: Record<Problem["difficulty"], string> = {
  easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  hard: "bg-red-500/10 text-red-400 border-red-500/20",
};

interface ProblemHeaderProps {
  problem: Problem;
  className?: string;
}

export function ProblemHeader({ problem, className }: ProblemHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge variant="outline">{problem.topic}</Badge>
        <Badge
          variant="outline"
          className={difficultyColors[problem.difficulty]}
        >
          {problem.difficulty}
        </Badge>
        <span className="text-sm text-muted-foreground">
          ⏱ {problem.estimatedTime} min · {problem.steps.length} step
          {problem.steps.length !== 1 ? "s" : ""}
        </span>
      </div>
      <h1 className="text-2xl font-bold mb-3">{problem.title}</h1>
      <p className="text-muted-foreground leading-relaxed">
        {problem.description}
      </p>
      <Separator className="mt-6" />
    </div>
  );
}
