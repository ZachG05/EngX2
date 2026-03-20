import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CompletionStateProps {
  title: string;
  totalSteps: number;
  hintsUsed: number;
}

export function CompletionState({
  title,
  totalSteps,
  hintsUsed,
}: CompletionStateProps) {
  return (
    <Card className="border-emerald-500/40 bg-emerald-500/5 text-center">
      <CardContent className="py-12 flex flex-col items-center gap-4">
        <div className="text-5xl mb-2">🎉</div>
        <h2 className="text-2xl font-bold text-emerald-400">
          Problem Complete!
        </h2>
        <p className="text-muted-foreground max-w-sm leading-relaxed">
          You solved <span className="text-foreground font-medium">{title}</span>{" "}
          across {totalSteps} step{totalSteps !== 1 ? "s" : ""}.
          {hintsUsed > 0
            ? ` You used ${hintsUsed} hint${hintsUsed !== 1 ? "s" : ""} along the way.`
            : " Great work — no hints needed!"}
        </p>
        <div className="flex gap-3 mt-4">
          <Link href="/problems">
            <Button variant="outline">Browse More Problems</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
