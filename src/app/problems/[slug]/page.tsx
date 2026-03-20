import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProblemSolver } from "@/components/problems";
import { getProblemBySlug } from "@/lib/problems/get-problem-by-slug";

interface ProblemPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { slug } = await params;
  const problem = await getProblemBySlug(slug);

  if (!problem) {
    notFound();
  }

  return (
    <PageContainer maxWidth="lg">
      <ProblemSolver problem={problem} />
    </PageContainer>
  );
}
