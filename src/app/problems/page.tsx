import { PageContainer } from "@/components/layout/PageContainer";
import { ProblemCard } from "@/components/problems/ProblemCard";
import { mockProblems, mockTopics } from "@/lib/problems/mock-problems";
import { Button } from "@/components/ui/button";

export default function ProblemsPage() {
  return (
    <PageContainer maxWidth="xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Problems</h1>
        <p className="text-muted-foreground">
          Browse and solve engineering problems across multiple disciplines.
        </p>
      </div>

      {/* Topic filter (placeholder) */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button variant="secondary" size="sm">
          All Topics
        </Button>
        {mockTopics.map((topic) => (
          <Button key={topic.id} variant="outline" size="sm">
            {topic.name}
          </Button>
        ))}
      </div>

      {/* Problems grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockProblems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        More problems coming soon. This is currently displaying mock data.
      </p>
    </PageContainer>
  );
}
