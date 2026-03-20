import { PageContainer } from "@/components/layout/PageContainer";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const recentActivity = [
  { problem: "Projectile Motion: Horizontal Launch", score: 4, total: 4, date: "Today" },
  { problem: "Ohm's Law: Series Circuit Analysis", score: 2, total: 3, date: "Yesterday" },
  { problem: "Simply Supported Beam: Bending Moment", score: 1, total: 3, date: "2 days ago" },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-[calc(100vh-56px)]">
      <DashboardSidebar activePath="/dashboard" />
      <PageContainer maxWidth="2xl" className="flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and continue learning.</p>
        </div>

        {/* Stats grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Problems Solved" value={12} description="All time" />
          <StatCard title="Current Streak" value="3 days" description="Keep it up!" />
          <StatCard title="Accuracy" value="78%" description="Across all attempts" />
          <StatCard title="Time Spent" value="4.2h" description="This week" />
        </div>

        {/* Recent activity */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col divide-y divide-border/40">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">{item.problem}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      item.score === item.total
                        ? "text-emerald-400 border-emerald-500/20"
                        : "text-amber-400 border-amber-500/20"
                    }
                  >
                    {item.score}/{item.total} steps
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Link href="/problems">
            <Button>Browse Problems →</Button>
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}
