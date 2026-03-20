import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProblemSolver } from "@/components/problems";
import { mockProblems } from "@/lib/problems/mock-problems";

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
      <ProblemSolver problem={problem} />
    </PageContainer>
  );
}

export async function generateStaticParams() {
  return mockProblems.map((p) => ({ slug: p.slug }));
}

