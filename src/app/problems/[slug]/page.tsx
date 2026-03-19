import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockProblems } from "@/lib/problems/mock-problems";

const difficultyColors = {
  easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  hard: "bg-red-500/10 text-red-400 border-red-500/20",
};

interface ProblemPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { slug } = await params;
  const problem = mockProblems.find((p) => p.slug === slug);

  if (!problem) {
    notFound();
  }

  return (
    <PageContainer maxWidth="lg">
      {/* Problem header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="outline">{problem.topic}</Badge>
          <Badge
            variant="outline"
            className={difficultyColors[problem.difficulty]}
          >
            {problem.difficulty}
          </Badge>
          <span className="text-sm text-muted-foreground">
            ⏱ {problem.estimatedTime} min · {problem.steps.length} steps
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-3">{problem.title}</h1>
        <p className="text-muted-foreground">{problem.description}</p>
      </div>

      <Separator className="mb-6" />

      {/* Steps */}
      <div className="flex flex-col gap-6">
        {problem.steps.map((step, index) => (
          <Card key={step.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                  {index + 1}
                </div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Step {index + 1} · {step.type.replace("_", " ")}
                  {step.unit && ` (answer in ${step.unit})`}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed">{step.prompt}</p>

              {/* Input based on type */}
              {step.type === "multiple_choice" && step.options ? (
                <div className="flex flex-col gap-2">
                  {step.options.map((option) => (
                    <button
                      key={option}
                      className="flex items-center gap-3 rounded-md border border-border/40 px-4 py-2.5 text-sm text-left transition-colors hover:border-border hover:bg-accent"
                    >
                      <span className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type={step.type === "numeric" ? "number" : "text"}
                    placeholder={step.type === "numeric" ? "Enter a number..." : "Your answer..."}
                    className="flex h-9 flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  {step.unit && (
                    <span className="flex h-9 items-center rounded-md border border-input bg-muted px-3 text-sm text-muted-foreground">
                      {step.unit}
                    </span>
                  )}
                </div>
              )}

              {/* Hint button placeholder */}
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  💡 Show Hint
                </Button>
                <Button size="sm" className="ml-auto">
                  Submit →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Interactive submission logic coming soon. This is a UI prototype.
      </p>
    </PageContainer>
  );
}

export async function generateStaticParams() {
  return mockProblems.map((p) => ({ slug: p.slug }));
}
