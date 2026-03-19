import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <PageContainer maxWidth="sm" className="flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <span className="font-bold text-primary-foreground text-lg">E</span>
          </div>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your EngX account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* OAuth placeholder */}
          <Button variant="outline" className="w-full gap-2" disabled>
            <span>🔐</span> Continue with Google
          </Button>
          <Button variant="outline" className="w-full gap-2" disabled>
            <span>🐙</span> Continue with GitHub
          </Button>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
              or
            </span>
          </div>

          {/* Email/password form */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@university.edu"
                disabled
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                disabled
              />
            </div>
            <Button className="w-full mt-1" disabled>
              Sign in
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Auth is coming soon. This page is a placeholder.
          </p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
