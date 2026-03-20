import { PageContainer } from "@/components/layout/PageContainer";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockProblems } from "@/lib/problems/mock-problems";

const difficultyColors = {
  easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  hard: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminPage() {
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
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm text-muted-foreground">Total Problems</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{mockProblems.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm text-muted-foreground">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm text-muted-foreground">Draft</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{mockProblems.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Problems table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Problem Library</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/40">
              {mockProblems.map((problem) => (
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
                    Draft
                  </Badge>
                  <Button variant="ghost" size="sm" disabled>
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Full admin functionality coming in a future sprint.
        </p>
      </PageContainer>
    </div>
  );
}
