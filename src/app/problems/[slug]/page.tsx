import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProblemSolver } from "@/components/problems";
import { getProblemBySlug } from "@/lib/problems/get-problem-by-slug";

export const dynamic = "force-dynamic";

interface ProblemPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { slug } = await params;
  const problem = await getProblemBySlug(slug);

  if (!problem) {
    notFound();
  }

  if (problem.steps.length === 0) {
    return (
      <PageContainer maxWidth="lg">
        <p className="text-center text-muted-foreground py-16">
          This problem has no steps yet. Please check back later.
        </p>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="lg">
      <ProblemSolver problem={problem} />
    </PageContainer>
  );
}

