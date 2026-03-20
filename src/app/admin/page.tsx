import { PageContainer } from "@/components/layout/PageContainer";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProblems } from "@/lib/problems/get-problems";

const difficultyColors = {
  easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  hard: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default async function AdminPage() {
  const problemList = await getProblems();

  return (
    <div className="flex min-h-[calc(100vh-56px)]">
      <DashboardSidebar activePath="/admin" />
      <PageContainer maxWidth="2xl" className="flex-1">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage problems and platform settings.</p>
          </div>
          <Button disabled>+ New Problem</Button>
        </div>

        {/* Summary cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm text-muted-foreground">Published Problems</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{problemList.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm text-muted-foreground">Total Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {problemList.reduce((sum, p) => sum + p.steps.length, 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Problems table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Problem Library</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {problemList.length === 0 ? (
              <p className="px-6 py-8 text-center text-sm text-muted-foreground">
                No published problems yet.
              </p>
            ) : (
              <div className="divide-y divide-border/40">
                {problemList.map((problem) => (
                  <div
                    key={problem.id}
                    className="flex items-center gap-4 px-6 py-4"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{problem.title}</p>
                      <p className="text-xs text-muted-foreground">{problem.topic} · {problem.steps.length} steps</p>
                    </div>
                    <Badge variant="outline" className={difficultyColors[problem.difficulty]}>
                      {problem.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      Published
                    </Badge>
                    <Button variant="ghost" size="sm" disabled>
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Full admin functionality coming in a future sprint.
        </p>
      </PageContainer>
    </div>
  );
}
