import { PageContainer } from "@/components/layout/PageContainer";
import { ProblemCard } from "@/components/problems/ProblemCard";
import { getProblems, getTopics } from "@/lib/problems/get-problems";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ProblemsPage() {
  const [allProblems, allTopics] = await Promise.all([
    getProblems(),
    getTopics(),
  ]);

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
        {allTopics.map((topic) => (
          <Button key={topic.id} variant="outline" size="sm">
            {topic.name}
          </Button>
        ))}
      </div>

      {/* Problems grid */}
      {allProblems.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">
          No problems available yet. Check back soon!
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
