import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Problem } from "@/types";

const difficultyColors = {
  easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  hard: "bg-red-500/10 text-red-400 border-red-500/20",
};

interface ProblemCardProps {
  problem: Problem;
}

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Card className="flex flex-col transition-colors hover:border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base leading-tight line-clamp-2">
            {problem.title}
          </h3>
          <Badge
            variant="outline"
            className={difficultyColors[problem.difficulty]}
          >
            {problem.difficulty}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{problem.topic}</p>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {problem.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-3 border-t border-border/40">
        <span className="text-xs text-muted-foreground">
          {problem.estimatedTime} min · {problem.steps.length} steps
        </span>
        <Link href={`/problems/${problem.slug}`}>
          <Button size="sm" variant="outline">
            Solve
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
