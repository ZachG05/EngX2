import { HeroSection } from "@/components/marketing/HeroSection";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProblems, getTopics } from "@/lib/problems/get-problems";
import { ProblemCard } from "@/components/problems/ProblemCard";

const features = [
  {
    icon: "🧩",
    title: "Step-by-Step Guidance",
    description:
      "Each problem breaks down into guided steps with hints and detailed explanations.",
  },
  {
    icon: "📊",
    title: "Track Your Progress",
    description:
      "See which problems you've solved, your accuracy, and time spent per topic.",
  },
  {
    icon: "💡",
    title: "Learn From Mistakes",
    description:
      "Every wrong answer shows you the correct approach with full worked explanations.",
  },
  {
    icon: "🎯",
    title: "Curated Problem Sets",
    description:
      "Problems are structured by topic and difficulty, from foundational to advanced.",
  },
];

export default async function HomePage() {
  const [problemList, topicList] = await Promise.all([
    getProblems(),
    getTopics(),
  ]);

  return (
    <>
      <PageContainer maxWidth="2xl" className="px-4 md:px-6">
        <HeroSection />

        {/* Features */}
        <section className="py-16">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Built for Engineering Students
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title} className="border-border/40">
                <CardHeader className="pb-2">
                  <span className="text-2xl">{f.icon}</span>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Topics */}
        {topicList.length > 0 && (
          <section className="py-8">
            <h2 className="mb-6 text-xl font-bold">Topics Available</h2>
            <div className="flex flex-wrap gap-2">
              {topicList.map((topic) => (
                <span
                  key={topic.id}
                  className="rounded-full border border-border/40 bg-muted/40 px-3 py-1 text-sm text-muted-foreground"
                >
                  {topic.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Featured problems */}
        {problemList.length > 0 && (
          <section className="py-8">
            <h2 className="mb-6 text-xl font-bold">Featured Problems</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {problemList.slice(0, 3).map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          </section>
        )}
      </PageContainer>
    </>
  );
}
